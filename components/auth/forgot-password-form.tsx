'use client'

import { Input } from '@/components/ui/input'
import { forgotPassword } from '@/actions/forgot-password'
import OrDivider from './or-divider'
import SocialButton from './social-button'
import { loginWithGoogle } from '@/actions/login'
import { useAuthStore } from '@/stores/useAuthStore'

interface ForgotPasswordFormProps {
  onSuccess: () => void
  onChangeModal: (modalType: 'login' | 'signup' | 'forgot') => void
}

export default function ForgotPasswordForm({ onSuccess, onChangeModal }: ForgotPasswordFormProps) {
  const {
    email,
    emailError,
    serverError,
    success,
    loadingEmail,
    loadingGoogle,
    setEmail,
    setServerError,
    setSuccess,
    setLoadingEmail,
    validateForm,
    resetForm,
    setLoadingGoogle,
    setIsLoggedIn,
    resetErrors,
  } = useAuthStore()

  const handleSubmit = async (formData: FormData) => {
    if (!validateForm('forgot')) return

    setLoadingEmail(true)
    setServerError(null)

    const result = await forgotPassword(formData)
    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        onSuccess()
        resetForm()
      }, 3000)
    } else {
      setServerError(result.error ?? 'An error occurred while sending the reset link.')
    }

    setLoadingEmail(false)
  }

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true)
    setServerError(null)

    const result = await loginWithGoogle()
    if (result.success && result.url) {
      setIsLoggedIn(true)
      setSuccess(true)
      setTimeout(() => {
        resetForm()
        window.location.href = result.url
      }, 3000)
    } else {
      setServerError(result.error ?? 'An error occurred during Google login.')
    }

    setLoadingGoogle(false)
  }

  const handleChangeModal = (modalType: 'login' | 'signup' | 'forgot') => {
    resetErrors()
    onChangeModal(modalType)
  }

  const isAnyLoading = loadingEmail || loadingGoogle

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-10 pb-6 md:pb-10 space-y-4 md:space-y-7">
      {success && (
        <p className="text-green-500 text-xs md:text-sm text-center">
          A password reset link has been sent to your email.
        </p>
      )}
      {serverError && <p className="text-red-500 text-xs md:text-sm text-center">{serverError}</p>}

      {!success && (
        <>
          <form action={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-white text-xs md:text-sm font-semibold">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAnyLoading}
                required
                className="w-full h-10 md:h-14 bg-[#1D9BF01A] border border-[#3772FE80] rounded-lg px-3 md:px-5 text-xs md:text-sm focus:outline-none focus:border-[#3772FE]"
              />
              {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            </div>

            <button
              type="submit"
              disabled={isAnyLoading}
              className="w-full h-10 md:h-12 bg-[#1D9BF01A] cursor-pointer border border-[#3772FE80] hover:bg-[#1D9BF033] backdrop-blur rounded-br-[0.75rem] rounded-tl-[0.75rem] mt-4 md:mt-7 disabled:opacity-50"
            >
              <span className="text-sm md:text-base">{loadingEmail ? 'Sending...' : 'Reset your password'}</span>
            </button>
          </form>

          <OrDivider text="OR SIGN IN WITH ANOTHER" />

          <SocialButton
            provider="google"
            text="Continue with Google"
            onClick={handleGoogleLogin}
            disabled={isAnyLoading}
          />

          <div className="text-center pt-3 md:pt-4">
            <button
              type="button"
              onClick={() => handleChangeModal('login')}
              disabled={isAnyLoading}
              className="text-[#6188FF] cursor-pointer text-xs md:text-sm disabled:opacity-50"
            >
              Back to login
            </button>
          </div>
        </>
      )}
    </div>
  )
}