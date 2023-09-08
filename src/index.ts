import Konva from 'konva';

class NodeWrapper {
  constructor(
    public nodeBackground: Konva.Circle,
    public nodeLabel: Konva.Text,
    public nodeGroup: Konva.Group
  ) {}

  public startDraggingNode() {
    console.log('start dragging node');
  }

  public stopDraggingNode() {
    console.log('stop dragging node');
  }
}

var nodeWrappers: Array<NodeWrapper> = [];

// first we need to create a stage
var stage = new Konva.Stage({
  container: 'graphics-container',   // id of container <div>
  width: window.innerWidth,
  height: window.innerHeight
});
stage.on('dblclick', addStateAtDoubleClickPos);

// then create layer
var nodeLayer = new Konva.Layer();

function addStateAtDoubleClickPos(evt: Konva.KonvaEventObject<MouseEvent>) {
  console.log(evt.evt);
  const x = evt.evt.clientX;
  const y = evt.evt.clientY;
  const newStateWrapper = makeState(x, y);

  nodeLayer.add(newStateWrapper.nodeGroup);
}

function makeState(x: number, y: number): NodeWrapper {
  var nodeGroup = new Konva.Group({x: x, y: y});

  // create our shape
  var circle = new Konva.Circle({
    x: 0,
    y: 0,
    radius: 30,
    fill: 'white',
    stroke: 'black',
    strokeWidth: 2
  });

  var label = new Konva.Text({
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

  nodeGroup.add(circle);
  nodeGroup.add(label);

  const nodeWrapper = new NodeWrapper(circle, label, nodeGroup);

  nodeGroup.draggable(true);

  nodeGroup.on('dragstart', nodeWrapper.startDraggingNode);
  nodeGroup.on('dragend', nodeWrapper.stopDraggingNode);

  nodeWrappers.push(nodeWrapper);

  return nodeWrapper;
}

// add the layer to the stage
stage.add(nodeLayer);

// draw the image
nodeLayer.draw();

function onKeyDown(ev: KeyboardEvent) {

}

function onKeyUp(ev: KeyboardEvent) {

}

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);