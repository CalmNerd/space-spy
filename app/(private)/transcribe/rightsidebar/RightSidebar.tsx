'use client';

import { useRightSidebarStore } from './useRightSidebarStore';
import React, { useEffect, useState, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronDownIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mainTabs = [
  { icon: <div className='relative h-3.5 w-3.5'> <Image src="icons/trending-spaces.svg" fill alt='icon' /> </div>, label: 'XPS Agent' },
  { icon: <div className='relative h-3.5 w-3.5'> <Image src="icons/mind.svg" fill alt='icon' /> </div>, label: 'Mindmap' },
  { icon: <div className='relative h-3.5 w-3.5'> <Image src="icons/highlight.svg" fill alt='icon' /> </div>, label: 'Highlights' },
  { icon: <div className='relative h-3.5 w-3.5'> <Image src="icons/transcript.svg" fill alt='icon' /> </div>, label: 'Core Insights' },
];

const PieChart = React.lazy(() => import('./SentimentPieChart'));
const Mindmap = React.lazy(() => import('./Mindmap'));

// Helper to fetch JSON
async function fetchJson(path: string) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error('fetchJson error:', e);
    return null;
  }
}

// Define types for data
interface CoinData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
}
interface SentimentsData {
  bullish: number;
  neutral: number;
  bearish: number;
}
interface AbstractData {
  abstract: string;
  highlights: string[];
  keyPoints: string[];
  timeline: { time: string; event: string }[];
}
interface MindmapData {
  nodes: { id: string; label: string; position: { x: number; y: number } }[];
  edges: { id?: string; source: string; target: string }[];
}
interface CoreSummaryItem {
  id: number;
  timestamp: string;
  summary: string;
}

export default function RightSidebar() {
  const { activeMainTab, setActiveMainTab, activeSummaryTab, setActiveSummaryTab } = useRightSidebarStore();
  // const { isCollapsed } = useSidebarStore();

  // Core Insights state
  const [coreSummary, setCoreSummary] = useState<CoreSummaryItem[]>([]);
  const [coreLoading, setCoreLoading] = useState(false);

  // Highlights state
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [sentiments, setSentiments] = useState<SentimentsData | null>(null);
  const [abstract, setAbstract] = useState<AbstractData | null>(null);
  const [highlightsLoading, setHighlightsLoading] = useState(true);

  // Mindmap state
  const [mindmapData, setMindmapData] = useState<MindmapData | null>(null);
  const [mindmapLoading, setMindmapLoading] = useState(true);

  // Core Insights: load summary on tab/toggle change
  useEffect(() => {
    if (activeMainTab === 3) {
      setCoreLoading(true);
      const file = activeSummaryTab === 0
        ? '/coreInsightsRealTimeSummary.json'
        : '/coreInsightsFinalSummary.json';
      setTimeout(() => {
        fetchJson(file).then(setCoreSummary).finally(() => setCoreLoading(false));
      }, 500);
    }
  }, [activeMainTab, activeSummaryTab]);

  // Highlights: load all data on tab change
  useEffect(() => {
    if (activeMainTab === 2) {
      setHighlightsLoading(true);
      Promise.all([
        fetchJson('/highlightsCoins.json'),
        fetchJson('/highlightsSentiments.json'),
        fetchJson('/highlightsAbstract.json'),
      ]).then(([coins, sentiments, abstract]) => {
        setCoins(coins);
        setSentiments(sentiments);
        setAbstract(abstract);
        setTimeout(() => setHighlightsLoading(false), 500);
      });
    }
  }, [activeMainTab]);

  // Mindmap: load data on tab change
  useEffect(() => {
    if (activeMainTab === 1) {
      setMindmapLoading(true);
      fetchJson('/mindmap.json').then((data) => {
        setMindmapData(data);
        setTimeout(() => setMindmapLoading(false), 500);
      });
    }
  }, [activeMainTab]);

  // XPS Agent tab UI
  const renderXpsAgent = () => (
    <div className="flex flex-col w-full h-full px-0">
      {/* Title Section */}
      <div className="w-full flex flex-col items-center pt-8">
        <div className="flex flex-col items-center w-full">
          <span className="relative inline-flex gap-2 px-3 pb-2 text-[#B0C4DE] text-base tracking-wide mb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[linear-gradient(90deg,_rgba(255,_255,_255,_0.2)_0%,_#0299FF_50.96%,_rgba(255,_255,_255,_0.2)_100%)]">
            <span>Grok Model</span>
            <span className="text-xs">
              <ChevronDownIcon className="text-[#0071BC]" />
            </span>
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col items-center justify-start gap-8 mt-8">
        {/* <div className='flex flex-col gap-8 items-center justify-center h-full py-10'> */}

        <span className="text-base text-center mb-2 w-full max-w-[24.125rem]">
          Ask AI anything about this conversation
          <br />
          or chat with your teammates
        </span>

        <div className="flex flex-col gap-4 w-full max-w-[23.125rem]">
          {[
            'Who were the main speakers?',
            'What were the main topics discussed?',
            'Summarize this Space in 3 bullet points',
          ].map((text, idx) => (
            <button
              key={idx}
              className="w-full flex items-center gap-2 px-4 py-3 bg-[#1D9BF0]/10 border border-[#0F62B9] text-sm hover:bg-[#2456A6] transition text-left"
            >
              <span className="relative text-[#6CA0F6] h-6 w-6">
                <Image src="/icons/ai-stars-mini.svg" fill alt="ai icon" />
              </span>
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed Input Area */}
      <div className="sticky bottom-0 z-10 w-full px-6">
        <div className='py-2 px-2.5' style={{
          backgroundImage: 'url("/transcribe/ai-input_bg.svg")',
        }}>
          <div className="flex flex-row items-center justify-between w-full mb-2">
            <Input
              className="w-full h-6 border-none placeholder:text-foreground/50 text-xs px-0"
              placeholder="Ask about this X/Twitter Space..."
            />
            <button>
              <img
                src="/transcribe/placeholderup.svg"
                alt="transcribe-footer"
                className="w-[18px] h-[18px]"
              />
            </button>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#042779] text-xs text-foreground/50">
                <div className='relative h-3 w-3'>
                  <Image src="/icons/coin.svg" fill alt="coin icon" />
                </div>
                <span className="hidden xl:inline">Coins mentioned</span>
              </button>
            </TooltipTrigger>
            <TooltipContent className="xl:hidden">
              Coins mentioned
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );

  // Mindmap tab UI
  const renderMindmap = () => (
    <div className="w-full h-full flex items-center justify-center">
      {mindmapLoading ? (
        <Skeleton height={400} width={"100%"} />
      ) : (
        <Suspense fallback={<Skeleton height={400} width={"100%"} />}>
          {mindmapData ? <Mindmap data={mindmapData} /> : <div className="text-[#6CA0F6]">No mindmap data found.</div>}
        </Suspense>
      )}
    </div>
  );

  // Highlights tab UI
  const renderHighlights = () => (
    <div className="flex flex-col gap-6">
      {highlightsLoading ? (
        <>
          <Skeleton className="w-2 h-12" count={1} baseColor="#014877" highlightColor="#2456A6" />
          <Skeleton className="w-2 h-12" baseColor="#014877" highlightColor="#2456A6" />
          <Skeleton className="w-2 h-12" count={6} baseColor="#014877" highlightColor="#2456A6" />
        </>
      ) : !coins?.length || !sentiments || !abstract ? (
        <div className="text-[#6CA0F6] p-8">Failed to load highlights data.</div>
      ) : (
        <>
          {/* Top coins and Sentiments graph */}
          <div className="flex p-4 xl:flex-row flex-col gap-2.5 w-full">
            {/* top coins  */}
            <div className="w-full xl:aspect-auto aspect-square relative overflow-hidden flex-1 bg-gradient-to-b from-[#03268B] to-[#000212] p-2 md:p-5 border border-[#0C3766] items-start justify-center flex flex-col">
              <span className="mb-5 text-base">Top mentioned coins</span>
              {coins.map((coin) => (
                <div key={coin.symbol} className="flex flex-col items-start mb-1 text-[#A1A1AA]">
                  <span className='text-[0.625rem]'>{coin.symbol}</span>
                  <span className="flex flex-row items-center gap-1.5 justify-center text-base">
                    <span>${coin.price.toLocaleString()}</span>
                    <span className={`text-[0.625rem] ${coin.change24h > 0 ? 'text-green-400' : 'text-red-400'}`}>{coin.change24h > 0 ? '+' : ''}{coin.change24h}% 24h</span>
                  </span>
                </div>
              ))}

              <div className="absolute -bottom-20 -right-30 w-full h-full pointer-events-none">
                <Image
                  src="/transcribe/right-main-top-coin-ring.svg"
                  alt="ring bg"
                  fill
                />
              </div>
            </div>

            {/* sentiment  */}
            <div className="flex-1 w-full xl:aspect-auto aspect-square bg-gradient-to-b from-[#03268B] to-[#000212] p-2 md:p-5 border border-[#0C3766] flex flex-col">
              <span className="mb-5 text-base">Sentiments</span>

              <div className="flex-grow flex items-center justify-center w-full h-full">
                <Suspense fallback={<Skeleton className="w-full h-full" circle={true} baseColor="#014877" highlightColor="#2456A6" />}>
                  {sentiments ? (
                    <PieChart data={sentiments} />
                  ) : (
                    <div className="text-[#6CA0F6]">No sentiment data</div>
                  )}
                </Suspense>
              </div>

              <div className="flex mt-2 w-full text-xs justify-around">
                <div className="flex items-center space-x-2 text-[0.625rem] leading-none">
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-[#334E68] h-full w-full">
                    <span className="w-1.5 h-1.5 rounded-[0.125rem] bg-green-400 inline-block" />
                    <span>Bullish</span>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-[#334E68] h-full w-full">
                    <span className="w-1.5 h-1.5 rounded-[0.125rem] bg-yellow-400 inline-block" />
                    <span>Neutral</span>
                  </div>
                  <div className="flex items-center space-x-1 px-2 py-0.5 bg-[#334E68] h-full w-full">
                    <span className="w-1.5 h-1.5 rounded-[0.125rem] bg-red-400 inline-block" />
                    <span>Bearish</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Abstract, Highlights, Key Points, Timeline */}
          <div className="flex flex-col p-3 gap-5">

            <div className='space-y-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='relative inline-block h-3 w-3'> <Image src="/icons/transcript.svg" alt='abstract icon' fill /> </span>
                <span className="text-xs">Abstract</span>
              </div>
              <span className="text-[#9F9FA9] text-[0.625rem]/4 pl-4 inline-block pb-4">{abstract.abstract}</span>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='relative inline-block h-3 w-3'> <Image src="/icons/transcript.svg" alt='transcript icon' fill /> </span>
                <span className="text-xs">Highlight</span>
              </div>
              <ul className="ml-4 text-[#9F9FA9] text-[0.625rem]/4 pb-4">
                {abstract.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='relative inline-block h-3 w-3'> <Image src="/icons/mind.svg" alt='mind icon' fill /> </span>
                <span className="text-xs">Key Points</span>
              </div>
              <ul className="list-disc marker:text-[#AD46FF] ml-4 text-[#9F9FA9] text-[0.625rem]/4 pb-4">
                {abstract.keyPoints.map((k, i) => <li key={i}>{k}</li>)}
              </ul>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center gap-1.5'>
                <span className='relative inline-block h-3 w-3'> <Image src="/icons/timeline.svg" alt='timeline icon' fill /> </span>
                <span className="text-xs">Timeline</span>
              </div>
              <ul className="ml-4 text-[#9F9FA9] text-[0.625rem]/4 pb-4">
                {abstract.timeline.map((t, i) => (
                  <li key={i} className="flex">
                    <span className="text-[0.625rem] text-[#1DA1F2] w-16 flex-shrink-0 mr-1.5">{t.time}:</span>
                    <span>{t.event}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </>
      )}
    </div>
  );

  // Core Insights tab UI
  const renderCoreInsights = () => (
    <div className='relative'>
      <div className='w-full sticky backdrop-blur-sm mx-px top-0'>
        <div className="flex h-fit top-0 items-center justify-center w-fit mx-auto gap-0 px-0 pt-0 "
          style={{
            backgroundImage: 'url("/transcribe/right-main-core-tab_bg.svg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}>
          {[
            { label: 'Real Time Summary', shortLabel: 'Real Time' },
            { label: 'Final Summary', shortLabel: 'Final' }
          ].map((tab, idx) => (
            <button
              key={tab.label}
              className={`cursor-pointer px-6 py-2 text-xs font-semibold focus:outline-none transition-all ${activeSummaryTab === idx ? 'text-[#6CA0F6]' : 'text-[#B0C4DE]'}`}
              onClick={() => setActiveSummaryTab(idx)}
            >
              <span className="hidden xl:inline">{tab.label}</span>
              <span className="xl:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-full w-full xl:p-6 md:p-4 flex flex-col gap-8 overflow-y-auto"
      >
        {coreLoading ? (
          <Skeleton height={60} count={2} baseColor="#014877" highlightColor="#2456A6" />
        ) : !coreSummary?.length ? (
          <div className="text-[#6CA0F6] p-8">Failed to load summary data.</div>
        ) : (
          coreSummary.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="text-xs text-[#6CA0F6] text-right">{item.timestamp}</div>
              <div className="text-[#E6F0FF] text-sm whitespace-pre-line leading-relaxed bg-transparent">{item.summary}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Main render
  return (
    <>
      <div
        className="relative font-geomGraphy w-full h-[1053px] flex flex-col bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/transcribe/right-main-hero_bg.svg")',
        }}>
        {/* Top Tab */}
        <div className="grid sticky top-0 z-20 bg-[#010823] rounded-tr-2xl py-6 px-4 grid-flow-col auto-cols-auto justify-between">
          {mainTabs.map((tab, idx) => (
            <Tooltip key={tab.label}>
              <TooltipTrigger asChild>
                <button
                  className={`px-2 sm:px-5 xl:px-4 py-1 sm:py-2 text-xs flex gap-1.5 items-center font-semibold rounded-tr-2xl rounded-bl-2xl focus:outline-none transition-all ${activeMainTab === idx
                    ? 'bg-gradient-to-r from-[#00004C] to-[#3772FE] text-white'
                    : 'border-transparent'
                    } cursor-pointer`}
                  onClick={() => setActiveMainTab(idx)}
                >
                  {tab.icon}
                  <span className="hidden xl:inline">{tab.label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent className="xl:hidden">{tab.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto hide-scrollbar"
            style={{ maxHeight: 'calc(100% - 60px)' }}>
            {activeMainTab === 0 && renderXpsAgent()}
            {activeMainTab === 1 && renderMindmap()}
            {activeMainTab === 2 && renderHighlights()}
            {activeMainTab === 3 && renderCoreInsights()}
          </div>
        </div>
      </div>
    </>
  );
}