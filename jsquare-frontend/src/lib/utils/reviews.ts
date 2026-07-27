/** First letter(s) of a name, used as avatar fallback */
export function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Compute a human-friendly relative time from an ISO date string */
export function getRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 30) return days <= 1 ? 'yesterday' : `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return months === 1 ? 'a month ago' : `${months} months ago`
  const years = Math.floor(months / 12)
  return years === 1 ? 'a year ago' : `${years} years ago`
}
