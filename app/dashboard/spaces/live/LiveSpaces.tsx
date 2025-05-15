"use client";
import { ChevronRight } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState, useEffect, useRef } from "react"

const LiveSpaces = () => {
    const [premiumUser, setPremiumUser] = useState(false)
    const tableRef = useRef<HTMLDivElement>(null)
    const [promptStyle, setPromptStyle] = useState({})

    useEffect(() => {
        const updatePromptPosition = () => {
            if (!premiumUser && tableRef.current) {
                const table = tableRef.current
                const coinsColumnIndex = 3
                const headerRow = table.querySelector('thead tr')
                const coinsCell = headerRow ? headerRow.children[coinsColumnIndex] : null

                if (coinsCell) {
                    const rect = coinsCell.getBoundingClientRect()
                    const tableRect = table.getBoundingClientRect()
                    const left = rect.left - tableRect.left
                    const width = rect.width

                    setPromptStyle({
                        top: '40px',
                        left: `${left}px`,
                        width: `${width}px`,
                        height: `calc(100% - 50px)`,
                        backgroundImage: 'url(/premium_coin_mentioned_bg.svg)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backdropFilter: 'blur(4px)',
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    })
                }
            }
        }

        updatePromptPosition()
        window.addEventListener('resize', updatePromptPosition)
        return () => window.removeEventListener('resize', updatePromptPosition)
    }, [premiumUser])

    return (
        <div className="flex gap-4">
            <div className="flex-1 rounded-lg overflow-hidden relative" ref={tableRef}>
                <table className="w-full">
                    <colgroup>
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '15%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                        <tr className="text-xs">
                            <th className="text-center p-2 font-medium">Title</th>
                            <th className="text-center p-2 font-medium">Hosts</th>
                            <th className="text-center p-2 font-medium">Speakers</th>
                            <th className="text-center p-2 font-medium">Coins mentioned</th>
                            <th className="text-center p-2 font-medium">Listeners</th>
                            <th className="text-center p-2 font-medium">Monitored at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            "Memes & The Market Morning show - #Btc 59k - $pepe 🐸",
                            "Crypto Breakfast Club - Where Winners Eat FREE!",
                            "ARE WE BACK?! #9 on Coffee with Captain #884",
                            "Memecoin Mornin: We Are Back",
                            "Crypto x AI Weekly: DePAI and Robotics",
                            "CRYPTO SENDING 🚀",
                            "ARE WE BACK?! #9 on Coffee with Captain #884",
                            "How zkTLS Is Powering the Next Wave of Consumer Crypto",
                            "How zkTLS Is Powering the Next Wave of Consumer Crypto",
                        ].map((title, index) => (
                            <tr key={index} className="text-sm">
                                <td className="p-2">
                                    <div className="flex items-center gap-1">
                                        <span>{title}</span>
                                    </div>
                                </td>
                                <td className="p-2 ">
                                    <div className="flex -space-x-1 items-center justify-center">
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Host" width={24} height={24} />
                                        </Avatar>
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Host" width={24} height={24} />
                                        </Avatar>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="flex -space-x-1 items-center justify-center">
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Speaker" width={24} height={24} />
                                        </Avatar>
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Speaker" width={24} height={24} />
                                        </Avatar>
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Speaker" width={24} height={24} />
                                        </Avatar>
                                        <span className="w-6 h-6 shadow-[0_0_0_1px_#27272A] text-[0.625rem] text-[#9ca3af] rounded-full inline-flex items-center justify-center bg-black">+3</span>
                                    </div>
                                </td>
                                <td className="p-2">
                                    {premiumUser && (
                                        <div className="flex items-center justify-center -space-x-1">
                                            <Avatar className="w-6 h-6 border rounded-full border-[#1b1b20] bg-[#f7931a]">
                                                <div className="w-full h-full flex items-center justify-center text-xs">₿</div>
                                            </Avatar>
                                            <Avatar className="w-6 h-6 border rounded-full border-[#1b1b20] bg-[#0098ff]">
                                                <div className="w-full h-full flex items-center justify-center text-xs">A</div>
                                            </Avatar>
                                            <span className="w-6 h-6 border text-[0.625rem] text-[#9ca3af] rounded-full inline-flex items-center justify-center bg-black">+3</span>
                                        </div>
                                    )}
                                </td>
                                <td className="p-2 text-center">322</td>
                                <td className="p-2 text-center">35 minutes ago</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!premiumUser && (
                    <div
                        className="absolute flex flex-col items-center justify-center"
                        style={promptStyle}
                    >
                        <div className="space-y-3 text-center">
                            <span className="inline-block text-[0.5625rem]">
                                🔒 Want to see live data?
                            </span>
                            <span className="text-[0.5rem] block">
                                Unlock real-time coin mentions, stay ahead of market trends,
                                and get instant insights into what&apos;s hot right now. Don’t miss
                                out on the next breakout—premium gives you the edge.
                            </span>
                            <button
                                className="border border-[#0098FF80] text-[#3772FE] py-1 px-4 text-[0.5rem] bg-[linear-gradient(267.97deg,_#03268B_19.35%,_#000212_100%)] rounded-tl-2xl rounded-br-2xl cursor-pointer"
                                onClick={() => setPremiumUser(true)}
                            >
                                Upgrade to premium
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-center gap-2 p-3">
                    <Button className="bg-gradient-to-b from-[#03268B] to-[#000212] text-white h-8 w-8 p-0 rounded-sm">1</Button>
                    <Button
                        variant="outline"
                        className="bg-transparent rounded-sm h-8 w-8 p-0 border-none text-white"
                    >
                        2
                    </Button>
                    <span className="text-[#9ca3af]">...</span>
                    <Button
                        variant="outline"
                        className="bg-transparent border-none text-white h-8 w-8 p-0"
                    >
                        88
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-transparent border-none text-white h-8"
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LiveSpaces