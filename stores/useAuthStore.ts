import { create } from 'zustand'
import { z } from 'zod'

// Zod schemas
const emailSchema = z.string().email({ message: 'Please enter a valid email address.' })
const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  // .regex(/[A-Za-z]/, { message: 'Password must contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
const retypePasswordSchema = z.string()

interface AuthState {
  isLoggedIn: boolean
  email: string
  password: string
  retypePassword: string
  emailError: string | null
  passwordError: string | null
  retypePasswordError: string | null
  serverError: string | null
  success: boolean
  loadingEmail: boolean
  loadingGoogle: boolean
  setIsLoggedIn: (value: boolean) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setRetypePassword: (retypePassword: string) => void
  setServerError: (error: string | null) => void
  setSuccess: (success: boolean) => void
  setLoadingEmail: (loading: boolean) => void
  setLoadingGoogle: (loading: boolean) => void
  validateForm: (formType: 'login' | 'signup' | 'forgot') => boolean
  resetForm: () => void
  resetErrors: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoggedIn: false,
  email: '',
  password: '',
  retypePassword: '',
  emailError: null,
  passwordError: null,
  retypePasswordError: null,
  serverError: null,
  success: false,
  loadingEmail: false,
  loadingGoogle: false,

  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  setEmail: (email) => {
    set({ email, emailError: null, serverError: null })
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      set({ emailError: result.error.errors[0]?.message })
    }
  },

  setPassword: (password) => {
    set({ password, passwordError: null, serverError: null })
    const result = passwordSchema.safeParse(password)
    if (!result.success) {
      set({ passwordError: result.error.errors[0]?.message })
    }
  },

  setRetypePassword: (retypePassword) => {
    set({ retypePassword, retypePasswordError: null, serverError: null })
    const password = get().password
    if (retypePassword !== password) {
      set({ retypePasswordError: 'Passwords do not match.' })
    }
  },

  setServerError: (serverError) => set({ serverError }),
  setSuccess: (success) => set({ success }),
  setLoadingEmail: (loading) => set({ loadingEmail: loading }),
  setLoadingGoogle: (loading) => set({ loadingGoogle: loading }),

  validateForm: (formType) => {
    const { email, password, retypePassword } = get()

    const emailResult = emailSchema.safeParse(email)
    set({ emailError: emailResult.success ? null : emailResult.error.errors[0]?.message })

    let isValid = emailResult.success

    if (formType === 'login' || formType === 'signup') {
      const passwordResult = passwordSchema.safeParse(password)
      set({ passwordError: passwordResult.success ? null : passwordResult.error.errors[0]?.message })
      isValid = isValid && passwordResult.success

      if (formType === 'signup') {
        const retypePasswordResult = retypePasswordSchema.safeParse(retypePassword)
        if (!retypePasswordResult.success) {
          set({ retypePasswordError: 'Please retype your password.' })
          isValid = false
        } else if (retypePassword !== password) {
          set({ retypePasswordError: 'Passwords do not match.' })
          isValid = false
        } else {
          set({ retypePasswordError: null })
        }
      }
    }

    return isValid
  },

  resetForm: () =>
    set({
      email: '',
      password: '',
      retypePassword: '',
      emailError: null,
      passwordError: null,
      retypePasswordError: null,
      serverError: null,
      success: false,
      loadingEmail: false,
      loadingGoogle: false,
    }),

  resetErrors: () =>
    set({
      emailError: null,
      passwordError: null,
      retypePasswordError: null,
      serverError: null,
    }),
}))