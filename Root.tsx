import React from 'react';
import {Composition} from 'remotion';
import {MainComposition} from './Composition';
import {LAYOUT} from './Styles';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Google Fonts - Noto Sans Bengali for perfect Bangla */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;700;800&family=Hind+Siliguri:wght@400;600;700&display=swap');
        * { font-variant-ligatures: normal; }
      `}</style>
      <Composition
        id="Composition"
        component={MainComposition}
        durationInFrames={30*180}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{}}
      />
    </>
  );
};
