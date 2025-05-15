"use client";

import { BitcoinData, CryptoChartProps, TimeLabelsProps } from '@/types/graph-index';
import { Bitcoin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';

const TimeLabels = ({ data }: TimeLabelsProps) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="flex justify-between w-full text-[0.5rem] text-[#AEB9E1] mt-2 px-4">
            {data.map((item) => (
                <div key={item.time} className="text-center">{item.time}</div>
            ))}
        </div>
    );
};

// CryptoChart component
export const CryptoChart = ({ dataUrl = '/bitcoinData.json' }: CryptoChartProps) => {
    const [data, setData] = useState<BitcoinData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(dataUrl);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }

                const result: BitcoinData = await response.json();
                setData(result);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchData();
    }, [dataUrl]);

    if (loading) {
        return (
            <div className="bg-black border border-blue-900/10 rounded-md flex flex-col h-44 items-center justify-center">
                <div className="text-blue-400">Loading Bitcoin data...</div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="bg-black border border-blue-900/10 rounded-md flex flex-col h-44 items-center justify-center">
                <div className="text-red-400">Error: {error || 'Data not available'}</div>
            </div>
        );
    }

    return (
        <div className="border border-[#1D9BF01A] rounded-md flex flex-col h-44 relative">
            <div className="flex justify-between items-center p-2">
                <div className="flex items-center gap-1">
                    <div className="bg-orange-500 rounded-full w-3.5 h-3.5 flex items-center justify-center">
                        <Bitcoin/>
                    </div>
                    <span className="text-white uppercase text-sm">btc</span>
                </div>
                <div className="bg-black/40 rounded-full px-2 py-0.5">
                    <span className="text-white text-sm">${data.currentPrice.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex justify-between items-center px-2">
                <div className="bg-black/40 rounded-full px-2 py-0.5 text-xs">
                    <span className="text-gray-300">Dominance: {data.dominance}%</span>
                </div>
                <div className="border border-gray-700 rounded-lg px-1.5 py-0.5 flex items-center gap-1">
                    <span className="text-gray-300 text-xs">1D</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.priceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="bitcoinGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0037D5" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#010428" stopOpacity={0.9} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3772FE"
                            strokeWidth={1.2}
                            fill="url(#bitcoinGradient)"
                        />
                        <YAxis
                            domain={['dataMin - 1000', 'dataMax + 1000']}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: '#AEB9E1' }}
                            orientation="right"
                            width={40}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <TimeLabels data={data.priceData} />
        </div>
    );
};