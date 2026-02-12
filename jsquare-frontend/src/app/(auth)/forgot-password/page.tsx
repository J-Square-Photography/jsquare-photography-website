import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password | J Square Photography',
  description: 'Reset your password',
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Reset password
      </h1>
      <ForgotPasswordForm />
    </>
  )
}
