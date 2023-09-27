import { v4 as uuidv4 } from 'uuid';

export default class TokenWrapper {
    public symbol: string
    
    private readonly _id: string
    public get id() {
        return this._id;
    }

    constructor() {
        this._id = uuidv4();
    }

    public toJSON() {
        return {
            id: this.id,
            symbol: this.symbol
        };
    }
}