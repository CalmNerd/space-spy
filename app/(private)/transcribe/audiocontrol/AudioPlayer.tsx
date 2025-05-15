"use client";

import React, { useRef, useEffect } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image";
import { useSidebarStore } from "@/components/useSidebarStore";
import { useAudioControlStore } from "./useAudioControlStore";

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const playbackRef = useRef<HTMLDivElement>(null);
  const [showPlaybackOptions, setShowPlaybackOptions] = React.useState(false);
  
  const { isCollapsed } = useSidebarStore();
  const {
    audioUrl,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    volume,
    setVolume,
    playbackRate,
    setPlaybackRate,
    autoScroll,
    setAutoScroll
  } = useAudioControlStore();

  const playbackOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playbackRef.current &&
        !playbackRef.current.contains(event.target as Node)
      ) {
        setShowPlaybackOptions(false);
      }
    };

    if (showPlaybackOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPlaybackOptions]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setCurrentTime, setDuration, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Match volume with store values
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return;

    const progressBar = progressBarRef.current;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickPosition / progressBarWidth) * duration;

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
    }
  };

  const togglePlaybackOptions = () => {
    setShowPlaybackOptions(!showPlaybackOptions);
  };

  const selectPlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    setShowPlaybackOptions(false);
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="w-full h-fit mx-auto relative">
      <audio ref={audioRef} src={audioUrl} className="hidden" />

      <div
        className={`font-geomGraphy h-[6.125rem] bg-[url('/transcribe/audio-player_bg.svg')] bg-no-repeat bg-cover backdrop-filter backdrop-blur-lg
        // ${isCollapsed ? 'h-[7.175rem]' : 'h-[6.125rem]'}
        `}>
        <div className="px-6 py-5">
          {/* Progress bar */}
          <div className="flex flex-col gap-1 mb-2">
            <div
              ref={progressBarRef}
              className="h-1.5 bg-[rgba(250,250,250,0.2)] rounded-full cursor-pointer relative"
              onClick={handleProgressChange}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#3772FE] rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className="absolute top-1/2 left-0 h-4 w-4 bg-[#3772FE] border border-[rgba(250,250,250,0.5)] rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>

            {/* Time indicators */}
            <div className="flex justify-between text-xs text-[#A1A1AA]">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            {/* Left side - Volume */}
            <div className="flex items-center flex-1">
              <button className="p-1.5 rounded-md">
                <Volume2 size={16} className="text-[#3772FE]" />
              </button>
              <div className="ml-2 w-20 h-0.5 bg-[rgba(250,250,250,0.2)] rounded-full relative">
                {/* Filled bar */}
                <div
                  className="absolute top-0 left-0 h-full bg-[#3772FE] rounded-full"
                  style={{ width: `${volume * 100}%` }}
                />
                {/* Rounded tip */}
                <div
                  className="absolute top-1/2 h-3 w-3 bg-[#3772FE] border border-white rounded-full transform -translate-y-1/2"
                  style={{ left: `calc(${volume * 100}% - 6px)` }} // Adjust for width of tip
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Center - Playback controls */}
            <div className="flex items-center gap-2">
              <button onClick={handleSkipBackward} className="p-2 rounded-md hover:bg-[#041322]">
                <SkipBack size={16} className="text-[#3772FE]" />
              </button>

              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-9 h-9 bg-[#041322] rounded-xl border border-[#3772FE] hover:bg-[#052040]"
              >
                {isPlaying ?
                  <Pause size={20} className="text-[#3772FE]" /> :
                  <Play size={20} className="text-[#3772FE] ml-0.5" />
                }
              </button>

              <button onClick={handleSkipForward} className="p-2 rounded-md hover:bg-[#041322]">
                <SkipForward size={16} className="text-[#3772FE]" />
              </button>
            </div>

            {/* Right side - Auto scroll and playback speed */}
            <div className="flex items-center justify-end gap-3 flex-1">
              {/* Auto scrolling toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[rgba(255,255,255,0.8)]">Automatic scrolling</span>
                <div
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${autoScroll ? "bg-[rgba(29,155,240,0.1)]" : "bg-[rgba(250,250,250,0.1)]"
                    } border border-white cursor-pointer`}
                  onClick={() => setAutoScroll(!autoScroll)}
                >
                  <div
                    className={`absolute w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${autoScroll ? "translate-x-5" : "translate-x-1"
                      } top-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,_#FFFFFF_46.43%,_#012A8A_142.91%)]`}
                  ></div>
                </div>
              </div>

              {/* Audio Export button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="h-6 w-6 p-1 bg-[#03172B] border border-[#0098FF80] rounded-tr-[0.375rem] rounded-bl-[0.375rem]">
                      <div className="relative h-full w-full">
                        <Image
                          src="/icons/audio-export.svg"
                          alt="audio export"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>audio export</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Playback speed */}
              <div ref={playbackRef} className="relative w-[64px]">
                <button
                  onClick={togglePlaybackOptions}
                  className="w-full px-2 py-1 rounded-md text-xs cursor-pointer"
                >
                  {playbackRate}x
                </button>

                {showPlaybackOptions && (
                  <div className="absolute right-0 bottom-8 w-full bg-[#041322] border border-[#0C3766] rounded-md shadow-lg z-10">
                    {playbackOptions.map((rate) => (
                      <button
                        key={rate}
                        onClick={() => selectPlaybackRate(rate)}
                        className={`block w-full text-left px-4 py-2 text-xs hover:bg-[#052040] ${playbackRate === rate ? "text-[#3772FE]" : "text-white"
                          }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;