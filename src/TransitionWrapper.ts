import Konva from "konva";
import NodeWrapper from "./NodeWrapper";
import SelectableObject from "./SelectableObject";
import StateManager from "./StateManager";
import { Tool } from "./Tool";
import TokenWrapper from "./TokenWrapper";

export default class TransitionWrapper extends SelectableObject {
    public static readonly ExtraTransitionArrowPadding = 5;

    private static readonly SelectedArrowColor = 'red';
    private static readonly ArrowColor = 'black';

    private arrowObject: Konva.Arrow;
    private labelObject: Konva.Text;
    private labelCenterDebugObject: Konva.Circle;
    public konvaGroup: Konva.Group;

    private sourceNode: NodeWrapper;
    private destNode: NodeWrapper;

    private tokens: Set<TokenWrapper>;

    constructor(sourceNode: NodeWrapper, destNode: NodeWrapper) {
        super();
        this.sourceNode = sourceNode;
        this.destNode = destNode;
        this.tokens = new Set<TokenWrapper>();

        this.konvaGroup = new Konva.Group();

        this.arrowObject = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [0, 0, 0, 0],
            stroke: TransitionWrapper.ArrowColor,
            fill: TransitionWrapper.ArrowColor,
            strokeWidth: 5,
            lineJoin: 'round',
            pointerLength: 10,
            pointerWidth: 10,
        });

        this.labelCenterDebugObject = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 3,
            fill: 'magenta'
        });

        this.labelObject = new Konva.Text({
            x: 0,
            y: 0,
            align: 'center',
            verticalAlign: 'middle',
            text: 'label here',
            fontSize: 20,
            fill: 'green',
        });

        this.konvaGroup.add(this.arrowObject);
        this.konvaGroup.add(this.labelCenterDebugObject);
        this.konvaGroup.add(this.labelObject);

        this.updatePoints();

        this.konvaGroup.on('click', (ev) => this.onClick.call(this, ev));
        this.sourceNode.nodeGroup.on('move.transition', (ev) => this.updatePoints.call(this));
        this.destNode.nodeGroup.on('move.transition', (ev) => this.updatePoints.call(this));
    }

    public updatePoints() {
        let srcPos = this.sourceNode.nodeGroup.absolutePosition();
        let dstPos = this.destNode.nodeGroup.absolutePosition();

        let xDestRelativeToSrc = dstPos.x - srcPos.x;
        let yDestRelativeToSrc = dstPos.y - srcPos.y;

        let magnitude = Math.sqrt(xDestRelativeToSrc * xDestRelativeToSrc + yDestRelativeToSrc * yDestRelativeToSrc);

        let newMag = NodeWrapper.NodeRadius + TransitionWrapper.ExtraTransitionArrowPadding;
        let xUnitTowardsSrc = xDestRelativeToSrc / magnitude * newMag;
        let yUnitTowardsSrc = yDestRelativeToSrc / magnitude * newMag;

        this.arrowObject.points([
            srcPos.x,
            srcPos.y,
            dstPos.x - xUnitTowardsSrc,
            dstPos.y - yUnitTowardsSrc
        ]);

        // calculate center of transition line, for label
        const xAvg = ((srcPos.x + xUnitTowardsSrc) + (dstPos.x - xUnitTowardsSrc)) / 2;
        const yAvg = ((srcPos.y + yUnitTowardsSrc) + (dstPos.y - yUnitTowardsSrc)) / 2;

        const xCenter = xAvg;// - this.labelObject.getTextWidth() / 2;
        const yCenter = yAvg;
        this.labelObject.x(xCenter);
        this.labelObject.y(yCenter);

        this.labelCenterDebugObject.position({x: xCenter, y: yCenter});
    }

    public involvesNode(node: NodeWrapper): boolean {
        return this.sourceNode === node || this.destNode === node;
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

    public select(): void {
        this.arrowObject.fill(TransitionWrapper.SelectedArrowColor);
        this.arrowObject.stroke(TransitionWrapper.SelectedArrowColor);
    }

    public deselect(): void {
        this.arrowObject.fill(TransitionWrapper.ArrowColor);
        this.arrowObject.stroke(TransitionWrapper.ArrowColor);
    }

    public konvaObject(): Konva.Node {
        return this.konvaGroup;
    }

    public deleteKonvaObjects(): void {
        this.konvaGroup.destroy();
    }

    public addToken(tok: TokenWrapper) {
        this.tokens.add(tok);
    }

    public removeToken(tok: TokenWrapper) {
        this.tokens.delete(tok);
    }
}