import { cn } from "@/lib/utils";
import { CoinData } from "@/types/header";

interface CoinItemProps {
    coin: CoinData;
}

export function CoinItem({ coin }: CoinItemProps) {
    return (
        <div
            className="flex items-center space-x-2 text-sm border border-[#083E6D] p-1 bg-[#1D9BF01A]"
        >
            <div className="flex items-center space-x-1">
                <span className="text-white">#{coin.id}</span>
                <div className="w-0.5 h-3 bg-[#3A3A4466]" />
                <div className="w-5 h-5 flex items-center justify-center">
                    <img src={coin.icon} alt={`${coin.symbol} icon`} className="w-full h-full rounded-full" />
                </div>
                <span className="text-white">{coin.symbol}</span>
            </div>
            <div className="w-0.5 h-3 bg-[#3A3A4466]" />
            <span className="text-white">{coin.mentions} Mentions</span>
            <span
                className={cn(
                    "",
                    coin.changeType === "positive"
                        ? "text-green-500"
                        : coin.changeType === "negative"
                            ? "text-red-500"
                            : "text-[#6CA0F6]"
                )}
            >
                {coin.change}
            </span>
        </div>
    );
}