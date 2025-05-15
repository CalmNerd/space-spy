import Image from 'next/image';

interface ChatMessageProps {
  image: string;
  name: string;
  timestamp: string;
  chat: string;
}

export default function ChatMessage({ image, name, timestamp, chat }: ChatMessageProps) {
  return (
    <div className="flex flex-col items-start gap-3 mb-9">
      <div className='h-full flex space-x-2'>
        <div className="rounded-full p-[2px] bg-gradient-to-b from-[#0C3766] to-[#186FCC] w-fit">
          <div className="rounded-full bg-[#0B1A2F] p-[2px]">
            <div className="rounded-full bg-gradient-to-b from-[#003A9E] via-[#002980] to-[#000316] p-[2px]">
              <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className="rounded-full bg-[#0B1A2F]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[#519BFF] text-xs">
          <span>{name}</span>
          <span>({timestamp})</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{chat}</div>
      </div>
    </div>
  );
} 