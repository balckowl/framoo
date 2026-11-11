export const client = 'only'

export default function MusicVideoPreview() {
  return (
    <figure style={{ margin: 0 }}>
      <video
        aria-label="Framoo example music video"
        controls
        loop
        playsInline
        preload="metadata"
        poster="/installation-preview.jpg"
        src="/installation-preview.mp4"
        style={{
          aspectRatio: '16 / 9',
          background: '#0b0b10',
          borderRadius: 12,
          display: 'block',
          width: '100%',
        }}
      />
    </figure>
  )
}
