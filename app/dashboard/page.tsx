"use client";

import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeatMap from "./heat-map/HeatMap"
import { useState } from "react"
import TopHosts from "@/components/TopHosts";
import MoniteredSpaces from "./spaces/monitered/MoniteredSpaces";
import LiveSpaces from "./spaces/live/LiveSpaces";
import MarketOverview from "./tabs/MarketOverview";
import News from "./tabs/News";
import HotTakes from "./tabs/HotTakes";

export default function DashboardPage() {
    const [dashboardTab, setDashboardTab] = useState('overview');
    const [spaceTab, setSpaceTab] = useState('monitered');

    const dashboardTabs = ['overview', 'news', 'hot'];

    const handleDotClick = (index: number) => {
        setDashboardTab(dashboardTabs[index]);
    };

    return (
        <div
            className="flex-1 p-5 font-geomGraphy"
            style={{
                backgroundImage: 'url("/dashboard/dashboard_body.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-row items-center">
                        {/* Market Overview Tab */}
                        <button
                            onClick={() => setDashboardTab('overview')}
                            className={`flex flex-row items-center px-4 py-2 gap-2 rounded-2xl cursor-pointer`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/bulbLight.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">Market Overview</span>
                        </button>

                        {/* News Tab */}
                        <button
                            onClick={() => setDashboardTab('news')}
                            className={`flex flex-row items-center cursor-pointer px-4 py-2 gap-2 ml-2 rounded-tr-2xl rounded-bl-2xl border ${dashboardTab === 'news'
                                ? 'bg-[#0E4C7A] border-[#0098FF80]'
                                : 'border-[#0098FF80] bg-[#1D9BF01A]'
                                }`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/sound.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">News</span>
                        </button>

                        {/* Hot Takes Tab */}
                        <button
                            onClick={() => setDashboardTab('hot')}
                            className={`flex flex-row items-center cursor-pointer px-4 py-2 gap-2 ml-2 rounded-tr-2xl rounded-bl-2xl border ${dashboardTab === 'hot'
                                ? 'bg-[#0E4C7A] border-[#0098FF80]'
                                : 'border-[#0098FF80] bg-[#1D9BF01A]'
                                }`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/cubesquare.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">Hot Takes</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        {dashboardTabs.map((tab, index) => (
                            <div
                                key={tab}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${dashboardTab === tab
                                    ? 'bg-[linear-gradient(180deg,_#03268B_20.67%,_#000212_100%)]'
                                    : 'bg-[linear-gradient(233.36deg,_#FFFFFF_50.24%,_#012A8A_101.78%)]'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                {dashboardTab === 'overview' && (
                    <MarketOverview />
                )}
                {dashboardTab === 'news' && (
                    <News />
                )}

                {dashboardTab === 'hot' && (
                    <HotTakes />
                )}
            </div>

            <div className="mb-8">
                <TopHosts />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-11 ">
                {/* Spaces */}
                <div className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">SPACES</h2>
                        <div className="flex items-center gap-2 h-6">
                            <button
                                onClick={() => setSpaceTab('monitered')}
                                className={`rounded-tl-[1.25rem] rounded-br-[1.25rem] py-1 px-6 cursor-pointer border
                                    ${spaceTab === 'monitered'
                                        ? 'border-[#0098FF80] bg-[#1D9BF01A]'
                                        : 'bg-transparent border-[#27272A]'
                                    }`}
                            >
                                Monitored
                            </button>
                            <button
                                onClick={() => setSpaceTab('live')}
                                className={`rounded-tl-[1.25rem] rounded-br-[1.25rem] py-1 px-6 cursor-pointer border
                                    ${spaceTab === 'live'
                                        ? 'border-[#0098FF80] bg-[#1D9BF01A]'
                                        : 'bg-transparent border-[#27272A]'
                                    }`}
                            >
                                Live <span className="w-2 h-2 inline-block animate-pulse rounded-full bg-[#3772FE]" />
                            </button>
                        </div>
                    </div>
                    {spaceTab === 'monitered' && (<MoniteredSpaces />)}
                    {spaceTab === 'live' && (<LiveSpaces />)}
                </div>


                {/* heatmap */}
                <div className="lg:col-span-1 overflow-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="lg:col-span-1 flex flex-col">
                            <div className="inline-flex">
                                <Button variant="outline" className="bg-transparent border-[#1b1b20] text-white hover:bg-[#131317]">
                                    Top Mentions
                                </Button>
                                <Button variant="outline" className="bg-transparent border-[#1b1b20] text-white hover:bg-[#131317]">
                                    Daily Mind Map
                                </Button>
                            </div>
                            <div className="text-xs text-[#9ca3af] p-2 border-b border-[#1b1b20]">
                                Summary of all Spaces discussions of the last 24 hours
                            </div>
                        </div>
                        <div className="lg:col-span-1 flex items-center justify-end mb-4">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="px-2 py-1 ">6H</span>
                                <span className="px-2 py-1">12H</span>
                                <span className="px-2 py-1 bg-[#0098ff] rounded">1D</span>
                                <span className="px-2 py-1">7D</span>
                                <span className="px-2 py-1">1M</span>
                                <span className="px-2 py-1">1Y</span>
                                <span className="px-2 py-1">All</span>
                            </div>
                        </div>
                    </div>
                    <HeatMap />
                </div>
            </div>
        </div>
    );
}