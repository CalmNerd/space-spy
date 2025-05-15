'use client'

import { useState } from 'react'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import ForgotPasswordForm from './forgot-password-form'

interface AuthFormProps {
  onSuccess: () => void
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | 'forgot'>('login')

  const changeModal = (modalType: 'login' | 'signup' | 'forgot') => {
    setActiveModal(modalType)
  }

  return (
    <div className="relative font-geomGraphy">
      {/* Close Button */}
      <button
        onClick={() => onSuccess()}
        className="absolute top-0 right-0 p-4 border-l border-b border-[#0C3766] rounded-bl-xl cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_di_2396_53116)">
            <path d="M22.6777 20.1212C22.7799 20.2234 22.8609 20.3448 22.9162 20.4783C22.9715 20.6118 23 20.7549 23 20.8994C23 21.044 22.9715 21.1871 22.9162 21.3206C22.8609 21.4541 22.7799 21.5755 22.6777 21.6777C22.5755 21.7799 22.4541 21.8609 22.3206 21.9162C22.1871 21.9715 22.044 22 21.8994 22C21.7549 22 21.6118 21.9715 21.4783 21.9162C21.3448 21.8609 21.2234 21.7799 21.1212 21.6777L12 12.555L2.87876 21.6777C2.67236 21.884 2.39243 22 2.10055 22C1.80867 22 1.52874 21.884 1.32234 21.6777C1.11595 21.4713 1 21.1913 1 20.8994C1 20.6076 1.11595 20.3276 1.32234 20.1212L10.445 11L1.32234 1.87876C1.11595 1.67236 1 1.39243 1 1.10055C1 0.808666 1.11595 0.528737 1.32234 0.322344C1.52874 0.11595 1.80867 0 2.10055 0C2.39243 0 2.67236 0.11595 2.87876 0.322344L12 9.44496L21.1212 0.322344C21.3276 0.11595 21.6076 -5.75373e-09 21.8994 0C22.1913 5.75373e-09 22.4713 0.11595 22.6777 0.322344C22.884 0.528737 23 0.808666 23 1.10055C23 1.39243 22.884 1.67236 22.6777 1.87876L13.555 11L22.6777 20.1212Z" fill="#3772FE" />
          </g>
        </svg>
      </button>

      <div className="pt-8 pb-4 px-4 sm:px-6 md:px-10">
        <h1 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.0625rem] font-normal text-[#0587FF] text-center">
          {activeModal === 'login' && 'Log In'}
          {activeModal === 'signup' && 'Create your account'}
          {activeModal === 'forgot' && 'Forgot password?'}
        </h1>
      </div>

      {activeModal === 'login' && <LoginForm onSuccess={onSuccess} onChangeModal={changeModal} />}
      {activeModal === 'signup' && <RegisterForm onSuccess={onSuccess} onChangeModal={changeModal} />}
      {activeModal === 'forgot' && <ForgotPasswordForm onSuccess={onSuccess} onChangeModal={changeModal} />}
    </div>
  )
}