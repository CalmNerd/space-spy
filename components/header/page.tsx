"use client";

import { usePathname } from "next/navigation";
import DashboardHeader from "./dashboard/page";
import TranscribeHeader from "./transcribe/page";
import HowToHeader from "./how-to-use/page";
import { User } from '@/types/auth'

interface HeadersProps {
  user: User
}

export default function Headers({user}:HeadersProps) {
    const pathname = usePathname();
    const routeKey = pathname.split('/')[1] || 'dashboard';

    switch (routeKey) {
        case 'transcribe':
            return <TranscribeHeader user={user}/>;
        case 'how-to-use':
            return <HowToHeader user={user} />;
        case 'dashboard':
        default:
            return <DashboardHeader user={user} />;
    }
}