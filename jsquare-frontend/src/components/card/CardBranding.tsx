export function CardBranding() {
  return (
    <div className="text-center pt-8 pb-4 border-t" style={{ borderColor: 'var(--text)', opacity: 0.1 }}>
      <a
        href="https://jsquarephotography.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-medium transition hover:opacity-80"
        style={{ color: 'var(--secondary)' }}
      >
        Powered by J Square Photography
      </a>
    </div>
  )
}
