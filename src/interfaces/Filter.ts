export enum FilterTab {
    PLAYER = "PLAYER",
    CONSUMABLE = "CONSUMABLE"
}

export abstract class Filter {
    id: string;
    abstract type: FilterTab;

    constructor(id: string) {
        this.id = id;
    }

    abstract getSearchParameters();
}