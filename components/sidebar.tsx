"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    BarChart2,
    Building2,
    Folder,
    Wallet,
    Receipt,
    CreditCard,
    Users2,
    Shield,
    MessagesSquare,
    Video,
    Settings,
    HelpCircle,
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
        { name: "Dashboard", href: "/", icon: Home },
        { name: "Transcribe", href: "/transcribe", icon: BarChart2 },
        { name: "How-to-Use", href: "/how-to-use", icon: Building2 },
        { name: "Trending Spaces", href: "/trending-spaces", icon: Folder },
    ],
    content: [
        { name: "My Library", href: "/my-library", icon: Wallet },
    ],
    account: [
        { name: "Profile", href: "/profile", icon: Receipt },
        { name: "Subscription", href: "/subscription", icon: CreditCard },
        { name: "Referrals", href: "/referrals", icon: Users2 },
    ],
    other: [
        { name: "What's New", href: "/whats-new", icon: Shield },
        { name: "Notifications", href: "/notifications", icon: MessagesSquare },
        { name: "Telegram Support", href: "/telegram-support", icon: Video },
    ],
    bottom: [
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Help", href: "/help", icon: HelpCircle },
    ]
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
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground",
                        isCollapsed && "justify-center px-2",
                    )}
                >
                    <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span>{item.name}</span>}
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
                <h3 className="mb-4 px-3 text-foreground/60 text-xs font-semibold uppercase tracking-wider">
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
                        "fixed inset-y-0 z-20 flex flex-col font-geomGraphy bg-background transition-all duration-300 ease-in-out lg:static",
                        isCollapsed ? "w-[72px]" : "w-72",
                        isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                    )}
                >
                    <div className="border-b border-border">
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
                                        {/* Space Spy */}
                                    </div>
                                </Link>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn("ml-auto h-8 w-8", isCollapsed && "ml-0")}
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <ChevronLeft className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
                                <span className="sr-only">{isCollapsed ? "Expand" : "Collapse"} Sidebar</span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-auto py-6 px-2">
                        <CategorySection title="DISCOVER" items={navigationItems.discover} />
                        
                        <div className="h-px bg-border my-4" />
                        <CategorySection title="CONTENT" items={navigationItems.content} />
                        
                        <div className="h-px bg-border my-4" />
                        <CategorySection title="ACCOUNT" items={navigationItems.account} />
                        
                        <div className="h-px bg-border my-4" />
                        <CategorySection title="OTHER" items={navigationItems.other} />
                    </div>

                    {/* might need in future */}

                    {/* <div className="border-t border-border p-2">
                        <nav className="space-y-1">
                            {navigationItems.bottom.map((item) => (
                                <NavItem key={item.name} item={item} />
                            ))}
                        </nav>
                    </div> */}
                </div>
            </>
        </TooltipProvider>
    )
}