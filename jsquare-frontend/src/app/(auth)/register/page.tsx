import { RegisterForm } from '@/components/auth/RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account | J Square Photography',
  description: 'Create your digital business card account',
}

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Create your card
      </h1>
      <RegisterForm />
    </>
  )
}
