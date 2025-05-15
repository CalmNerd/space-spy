'use server'

import { createClient } from '@/utils/supabase/server'

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    },
  })

  return { success: !error, error: error?.message ?? null }
}