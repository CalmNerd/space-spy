'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import AuthForm from './auth-form'
import { useAuthStore } from '@/stores/useAuthStore'

export default function AuthDialog() {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { resetForm, setIsLoggedIn, resetErrors } = useAuthStore()

  useEffect(() => {
    const auth = searchParams.get('auth')
    if (auth === 'true') {
      setOpen(true)
    }
  }, [searchParams])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      resetForm()
      resetErrors()
      setIsLoggedIn(false)
      router.push('/dashboard')
    }
  }

  const handleSuccess = () => {
    setOpen(false)
    const redirectTo = searchParams.get('redirectTo') || '/dashboard'
    router.push(redirectTo)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-[90vw] max-w-[715px] max-h-[45vh] bg-[#00071480] rounded-xl border border-[#0C3766] p-0 overflow-y-auto"
        // style={{
        //   backgroundImage: 'url("/auth/modal_bg.svg")',
        //   backgroundSize: 'cover',
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        <DialogHeader className="hidden">
          <DialogTitle>Authentication</DialogTitle>
        </DialogHeader>
        <AuthForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}