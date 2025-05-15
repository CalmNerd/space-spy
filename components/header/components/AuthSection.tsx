'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/actions/logout'
import { User } from '@/types/auth'
// import { useSettings } from '@/contexts/settings-context'

interface AuthSectionProps {
  user: User | null
}

export function AuthSection({ user }: AuthSectionProps) {
  const router = useRouter()
  const pathname = usePathname()
  // const { settings } = useSettings()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const handleLogin = () => {
    // Include the current pathname as the redirectTo parameter
    const redirectTo = pathname === '/dashboard' ? '' : pathname
    router.push(`/dashboard?auth=true${redirectTo ? `&redirectTo=${redirectTo}` : ''}`)
  }

  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="font-geomGraphy relative h-8 w-8 rounded-full cursor-pointer p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.email}
                  alt={user?.email}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <AvatarFallback className='h-10 w-10 flex items-center justify-center'>{getInitials(user?.email || "User")}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-geomGraphy" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.phone}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form
                action={async () => {
                  await logout()
                  router.refresh()
                }}
              >
                <button type="submit" className="w-full text-left">
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <button
      className="h-10 px-6 border border-[#0098FF80] text-[#3772FE] blue-shadow-button backdrop-blur-sm text-sm rounded-tl-2xl rounded-br-2xl cursor-pointer"
      onClick={handleLogin}
    >
      Login
    </button>
  )
}