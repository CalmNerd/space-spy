import { ChevronRight } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const MoniteredSpaces = () => {
    return (
        <div className="flex gap-4">
            <div className="flex-1 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="text-xs">
                            <th className="text-left p-3 font-medium">Title</th>
                            <th className="text-left p-3 font-medium">Hosts</th>
                            <th className="text-left p-3 font-medium">Speakers</th>
                            <th className="text-left p-3 font-medium">Coins mentioned</th>
                            <th className="text-left p-3 font-medium">Listeners</th>
                            <th className="text-left p-3 font-medium">Monitored at</th>
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
                            <tr key={index} className=" text-sm">
                                <td className="p-3">
                                    <div className="flex items-center gap-1">
                                        <span>{title}</span>
                                        {/* {index === 0 && <span className="text-[#30bd5a]">🐸</span>}
                                                    {index === 5 && <span className="text-[#0098ff]">🚀</span>} */}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex -space-x-1">
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Host" width={24} height={24} />
                                        </Avatar>
                                        <Avatar className="w-6 h-6 rounded-full shadow-[0_0_0_1px_#27272A]">
                                            <Image src="/Daniel.png?height=24&width=24" alt="Host" width={24} height={24} />
                                        </Avatar>
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="flex -space-x-1">
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
                                <td className="p-3">
                                    <div className="flex -space-x-1">
                                        <Avatar className="w-6 h-6 border rounded-full border-[#1b1b20] bg-[#f7931a]">
                                            <div className="w-full h-full flex items-center justify-center text-xs">₿</div>
                                        </Avatar>
                                        <Avatar className="w-6 h-6 border rounded-full border-[#1b1b20] bg-[#0098ff]">
                                            <div className="w-full h-full flex items-center justify-center text-xs">A</div>
                                        </Avatar>
                                        <span className="w-6 h-6 border text-[0.625rem] text-[#9ca3af] rounded-full inline-flex items-center justify-center bg-black">+3</span>
                                    </div>
                                </td>
                                <td className="p-3">322</td>
                                <td className="p-3 text-[#9ca3af]">35 minutes ago</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex items-center justify-center gap-2 p-3">
                    <button className="bg-gradient-blue-black h-8 w-8 p-0 rounded-sm">1</button>
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

export default MoniteredSpaces
