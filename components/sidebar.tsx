"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Mic2,
    HelpCircle,
    FolderHeart,
    Library,
    UserCircle,
    CreditCard,
    Users,
    Bell,
    Shield,
    MessageCircle,
    Menu,
    ChevronLeft,
    LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import Image from "next/image"

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
    badge?: boolean;
}

// interface NavigationItems {
//     discover: NavItem[];
//     content: NavItem[];
//     account: NavItem[];
//     other: NavItem[];
//     bottom: NavItem[];
// }

interface NavItemProps {
    item: NavItem;
}

interface CategorySectionProps {
    title: string;
    items: NavItem[];
}

// Reorganize navigation items by category
const navigationItems = {
    discover: [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Transcribe", href: "/transcribe", icon: Mic2 },
        { name: "How-to-Use", href: "/how-to-use", icon: HelpCircle },
        { name: "Trending Spaces", href: "/trending-spaces", icon: FolderHeart, badge: true },
    ],
    content: [
        { name: "My Library", href: "/my-library", icon: Library },
    ],
    account: [
        { name: "Profile", href: "/profile", icon: UserCircle },
        { name: "Subscription", href: "/subscription", icon: CreditCard },
        { name: "Referrals", href: "/referrals", icon: Users },
    ],
    other: [
        { name: "What's New", href: "/whats-new", icon: Shield, badge: true },
        { name: "Notifications", href: "/notifications", icon: Bell },
        { name: "Telegram Support", href: "/telegram-support", icon: MessageCircle },
    ],
}

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const NavItem = ({ item }:NavItemProps) => (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    href={item.href}
                    className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors relative",
                        pathname === item.href
                            ? "bg-[#0B2847] text-white"
                            : "text-[#8A93A6] hover:bg-[#0B2847] hover:text-white",
                        isCollapsed && "justify-center px-2",
                    )}
                >
                    <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span>{item.name}</span>}
                    {item.badge && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500" />
                    )}
                </Link>
            </TooltipTrigger>
            {isCollapsed && (
                <TooltipContent side="right" className="flex items-center gap-4">
                    {item.name}
                </TooltipContent>
            )}
        </Tooltip>
    )

    const CategorySection = ({ title, items }:CategorySectionProps) => (
        <div className="mb-6">
            {!isCollapsed && (
                <h3 className="mb-2 px-3 text-[#8A93A6] text-xs font-medium uppercase tracking-wider">
                    {title}
                </h3>
            )}
            <nav className="space-y-1">
                {items.map((item) => (
                    <NavItem key={item.name} item={item} />
                ))}
            </nav>
        </div>
    )

    return (
        <TooltipProvider>
            <>
                <button
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-md shadow-md"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div
                    className={cn(
                        "fixed inset-y-0 z-20 flex flex-col font-geomGraphy transition-all duration-300 ease-in-out lg:static",
                        isCollapsed ? "w-[72px]" : "w-[311px]",
                        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    )}
                    style={{
                        backgroundImage: 'url("/leftnav_bg.svg")',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="border-b border-[#0C3766]/50">
                        <div className={cn("flex h-16 items-center gap-2 px-4", isCollapsed && "justify-center px-2")}>
                            {!isCollapsed && (
                                <Link href="/" className="flex items-center font-semibold h-full">
                                    <div className="text-lg relative h-full w-full">
                                        <Image
                                            src="/logo.svg"
                                            width={150}
                                            height={150}
                                            alt="logo"
                                            className="h-full"
                                        />
                                    </div>
                                </Link>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn("ml-auto h-8 w-8 text-white", isCollapsed && "ml-0")}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
                                <span className="sr-only">{isCollapsed ? "Expand" : "Collapse"} Sidebar</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto py-6 px-3">
                        <CategorySection title="DISCOVER" items={navigationItems.discover} />
                        <CategorySection title="CONTENT" items={navigationItems.content} />
                        <CategorySection title="ACCOUNT" items={navigationItems.account} />
                        <CategorySection title="OTHER" items={navigationItems.other} />
                    </div>

                    {!isCollapsed && (
                        <div className="p-4 mx-3 mb-4 bg-[#0B2847] rounded-lg">
                            <div className="text-sm font-medium text-white mb-1">Refer and get $5</div>
                            <div className="text-xs text-[#8A93A6] mb-3">Invite your friends to sign up using your referral code</div>
                            <Button variant="outline" className="w-full bg-transparent text-white border-[#0C3766] hover:bg-[#0C3766]/50">
                                Refer
                            </Button>
                        </div>
                    )}
                </div>
            </>
        </TooltipProvider>
    )
}