import { ArrowRight, Info, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowToUseWorkflow() {
  return (
    <>
      <div className="text-lg md:text-xl font-geomGraphy text-[#E6F0FF] font-semibold ">Transcription Workflow</div>
      <div className="w-full rounded-2xl flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: Submit X Space URL */}
          <div className="bg-[#000714]/50 border border-[#0C3766] rounded-tr-3xl rounded-bl-3xl p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#1B3B68] text-[#6CA0F6] border border-[#51A2FF]/30 w-6 h-6 flex items-center justify-center font-bold font-geomGraphy text-sm">1</span>

              <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-lg">Submit X Space URL</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 flex flex-col gap-2">
              <label className="text-xs text-[#A0AEC0] font-geomGraphy mb-1">Enter X Space URL</label>
              <div className="flex items-center gap-2">
                <input className="flex-1 bg-transparent border-none outline-none text-[#B0C4DE] text-sm font-mono" value="https://x.com/i/spaces/1YqKDobLABrKV" readOnly />
                <button className="px-4 py-1 bg-gradient-to-r from-[#2456A6] to-[#3A7BFF] text-white text-xs font-semibold rounded shadow-sm transition hover:brightness-110">Submit</button>
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 flex items-center gap-3 mt-2">
              <Info className="w-4 h-4 text-[#3A7BFF]" />
              <div className="flex flex-col text-xs">
                <span className="text-[#6CA0F6] font-geomGraphy">We support both recorded and live X Spaces</span>
                <span className="text-[#A0AEC0] font-mono mt-1">Valid URL format: <span className="text-[#6CA0F6]">x.com/i/spaces/[ID]</span></span>
              </div>
            </div>
          </div>
          {/* Step 2: Processing */}
          <div className="bg-[#000714]/50 border border-[#0C3766] rounded-tr-3xl rounded-bl-3xl p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-[#1B3B68] text-[#6CA0F6] border border-[#51A2FF]/30 w-6 h-6 flex items-center justify-center font-bold font-geomGraphy text-sm">2</span>

              <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-lg">Processing</span>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-8 h-8 border-4 border-[#3A7BFF] border-t-transparent rounded-full animate-spin mb-1" />
                <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">Processing Space</span>
                <div className="w-full bg-[#1B3B68] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#2456A6] to-[#3A7BFF] h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-xs text-[#A0AEC0] font-geomGraphy">75% complete</span>
              </div>
            </div>
            <div className="bg-black/50 border border-white/10 p-4 flex flex-col gap-2 mt-2">
              <div className="flex items-center gap-2 text-[#3A7BFF] text-sm font-geomGraphy"><Dot className="w-4 h-4 fill-[#3A7BFF] text-[#3A7BFF]" />Downloading audio</div>
              <div className="flex items-center gap-2 text-[#3A7BFF] text-sm font-geomGraphy"><Dot className="w-4 h-4 fill-[#3A7BFF] text-[#3A7BFF]" />Transcribing</div>
              <div className="flex items-center gap-2 text-[#3A7BFF] text-sm font-geomGraphy"><Dot className="w-4 h-4 fill-[#3A7BFF] text-[#3A7BFF]" />Generating insights</div>
            </div>
          </div>
          {/* Step 3: Results (unchanged) */}
          <div className="bg-[#000714]/50 border border-[#0C3766] rounded-tr-3xl rounded-bl-3xl p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1B3B68] text-[#6CA0F6] border border-[#51A2FF]/30 w-6 h-6 flex items-center justify-center font-bold font-geomGraphy text-sm">3</span>
              <span className="text-[#E6F0FF] font-geomGraphy font-semibold">Results</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="w-full text-[#E6F0FF] flex flex-col gap-6 px-2 py-4 bg-black/50 border border-[#FFFFFF]/10 font-geomGraphy text-xs py-1 flex items-center justify-center gap-2">
                <span className="flex items-center justify-between w-full">
                  Crypto Market Analysis
                  <Button variant="default" className="bg-gradient-to-b from-[#03268B] to-[#000000]">
                    Completed
                  </Button>
                </span>
                <span className="flex gap-2">
                  <span className="text-[#FFFFFF]/70 p-2 rounded-xl bg-[#1D9BF0]/10">Full transcript</span>
                  <span className="text-[#FFFFFF]/70 p-2 rounded-xl bg-[#1D9BF0]/10">FAI summary</span>
                  <span className="text-[#FFFFFF]/70 p-2 rounded-xl bg-[#1D9BF0]/10">Full transcript</span>

                </span>
              </div>
              <Button variant="default" className="w-full text-[#E6F0FF] bg-gradient-to-l from-[#03268B] to-[#000000] border-[#FFFFFF]/10  font-geomGraphy text-xs py-1 flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#6CA0F6]" /> View in Library
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 