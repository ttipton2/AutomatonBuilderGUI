import { v4 as uuidv4 } from 'uuid';

export default class TokenWrapper {
    public symbol: string
    
    private readonly _id: string
    public get id() {
        return this._id;
    }

    constructor(symbol: string | null = null, id: string | null = null) {
        this._id = id ?? uuidv4();
        this.symbol = symbol ?? '';
    }

    public toJSON() {
        return {
            id: this.id,
            symbol: this.symbol
        };
    }
}