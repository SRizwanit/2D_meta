import React from 'react';
import {useCurrentFrame, interpolate, random} from 'remotion';

export const FogOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0,100], [-50,50]);
  return <div style={{position:'absolute', inset:0, background:`linear-gradient(to top, rgba(200,200,255,${0.15+Math.sin(frame/10)*0.05}), transparent)`, transform:`translateX(${x}px)`, filter:'blur(15px)', pointerEvents:'none'}}/>;
};

export const Flicker: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const opacity = 0.7 + random(frame)*0.3;
  return <div style={{opacity}}>{children}</div>;
};

export const Shake: React.FC<{children: React.ReactNode, intensity?: number}> = ({children, intensity=8}) => {
  const frame = useCurrentFrame();
  const x = (random(frame)-0.5)*intensity;
  const y = (random(frame+10)-0.5)*intensity;
  return <div style={{transform:`translate(${x}px, ${y}px)`}}>{children}</div>;
};
