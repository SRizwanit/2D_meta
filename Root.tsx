import React from 'react';
import {Composition, staticFile, CalculateMetadataFunction} from 'remotion';
import {loadFont as loadNotoBengali} from '@remotion/google-fonts/NotoSansBengali';
import {loadFont as loadHindSiliguri} from '@remotion/google-fonts/HindSiliguri';
import {MainComposition} from './Composition';
import {LAYOUT} from './Styles';
import {parseTimestampData} from './AudioEngine';

// Google Fonts - Noto Sans Bengali / Hind Siliguri for perfect Bangla.
// loadFont() blocks rendering until the font is ready (no tofu boxes in the video).
loadNotoBengali('normal', {weights: ['400', '500', '700', '800'], subsets: ['bengali', 'latin']});
loadHindSiliguri('normal', {weights: ['400', '600', '700'], subsets: ['bengali', 'latin']});

const DEFAULT_DURATION = 30 * 180; // 3 minutes fallback if timestamp data can't be read
const TAIL_SECONDS = 2;            // must match "Calculate total frames" step in render.yml

// Duration follows the timestamp file, so the video always matches the story length.
const calculateMetadata: CalculateMetadataFunction<Record<string, unknown>> = async () => {
  for (const name of ['timestamp.json', 'Rizwan_story1.json']) {
    try {
      const res = await fetch(staticFile(name));
      if (!res.ok) continue;
      const {groups} = parseTimestampData(await res.json());
      if (groups.length) {
        const last = groups[groups.length - 1].end;
        // Whole seconds first, then frames - identical to the "plan" job in render.yml
        const durationSec = Math.ceil(last + TAIL_SECONDS);
        return {durationInFrames: durationSec * LAYOUT.fps};
      }
    } catch (e) {
      // try next file
    }
  }
  return {durationInFrames: DEFAULT_DURATION};
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Composition"
        component={MainComposition}
        durationInFrames={DEFAULT_DURATION}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{}}
        calculateMetadata={calculateMetadata}
      />
    </>
  );
};
