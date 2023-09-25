import { v4 as uuidv4 } from 'uuid';

export default class TokenWrapper {
    public symbol: string
    
    private readonly _creationId: string
    public get creationId() {
        return this._creationId;
    }

    constructor() {
        this._creationId = uuidv4();
    }
}