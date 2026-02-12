import { getEmbedUrl } from '@/lib/utils/video-embed'

interface EmbeddedVideo {
  id: string
  video_url: string
  title: string
}

export function CardVideoEmbed({ videos }: { videos: EmbeddedVideo[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Videos</h2>
      <div className="space-y-4">
        {videos.map((video) => {
          const embedUrl = getEmbedUrl(video.video_url)
          if (!embedUrl) return null
          return (
            <div key={video.id}>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              {video.title && (
                <p className="text-sm mt-2 font-medium">{video.title}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
