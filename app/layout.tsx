import type { Metadata } from 'next'
import { Geist, Geist_Mono, Roboto_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Sidebar } from '@/components/sidebar'
import Headers from '@/components/header/page'
import { createClient } from '@/utils/supabase/server'
import AuthDialog from '@/components/auth/auth-dialog'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const geomGraphy = localFont({
  src: [
    {
      path: "../public/fonts/GGRegular.otf",
      weight: '400',
    },
    {
      path: "../public/fonts/GGSemiBold.otf",
      weight: '500',
    },
  ],
  variable: "--font-GGraphy",
});

export const metadata: Metadata = {
  title: 'X Spora',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geomGraphy.variable} ${robotoMono.variable} antialiased`}
      >
          <TooltipProvider delayDuration={0}>
            <div className="relative h-full max-h-screen flex">
              <div className="-z-10 absolute inset-0 -top-[6px] bg-[radial-gradient(92.13%_92.13%_at_50%_7.87%,_#000000_60%,_#051528_93.5%)]" />
              <Sidebar />
              <div className="flex-1 flex flex-col p-5 max-h-screen overflow-y-hidden">
                <Headers user={user} />
                <div className="container mx-auto max-w-full flex-1 overflow-y-auto">
                  <main className="w-full">{children}</main>
                </div>
              </div>
            </div>
            <AuthDialog />
          </TooltipProvider>
      </body>
    </html>
  )
}