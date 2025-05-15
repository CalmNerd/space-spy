import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request)

  // Protect private routes
  if (
    request.nextUrl.pathname.startsWith('/my-library') ||
    request.nextUrl.pathname.startsWith('/notifications') ||
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/referrals') ||
    request.nextUrl.pathname.startsWith('/subscription') ||
    request.nextUrl.pathname.startsWith('/transcribe') ||
    request.nextUrl.pathname.startsWith('/trending-spaces')
  ) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      url.searchParams.set('auth', 'true')
      
      // Store the intended redirect URL
      url.searchParams.set('redirectTo', request.nextUrl.pathname + request.nextUrl.search)
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}