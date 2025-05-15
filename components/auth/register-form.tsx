'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { register } from '@/actions/register'
import { loginWithGoogle } from '@/actions/login'
import OrDivider from './or-divider'
import SocialButton from './social-button'
import { useAuthStore } from '@/stores/useAuthStore'

interface RegisterFormProps {
  onSuccess: () => void
  onChangeModal: (modalType: 'login' | 'signup' | 'forgot') => void
}

export default function RegisterForm({ onSuccess, onChangeModal }: RegisterFormProps) {
  const router = useRouter()
  const {
    email,
    password,
    retypePassword,
    emailError,
    passwordError,
    retypePasswordError,
    serverError,
    success,
    loadingEmail,
    loadingGoogle,
    setEmail,
    setPassword,
    setRetypePassword,
    setServerError,
    setSuccess,
    setLoadingEmail,
    setLoadingGoogle,
    setIsLoggedIn,
    validateForm,
    resetForm,
    resetErrors,
  } = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [showRetypePassword, setShowRetypePassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    if (!agreeToTerms) {
      setServerError('You must agree to the Terms of Service and Privacy Policy.')
      return
    }

    if (!validateForm('signup')) return

    setLoadingEmail(true)
    setServerError(null)

    const result = await register(formData)
    if (result.success) {
      setSuccess(true)
      setIsLoggedIn(true)
      setTimeout(() => {
        onSuccess()
        resetForm()
        router.refresh()
      }, 3000)
    } else {
      setServerError(result.error ?? 'An error occurred during registration.')
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
          Registration successful! A confirmation link has been sent to your email.
        </p>
      )}
      {serverError && <p className="text-red-500 text-xs md:text-sm text-center">{serverError}</p>}

      {!success && (
        <>
          <div className="space-y-3 md:space-y-4">
            <SocialButton
              provider="google"
              text={loadingGoogle ? 'Loading...' : 'Continue with Google'}
              onClick={handleGoogleLogin}
              disabled={isAnyLoading}
            />
            <SocialButton
              provider="wallet"
              text="Continue with Wallet"
              onClick={() => { }}
              disabled={isAnyLoading}
            />
          </div>

          <OrDivider text="OR CONTINUE WITH EMAIL" />

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
                className="w-full h-10 md:h-14 bg-[#1D9BF01A] border border-[#3772FE80] rounded-lg px-3 md:px-5 text-xs md:text-sm"
              />
              {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            </div>

            <div className="space-y-2 mt-4 md:mt-7">
              <label className="block text-white text-xs md:text-sm font-semibold">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAnyLoading}
                  required
                  className="w-full h-10 md:h-14 bg-[#1D9BF01A] border border-[#3772FE80] rounded-lg px-3 md:px-5 text-xs md:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isAnyLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12S5.73 5 12 5s10 7 10 7-3.73 7-10 7-10-7-10-7z" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1l22 22" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
            </div>

            <div className="space-y-2 mt-4 md:mt-7">
              <label className="block text-white text-xs md:text-sm font-semibold">Retype Password</label>
              <div className="relative">
                <Input
                  type={showRetypePassword ? 'text' : 'password'}
                  name="retypePassword"
                  placeholder="Enter your password..."
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  disabled={isAnyLoading}
                  required
                  className="w-full h-10 md:h-14 bg-[#1D9BF01A] border border-[#3772FE80] rounded-lg px-3 md:px-5 text-xs md:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  disabled={isAnyLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer disabled:opacity-50"
                >
                  {showRetypePassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12S5.73 5 12 5s10 7 10 7-3.73 7-10 7-10-7-10-7z" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 1l22 22" stroke="#636C7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
              {retypePasswordError && <p className="text-red-500 text-xs">{retypePasswordError}</p>}
            </div>

            <div className="flex items-center space-x-2 md:space-x-3 mt-4 md:mt-7">
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded flex items-center justify-center cursor-pointer ${agreeToTerms ? 'bg-gradient-to-b from-[#03268B] to-[#000212]' : 'border border-[#3772FE80]'}`}
                onClick={() => setAgreeToTerms(!agreeToTerms)}
              >
                {agreeToTerms && (
                  <svg width="8" height="6" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-xs md:text-sm">
                I agree to the{' '}
                <a href="#" className="underline">Terms of Service</a> and{' '}
                <a href="#" className="underline">Privacy Policy</a>.
              </span>
            </div>

            <button
              type="submit"
              disabled={isAnyLoading}
              className="w-full h-10 md:h-12 bg-[#1D9BF01A] cursor-pointer border border-[#3772FE80] hover:bg-[#1D9BF033] backdrop-blur rounded-br-[0.75rem] rounded-tl-[0.75rem] mt-4 md:mt-7 disabled:opacity-50"
            >
              <span className="text-sm md:text-base">{loadingEmail ? 'Creating account...' : 'Create an account'}</span>
            </button>
          </form>

          <div className="text-center pt-3 md:pt-4">
            <p className="text-[#A1A7BB] text-xs">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleChangeModal('login')}
                disabled={isAnyLoading}
                className="text-[#6188FF] cursor-pointer disabled:opacity-50"
              >
                Sign in
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  )
}