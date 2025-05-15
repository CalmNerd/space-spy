import Image from "next/image";

export default function HowToUseHeader() {
  return (
    <div className="relative w-full" style={{minHeight: 80}}>
     
      <div className="relative flex items-center  xl:pl-6 pr-8 pt-2 xl:pt-6 pb-4 gap-5 z-10">
        <div className="bg-[#041322] w-16 h-16 flex items-center justify-center rounded-tr-3xl rounded-bl-3xl">
          <div className="relative h-[1.875rem] w-[1.875rem]">
                <Image src="/icons/how-to-use.svg" alt="icon" fill />
          </div>          
        </div>

        <div className="flex flex-col justify-center gap-1">
          <span className="text-3xl font-geomGraphy text-white font-semibold leading-tight">How To Use</span>
          <span className="text-lg text-[#E5E7EB] font-geomGraphy leading-tight mt-1">Transform X Spaces into valuable insights with AI</span>
        </div>
      </div>
    </div>
  );
} 