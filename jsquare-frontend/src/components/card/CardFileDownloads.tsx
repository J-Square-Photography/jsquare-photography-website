interface UploadedFile {
  id: string
  file_url: string
  file_name: string
  file_size_bytes: number
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}

export function CardFileDownloads({ files, accentColor }: { files: UploadedFile[]; accentColor: string }) {
  const iconColor = isLightColor(accentColor) ? '#000000' : '#ffffff'

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Downloads</h2>
      <div className="space-y-2">
        {files.map((file) => (
          <a
            key={file.id}
            href={file.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl transition hover:opacity-80"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColor }}>
              <svg className="w-5 h-5" style={{ color: iconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{file.file_name}</p>
              <p className="text-xs" style={{ color: 'var(--secondary)' }}>{formatSize(file.file_size_bytes)}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
