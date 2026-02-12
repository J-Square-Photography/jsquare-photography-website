import { createClient } from './client'

type Bucket = 'profile-photos' | 'cover-images' | 'portfolio-images' | 'uploaded-files'

const BUCKET_LIMITS: Record<Bucket, { maxSize: number; allowedTypes: string[] }> = {
  'profile-photos': { maxSize: 5 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'cover-images': { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'portfolio-images': { maxSize: 10 * 1024 * 1024, allowedTypes: ['image/jpeg', 'image/png', 'image/webp'] },
  'uploaded-files': { maxSize: 20 * 1024 * 1024, allowedTypes: ['application/pdf'] },
}

export async function uploadFile(
  bucket: Bucket,
  userId: string,
  file: File,
  fileName?: string
): Promise<{ url: string; path: string }> {
  const limits = BUCKET_LIMITS[bucket]

  if (file.size > limits.maxSize) {
    throw new Error(`File size exceeds ${limits.maxSize / (1024 * 1024)}MB limit`)
  }

  if (!limits.allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed. Accepted: ${limits.allowedTypes.join(', ')}`)
  }

  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const name = fileName || `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
  const path = `${userId}/${name}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return { url: urlData.publicUrl, path }
}

export async function deleteFile(bucket: Bucket, path: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw error
}

export function getPublicUrl(bucket: Bucket, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
