import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Background} from './Backgrounds';
import {Character} from './Characters';
import {DigitalClock, WallClock, EcomBadge, MoneyCard, ChatBubble} from './UI';
import {SubtitleBox} from './Subtitle';
import {FogOverlay} from './Effects';

type Props = {text: string, sceneType?: string, time?: string};

export const Scene: React.FC<Props> = ({text, sceneType='room_night', time='11:59'}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0,15], [0,1], {extrapolateRight:'clamp'});
  
  return (
    <AbsoluteFill style={{background:'#000', opacity: fadeIn}}>
      <Background type={sceneType} />
      <EcomBadge />
      {sceneType.includes('room') && <>
        <DigitalClock time={time} />
        <WallClock />
      </>}
      <div style={{position:'absolute', left:'50%', top:'42%', transform:'translate(-50%,-50%)'}}>
        <Character name="shafik" emotion={sceneType.includes('scared')?'scared':'worried'} size={260} />
      </div>
      {sceneType.includes('haunted') && <FogOverlay />}
      <SubtitleBox text={text} />
    </AbsoluteFill>
  );
};
