"use client";

import { AltcoinData, AltcoinIndexProps } from '@/types/graph-index';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export const AltcoinIndex = ({ dataUrl = '/altcoinData.json' }: AltcoinIndexProps) => {
  const [data, setData] = useState<AltcoinData | null>(null);
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

        const result: AltcoinData = await response.json();
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
        <div className="text-blue-400">Loading Altcoin Index data...</div>
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

  // Calculate left position percentage for indicator
  const indicatorPosition = `${data.currentValue}%`;

  return (
    <div className="border border-[#1D9BF01A] rounded-md flex flex-col h-44">
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-1">
          <div className="bg-black w-4 h-4 rounded-full flex items-center justify-center">
            <div className="relative h-4 w-4 rounded-full">
              <Image fill src="/icons/meter.svg" alt="icon" />
            </div>
          </div>
          <span className="text-white text-sm">Altcoin Season Index</span>
        </div>
        <div className="flex items-center">
          <div className="border border-gray-700 rounded-lg px-1.5 py-0.5 flex items-center gap-1">
            <span className="text-gray-300 text-xs">Max</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="bg-black/40 rounded-full ml-1 px-2 py-0.5 flex">
            <span className="text-blue-500 text-base">{data.currentValue}</span>
            <span className="text-gray-400/70 text-base">/100</span>
          </div>
        </div>
      </div>

      <div className="px-2 mt-1">
        <div className="relative h-2.5">
          <div className="h-2.5 w-full bg-gradient-to-r from-blue-900 to-blue-500 rounded-full"></div>
          <div
            className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: indicatorPosition }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-900 to-black"></div>
          </div>
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-blue-500 text-xs font-medium">Bitcoin Season</span>
          <span className="text-blue-300 text-xs font-medium">Altcoin Season</span>
        </div>
      </div>

      <div className="flex-grow mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.historicalData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="altcoinGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5588FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#C5C5FF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#C5C5FF"
              fill="url(#altcoinGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="pb-2.5"></div>
    </div>
  );
};