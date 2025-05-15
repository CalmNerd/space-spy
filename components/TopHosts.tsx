'use client';

import { Users } from 'lucide-react';
import Image from 'next/image';
import { Avatar } from './ui/avatar';
import { useEffect, useState } from 'react';
import { Host } from '@/types/hosts';
import hostsData from '../public/topHosts.json';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function TopHosts() {
    const [hosts, setHosts] = useState<Host[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API fetch with a timeout to show loading state
        const fetchHosts = () => {
            setIsLoading(true);

            // Simulating network request with timeout
            setTimeout(() => {
                try {
                    // Use the imported JSON data
                    setHosts(hostsData.hosts);
                    setError(null);
                } catch (err) {
                    console.error('Error loading hosts data:', err);
                    setError('Failed to load hosts data. Please try again later.');
                    setHosts([]);
                } finally {
                    setIsLoading(false);
                }
            }, 500); // Simulating a short load time
        };

        fetchHosts();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 w-full mx-auto">
                <h2 className="text-xl md:text-2xl uppercase tracking-wider font-normal text-white">
                    Top Hosts
                </h2>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-pulse text-blue-400">Loading hosts...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-4 w-full mx-auto">
                <h2 className="text-xl md:text-2xl uppercase tracking-wider font-normal text-white">
                    Top Hosts
                </h2>
                <div className="flex items-center justify-center py-8">
                    <div className="text-red-500">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full mx-auto font-geomGraphy">
            <h2 className="text-xl md:text-2xl uppercase tracking-wider font-normal text-white">
                Top Hosts
            </h2>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="grid auto-cols-[14.8rem] grid-flow-col gap-4">
                    {hosts.map((host, index) => (
                        <HostCard key={index} host={host} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}

interface HostCardProps {
    host: Host;
}

function HostCard({ host }: HostCardProps) {
    const avatarLetter = host.name.charAt(0);

    return (
        <div className="relative w-[14.79875rem] h-[7.46875rem] flex-shrink-0 host-card overflow-hidden">
            <Image
                fill
                src="/host_card_bg.svg"
                alt="gradient" />

            <div className="absolute top-4 left-4 flex items-end gap-2">
                <Avatar className="w-10 h-10 border rounded-tl-2xl border-[#025895]">
                    {host.profilePicture ? (
                        <Image
                            src={host.profilePicture}
                            alt={host.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold">
                            {avatarLetter}
                        </div>
                    )}
                </Avatar>

                <div className="flex flex-col">
                    <span className="text-lg text-white opacity-80 leading-tight">{host.name}</span>
                    <span className="text-xs text-white opacity-80">{host.handle}</span>
                </div>
            </div>

            {/* Host label and views */}
            <div className="absolute bottom-5 left-4 flex items-center">
                <span className="text-xs text-white opacity-80 mr-4">HOST</span>
                <div className="flex items-center gap-1">
                    <Users size={14} className="text-white opacity-80" />
                    <span className="text-xs text-white opacity-80">{host.views}</span>
                </div>
            </div>

            {/* Blue circle with icon */}
            <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full blue-circle flex items-center justify-center">
                <Image
                    src="/icons/icon.svg"
                    alt="icon"
                    fill
                />
            </div>
        </div>
    );
}