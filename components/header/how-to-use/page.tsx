"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AuthSection } from "@/components/header/components/AuthSection";
import { HeaderData } from "@/types/header";
import { User } from '@/types/auth'

interface HowToHeaderProps {
  user: User
}

export default function HowToHeader({user}: HowToHeaderProps ) {
    const [isCollapsed] = useState(false);
    const [data, setData] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [settings] = useState({
    //     avatar: "/Daniel.png",
    //     fullName: "Daniel Smith",
    //     email: "daniel@example.com"
    // });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/header/how-to-use.json');
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

    if (loading) {
        return (
            <header className={cn(
                "z-10 h-[143px] flex flex-col gap-5 pt-[21px] pb-[35px]",
                isCollapsed ? "lg:left-[111px]" : "lg:left-[311px]",
                "bg-[#000714] bg-opacity-50 border-b border-[#0C3766] backdrop-blur-lg animate-pulse"
            )}>
                <div className="w-full px-4 lg:px-6 flex justify-between items-center h-10">
                    <div className="flex items-center space-x-4">
                        <div className="h-6 w-40 bg-[#1a1a2e] rounded-md" />
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 bg-[#1a1a2e] rounded-full" />
                            <div className="h-4 w-32 bg-[#1a1a2e] rounded-md" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="h-9 w-24 bg-[#1a1a2e] rounded-md" />
                        <div className="h-9 w-24 bg-[#1a1a2e] rounded-md" />
                        <div className="h-9 w-9 bg-[#1a1a2e] rounded-full" />
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
                "font-geomGraphy z-10 transition-all duration-300 flex items-center justify-center flex-col gap-5 pt-[21px] pb-[35px]",
                "h-[9rem] flex flex-col",
                isCollapsed ? "lg:left-[111px]" : "lg:left-[311px]",
                "bg-[#000714] bg-opacity-50 border border-[#0C3766] backdrop-blur-lg"
            )}
        >
            <div className="w-full">
                <div className="h-10 flex justify-between items-center px-4 lg:px-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-lg font-bold text-white">How to Use Guide</h1>
                        <div className="flex items-center space-x-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span className="text-blue-400">Step-by-step instructions</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="bg-[#0C3766] bg-opacity-30 text-white px-4 py-2 flex items-center space-x-2 border border-[#0C3766]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#6CA0F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Support</span>
                        </button>
                        <button className="bg-[#1D4ED8] text-white px-6 py-2 flex items-center space-x-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Profile</span>
                        </button>

                        <AuthSection user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
}