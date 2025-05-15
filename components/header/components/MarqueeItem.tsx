import { MarqueeItemTypes } from "@/types/header";

interface MarqueeItemProps {
    item: MarqueeItemTypes;
}

export function MarqueeItem({ item }: MarqueeItemProps) {
    const renderSpeakingCard = () => (
        <div className="flex flex-row items-center p-1 mx-1 gap-5 h-7 bg-gradient-blue-black rounded-full">
            <div className="flex items-center gap-1 z-0">
                <div className="w-6 h-6 rounded-full border border-black overflow-hidden">
                    <img src={item.content.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-[0.625rem] font-semibold">{item.content.username} is speaking</div>
            </div>
            <div className="flex flex-row items-center gap-0.5 z-1 mr-1">
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse"></div>
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse delay-75"></div>
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse delay-150"></div>
            </div>
        </div>
    );

    const renderHostingCard = () => (
        <div className="flex flex-row items-center p-1 mx-1 gap-5 h-7 bg-gradient-blue-black rounded-md">
            <div className="flex items-center gap-1 z-0">
                <div className="w-6 h-6 rounded-sm border border-black overflow-hidden bg-amber-500">
                    <img src={item.content.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-[0.625rem] font-semibold">{item.content.username} is hosting</div>
            </div>
            <div className="flex flex-row items-center gap-0.5 z-1 mr-1">
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse"></div>
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse delay-75"></div>
                <div className="w-0.5 h-1.5 bg-gray-300 rounded-sm animate-pulse delay-150"></div>
            </div>
        </div>
    );

    const renderGroupCard = () => (
        <div className="flex flex-row items-center p-1 mx-1 gap-1 h-7 bg-opacity-20 bg-gradient-blue-black rounded-full">
            <div className="flex items-center gap-6 z-0 relative">
                <div className="relative w-full h-6">
                    {item.content.avatars && item.content.avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className="absolute top-0 w-6 h-6 rounded-full border border-black overflow-hidden"
                            style={{ left: `${index * 15}px`, zIndex: index * 10 }}
                        >
                            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
                <div className="flex items-center pr-2 whitespace-nowrap ml-8 gap-2">
                    <span className="text-[0.625rem] font-semibold text-[#6CA0F6]">+{item.content.count}</span>
                    <span className="ml-1 text-[0.625rem] font-semibold marquee-group-text-gradient">{item.content.label}</span>
                </div>
            </div>
        </div>
    );

    switch (item.type) {
        case "user":
            return item.subtype === "speaking" ? renderSpeakingCard() : renderHostingCard();
        case "group":
            return renderGroupCard();
        default:
            return null;
    }
}