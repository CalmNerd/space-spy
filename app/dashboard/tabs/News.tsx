
const News = () => {
    return (
        <div className="h-44 w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-[#1D9BF01A] bg-[#00071480] rounded-tr-[2.5rem] rounded-bl-[2.5rem] py-4 px-6 flex flex-col">
                <div className="flex-grow flex flex-col gap-3">
                    <span className="text-sm text-[#3772FE]">JUST IN</span>
                    <span className="text-sm text-[#C7C7D7] font-light line-clamp-3 min-h-[3.75rem]">
                        JUST IN: 🇺🇸 President Trump says &ldquo;we&apos;re going to be able to substantially lower
                        taxes&rdquo; on Americans because of tariffs.
                    </span>
                    <span className="text-sm text-[#3772FE] font-semibold">https://t.co/SO6sKeJzl7</span>
                </div>
                <div className="border-t border-[#3A3A4466] w-full flex items-center justify-between pt-2.5 mt-2">
                    <div className="text-xs font-bold text-[#C7C7D7]">General News</div>
                    <div className="text-xs font-medium text-[#C7C7D7]">4 hours</div>
                </div>
            </div>
            <div className="border border-[#1D9BF01A] bg-[#00071480] rounded-tr-[2.5rem] rounded-bl-[2.5rem] py-4 px-6 flex flex-col">
                <div className="flex-grow flex flex-col gap-3">
                    <span className="text-sm text-[#3772FE]">JUST IN</span>
                    <span className="text-sm text-[#C7C7D7] font-light line-clamp-3 min-h-[3.75rem]">
                        JUST IN: 🇺🇸 🇨🇳 White House says there will be no unilateral reduction in tariffs
                        against China.
                    </span>
                    <span className="text-sm text-[#3772FE] font-semibold">https://t.co/SO6sKeJzl7</span>
                </div>
                <div className="border-t border-[#3A3A4466] w-full flex items-center justify-between pt-2.5 mt-2">
                    <div className="text-xs font-bold text-[#C7C7D7]">General News</div>
                    <div className="text-xs font-medium text-[#C7C7D7]">5 hours</div>
                </div>
            </div>
            <div className="border border-[#1D9BF01A] bg-[#00071480] rounded-tr-[2.5rem] rounded-bl-[2.5rem] py-4 px-6 flex flex-col">
                <div className="flex-grow flex flex-col gap-3">
                    <span className="text-sm text-[#3772FE]">JUST IN</span>
                    <span className="text-sm text-[#C7C7D7] font-light line-clamp-3 min-h-[3.75rem]">
                        JUST IN: 🇺🇸 President Trump says &ldquo;we&apos;re going to be able to substantially lower
                        taxes&rdquo; on Americans because of tariffs. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, commodi.
                    </span>
                    <span className="text-sm text-[#3772FE] font-semibold">https://t.co/SO6sKeJzl7</span>
                </div>
                <div className="border-t border-[#3A3A4466] w-full flex items-center justify-between pt-2.5 mt-2">
                    <div className="text-xs font-bold text-[#C7C7D7]">General News</div>
                    <div className="text-xs font-medium text-[#C7C7D7]">6 hours</div>
                </div>
            </div>
        </div>
    )
}

export default News
