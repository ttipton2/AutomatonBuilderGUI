import Konva from "konva";
import NodeWrapper from "./NodeWrapper";
import SelectableObject from "./SelectableObject";

export default class TransitionWrapper extends SelectableObject {
    public static readonly ExtraTransitionArrowPadding = 5;

    private arrowObject: Konva.Arrow;
    public konvaGroup: Konva.Group;

    private sourceNode: NodeWrapper;
    private destNode: NodeWrapper;

    constructor(sourceNode: NodeWrapper, destNode: NodeWrapper) {
        super();
        this.sourceNode = sourceNode;
        this.destNode = destNode;

        this.konvaGroup = new Konva.Group();

        this.arrowObject = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [0, 0, 0, 0],
            stroke: 'black',
            fill: 'black',
            strokeWidth: 5,
            lineJoin: 'round',
            pointerLength: 10,
            pointerWidth: 10,
        });

        this.konvaGroup.add(this.arrowObject);

        this.updatePoints();

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
        let xUnitTowardsSrc =  xDestRelativeToSrc / magnitude * newMag;
        let yUnitTowardsSrc = yDestRelativeToSrc / magnitude * newMag;

        this.arrowObject.points([
            srcPos.x,
            srcPos.y,
            dstPos.x - xUnitTowardsSrc,
            dstPos.y - yUnitTowardsSrc
        ]);
    }

    public involvesNode(node: NodeWrapper): boolean {
        return this.sourceNode === node || this.destNode === node;
    }

    public select(): void {
        
    }

    public deselect(): void {
        
    }

    public konvaObject(): Konva.Node {    
        return this.konvaGroup;
    }

    public deleteKonvaObjects(): void {
        this.konvaGroup.destroy();
    }
}