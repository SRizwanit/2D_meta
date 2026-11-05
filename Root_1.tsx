import React from 'react';
import {Composition} from 'remotion';
import {MainComposition} from './Composition';
import {LAYOUT} from './Styles';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Composition"
        component={MainComposition}
        durationInFrames={30*180} // 3 minutes default, will be auto trimmed by workflow
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
        defaultProps={{}}
      />
    </>
  );
};
