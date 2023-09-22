export default class TokenWrapper {
    private static currentCreationId = 0;
    public symbol: string
    
    private readonly _creationId: number
    public get creationId() {
        return this._creationId;
    }

    constructor() {
        this._creationId = TokenWrapper.currentCreationId;
        TokenWrapper.currentCreationId += 1;
    }
}