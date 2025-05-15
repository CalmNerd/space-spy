"use client";

import Image from 'next/image';
import React, { useState } from 'react'
import CryptoDiscussions from './overview/Overview';
import Discussion from './discussion/Discussion';

const Home = () => {
    const [dashboardTab, setDashboardTab] = useState('discussion');

    return (
        <div>
            <div className="relative w-full h-full bg-stone-900">
                <div className="absolute top-0 left-[45%] -translate-x-0 flex items-center justify-between mb-4">
                    <div className="flex flex-row items-center">
                        {/* Market Overview Tab */}
                        <button
                            onClick={() => setDashboardTab('overview')}
                            className={`flex flex-row items-center px-4 py-2 gap-2 rounded-2xl cursor-pointer`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/bulbLight.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">Overview</span>
                        </button>

                        {/* News Tab */}
                        <button
                            onClick={() => setDashboardTab('discussion')}
                            className={`flex flex-row items-center cursor-pointer px-4 py-2 gap-2 ml-2 rounded-tr-2xl rounded-bl-2xl border ${dashboardTab === 'news'
                                ? 'bg-[#0E4C7A] border-[#0098FF80]'
                                : 'border-[#0098FF80] bg-[#1D9BF01A]'
                                }`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/sound.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">Discussion</span>
                        </button>

                        {/* Hot Takes Tab */}
                        <button
                            onClick={() => setDashboardTab('spaces')}
                            className={`flex flex-row items-center cursor-pointer px-4 py-2 gap-2 ml-2 rounded-tr-2xl rounded-bl-2xl border ${dashboardTab === 'hot'
                                ? 'bg-[#0E4C7A] border-[#0098FF80]'
                                : 'border-[#0098FF80] bg-[#1D9BF01A]'
                                }`}
                        >
                            <div className="relative w-5 h-5">
                                <Image src="/icons/cubesquare.svg" alt="Market Overview" fill />
                            </div>
                            <span className="text-base">Spaces</span>
                        </button>
                    </div>
                </div>
                {dashboardTab === 'overview' && (
                    <CryptoDiscussions />
                )}
                {dashboardTab === 'discussion' && (
                    <Discussion />
                )}

                {dashboardTab === 'hot' && (
                    <span>hot takes</span>
                )}
            </div>
        </div>
    )
}

export default Home
