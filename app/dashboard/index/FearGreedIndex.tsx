"use client";

import { FearGreedData, FearGreedIndexProps } from '@/types/graph-index';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export const FearGreedIndex = ({ dataUrl = '/fearGreedData.json' }: FearGreedIndexProps) => {
  const [data, setData] = useState<FearGreedData | null>(null);
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

        const result: FearGreedData = await response.json();
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
        <div className="text-blue-400">Loading Fear & Greed data...</div>
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

  // Determine text color based on value
  const getValueColor = (value: number): string => {
    if (value < 25) return 'text-red-500';
    if (value < 45) return 'text-yellow-500';
    if (value < 55) return 'text-gray-300';
    if (value < 75) return 'text-green-400';
    return 'text-green-500';
  };

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
          <span className="text-white text-sm">Fear & Greed Index</span>
        </div>
        <div className="flex items-center">
          <div className="border border-gray-700 rounded-lg px-1.5 py-0.5 flex items-center gap-1">
            <span className="text-gray-300 text-xs">ALL</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="bg-black/40 rounded-full ml-1 px-2 py-0.5 flex">
            <span className={`${getValueColor(data.currentValue)} text-base`}>{data.currentValue}</span>
            <span className="text-gray-400/70 text-base">/100</span>
          </div>
        </div>
      </div>

      <div className="px-2 mt-1">
        <div className="relative h-2.5">
          <div className="h-2.5 w-full bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
          <div
            className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full flex items-center justify-center p-0.5 transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: indicatorPosition }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-b from-blue-900 to-black"></div>
          </div>
        </div>

        <div className="relative flex justify-between mt-1">
          <span className="text-red-500 text-xs font-medium">Fear</span>
          <span className="text-gray-300 text-xs font-medium absolute left-1/2 transform -translate-x-1/2">Neutral</span>
          <span className="text-green-500 text-xs font-medium">Greed</span>
        </div>
      </div>

      <div className="flex-grow mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.historicalData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#30BD5A"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="pb-2.5"></div>
    </div>
  );
};