import Image from "next/image";

export default function HowToUseHero() {
  return (
    <div className="w-full h-[40vh] bg-gradient-to-b from-[#000212] to-[#03268B] border border-[#1B3B68] mt-4 rounded-tl-2xl rounded-br-2xl px-6 py-10 flex flex-col items-center justify-center text-center">
      <Image src="/logo.svg" alt="Space Spy" width={120} height={240} className="mx-auto mb-4" />
      <div className="text-2xl md:text-3xl font-geomGraphy text-[#E6F0FF] font-semibold mb-2">Your X Space Intelligence Platform</div>
      <div className="text-sm md:text-base text-[#6CA0F6] font-geomGraphy max-w-xl mx-auto">
        Transform X Spaces into valuable insights with our comprehensive AI-powered transcription and analysis platform
      </div>
    </div>
  );
}   