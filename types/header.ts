export interface CoinData {
    id: number;
    symbol: string;
    mentions: number;
    change: string;
    changeType: "positive" | "negative" | "neutral";
    icon: string;
}

export interface MarqueeItemTypes {
    id: number;
    type: "user" | "tag" | "group";
    subtype?: "speaking" | "hosting";
    content: {
        username?: string;
        avatar?: string;
        avatars?: string[];
        count?: number;
        label?: string;
        info?: string;
    };
}

export interface HeaderData {
    topCoins: CoinData[];
    marqueeItems: MarqueeItemTypes[];
    showSearch: boolean;
    showCoinsButton: boolean;
}