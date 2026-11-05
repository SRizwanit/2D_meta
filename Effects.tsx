import React from 'react';
import {useCurrentFrame, interpolate, random} from 'remotion';

// --- Fog with moving waves ---
export const FogOverlay: React.FC<{intensity?: number, speed?: number}> = ({intensity=0.2, speed=1}) => {
  const frame = useCurrentFrame();
  const x1 = Math.sin(frame/70 * speed)*45;
  const x2 = Math.cos(frame/90 * speed)*30;
  const opacity = intensity + Math.sin(frame/40)*0.04;
  return (
    <>
      <div style={{position:'absolute', bottom:0, width:'130%', left:'-15%', height:'50%', background:`linear-gradient(to top, rgba(200,220,255,${opacity}), rgba(200,220,255,${opacity*0.3}) 40%, transparent 80%)`, filter:'blur(20px)', transform:`translateX(${x1}px)`, pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:10, width:'120%', left:'-10%', height:'30%', background:`linear-gradient(to top, rgba(220,230,255,${opacity*0.6}), transparent)`, filter:'blur(16px)', transform:`translateX(${x2}px)`, pointerEvents:'none'}}/>
    </>
  );
};

// --- Dark vignette for horror ---
export const Vignette: React.FC<{strength?: number}> = ({strength=0.85}) => {
  const frame = useCurrentFrame();
  const pulse = 0.85 + Math.sin(frame/30)*0.05;
  return <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,${strength * pulse}) 100%)`, pointerEvents:'none'}}/>;
};

// --- Flicker - for candle / lantern ---
export const Flicker: React.FC<{children: React.ReactNode, min?: number, max?: number, speed?: number}> = ({children, min=0.65, max=1, speed=1}) => {
  const frame = useCurrentFrame();
  const r = random(Math.floor(frame/(3/speed)));
  const opacity = min + r*(max-min);
  return <div style={{opacity}}>{children}</div>;
};

// --- Shake - jump scare ---
export const Shake: React.FC<{children: React.ReactNode, active?: boolean, intensity?: number}> = ({children, active=true, intensity=10}) => {
  const frame = useCurrentFrame();
  if(!active) return <>{children}</>;
  // Only shake for short burst
  const x = (random(frame)-0.5)*intensity*2;
  const y = (random(frame+7)-0.5)*intensity*1.5;
  const rot = (random(frame+13)-0.5)*intensity*0.3;
  return <div style={{transform:`translate(${x}px, ${y}px) rotate(${rot}deg)`}}>{children}</div>;
};

// --- Ghost appear - blur + scale + opacity ---
export const GhostAppear: React.FC<{children: React.ReactNode, startFrame?: number, duration?: number}> = ({children, startFrame=0, duration=35}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame+duration], [0,1], {extrapolateRight:'clamp'});
  const blur = interpolate(progress, [0,1], [18,0]);
  const scale = interpolate(progress, [0,1], [0.7,1]);
  const opacity = interpolate(progress, [0,0.3,1], [0,0.2,0.85]);
  const glow = interpolate(progress, [0,1], [0,20]);
  return (
    <div style={{
      opacity, 
      filter:`blur(${blur}px) drop-shadow(0 0 ${glow}px rgba(255,255,255,0.8))`,
      transform:`scale(${scale})`,
      transformOrigin:'center bottom'
    }}>
      {children}
    </div>
  );
};

// --- Candle light - warm radial glow ---
export const CandleLight: React.FC<{flicker?: boolean}> = ({flicker=true}) => {
  const frame = useCurrentFrame();
  const baseIntensity = 0.6 + Math.sin(frame/7)*0.25 + random(Math.floor(frame/3))*0.15;
  const intensity = flicker ? baseIntensity : 0.7;
  return (
    <>
      <div style={{position:'absolute', inset:0, background:`radial-gradient(ellipse at 50% 85%, rgba(255,200,50,${intensity*0.18}), rgba(255,150,0,${intensity*0.08}) 30%, transparent 65%)`, pointerEvents:'none'}}/>
      <div style={{position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:200, height:200, background:`radial-gradient(ellipse at center, rgba(255,220,100,${intensity*0.25}), transparent 70%)`, filter:'blur(12px)', pointerEvents:'none'}}/>
    </>
  );
};

// --- Moonlight - cold blue ---
export const Moonlight: React.FC = () => {
  const frame = useCurrentFrame();
  const intensity = 0.12 + Math.sin(frame/60)*0.03;
  return (
    <div style={{position:'absolute', inset:0, background:`linear-gradient(120deg, rgba(100,150,255,${intensity}) 0%, transparent 50%, rgba(100,150,255,${intensity*0.5}) 100%)`, pointerEvents:'none'}}/>
  );
};

// --- Lantern Swing ---
export const LanternSwing: React.FC = () => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame/25)*8; // degrees
  const lightX = Math.sin(frame/25)*15;
  return (
    <div style={{position:'absolute', top:40, left:'50%', transform:'translateX(-50%)', transformOrigin:'top center'}}>
      <div style={{width:2, height:60, background:'#3E2723', margin:'0 auto'}}/>
      <div style={{transform:`rotate(${swing}deg)`, transformOrigin:'top center'}}>
        <div style={{width:64, height:88, background:'#FFA000', borderRadius:'12px 12px 22px 22px', border:'3px solid #3E2723', boxShadow:`0 0 35px #FFA000, 0 0 60px rgba(255,160,0,0.4)`, position:'relative'}}>
          <div style={{position:'absolute', top:12, left:10, right:10, bottom:22, background:'#FFECB3', borderRadius:8, opacity:0.85+Math.sin(frame/8)*0.1, boxShadow:'inset 0 0 20px rgba(255,160,0,0.5)'}}/>
          {/* Light pool */}
          <div style={{position:'absolute', bottom:-80, left:'50%', width:180, height:120, background:`radial-gradient(ellipse at center, rgba(255,200,50,0.35), transparent 70%)`, transform:`translateX(-50%) translateX(${lightX}px)`, filter:'blur(10px)', pointerEvents:'none'}}/>
        </div>
      </div>
    </div>
  );
};

// --- Footsteps / Dust ---
export const DustParticles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden'}}>
      {Array.from({length:18}).map((_,i)=>{
        const x = (i*73 + frame*0.3)%100;
        const y = (i*41 + Math.sin(frame/20 + i)*10)%100;
        const size = 1 + (i%3);
        const opacity = 0.15 + Math.sin(frame/15 + i)*0.1;
        return <div key={i} style={{position:'absolute', left:`${x}%`, top:`${y}%`, width:size, height:size, borderRadius:'50%', background:'white', opacity}}/>
      })}
    </div>
  );
};

// --- Eye Glow for ghost ---
export const EyeGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = 10 + Math.sin(frame/12)*6;
  return (
    <div style={{position:'absolute', inset:0, pointerEvents:'none'}}>
      <div style={{position:'absolute', left:'42%', top:'42%', width:12, height:12, borderRadius:'50%', background:'#FF0000', boxShadow:`0 0 ${glow}px #FF0000, 0 0 ${glow*2}px rgba(255,0,0,0.5)`, opacity:0.9}}/>
      <div style={{position:'absolute', left:'58%', top:'42%', width:12, height:12, borderRadius:'50%', background:'#FF0000', boxShadow:`0 0 ${glow}px #FF0000, 0 0 ${glow*2}px rgba(255,0,0,0.5)`, opacity:0.9}}/>
    </div>
  );
};

// --- Sound Visualizer - subtle border pulse when audio playing ---
export const AudioPulse: React.FC<{active?: boolean}> = ({active=true}) => {
  const frame = useCurrentFrame();
  if(!active) return null;
  const pulse = 1 + Math.sin(frame/6)*0.02;
  return <div style={{position:'absolute', inset:0, border:`${2*pulse}px solid rgba(0,255,136,0.15)`, pointerEvents:'none', borderRadius:8}}/>;
};
