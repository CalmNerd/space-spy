import { Clock, Search, Eye, MessageCircle } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-5 h-5 text-[#6CA0F6]" />, title: "Save Time", desc: "Get fast transcriptions and summaries without listening to hours of content."
  },
  {
    icon: <Eye className="w-5 h-5 text-[#6CA0F6]" />, title: "Uncover Insights", desc: "Identify key topics and trends with AI-powered analysis."
  },
  {
    icon: <Search className="w-5 h-5 text-[#6CA0F6]" />, title: "Never Miss Important Information", desc: "Build a searchable library of transcribed content."
  },
  {
    icon: <MessageCircle className="w-5 h-5 text-[#6CA0F6]" />, title: "Interactive Experience", desc: "Ask questions and explore content through AI chat assistant."
  },
];

export default function HowToUseAbout() {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="text-lg md:text-xl font-geomGraphy text-[#E6F0FF] font-semibold ">About XSPACESPY</div>
    <div className="w-full bg-no-repeat bg-cover px-6 py-6 flex flex-col gap-4" style={{ backgroundImage: "url('/aboutxspacespy.svg')" }}>
      <div className="text-sm md:text-base text-[#FFFFFF] font-geomGraphy max-w-[76vw] mb-4">
        XSPACESPY/XREAM is an advanced platform that transforms X Spaces into actionable intelligence. Our platform automatically transcribes, analyzes, and extracts valuable insights from any X Space, allowing you to:
      </div>
      <div className="grid max-w-full sm:grid-cols-2 md:grid-cols-2 gap-3">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-start gap-2 bg-black/30 border border-[#1B3B68] rounded-tr-xl rounded-bl-xl p-4">
            {f.icon}
            <div className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">{f.title}</div>
            <div className="text-xs text-[#6CA0F6] font-geomGraphy leading-snug">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
} 