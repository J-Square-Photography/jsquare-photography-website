export function CardBranding() {
  return (
    <div className="text-center pt-8 pb-4 border-t" style={{ borderColor: 'var(--secondary, #6b7280)', borderTopWidth: '1px' }}>
      <a
        href="https://jsquarephotography.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium transition hover:opacity-80"
        style={{ color: 'var(--secondary, #6b7280)' }}
      >
        Powered by J Square Photography
      </a>
    </div>
  )
}
