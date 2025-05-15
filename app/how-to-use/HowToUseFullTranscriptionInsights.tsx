import { FileText, Settings } from "lucide-react";

export default function HowToUseFullTranscriptionInsights() {
  return (
    <div className="w-full mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Transcription Card */}
        <div className="bg-[#000714]/50 border border-[#2456A6] rounded-tr-3xl rounded-bl-3xl p-6 flex flex-col gap-3 min-h-[220px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#1B3B68] rounded-lg w-7 h-7 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#6CA0F6]" />
            </span>
            <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">Full Transcription</span>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-md p-4 mt-2">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#6CA0F6]" />
              <span className="text-[#E6F0FF] font-geomGraphy text-sm font-semibold">Space Transcription</span>
            </div>
            <div className="mb-3">
              <div className="text-xs text-[#A0AEC0] font-mono">00:01:15</div>
              <div className="text-[#6CA0F6] font-geomGraphy text-sm">
                Hey everyone, welcome to our weekly crypto market discussion. Today we&apos;ll be looking at recent trends and discussing Bitcoin&apos;s price movement.
              </div>
            </div>
            <div>
              <div className="text-xs text-[#A0AEC0] font-mono">00:02:30</div>
              <div className="text-[#6CA0F6] font-geomGraphy text-sm">
                As you can see, the market has been quite volatile over the past week.
              </div>
            </div>
          </div>
        </div>
        {/* AI Insights Card */}
        <div className="bg-[#000714]/50 border border-[#2456A6] rounded-tr-3xl rounded-bl-3xl p-6 flex flex-col gap-3 min-h-[220px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#1B3B68] rounded-lg w-7 h-7 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#6CA0F6]" />
            </span>
            <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">AI Insights</span>
          </div>
          <div className="bg-black/50 border border-white/10 rounded-md p-4 mt-2">
            <div className="text-[#E6F0FF] font-geomGraphy text-sm font-semibold mb-2">Key Points</div>
            <ul className="list-none flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#6CA0F6] inline-block"></span>
                <span className="text-[#E6F0FF] font-mono text-sm">Bitcoin has maintained a strong correlation with the S&amp;P 500</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#6CA0F6] inline-block"></span>
                <span className="text-[#E6F0FF] font-mono text-sm">Institutional investors have increased their Bitcoin holdings by 15%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#6CA0F6] inline-block"></span>
                <span className="text-[#E6F0FF] font-mono text-sm">Technical analysis identifies $48,500 as a crucial support level</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
