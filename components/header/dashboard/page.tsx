'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SearchInput } from '@/components/ui/input'
import Marquee from 'react-fast-marquee'
import { AuthSection } from '@/components/header/components/AuthSection'
import { CoinItem } from '@/components/header/components/CoinItem'
import { MarqueeItem } from '@/components/header/components/MarqueeItem'
import { LiveButton } from '@/components/header/components/LiveButton'
import { HeaderData } from '@/types/header'
import { User } from '@/types/auth'

interface DashboardHeaderProps {
    user: User
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
    const [isCollapsed] = useState(false)
    const [data, setData] = useState<HeaderData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/header/dashboard.json')
                if (!response.ok) throw new Error('Failed to fetch data')
                const jsonData = await response.json()
                setData(jsonData)
            } catch (err) {
                setError('Error loading header data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <header
                className={cn(
                    'z-10 h-[143px] flex flex-col gap-5 pt-[21px] pb-[35px] mb-4',
                    isCollapsed ? 'lg:left-[111px]' : 'lg:left-[311px]',
                    'bg-[#000714] bg-opacity-50 border-b border-[#0C3766] backdrop-blur-lg'
                )}
            >
                <div className="px-2.5 flex justify-between items-center h-10 w-full animate-pulse">
                    <div className="hidden lg:flex gap-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-6 w-16 bg-[#1a1a2e] rounded-md" />
                        ))}
                    </div>
                    <div className="flex gap-4 items-center ml-auto">
                        <div className="h-7 w-48 bg-[#1a1a2e] rounded-md" />
                        <div className="h-7 w-7 bg-[#1a1a2e] rounded-full" />
                    </div>
                </div>

                <div className="h-8 w-full px-2.5 mt-4 flex items-center animate-pulse gap-2 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 w-48 bg-[#1a1a2e] rounded-md" />
                    ))}
                    <div className="h-6 w-6 bg-[#1a1a2e] rounded-full ml-auto" />
                </div>
            </header>
        )
    }

    if (error || !data) {
        return (
            <header
                className={cn(
                    'z-10 h-[143px] flex flex-col',
                    isCollapsed ? 'lg:left-[111px]' : 'lg:left-[311px]',
                    'left-0',
                    'bg-[#000714] bg-opacity-50 border-b border-[#0C3766] backdrop-blur-lg'
                )}
            >
                <div className="h-16 w-full flex items-center justify-center">
                    <span className="text-red-500">{error || 'No data available'}</span>
                </div>
            </header>
        )
    }

    return (
        <header
            className={cn(
                'font-geomGraphy z-40 transition-all duration-300 flex items-center justify-center flex-col gap-5 pt-[21px] pb-[35px] mb-4',
                'h-[9.25rem] flex flex-col',
                isCollapsed ? 'lg:left-[111px]' : 'lg:left-[311px]',
                'bg-[#000714] bg-opacity-50 backdrop-blur-lg'
            )}
            style={{
                backgroundImage: 'url("/dashboard/dashboard-top-nav_bg.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="w-full flex flex-col">
                <div
                    className={cn('h-10 w-full flex items-center justify-between mt-2 overflow-x-scroll hide-scrollbar', 'px-1 lg:px-2.5')}
                >
                    <div className="hidden lg:flex items-center gap-3 mr-[0.3125rem] h-7">
                        {data.topCoins.map((coin) => (
                            <CoinItem key={coin.id} coin={coin} />
                        ))}
                    </div>

                    {data.showCoinsButton && (
                        <div className="flex items-center gap-[0.3125rem] mr-3">
                            <div className="px-2.5 py-1 text-sm border border-[#083E6D] bg-[#1D9BF01A] flex items-center space-x-2">
                                <div className="w-0.5 h-3 bg-[#3A3A4466]" />
                                <span className="">Tokens</span>
                                <div className="w-0.5 h-3 bg-[#3A3A4466]" />
                            </div>
                            <div className="px-2.5 py-1 text-sm border border-[#083E6D] bg-[#1D9BF01A] flex items-center space-x-2">
                                <div className="w-0.5 h-3 bg-[#3A3A4466]" />
                                <span className="">Spaces</span>
                                <div className="w-0.5 h-3 bg-[#3A3A4466]" />
                            </div>
                        </div>
                    )}

                    <div className="flex ml-auto items-center space-x-4">
                        {data.showSearch && (
                            <div className="relative max-w-[21.4375rem]">
                                <SearchInput
                                    className="pr-4 py-1 w-full bg-[#0C3766] bg-opacity-30 border border-[#0C3766] text-xs placeholder:text-xs text-white placeholder-[#6CA0F6] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                                    placeholder="Search coins, spaces..."
                                />
                            </div>
                        )}
                        <AuthSection user={user} />
                    </div>
                </div>

                <div className="h-8 w-full relative flex items-center px-px mt-4 overflow-hidden">
                    {data.marqueeItems.length > 0 && (
                        <Marquee gradient={false} speed={40} pauseOnHover={true} className="h-7 mr-px">
                            {data.marqueeItems.map((item) => (
                                <div key={`marquee-item-${item.id}`} className="h-full flex-shrink-0">
                                    <MarqueeItem item={item} />
                                </div>
                            ))}
                        </Marquee>
                    )}
                    <div className="absolute right-0 top-0 bottom-0 flex items-center mr-px justify-center z-50">
                        <LiveButton />
                    </div>
                </div>
            </div>
        </header>
    )
}