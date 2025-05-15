"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import Image from "next/image"

interface CardCarouselProps {
  className?: string
}

const cards = [
  {
    title: "Get PRO Subscription",
    description: "Unlock all premium features",
    buttonText: "Unlock",
    icon: "globe",
  },
  {
    title: "Refer and get $5",
    description: "Get $5 when someone signs up using your referral link",
    buttonText: "Refer",
    icon: "star",
  },
]

export function CardCarousel({ className }: CardCarouselProps) {
  return (
    <div className={cn("w-full px-3", className)}>
      <Swiper
        spaceBetween={12}
        slidesPerView={1}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            {/* Wrapper div to contain both card and overflow content */}
            <div className="relative pt-16">
              <div 
                className={cn(
                  "relative rounded-2xl bg-[#0B2847] p-6 h-[180px]",
                )}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 border border-[#0F507E] bg-gradient-to-r from-[#00004C]/50 to-[#3772FE]/50 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-20">
                  <h3 className="font-geomGraphy text-xl text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-[#8A93A6] mb-4">{card.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-[#03172B] rounded-tl-xl rounded-br-xl text-[#2160DC] border-[#2160DC]/20 hover:bg-[#2160DC]/10 hover:text-[#2160DC] hover:border-[#2160DC]/30 font-geomGraphy"
                  >
                    {card.buttonText}
                  </Button>
                </div>

                {/* Icon */}
                <div className="absolute z-30 right-0 -top-16 w-[78px] h-[110px]">
                  <Image
                    src={card.icon === "star" ? "/referstar.svg" : "/proglobe.png"}
                    alt="Decoration"
                    width={78}
                    height={110}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination flex justify-center items-center mt-2" />
    </div>
  )
} 