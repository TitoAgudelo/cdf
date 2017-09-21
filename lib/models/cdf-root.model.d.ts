export declare class CdfRootModel {
    Guid: string;
    Id: string;
    Type: string;
    Title: string;
    Description: string;
    Body: string;
    constructor(id?: string, type?: string, title?: string, description?: string, body?: string);
    OnClick(): void;
    private guid();
}
