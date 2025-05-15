'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { CardCarousel } from '@/components/ui/card-carousel'
import Image from 'next/image'

const Icon = ({ name, className }: { name: string; className: string }) => {
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={20}
      height={20}
      alt={`${name} icon`}
      className={className}
    />
  )
}

interface NavItem {
  name: string
  href: string
  iconName: string
  badge?: boolean
}

interface NavItemProps {
  item: NavItem
}

interface CategorySectionProps {
  title: string
  items: NavItem[]
}

const navigationItems = {
  discover: [
    { name: 'Dashboard', href: '/dashboard', iconName: 'dashboard' },
    { name: 'Transcribe', href: '/transcribe', iconName: 'transcribe' },
    { name: 'How-to-Use', href: '/how-to-use', iconName: 'how-to-use' },
    { name: 'Trending Spaces', href: '/trending-spaces', iconName: 'trending-spaces', badge: true },
  ],
  content: [{ name: 'My Library', href: '/my-library', iconName: 'library' }],
  account: [
    { name: 'Profile', href: '/profile', iconName: 'profile' },
    { name: 'Subscription', href: '/subscription', iconName: 'subscription' },
    { name: 'Referrals', href: '/referrals', iconName: 'referrals' },
  ],
  other: [
    { name: "What's New", href: "/what's-new", iconName: 'whats-new', badge: true },
    { name: 'Notifications', href: '/notifications', iconName: 'notification' },
    { name: 'Telegram Support', href: '/telegram-support', iconName: 'telegram' },
  ],
}

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isSidebarCollapsed = pathname === '/' || pathname === '/dashboard' ? true : false

  const NavItem = ({ item }: NavItemProps) => {
    const isActive = pathname === item.href
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full flex items-center justify-start px-4 py-3 text-base font-geomGraphy border border-[#1B3B68] transition-none',
              'rounded-tr-2xl rounded-br-none rounded-tl-none rounded-bl-none',
              'text-foreground/80 text-sm',
              isActive
                ? 'sidebar-gradient-bg bg-foreground/15 font-geomGraphy'
                : 'bg-transparent hover:bg-[#1B3B68]/30 hover:text-[#E6F0FF] border border-transparent',
              isSidebarCollapsed && 'justify-center px-2 text-lg',
              'relative group'
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon
                name={item.iconName}
                className={cn(
                  'h-5 w-5 shrink-0',
                  !isSidebarCollapsed && 'mr-3',
                  isActive ? 'text-[#6CA0F6]' : 'text-[#6CA0F6] group-hover:text-[#E6F0FF]'
                )}
              />
              {!isSidebarCollapsed && (
                <span className="font-geomGraphy font-normal tracking-wide">{item.name}</span>
              )}
              {item.badge && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#6CA0F6]" />
              )}
            </Link>
          </Button>
        </TooltipTrigger>
        {isSidebarCollapsed && (
          <TooltipContent side="right" className="flex items-center gap-4">
            {item.name}
          </TooltipContent>
        )}
      </Tooltip>
    )
  }

  const CategorySection = ({ title, items }: CategorySectionProps) => (
    <div className="mb-2">
      {!isSidebarCollapsed && (
        <>
          <h3 className="mb-2 px-4 text-foreground/60 text-xs font-geomGraphy font-medium tracking-[0.2em] uppercase">
            {title}
          </h3>
          <div className="border-b border-[#1B3B68] mx-4 mb-2" />
        </>
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
            'fixed inset-y-0 z-20 flex flex-col font-geomGraphy transition-all duration-300 ease-in-out lg:static border-r border-[#1B3B68] bg-background/50',
            isSidebarCollapsed ? 'w-[72px]' : 'w-[311px]',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          )}
          style={{
            backgroundImage: 'url("/leftnav_bg.svg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="pt-4 pb-2 px-4">
            <div className={cn('flex h-16 items-center gap-2', isSidebarCollapsed && 'justify-center px-2')}>
              {!isSidebarCollapsed && (
                <Link href="/" className="flex items-center font-semibold h-full">
                  <div className="text-lg relative h-full w-full">
                    <Image
                      src="/logo.svg"
                      width={100}
                      height={100}
                      alt="logo"
                      className="h-full"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto pt-2 pb-0 px-0">
            <CategorySection title="DISCOVER" items={navigationItems.discover} />
            <CategorySection title="CONTENT" items={navigationItems.content} />
            <CategorySection title="ACCOUNT" items={navigationItems.account} />
            <CategorySection title="OTHER" items={navigationItems.other} />
          </div>
          {!isSidebarCollapsed && (
            <div className="px-3 pb-4 pt-2">
              <CardCarousel />
            </div>
          )}
        </div>
      </>
    </TooltipProvider>
  )
}