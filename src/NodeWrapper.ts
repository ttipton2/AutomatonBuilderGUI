import Konva from 'konva';
import StateManager from './StateManager';
import { Tool } from './Tool';
import { Vector2d } from 'konva/lib/types';

export default class NodeWrapper {
  public static readonly NodeRadius = 30;

  private nodeBackground: Konva.Circle;
  private nodeAcceptCircle: Konva.Circle;

  private nodeLabel: Konva.Text;
  public nodeGroup: Konva.Group;

  private lastPos: Vector2d;

  private isAcceptNode: boolean = false;

  constructor(x: number, y: number) {
    this.nodeGroup = new Konva.Group({ x: x, y: y });

    // create our shape
    this.nodeBackground = new Konva.Circle({
      x: 0,
      y: 0,
      radius: NodeWrapper.NodeRadius,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2
    });

    this.nodeAcceptCircle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: NodeWrapper.NodeRadius * 0.8,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: 1.5,
      visible: this.isAcceptNode
    });

    this.nodeLabel = new Konva.Text({
      x: -NodeWrapper.NodeRadius,
      y: -NodeWrapper.NodeRadius,
      width: NodeWrapper.NodeRadius * 2,
      height: NodeWrapper.NodeRadius * 2,
      align: 'center',
      verticalAlign: 'middle',
      text: 'q0',
      fontSize: 30,
      fill: 'black',
    });

    this.nodeGroup.add(this.nodeBackground);
    this.nodeGroup.add(this.nodeAcceptCircle);
    this.nodeGroup.add(this.nodeLabel);

    this.nodeGroup.draggable(true);

    // TODO: figure out how to get this to activate when in drag operation
    // https://konvajs.org/docs/drag_and_drop/Drop_Events.html
    this.nodeGroup.on('mouseenter', (ev) => this.onMouseEnter.call(this, ev));
    this.nodeGroup.on('mouseleave', (ev) => this.onMouseLeave.call(this, ev));

    this.nodeGroup.on('click', (ev) => this.onClick.call(this, ev));
    this.nodeGroup.on('dragstart', (ev) => this.onDragStart.call(this, ev));
    this.nodeGroup.on('dragmove', (ev) => this.onDragMove.call(this, ev));
    this.nodeGroup.on('dragend', (ev) => this.onDragEnd.call(this, ev));
  }

  public onClick(ev: Konva.KonvaEventObject<MouseEvent>) {
    this.isAcceptNode = !this.isAcceptNode;
    this.nodeAcceptCircle.visible(this.isAcceptNode);
  }


  public enableNewConnectionGlow() {
    this.nodeBackground.shadowColor('#2FDFFB');
    this.nodeBackground.shadowOffset({x: 0, y: 0});
    this.nodeBackground.shadowOpacity(1);
    this.nodeBackground.shadowBlur(10);
    this.nodeBackground.shadowEnabled(true);
  }

  public disableShadowEffects() {
    this.nodeBackground.shadowEnabled(false);
  }

  public enableDragDropShadow() {
    this.nodeBackground.shadowColor('#000000');
    this.nodeBackground.shadowOffset({x: 0, y: 3});
    this.nodeBackground.shadowOpacity(0.2);
    this.nodeBackground.shadowBlur(10);
    this.nodeBackground.shadowEnabled(true);
  }

  public onMouseEnter(ev: Konva.KonvaEventObject<MouseEvent>) {
    if (StateManager.currentTool === Tool.Transitions && StateManager.tentativeTransitionInProgress) {
      StateManager.tentativeTransitionTarget = this;
      this.enableNewConnectionGlow();
    }
  }

  public onMouseLeave(ev: Konva.KonvaEventObject<MouseEvent>) {
    if (StateManager.currentTool === Tool.Transitions) {
      if (StateManager.tentativeTransitionInProgress && StateManager.tentativeTransitionTarget === this) {
        StateManager.tentativeTransitionTarget = null;
        this.disableShadowEffects();
      }
    }
  }

  public onDragStart(ev: Konva.KonvaEventObject<MouseEvent>) {
    this.lastPos = this.nodeGroup.absolutePosition();
    if (StateManager.currentTool === Tool.States) {
      this.enableDragDropShadow();
    }
    else if (StateManager.currentTool === Tool.Transitions) {
      StateManager.startTentativeTransition(this);
    }
  }

  public onDragMove(ev: Konva.KonvaEventObject<MouseEvent>) {
    if (StateManager.currentTool == Tool.Transitions) {
      this.nodeGroup.absolutePosition(this.lastPos);
      StateManager.updateTentativeTransitionHead(ev.evt.pageX, ev.evt.pageY);
    }
  }

  public onDragEnd() {
    if (StateManager.currentTool == Tool.States) {
      this.disableShadowEffects();
    }
    else if (StateManager.currentTool === Tool.Transitions) {
      StateManager.endTentativeTransition();
    }
  }
}