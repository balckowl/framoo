import { Composition, Folder } from 'remotion'
import { EFFECT_DEMOS } from './camera/effects'
import { DEMO_DURATION_IN_FRAMES } from './camera/CameraDemoScene'
import { MOVE_DEMOS } from './camera/moves'
import { PLAYGROUND_FPS } from './config'
import { LyricGatherDemo } from './lyrics/LyricGatherDemo'
import { LyricCharacterRevealDemo } from './lyrics/LyricCharacterRevealDemo'
import { LyricFragmentAssemblyDemo } from './lyrics/LyricFragmentAssemblyDemo'
import { LyricSlideDemo } from './lyrics/LyricSlideDemo'
import { LyricFadeDemo } from './lyrics/LyricFadeDemo'
import { LyricBlinkDemo } from './lyrics/LyricBlinkDemo'
import { LyricLetterSpacingDemo } from './lyrics/LyricLetterSpacingDemo'
import { LyricCharacterScaleDemo } from './lyrics/LyricCharacterScaleDemo'
import { LyricCharacterUnderlineDemo } from './lyrics/LyricCharacterUnderlineDemo'
import { XmasLayerSeparationDemo } from './core/XmasLayerSeparationDemo'
import { LightSweepDemo } from './atmosphere/LightSweepDemo'
import { LensFlareDemo } from './atmosphere/LensFlareDemo'
import { GodRaysDemo } from './atmosphere/GodRaysDemo'
import { ColorPulseDemo } from './atmosphere/ColorPulseDemo'
import { ColorWashDemo } from './atmosphere/ColorWashDemo'
import { ColorWashSequenceDemo } from './atmosphere/ColorWashSequenceDemo'
import {
  ColorOverlayDemo,
  ColorOverlayTintDemo,
} from './atmosphere/ColorOverlayDemo'
import { FogDemo } from './atmosphere/FogDemo'
import { SmokeDemo } from './atmosphere/SmokeDemo'
import { PATTERN_OVERLAY_DEMOS } from './atmosphere/PatternOverlayDemo'
import { PARTICLE_FIELD_DEMOS } from './atmosphere/ParticleFieldDemo'
import { FrameOverlayDemo } from './atmosphere/FrameOverlayDemo'
import {
  XmasMusicVideoDemo,
  XMAS_MUSIC_VIDEO_FPS,
  XMAS_MUSIC_VIDEO_DURATION_IN_FRAMES,
} from './music-video/XmasMusicVideoDemo'

const DEMO_COMPOSITION = {
  durationInFrames: DEMO_DURATION_IN_FRAMES,
  width: 1920,
  height: 1080,
  fps: PLAYGROUND_FPS,
} as const

export const PlaygroundRoot = () => (
  <>
    <Folder name="Lyrics">
      <Composition
        id="LyricGatherDemo"
        component={LyricGatherDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricCharacterRevealDemo"
        component={LyricCharacterRevealDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricFragmentAssemblyDemo"
        component={LyricFragmentAssemblyDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricFadeDemo"
        component={LyricFadeDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricSlideDemo"
        component={LyricSlideDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricBlinkDemo"
        component={LyricBlinkDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricLetterSpacingDemo"
        component={LyricLetterSpacingDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricCharacterScaleDemo"
        component={LyricCharacterScaleDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LyricCharacterUnderlineDemo"
        component={LyricCharacterUnderlineDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
    </Folder>
    <Folder name="Core">
      <Composition
        id="XmasLayerSeparationDemo"
        component={XmasLayerSeparationDemo}
        durationInFrames={150}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
    </Folder>
    <Folder name="Atmosphere">
      <Composition
        id="ColorOverlayDemo"
        component={ColorOverlayDemo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="ColorOverlayTintDemo"
        component={ColorOverlayTintDemo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="ColorWashDemo"
        component={ColorWashDemo}
        durationInFrames={240}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="ColorWashSequenceDemo"
        component={ColorWashSequenceDemo}
        durationInFrames={240}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LightSweepDemo"
        component={LightSweepDemo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="GodRaysDemo"
        component={GodRaysDemo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="ColorPulseDemo"
        component={ColorPulseDemo}
        durationInFrames={180}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="LensFlareDemo"
        component={LensFlareDemo}
        durationInFrames={240}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="FogDemo"
        component={FogDemo}
        durationInFrames={240}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Composition
        id="SmokeDemo"
        component={SmokeDemo}
        durationInFrames={240}
        width={1920}
        height={1080}
        fps={PLAYGROUND_FPS}
      />
      <Folder name="Frames">
        <Composition
          id="FrameOverlayDemo"
          component={FrameOverlayDemo}
          durationInFrames={180}
          width={1920}
          height={1080}
          fps={PLAYGROUND_FPS}
        />
      </Folder>
      <Folder name="Patterns">
        {PATTERN_OVERLAY_DEMOS.map(({ id, component }) => (
          <Composition
            key={id}
            id={id}
            component={component}
            durationInFrames={180}
            width={1920}
            height={1080}
            fps={PLAYGROUND_FPS}
          />
        ))}
      </Folder>
      <Folder name="Particles">
        {PARTICLE_FIELD_DEMOS.map(({ id, component }) => (
          <Composition
            key={id}
            id={id}
            component={component}
            durationInFrames={240}
            width={1920}
            height={1080}
            fps={PLAYGROUND_FPS}
          />
        ))}
      </Folder>
    </Folder>
    <Folder name="Camera">
      <Folder name="Moves">
        {MOVE_DEMOS.map(({ id, component }) => (
          <Composition
            key={id}
            id={id}
            component={component}
            {...DEMO_COMPOSITION}
          />
        ))}
      </Folder>
      <Folder name="Effects">
        {EFFECT_DEMOS.map(({ id, component }) => (
          <Composition
            key={id}
            id={id}
            component={component}
            {...DEMO_COMPOSITION}
          />
        ))}
      </Folder>
    </Folder>
    <Composition
      id="ExampleMusicVideo"
      component={XmasMusicVideoDemo}
      durationInFrames={XMAS_MUSIC_VIDEO_DURATION_IN_FRAMES}
      width={1920}
      height={1080}
      fps={XMAS_MUSIC_VIDEO_FPS}
    />
  </>
)
