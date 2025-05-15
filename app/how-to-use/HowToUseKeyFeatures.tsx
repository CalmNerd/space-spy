import { FileText, Settings, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-5 h-5 text-[#6CA0F6]" />, title: "Accurate Transcription", desc: "High-quality transcriptions with speaker recognition, even with background noise or multiple speakers."
  },
  {
    icon: <Settings className="w-5 h-5 text-[#6CA0F6]" />, title: "AI Analysis", desc: "Advanced AI processing identifies key points, summarizes content, and extracts valuable insights from any Space."
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-[#6CA0F6]" />, title: "Interactive Chat", desc: "Ask specific questions about any Space and get instant answers from our AI assistant, even during processing."
  },
];

export default function HowToUseKeyFeatures() {
  return (
    <div className="w-full mt-2">
      <div className="text-base text-[#B0C4DE] font-geomGraphy font-semibold mb-4">Key Features</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-[#000714]/50 border border-[#2456A6] rounded-tr-3xl rounded-bl-3xl p-6 flex flex-col gap-2 min-h-[120px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1B3B68] rounded-lg w-7 h-7 flex items-center justify-center">{f.icon}</span>
              <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">{f.title}</span>
            </div>
            <div className="text-xs text-[#A0AEC0] font-geomGraphy mt-1">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
