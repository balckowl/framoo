import { CanvasImage, Img, staticFile } from 'remotion'

const getArtworkStyle = (overscanPercent: number) => ({
  position: 'absolute' as const,
  left: `-${overscanPercent}%`,
  top: `-${overscanPercent}%`,
  width: `${100 + overscanPercent * 2}%`,
  height: `${100 + overscanPercent * 2}%`,
})

type XmasArtworkProps = {
  /** Extra image bleed for camera moves that pan or rotate. */
  readonly overscanPercent?: number
}

/** The paired background and transparent character artwork used by demos. */
export const XmasArtwork = ({ overscanPercent = 0 }: XmasArtworkProps) => {
  const style = getArtworkStyle(overscanPercent)

  return (
    <>
      <Img
        src={staticFile('xmas-bg.png')}
        style={{ ...style, objectFit: 'cover' }}
      />
      <Img
        src={staticFile('xmas-girl.png')}
        style={{ ...style, objectFit: 'cover' }}
      />
    </>
  )
}

/** CanvasImage version for lyric demos that expose image layers in Studio. */
export const XmasCanvasArtwork = ({
  overscanPercent = 0,
}: XmasArtworkProps) => {
  const style = getArtworkStyle(overscanPercent)

  return (
    <>
      <CanvasImage src={staticFile('xmas-bg.png')} fit="cover" style={style} />
      <CanvasImage
        src={staticFile('xmas-girl.png')}
        fit="cover"
        style={style}
      />
    </>
  )
}
