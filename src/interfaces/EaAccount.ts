import { Filter } from "./Filter";

export enum EaAccountStatus {
    DISCONNECTED = 1,
    CONNECTED = 2,
    RUNNING = 3
}

export default interface EaAccount {
    owner: string;
    email: string;
    coinsEarned: number;
    filters: Filter[];
    selectedFilter: string | null;
    status: EaAccountStatus;
}