import { z } from 'zod'

const RESERVED_USERNAMES = [
  'admin', 'dashboard', 'portfolio', 'services', 'about', 'contact',
  'login', 'register', 'signup', 'signin', 'logout', 'signout',
  'settings', 'profile', 'account', 'api', 'card', 'cards',
  'onboarding', 'forgot-password', 'reset-password',
  'coming-soon', 'under-construction',
  'jsquare', 'jsquarephotography', 'photography',
  'help', 'support', 'billing', 'pricing', 'blog', 'news',
  'terms', 'privacy', 'null', 'undefined', 'test', 'demo',
]

export const usernameSchema = z
  .string()
  .min(2, 'Username must be at least 2 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, hyphens, and underscores allowed')
  .refine(
    (val) => !RESERVED_USERNAMES.includes(val.toLowerCase()),
    'This username is reserved'
  )

export type UsernameInput = z.infer<typeof usernameSchema>
