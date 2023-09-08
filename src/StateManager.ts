import NodeWrapper, { makeState } from "./NodeWrapper";
import { Tool } from "./Tool";
import Konva from "konva";

export default class StateManager {
    private static _nodeWrappers: Array<NodeWrapper> = [];

    private static _nodeWrapperSourceForTentConn: NodeWrapper | null = null;

    private static _currentTool: Tool = Tool.States;

    private static _stage: Konva.Stage | null = null;
    private static _tentConnectionLine: Konva.Arrow | null = null;
    private static _nodeLayer: Konva.Layer | null = null;
    private static _transitionLayer: Konva.Layer | null = null;

    private constructor() {
    }

    public static initialize() {
        this._nodeWrappers = [];

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
        });


        this._transitionLayer.add(this._tentConnectionLine);

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
        console.log(evt.evt);
        const x = evt.evt.pageX;
        const y = evt.evt.pageY;
        const newStateWrapper = makeState(x, y);

        StateManager._nodeWrappers.push(newStateWrapper);

        StateManager._nodeLayer.add(newStateWrapper.nodeGroup);
    }

    private static onKeyDown(ev: KeyboardEvent) {
        console.log(ev.code);
        if (ev.code === "KeyS") {
            StateManager.currentTool = Tool.States;
        }
        else if (ev.code === "KeyT") {
            StateManager.currentTool = Tool.Transitions;
        }
    }

    private static onKeyUp(ev: KeyboardEvent) {

    }

    public static startTentativeTransition(sourceNode: NodeWrapper) {
        StateManager._nodeWrapperSourceForTentConn = sourceNode;
        StateManager._tentConnectionLine.setAbsolutePosition(sourceNode.nodeGroup.absolutePosition());
    }

    public static updateTentativeTransitionHead(x: number, y: number) {
        let srcPos = StateManager._nodeWrapperSourceForTentConn.nodeGroup.absolutePosition();
        let xDelta = x - srcPos.x;
        let yDelta = y - srcPos.y;
        StateManager._tentConnectionLine.points([0, 0, xDelta, yDelta]);
    }

}