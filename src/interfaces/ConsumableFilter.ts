import { Filter, FilterTab } from "./Filter";

export class ConsumableFilter extends Filter {
    type: FilterTab;
    quality: string | null | undefined;
    chemType: string | null | undefined;

    constructor(id: string, chemType: string | null | undefined, quality: string | null | undefined) {
        super(id);
        this.type = FilterTab.CONSUMABLE;
        this.chemType = chemType;
        this.quality = quality;
    }

    getSearchParameters() {
        return {
            item_player: 'consumalbe',
            level: this.quality,
            play_style: this.chemType
        };
    }
}