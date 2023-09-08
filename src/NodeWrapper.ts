import Konva from 'konva';
import StateManager from './StateManager';
import { Tool } from './Tool';
import { Vector2d } from 'konva/lib/types';

export default class NodeWrapper {
  private nodeBackground: Konva.Circle;
  private nodeLabel: Konva.Text;
  public nodeGroup: Konva.Group;

  private lastPos: Vector2d;

  constructor(x: number, y: number) {
    this.nodeGroup = new Konva.Group({ x: x, y: y });

    // create our shape
    this.nodeBackground = new Konva.Circle({
      x: 0,
      y: 0,
      radius: 30,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2
    });
  
    this.nodeLabel = new Konva.Text({
      x: -30,
      y: -30,
      width: 60,
      height: 60,
      align: 'center',
      verticalAlign: 'middle',
      text: 'q0',
      fontSize: 30,
      fill: 'black',
    });
  
    this.nodeGroup.add(this.nodeBackground);
    this.nodeGroup.add(this.nodeLabel);

    this.nodeGroup.draggable(true);

    // TODO: figure out how to get this to activate when in drag operation
    // https://konvajs.org/docs/drag_and_drop/Drop_Events.html
    this.nodeGroup.on('mouseenter', (ev) => this.onMouseEnter.call(this, ev));

    this.nodeGroup.on('dragstart', (ev) => this.onDragStart.call(this, ev));
    this.nodeGroup.on('dragmove', (ev) => this.onDragMove.call(this, ev));
    this.nodeGroup.on('dragend', (ev) => this.onDragEnd.call(this, ev));
  }

  public onMouseEnter(ev: Konva.KonvaEventObject<MouseEvent>) {
    console.log('mosue enter!!');
  }

  public onDragStart(ev: Konva.KonvaEventObject<MouseEvent>) {
    this.lastPos = this.nodeGroup.absolutePosition();
    console.log(ev);
    
    console.log(`start dragging node while in mode ${StateManager.currentTool}`);

    if (StateManager.currentTool === Tool.Transitions) {
      StateManager.startTentativeTransition(this);
    }
  }

  public onDragMove(ev: Konva.KonvaEventObject<MouseEvent>) {
    if (StateManager.currentTool == Tool.Transitions) {
      this.nodeGroup.absolutePosition(this.lastPos);
      StateManager.updateTentativeTransitionHead(ev.evt.pageX, ev.evt.pageY);
      ev.evt.preventDefault();
      // TODO: Update tentative transition
    }
  }

  public onDragEnd() {
    if (StateManager.currentTool === Tool.Transitions) {
      // TODO: Cancel tentative transition
    }
  }
}

export function makeState(x: number, y: number): NodeWrapper {
  const nodeWrapper = new NodeWrapper(x, y);
  return nodeWrapper;
}