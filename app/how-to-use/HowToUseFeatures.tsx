import { LayoutDashboard, Zap, Library, User } from "lucide-react";

const features = [
  {
    icon: <LayoutDashboard className="w-6 h-6 text-[#6CA0F6]" />, title: "Dashboard", desc: "Main dashboard"
  },
  {
    icon: <Zap className="w-6 h-6 text-[#6CA0F6]" />, title: "Transcribator", desc: "Transcribe Space"
  },
  {
    icon: <Library className="w-6 h-6 text-[#6CA0F6]" />, title: "Library", desc: "Your transcriptions"
  },
  {
    icon: <User className="w-6 h-6 text-[#6CA0F6]" />, title: "Account", desc: "Your profile"
  },
];

export default function HowToUseFeatures() {
  return (
    <div className="w-full mt-2">
      <div className="text-base text-[#B0C4DE] font-geomGraphy font-semibold mb-4">Key Features</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-[#000714]/50 border border-[#2456A6] rounded-tr-3xl rounded-bl-3xl p-6 flex flex-col gap-2 min-h-[80px]">
            <div className="flex items-center gap-2 mb-1">
              {f.icon}
              <span className="text-[#E6F0FF] font-geomGraphy font-semibold text-base">{f.title}</span>
            </div>
            <div className="text-xs text-[#A0AEC0] font-geomGraphy mt-1">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
