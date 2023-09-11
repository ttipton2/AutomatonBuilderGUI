import Konva from 'konva';
import StateManager from './StateManager';
import { Tool } from './Tool';
import { Vector2d } from 'konva/lib/types';
import SelectableObject from './SelectableObject';
import { Node, NodeConfig } from 'konva/lib/Node';

export default class NodeWrapper extends SelectableObject {
  public static readonly NodeRadius = 30;
  
  public static readonly SelectedStrokeColor = '#018ED5';
  public static readonly SelectedStrokeWidth = 4;

  public static readonly StrokeColor = 'black';
  public static readonly StrokeWidth = 2;

  private nodeBackground: Konva.Circle;
  private nodeAcceptCircle: Konva.Circle;

  private nodeLabel: Konva.Text;
  public nodeGroup: Konva.Group;

  private lastPos: Vector2d;

  private isAcceptNode: boolean = false;

  private _labelText: string = "State";

  constructor(x: number, y: number) {
    super();
    this.nodeGroup = new Konva.Group({ x: x, y: y });

    // create our shape
    this.nodeBackground = new Konva.Circle({
      x: 0,
      y: 0,
      radius: NodeWrapper.NodeRadius,
      fill: 'white',
      stroke: NodeWrapper.StrokeColor,
      strokeWidth: NodeWrapper.StrokeWidth
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
      text: this._labelText,
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
    if (StateManager.currentTool === Tool.Select) {
      // If shift isn't being held, then clear all previous selection
      if (!ev.evt.shiftKey) {
        StateManager.deselectAllObjects();
      }
      StateManager.selectObject(this);
    }
  }

  public select() {
    this.nodeBackground.stroke(NodeWrapper.SelectedStrokeColor);
    this.nodeBackground.strokeWidth(NodeWrapper.SelectedStrokeWidth);
  }

  public deselect() {
    this.nodeBackground.stroke(NodeWrapper.StrokeColor);
    this.nodeBackground.strokeWidth(NodeWrapper.StrokeWidth);
  }

  public deleteKonvaObjects() {
    this.nodeGroup.destroy();
  }

  public toggleAcceptNode() {
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

    // No dragging when in state mode!
    if (StateManager.currentTool === Tool.States) {
      this.nodeGroup.stopDrag();
    }
    else if (StateManager.currentTool === Tool.Transitions) {
      StateManager.startTentativeTransition(this);
    }
    else if (StateManager.currentTool === Tool.Select) {
      if (!ev.evt.shiftKey && StateManager.selectedObjects.length === 1) {
        StateManager.deselectAllObjects();
      }
      StateManager.selectObject(this);

      StateManager.selectedObjects.forEach((obj) => {
        if (obj instanceof NodeWrapper) {
          obj.enableDragDropShadow();
        }
      });
    }
  }

  public onDragMove(ev: Konva.KonvaEventObject<MouseEvent>) {
    if (StateManager.currentTool == Tool.Transitions) {
      this.nodeGroup.absolutePosition(this.lastPos);
      StateManager.updateTentativeTransitionHead(ev.evt.pageX, ev.evt.pageY);
    }
    else if (StateManager.currentTool === Tool.Select) {
      this.konvaObject().fire('move', ev);

      // Move all selected objects along with this one!
      const allOtherSelected = StateManager.selectedObjects.filter((i) => i !== this);
      allOtherSelected.forEach((obj) => {
        obj.konvaObject().absolutePosition({
          x: obj.konvaObject().absolutePosition().x + ev.evt.movementX,
          y: obj.konvaObject().absolutePosition().y + ev.evt.movementY
        });
        obj.konvaObject().fire('move', ev);
      });
    }
  }

  public onDragEnd() {
    if (StateManager.currentTool == Tool.States) {
      
    }
    else if (StateManager.currentTool === Tool.Transitions) {
      StateManager.endTentativeTransition();
    }
    else if (StateManager.currentTool === Tool.Select) {
      StateManager.selectedObjects.forEach((obj) => {
        if (obj instanceof NodeWrapper) {
          obj.disableShadowEffects();
        }
      });
    }
  }
  
  public konvaObject(): Konva.Node {
    return this.nodeGroup;
  }

  public get labelText(): string {
    return this._labelText;
  }

  public set labelText(value: string) {
    this._labelText = value;
    this.nodeLabel.text(this._labelText);
  }
}