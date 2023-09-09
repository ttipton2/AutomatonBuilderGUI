import NodeWrapper from "./NodeWrapper";
import { Tool } from "./Tool";
import Konva from "konva";
import TransitionWrapper from "./TransitionWrapper";

export default class StateManager {
    private static _startNode: NodeWrapper | null = null;
    private static _nodeWrappers: Array<NodeWrapper> = [];
    private static _transitionWrappers: Array<TransitionWrapper> = [];

    private static _tentativeTransitionSource: NodeWrapper | null = null;
    private static _tentativeTransitionTarget: NodeWrapper | null = null;

    private static _currentTool: Tool = Tool.States;

    private static _stage: Konva.Stage | null = null;
    private static _tentConnectionLine: Konva.Arrow | null = null;
    private static _startStateLine: Konva.Arrow | null = null;
    private static _nodeLayer: Konva.Layer | null = null;
    private static _transitionLayer: Konva.Layer | null = null;

    private constructor() {
    }

    public static initialize() {
        this._startNode = null;
        this._nodeWrappers = [];
        this._transitionWrappers = [];

        Konva.hitOnDragEnabled = true;

        this._stage = new Konva.Stage({
            container: 'graphics-container',
            width: window.innerWidth,
            height: window.innerHeight
        });
        this._stage.on('dblclick', this.onDoubleClick);

        this._nodeLayer = new Konva.Layer();
        this._transitionLayer = new Konva.Layer();

        this._tentConnectionLine = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [0, 0, 20, 40],
            stroke: 'red',
            fill: 'red',
            strokeWidth: 5,
            lineJoin: 'round',
            dash: [20, 20],
            pointerLength: 10,
            pointerWidth: 10,
            visible: false
        });
        this._transitionLayer.add(this._tentConnectionLine);

        this._startStateLine = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [
                -100, 0, 0 - NodeWrapper.NodeRadius - TransitionWrapper.ExtraTransitionArrowPadding, 0
            ],
            stroke: 'black',
            fill: 'black',
            strokeWidth: 5,
            lineJoin: 'round',
            pointerLength: 10,
            pointerWidth: 10,
        });
        this._transitionLayer.add(this._startStateLine);

        this._stage.add(this._transitionLayer);
        this._stage.add(this._nodeLayer);

        addEventListener('keydown', this.onKeyDown);
        addEventListener('keyup', this.onKeyUp);
    }

    public static get currentTool() {
        return StateManager._currentTool;
    }

    public static set currentTool(tool: Tool) {
        StateManager._currentTool = tool;
    }

    private static onDoubleClick(evt: Konva.KonvaEventObject<MouseEvent>) {
        if (StateManager.currentTool == Tool.States) {
            StateManager.addStateAtDoubleClickPos(evt);
        }
        else if (StateManager.currentTool == Tool.Transitions) {
            console.log('in transition tool mode, so don\'t do anything');
        }
    }

    private static addStateAtDoubleClickPos(evt: Konva.KonvaEventObject<MouseEvent>) {
        const x = evt.evt.pageX;
        const y = evt.evt.pageY;
        const newStateWrapper = new NodeWrapper(x, y);

        StateManager._nodeWrappers.push(newStateWrapper);

        StateManager._nodeLayer.add(newStateWrapper.nodeGroup);

        if (StateManager._startNode === null) {
            StateManager.makeStateIntoStartState(newStateWrapper);
        }
    }

    public static makeStateIntoStartState(node: NodeWrapper) {
        console.log('make', node, 'into start state');
        if (StateManager._startNode) {
            StateManager._startNode.nodeGroup.off('dragmove.startstate');
        }
        StateManager._startNode = node;

        node.nodeGroup.on('dragmove.startstate', (ev) => StateManager.updateStartNodePosition());
        StateManager.updateStartNodePosition();
    }

    private static updateStartNodePosition() {
        StateManager._startStateLine.absolutePosition(StateManager._startNode.nodeGroup.absolutePosition());
    }

    private static onKeyDown(ev: KeyboardEvent) {
        if (ev.code === "KeyS") {
            StateManager.currentTool = Tool.States;
        }
        else if (ev.code === "KeyT") {
            StateManager.currentTool = Tool.Transitions;
        }
        else if (ev.code === "KeyA") {
            StateManager.currentTool = Tool.SetAccept;
        }
    }

    private static onKeyUp(ev: KeyboardEvent) {

    }

    public static startTentativeTransition(sourceNode: NodeWrapper) {
        StateManager._tentativeTransitionSource = sourceNode;
        StateManager._tentConnectionLine.visible(true);
        StateManager._tentConnectionLine.setAbsolutePosition(sourceNode.nodeGroup.absolutePosition());
    }

    public static updateTentativeTransitionHead(x: number, y: number) {
        let srcPos = StateManager._tentativeTransitionSource.nodeGroup.absolutePosition();
        if (StateManager.tentativeTransitionTarget === null) {
            let xDelta = x - srcPos.x;
            let yDelta = y - srcPos.y;
            StateManager._tentConnectionLine.points([0, 0, xDelta, yDelta]);
            return;
        }

        // There's a node being targeted, so let's find the point the arrow
        // should point to!
        let dstPos = StateManager.tentativeTransitionTarget.nodeGroup.absolutePosition();
        
        let xDestRelativeToSrc = dstPos.x - srcPos.x;
        let yDestRelativeToSrc = dstPos.y - srcPos.y;

        let magnitude = Math.sqrt(xDestRelativeToSrc * xDestRelativeToSrc + yDestRelativeToSrc * yDestRelativeToSrc);

        let newMag = NodeWrapper.NodeRadius + TransitionWrapper.ExtraTransitionArrowPadding;
        let xUnitTowardsSrc =  xDestRelativeToSrc / magnitude * newMag;
        let yUnitTowardsSrc = yDestRelativeToSrc / magnitude * newMag;

        // Ok, now we have a vector relative to the destination.
        // We need to get this vector relative to the source.

        StateManager._tentConnectionLine.points([0, 0, xDestRelativeToSrc - xUnitTowardsSrc, yDestRelativeToSrc - yUnitTowardsSrc]);
    }

    public static endTentativeTransition() {
        if (StateManager._tentativeTransitionSource !== null && StateManager.tentativeTransitionTarget !== null) {
            console.log("Create a new transition wrapper!");
            const newTransitionWrapper = new TransitionWrapper(StateManager._tentativeTransitionSource, StateManager._tentativeTransitionTarget);
            StateManager._transitionWrappers.push(newTransitionWrapper);
            StateManager._transitionLayer.add(newTransitionWrapper.konvaGroup);
            StateManager._transitionLayer.draw();
        }

        StateManager._tentativeTransitionSource?.disableNewConnectionGlow();
        StateManager._tentativeTransitionTarget?.disableNewConnectionGlow();

        StateManager._tentativeTransitionSource = null;
        StateManager._tentativeTransitionTarget = null;
        StateManager._tentConnectionLine.visible(false);
    }

    public static get tentativeTransitionInProgress() {
        return StateManager._tentativeTransitionSource !== null;
    }

    public static get tentativeTransitionTarget() {
        return StateManager._tentativeTransitionTarget;
    }

    public static set tentativeTransitionTarget(newTarget: NodeWrapper | null) {
        StateManager._tentativeTransitionTarget = newTarget;
    }

}