'use server'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { success: !error, error: error?.message ?? null }
}

export async function loginWithGoogle() {
  const supabase = await createClient()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not set in environment variables')
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/dashboard`,
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, url: data.url }
}