'use client';

import { useLeftChatDataStore } from './useLeftChatDataStore';
import ChatMessage from './ChatMessage';
import { Lock, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useSidebarStore } from '@/components/useSidebarStore';
import { useTranscribeStates } from '../_store/useTranscribeStates';

interface ProcessedTranscriptEntry {
  timestamp: string;
  text: string;
}

const tabs = [
  { label: 'Real Time Transcript', locked: false },
  { label: 'Processed Transcript', locked: false },
];

const processedTranscript: ProcessedTranscriptEntry[] = [
  {
    timestamp: '00:03:54',
    text: `The conversation begins with a reflection...`
  },
  {
    timestamp: '00:33:37',
    text: `The discussion shifts to a more bearish outlook...`
  },
  {
    timestamp: '01:02:22',
    text: `Altcoins are viewed as rented vehicles of attention...`
  },
  {
    timestamp: '01:25:16',
    text: `The conversation transitions to closing remarks...`
  }
];

function TranscriptEntry({ entry, isLast }: { entry: ProcessedTranscriptEntry; isLast: boolean }) {
  const [textHeight, setTextHeight] = React.useState(0);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, [entry.text]);

  return (
    <div className="flex gap-4 items-start relative">
      <div className="flex flex-row gap-2 items-center relative">
        <span className="text-xs text-[#A0AEC0] font-mono mb-2">{entry.timestamp}</span>
        <div className="relative flex flex-col items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#2456A6] bg-[#0B1A2F] mb-2 z-10">
            <Mic className="w-4 h-4 text-[#6CA0F6]" />
          </span>
          {!isLast && (
            <span
              className="absolute left-1/2 top-full -translate-x-1/2 w-[2px] bg-[#2456A6] z-0"
              style={{ marginTop: '-2px', height: textHeight ? `${textHeight + 40}px` : '100%' }}
            ></span>
          )}
        </div>
      </div>
      <div>
        <span className="flex gap-1 mb-2 mt-2">
          {[1, 2, 3].map(i => (
            <img key={i} src="/Daniel.png" alt="avatar" className="w-5 h-5 rounded-full border-2 border-[#1B3B68]" />
          ))}
        </span>
        <span ref={textRef} className="flex text-[#E6F0FF] text-sm leading-relaxed bg-transparent">
          {entry.text}
        </span>
      </div>
    </div>
  );
}

export default function LeftChatData() {
  const { activeTab, setActiveTab } = useLeftChatDataStore();
  const { isCollapsed } = useSidebarStore();
  const { liveTranscribe, spaceMetadata } = useTranscribeStates();

  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (activeTab === 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [liveTranscribe, activeTab]);

  return (
    <div
      className={`font-geomGraphy overflow-hidden relative min-w-full max-h-[58.375rem] h-full mx-auto ${isCollapsed ? 'max-w-[60vw]' : 'max-w-full'}`}
      style={{
        backgroundImage: 'url("/transcribe/left-main-hero_bg.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex border ml-1 mb-8 border-b-[#0C3766] border-r-[#0C3766] rounded-br-xl border-t-0 border-l-0 w-fit pr-8 items-center py-5  pl-[1.875rem] text-[0.625rem] xl:text-[0.8125rem] gap-[1.625rem] pb-[1.125rem]">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`transition-all flex items-center gap-1 ${activeTab === idx ? 'text-[#3772FE]' : 'text-[#3772FE80]'} ${tab.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => {
              if (!tab.locked) setActiveTab(idx);
            }}
            disabled={tab.locked}
          >
            {tab.locked && <Lock className="w-3 h-3 text-[#3772FE80]" />}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="h-[calc(57.8125rem-8rem)] overflow-y-auto px-[1.375rem]" ref={chatContainerRef}>
        {activeTab === 1 ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 mb-2 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center bg-[#1D9BF0]/10 border border-[#083E6D] rounded-tl-3xl rounded-br-3xl py-3">
                  <div className="flex flex-row gap-1">
                    <img src="/Daniel.png" alt="crypto-savvy" className="w-10 h-10 rounded-tl-xl border-2 border-[#1B3B68]" />
                    <span className='flex flex-col gap-1'>
                      <span className="text-[#6CA0F6] text-xs font-semibold">crypto-savvy</span>
                      <span className="text-[#B0C4DE] text-[10px]">@ShadySolana</span>
                    </span>
                  </div>
                  <span className='border-b border-[#083E6D] h-1 w-full my-2' />
                  <span className="text-[#B0C4DE] text-[10px]">HOST &nbsp; 220K</span>
                  <span className="px-2">
                    <Button variant="default" className="mt-2 px-2 py-1 text-xs rounded bg-[#0B1A2F] border border-[#2456A6] rounded-tl-xl rounded-br-xl text-[#6CA0F6] hover:bg-[#2456A6] transition">summarizes the profile</Button>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-2 border border-[#2456A6] items-center justify-start rounded-tr-xl rounded-bl-xl w-fit p-1 bg-[#025895]/10">
              <Button variant="default" className=" px-2 py-1 text-xs  bg-[#0B1A2F] border border-[#2456A6] rounded-tr-xl rounded-bl-xl text-[#6CA0F6] hover:bg-[#2456A6] transition">Coins</Button>
              <Button variant="default" className=" px-2 py-1 text-xs  bg-[#0B1A2F] border border-[#2456A6] rounded-tr-xl rounded-bl-xl text-[#6CA0F6] hover:bg-[#2456A6] transition">Discussion</Button>
            </div>
            <select className="w-full px-4 py-4 text-[#A1A1AA] rounded bg-[#1D9BF0]/10 border border-[#1D9BF0]/10 text-[#6CA0F6] text-xs mb-4" disabled>
              <option>Select coins...</option>
            </select>
            <div className="flex flex-col gap-6 mt-2">
              {processedTranscript.map((entry, idx) => (
                <TranscriptEntry
                  key={idx}
                  entry={entry}
                  isLast={idx === processedTranscript.length - 1}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            {spaceMetadata && liveTranscribe.length === 0 && (
              <span>Waiting for someone to speak...</span>
            )}
            {liveTranscribe.map((msg, index) => (
              <ChatMessage key={index} image={msg.payload.sender.profile_image_url} name={msg.payload.room + msg.payload.sender.display_name} timestamp={msg.payload.body.timestamp} chat={msg.payload.body.body} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}