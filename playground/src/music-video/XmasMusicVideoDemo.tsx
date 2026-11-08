import { AbsoluteFill, Img, staticFile, useVideoConfig } from 'remotion'
import { Audio } from '@remotion/media'
import {
  handheldDrift,
  GodRays,
  LensFlare,
  LyricBlink,
  LyricCharacterReveal,
  LyricCharacterScale,
  LyricCharacterUnderline,
  LyricFade,
  LyricGather,
  LyricsLayout,
  LyricLetterSpacing,
  LyricSlide,
  moveTo,
  ParticleField,
  SceneLayer,
  SceneStage,
  snapZoom,
  secondsToFrameRange,
  type CameraTrack,
} from '../library'
import { PLAYGROUND_FPS } from '../config'

export const XMAS_MUSIC_VIDEO_FPS = PLAYGROUND_FPS
const DURATION_IN_SECONDS = 100
export const XMAS_MUSIC_VIDEO_DURATION_IN_FRAMES =
  XMAS_MUSIC_VIDEO_FPS * DURATION_IN_SECONDS

// Camera decisions follow the lyric in two-line groups. A short snap zoom is
// reserved for the moment their eyes meet; the rest stays restrained.
const camera: CameraTrack = {
  initial: { x: 0.5, y: 0.52, zoom: 1.02, rotation: 0 },
  moves: [
    moveTo({
      ...secondsToFrameRange(0, 9.46, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.5, y: 0.48, zoom: 1.06 },
    }),
    moveTo({
      ...secondsToFrameRange(9.46, 18.82, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.55, y: 0.42, zoom: 1.13 },
    }),
    moveTo({
      ...secondsToFrameRange(18.82, 27.7, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.54, y: 0.43, zoom: 1.07 },
    }),
    snapZoom({
      ...secondsToFrameRange(27.89, 30.29, XMAS_MUSIC_VIDEO_FPS),
      focus: { x: 0.56, y: 0.42 },
      zoom: 1.17,
      overshoot: 0.025,
    }),
    moveTo({
      ...secondsToFrameRange(30.29, 37.13, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.55, y: 0.42, zoom: 1.13 },
    }),
    moveTo({
      ...secondsToFrameRange(37.13, 47.17, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.5, y: 0.52, zoom: 1.03 },
    }),
    moveTo({
      ...secondsToFrameRange(47.17, 50.02, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.5, y: 0.48, zoom: 1.06 },
    }),
    moveTo({
      ...secondsToFrameRange(50.02, 59.66, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.55, y: 0.42, zoom: 1.16 },
    }),
    moveTo({
      ...secondsToFrameRange(60.36, 68.97, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.56, y: 0.42, zoom: 1.17 },
    }),
    moveTo({
      ...secondsToFrameRange(68.97, 78.75, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.51, y: 0.46, zoom: 1.08 },
    }),
    moveTo({
      ...secondsToFrameRange(78.75, 88.31, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.5, y: 0.56, zoom: 1.04 },
    }),
    moveTo({
      ...secondsToFrameRange(88.31, 97.57, XMAS_MUSIC_VIDEO_FPS),
      to: { x: 0.55, y: 0.42, zoom: 1.12 },
    }),
  ],
  effects: [
    handheldDrift({
      from: 0,
      durationInFrames: XMAS_MUSIC_VIDEO_DURATION_IN_FRAMES,
      intensity: 0.3,
      rotation: 0.025,
      frequencyHz: 0.28,
    }),
  ],
}

const Artwork = ({ src }: { readonly src: string }) => (
  <Img
    src={staticFile(src)}
    style={{
      position: 'absolute',
      left: '-12%',
      top: '-12%',
      width: '124%',
      height: '124%',
      objectFit: 'cover',
    }}
  />
)

export const XmasMusicVideoDemo = () => {
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{ backgroundColor: '#111728' }}>
      <SceneStage camera={camera}>
        <SceneLayer followsCamera depth={0.76}>
          <Artwork src="xmas-bg.png" />
          <GodRays
            source={{ x: 0.97, y: 0.07 }}
            angleDegrees={135}
            spreadDegrees={110}
            rayCount={13}
            intensity={0.36}
            color="#ffd99a"
            length={1.25}
            softness={7}
          />
          <LensFlare
            source={{ x: 0.97, y: 0.07 }}
            color="#ffd99a"
            intensity={0.1}
            anamorphic={false}
          />
        </SceneLayer>

        <SceneLayer followsCamera depth={1.04}>
          <Artwork src="xmas-girl.png" />
        </SceneLayer>

        <SceneLayer followsCamera={false}>
          <ParticleField
            preset="snow"
            density={0.2}
            sizeScale={1}
            depth="mixed"
          />
          <LyricsLayout>
            <LyricFade
              name="9.46s · 白い息が消える帰り道"
              {...secondsToFrameRange(9.46, 14.28, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size={'md'}
              anchor="center"
            >
              白い息が消える帰り道
            </LyricFade>
            <LyricCharacterReveal
              name="14.28s · 君の横顔を見つめていた"
              {...secondsToFrameRange(14.28, 18.82, fps)}
              position={{ x: 0.5, y: 0.73 }}
              size="md"
              motion={{ fadeDurationInFrames: 10, staggerInFrames: 2 }}
            >
              君の横顔を見つめていた
            </LyricCharacterReveal>
            <LyricSlide
              name="18.82s · 「じゃあね」って君が手を振る"
              {...secondsToFrameRange(18.82, 23.62, fps)}
              enterFrom="right"
              position={{ x: 0.5, y: 0.77 }}
              size="md"
              motion={{ distanceEm: 0.5, durationInFrames: 18 }}
            >
              「じゃあね」って君が手を振る
            </LyricSlide>
            <LyricFade
              name="23.62s · 空からは雪が降る"
              {...secondsToFrameRange(23.62, 27.7, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="md"
            >
              空からは雪が降る
            </LyricFade>
            <LyricGather
              name="27.89s · 振り返る君と目が合って"
              {...secondsToFrameRange(27.89, 32.39, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="md"
              motion={{
                settleDurationInFrames: 22,
                staggerInFrames: 1,
                spreadEm: 0.8,
              }}
            >
              振り返る君と目が合って
            </LyricGather>
            <LyricLetterSpacing
              name="32.39s · 言いかけた言葉を飲み込んだ"
              {...secondsToFrameRange(32.39, 37.13, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="md"
              direction="contract"
              motion={{ extraSpacingEm: 0.16, durationInFrames: 22 }}
            >
              言いかけた言葉を飲み込んだ
            </LyricLetterSpacing>
            <LyricBlink
              name="37.13s · あと一歩が踏み出せない"
              {...secondsToFrameRange(37.13, 41.97, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="md"
              blinkCount={1}
            >
              あと一歩が踏み出せない
            </LyricBlink>
            <LyricFade
              name="41.97s · 僕だけが立ち止まる"
              {...secondsToFrameRange(41.97, 47.17, fps)}
              position={{ x: 0.9, y: 0.5 }}
              size="xs"
              orientation="vertical"
            >
              僕だけが立ち止まる
            </LyricFade>
            <LyricCharacterUnderline
              name="50.02s · 雪が積もる　想いが募る"
              {...secondsToFrameRange(50.02, 54.7, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="base"
              motion={{ durationInFrames: 9, staggerInFrames: 1 }}
            >
              雪が積もる　想いが募る
            </LyricCharacterUnderline>
            <LyricCharacterReveal
              name="54.70s · 君は知らないままでいいの？"
              {...secondsToFrameRange(54.7, 59.66, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="md"
              motion={{ fadeDurationInFrames: 10, staggerInFrames: 2 }}
            >
              君は知らないままでいいの？
            </LyricCharacterReveal>
            <LyricLetterSpacing
              name="60.36s · 会えば会うほど　会いたくなる"
              {...secondsToFrameRange(60.36, 65.2, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="base"
              direction="expand"
              motion={{ extraSpacingEm: 0.16, durationInFrames: 22 }}
            >
              会えば会うほど　会いたくなる
            </LyricLetterSpacing>
            <LyricBlink
              name="65.20s · そんな矛盾が苦しいんだ"
              {...secondsToFrameRange(65.2, 68.97, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="md"
              blinkCount={1}
            >
              そんな矛盾が苦しいんだ
            </LyricBlink>
            <LyricGather
              name="68.97s · 雪が溶けても　解けない想い"
              {...secondsToFrameRange(68.97, 74.05, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="base"
            >
              雪が溶けても　解けない想い
            </LyricGather>
            <LyricFade
              name="74.05s · 聖なる夜が終わっていく"
              {...secondsToFrameRange(74.05, 78.75, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="md"
            >
              聖なる夜が終わっていく
            </LyricFade>
            <LyricSlide
              name="78.75s · 君の足跡　消えていくまで"
              {...secondsToFrameRange(78.75, 83.53, fps)}
              enterFrom="left"
              position={{ x: 0.5, y: 0.78 }}
              size="md"
              motion={{ distanceEm: 0.5, durationInFrames: 18 }}
            >
              君の足跡　消えていくまで
            </LyricSlide>
            <LyricCharacterScale
              name="83.53s · 好きだと言えずにいた"
              {...secondsToFrameRange(83.53, 88.31, fps)}
              position={{ x: 0.5, y: 0.22 }}
              size="base"
              motion={{ scaleDurationInFrames: 10, staggerInFrames: 1 }}
            >
              好きだと言えずにいた
            </LyricCharacterScale>
            <LyricGather
              name="88.31s · 雪が積もる　想いが募る"
              {...secondsToFrameRange(88.31, 93.27, fps)}
              position={{ x: 0.5, y: 0.78 }}
              size="base"
            >
              雪が積もる　想いが募る
            </LyricGather>
            <LyricFade
              name="93.27s · 君のいないクリスマス"
              {...secondsToFrameRange(93.27, 97.57, fps)}
              position={{ x: 0.5, y: 0.5 }}
              size="xl"
              rotationDegrees={-2}
            >
              君のいないクリスマス
            </LyricFade>
          </LyricsLayout>
        </SceneLayer>
      </SceneStage>
      <Audio
        src={staticFile('vocal.mp3')}
        durationInFrames={XMAS_MUSIC_VIDEO_DURATION_IN_FRAMES}
        premountFor={fps}
      />
    </AbsoluteFill>
  )
}
