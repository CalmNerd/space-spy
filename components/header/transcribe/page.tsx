"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/input";
import { AuthSection } from "@/components/header/components/AuthSection";
import { HeaderData } from "@/types/header";
import { useTranscribeStates } from "@/app/(private)/transcribe/_store/useTranscribeStates";
import Image from "next/image";
import { showToast } from "@/components/ui/Toast";
import { Toaster } from "react-hot-toast";
import { User } from '@/types/auth'

interface TranscribeHeaderProps {
    user: User
}

export default function TranscribeHeader({ user }: TranscribeHeaderProps) {
    const [isCollapsed] = useState(false);
    const [data, setData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [settings] = useState({
    //     avatar: "/Daniel.png",
    //     fullName: "Daniel Smith",
    //     email: "daniel@example.com"
    // });
    const { spaceMetadata, spaceState, handleSearchSpaceID, handleSearch } = useTranscribeStates((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/header/transcribe.json');
                if (!response.ok) throw new Error('Failed to fetch data');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError('Error loading header data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    useEffect(() => {
        if (spaceState && spaceState !== "Running") {
            showToast({ type: "error", message: "Space is not live" });
        }
    }, [spaceState]);

    useEffect(() => {
        if (spaceState && spaceState !== "Running") {
            showToast({ type: "error", message: "Space is not live" });
        }
    }, [spaceState]);

    if (loading) {
        return (
            <header className={cn(
                "z-10 h-[143px] flex flex-col",
                isCollapsed ? "lg:left-[111px]" : "lg:left-[311px]",
                "left-0",
                "bg-[#000714] bg-opacity-50 border-b border-[#0C3766] backdrop-blur-lg"
            )}>
                <div className="h-16 w-full flex items-center justify-center">
                    <div className="w-full max-w-md space-y-4">
                        <div className="h-6 bg-gray-700 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
                        <div className="h-6 bg-gray-700 rounded w-1/4 animate-pulse"></div>
                    </div>
                </div>
            </header>
        );
    }

    if (error || !data) {
        return (
            <header className={cn(
                "z-10 h-[143px] flex flex-col",
                isCollapsed ? "lg:left-[111px]" : "lg:left-[311px]",
                "left-0",
                "bg-[#000714] bg-opacity-50 border-b border-[#0C3766] backdrop-blur-lg"
            )}>
                <div className="h-16 w-full flex items-center justify-center">
                    <span className="text-red-500">{error || 'No data available'}</span>
                </div>
            </header>
        );
    }

    return (


        <header
            className={cn(
                "font-geomGraphy z-10 transition-all duration-300 flex items-center justify-center flex-col gap-5 pb-[35px]",
                "h-[9rem] flex flex-col",
                isCollapsed ? "lg:left-[111px]" : "lg:left-[311px]",
                "bg-[#000714] bg-opacity-50 backdrop-blur-lg",
                "mb-5"
            )}
            style={{
                backgroundImage: 'url("/transcribe/transcribe-header_bg.svg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Toaster position="top-center" reverseOrder={false} />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full h-full flex flex-col gap-2 md:gap-4">
                <div className="h-full flex items-start justify-between px-4 lg:px-5">
                    <div className="flex items-center text-xs xl:text-sm pt-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full" />
                        <span className="text-green-400 pl-2 pr-1.5">Session Type: Auto Join</span>
                        <div className="hidden xl:block relative h-4 w-4">
                            <Image src="/icons/info.svg" fill alt="info" />
                        </div>
                        {/* <span className="text-xs text-blue-400">tooltip explaining the currently selected mode</span> */}
                    </div>

                    <div className="flex items-center space-x-4 pt-4">
                        <div className="space-x-3 flex items-center">
                            <div className="relative min-w-80">
                                <SearchInput
                                    className="pr-4 h-10 bg-green-600 border border-[#0C3766] text-sm placeholder:text-foreground/50 placeholder:text-xs"
                                    placeholder="Search transcriptions..."
                                    onChange={(e) => handleSearchSpaceID(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex items-center space-x-1.5 px-3 py-3 border border-[#0C3766] bg-[#1D9BF01A] rounded-tr-xl">
                                <div className="relative h-4 w-4">
                                    <Image src="/icons/cloud.svg" fill alt="info" />
                                </div>
                                <span className="text-white text-[0.625rem]">Storage mins: 1800</span>
                            </div>

                            <div className="flex items-center space-x-1.5 px-3 py-3 border border-[#0C3766] bg-[#1D9BF01A] rounded-tr-xl">
                                <div className="relative h-4 w-4">
                                    <Image src="/icons/timer.svg" fill alt="info" />
                                </div>
                                <span className="text-white text-[0.625rem]">Transcription mins: 800</span>
                            </div>
                        </div>

                        <AuthSection user={user} />
                    </div>
                </div>

                {/* trump trending on host  */}
                <div className=" px-2 lg:px-4 flex flex-col gap-1.5">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex items-center gap-1">
                            <div className="relative h-5 w-5  inline-block">
                                {spaceMetadata && <Image src="/icons/file.svg" fill alt="info" />}
                            </div>
                            <span className="text-lg">
                                {spaceMetadata ? spaceMetadata[0]?.data?.audioSpace?.metadata?.title : ""}
                            </span>
                        </div>
                        <div className={spaceMetadata ? "inline-flex items-center text-sm bg-[#1D9BF01A] rounded-tl-[0.75rem] rounded-br-[0.75rem] text-[#1DA1F2] p-1.5" : "inline-flex items-center text-sm bg-[#1D9BF01A] rounded-tl-[0.75rem] rounded-br-[0.75rem] text-[#1DA1F2]"}>
                            <div className={spaceMetadata ? "inline-flex items-center text-sm bg-[#1D9BF01A] rounded-tl-[0.75rem] rounded-br-[0.75rem] text-[#1DA1F2] p-1.5" : "inline-flex items-center text-sm bg-[#1D9BF01A] rounded-tl-[0.75rem] rounded-br-[0.75rem] text-[#1DA1F2]"}>
                                {spaceMetadata &&
                                    <div className="relative h-2.5 w-2.5  inline-block mr-1">
                                        <Image src="/icons/x.svg" fill alt="info" />
                                    </div>
                                }
                                <span>
                                    {spaceMetadata ? spaceMetadata[0]?.data?.audioSpace?.metadata?.rest_id : ""}
                                </span>
                            </div>
                        </div>
                        <div className="pl-6  flex gap-3 items-center text-xs">
                            {spaceMetadata ? <div>
                                Hosted by <span className="text-[#3772FE]">{spaceMetadata ? spaceMetadata[0]?.data?.audioSpace?.metadata?.creator_results?.result?.legacy?.screen_name : ""}</span>
                            </div> : <div></div>}
                            {/* <div className="text-[#3772FE]">|</div>
                        <div className="text-[#05DF72CC]">
                            Monitored Account: @coconut_corn_
                        </div> */}
                        </div>
                    </div >
                </div >
            </div>
        </header >
    );
}