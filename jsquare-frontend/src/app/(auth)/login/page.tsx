import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | J Square Photography',
  description: 'Sign in to manage your digital business card',
}

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Welcome back
      </h1>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  )
}
