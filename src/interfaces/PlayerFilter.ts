import { Filter, FilterTab } from "./Filter";

export class PlayerFilter extends Filter {
    type: FilterTab;
    name: string | null | undefined;
    chemType: string | null | undefined;
    position: string | null | undefined;
    nation: string | null | undefined;
    league: string | null | undefined;
    club: string | null | undefined;
    quality: string | null | undefined;

    constructor(id: string, 
                name: string | null | undefined , 
                quality: string | null | undefined, 
                chemType: string | null | undefined, 
                position: string | null | undefined, 
                nation: string | null | undefined, 
                league: string | null | undefined, 
                club: string | null | undefined) {
        super(id);
        this.type = FilterTab.PLAYER;
        this.name = name;
        this.quality = quality;
        this.chemType = chemType;
        this.position = position;
        this.nation = nation;
        this.league = league;
        this.club = club;
    }

    getSearchParameters() {
        return {
            item_player: 'player',
            level: this.quality,
            league: this.league,
            club: this.club,
            position: this.position,
            nationality: this.nation,
            play_style: this.chemType
        };
    }
}