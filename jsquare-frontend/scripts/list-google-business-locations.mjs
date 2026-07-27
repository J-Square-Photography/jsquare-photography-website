#!/usr/bin/env node
// One-off setup script: lists your Google Business Profile accounts and
// locations so you can find the resource name for GOOGLE_BUSINESS_LOCATION
// (accounts/{accountId}/locations/{locationId}).
//
// Requires GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET and
// GOOGLE_OAUTH_REFRESH_TOKEN to already be set in .env.local — run the OAuth
// flow at http://localhost:3000/api/google-reviews/authorize first if you
// don't have a refresh token yet.
//
// Usage: npm run sync:list-locations

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnvLocal() {
  const path = join(__dirname, '..', '.env.local')
  let contents
  try {
    contents = readFileSync(path, 'utf-8')
  } catch {
    console.error(`Could not read ${path}. Copy .env.local.example to .env.local first.`)
    process.exit(1)
  }

  for (const line of contents.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}

async function getAccessToken() {
  const required = ['GOOGLE_OAUTH_CLIENT_ID', 'GOOGLE_OAUTH_CLIENT_SECRET', 'GOOGLE_OAUTH_REFRESH_TOKEN']
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) {
    console.error(`Missing in .env.local: ${missing.join(', ')}`)
    process.exit(1)
  }

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    console.error('Token refresh failed:', data)
    process.exit(1)
  }
  return data.access_token
}

async function main() {
  loadEnvLocal()
  const accessToken = await getAccessToken()
  const headers = { Authorization: `Bearer ${accessToken}` }

  const accountsRes = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers,
  })
  const accountsData = await accountsRes.json()
  if (!accountsRes.ok) {
    console.error('Failed to list accounts:', accountsData)
    process.exit(1)
  }

  const accounts = accountsData.accounts ?? []
  if (accounts.length === 0) {
    console.log('No accounts found for this Google login. Make sure you authorized as the business owner.')
    return
  }

  for (const account of accounts) {
    console.log(`\nAccount: ${account.accountName} (${account.name})`)

    const locationsRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title&pageSize=100`,
      { headers }
    )
    const locationsData = await locationsRes.json()
    if (!locationsRes.ok) {
      console.error(`  Failed to list locations for ${account.name}:`, locationsData)
      continue
    }

    const locations = locationsData.locations ?? []
    if (locations.length === 0) {
      console.log('  (no locations)')
      continue
    }

    for (const location of locations) {
      const locationId = location.name.split('/').pop()
      const resourceName = `${account.name}/locations/${locationId}`
      console.log(`  - ${location.title}`)
      console.log(`    GOOGLE_BUSINESS_LOCATION=${resourceName}`)
    }
  }
}

main()
