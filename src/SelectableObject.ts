import Konva from "konva";

export default abstract class SelectableObject {
    public abstract select(): void;
    public abstract deselect(): void;
    public abstract konvaObject(): Konva.Node;
    public abstract deleteKonvaObjects(): void;
}