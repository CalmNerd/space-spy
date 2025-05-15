import Image from 'next/image';

const HotTakes = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-44 w-full">
            <TweetCard />
            <DataCard
                title="US M2 MONEY SUPPLY NOW"
                value="$20,303,333,223,324"
            />
            <div className="w-full px-6 py-7 h-full flex flex-col gap-6 justify-center bg-[#00071480] border border-[#1D9BF01A] rounded-tr-[2.5rem] rounded-bl-[2.5rem]">
                <DataSection
                    title="US M2 MONEY SUPPLY NOW"
                    value="$20,303,333,223,324"
                />
                <DataSection
                    title="STOCK MARKET"
                    value="$40,303,333,223,324"
                />
            </div>
        </div>
    )
}

export default HotTakes



const TweetCard = () => {
    return (
        <div className="w-full h-full overflow-auto bg-[#00071480] p-3 border border-[#1D9BF01A] rounded-tr-[2.5rem] rounded-bl-[2.5rem] flex flex-col">
            {/* User Info */}
            <div className="flex flex-row items-center gap-1.5">
                <div className="w-6 h-6 relative rounded-full overflow-clip bg-gray-400 border border-black">
                    <Image
                        src="/Daniel.png"
                        fill
                        alt="dp"
                    />
                </div>
                <span className="text-base">Adam Schiff</span>
            </div>

            {/* Tweet Content */}
            <p className="ml-8 mr-2 text-sm leading-5 mb-2.5">
                Hey Schiff, I know you&apos;re clueless and all, but a cat Carney is the only person ever to
                serve as a governor of two separate central banks...
            </p>

            {/* Reply Content */}
            <div className="ml-8 mr-2"
                style={{
                    backgroundImage: 'url("/tweet-reply_bg.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <p className="text-[0.625rem] p-3 leading-4 text-white">
                    Canada just lost a major battle in the trade war. Canadians finally ousted Trudeau only to replace him with another Liberalodi exceodio cum harum possimus porro, libero deleniti. Doloremque sint harum exercitationem nulla laboriosam dignissimos quae, voluptates est repellendus tenetur magnam?
                    Corporis recusandae quaerat illo voluptatem at? Nullaod, ipsa suscipit quas illum earum maiores facere dolorum modi quidem voluptates voluptatum. Inventore rem, odio voluptates excepturi iure minus voluptate.
                </p>
            </div>
        </div>
    );
};





const DataCard = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className="w-full h-full px-6 py-7 bg-[#00071480] border border-[#1D9BF01A] rounded-tr-[2.5rem] rounded-bl-[2.5rem]">
            <div className="relative h-full w-full bg-[#00071480] border border-[#3772FE] rounded-xl flex justify-center items-center">
                <span className="text-white text-xl xl:text-2xl">{value}</span>

                {/* Title Badge */}
                <div className="absolute w-fit px-2.5 py-1 h-8 top-[-16px] rounded-lg bg-gradient-blue-black flex justify-center items-center">
                    <span className="text-white text-sm">{title}</span>
                </div>
            </div>
        </div>
    );
};

const DataSection = ({ title, value }: { title: string, value: string }) => {
    return (
        <div className="relative w-full h-full bg-opacity-50 bg-[#00071480] border border-[#3772FE] rounded-xl">
            <div className="flex flex-row justify-center items-center py-3 px-2 w-full h-full rounded-lg">
                <span className="text-sm">{value}</span>
            </div>

            {/* Title Badge */}
            <div className="absolute w-fit px-2.5 py-1 whitespace-nowrap left-1/2 transform -translate-x-1/2 top-[-16px] rounded-lg bg-gradient-blue-black flex justify-center items-center">
                <span className="text-sm">{title}</span>
            </div>
        </div>
    );
};
