import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

export const DigitalClock: React.FC<{time: string, color?: string}> = ({time, color='#00FF88'}) => {
  const frame = useCurrentFrame();
  const blink = Math.floor(frame/15)%2===0;
  return (
    <div style={{position:'absolute', top:75, left:'50%', transform:'translateX(-50%)', background:'black', padding:'10px 26px', borderRadius:12, border:'3px solid #333', fontFamily:'monospace', fontSize:40, color, fontWeight:800, letterSpacing:2, boxShadow:'0 0 18px rgba(0,255,136,0.4)', display:'flex', gap:2}}>
      <span>{time}</span>
      <span style={{opacity: blink?1:0.2, marginLeft:4}}>●</span>
    </div>
  );
};

export const WallClock: React.FC = () => {
  const frame = useCurrentFrame();
  const secRot = (frame*6)%360;
  const minRot = (frame*0.5)%360;
  return (
    <div style={{position:'absolute', top:85, right:55, width:68, height:68, background:'white', borderRadius:'50%', border:'3px solid #333', boxShadow:'0 2px 8px rgba(0,0,0,0.3)'}}>
      <div style={{position:'absolute', left:'50%', top:8, width:2, height:26, background:'black', transformOrigin:'bottom center', transform:`translateX(-50%) rotate(${secRot}deg)`}}/>
      <div style={{position:'absolute', left:'50%', top:14, width:2.5, height:20, background:'#333', transformOrigin:'bottom center', transform:`translateX(-50%) rotate(${minRot}deg)`}}/>
      <div style={{position:'absolute', left:'50%', top:'50%', width:8, height:8, background:'black', borderRadius:'50%', transform:'translate(-50%,-50%)'}}/>
    </div>
  );
};

export const EcomBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0,15], [0,1], {extrapolateRight:'clamp'});
  return (
    <div style={{position:'absolute', top:18, left:'50%', transform:`translateX(-50%) scale(${scale})`, background:'white', padding:'5px 16px', borderRadius:20, display:'flex', gap:6, boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
      <div style={{width:8, height:8, background:'#FF6B35', borderRadius:'50%'}}/>
      <span style={{fontSize:18, fontWeight:700}}>Ecom</span>
    </div>
  );
};

export const LocationTag: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0,12], [-20,0], {extrapolateRight:'clamp'});
  const op = interpolate(frame, [0,12], [0,1], {extrapolateRight:'clamp'});
  return <div style={{position:'absolute', bottom:320, left:22, background:'rgba(0,0,0,0.78)', color:'#8BC34A', padding:'7px 14px', borderRadius:20, fontFamily:'Noto Sans Bengali', fontSize:18, border:'1px solid #8BC34A', transform:`translateX(${x}px)`, opacity:op}}>{text}</div>;
};

export const YearTag: React.FC<{year: string}> = ({year}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0,15], [0,1], {extrapolateRight:'clamp'});
  return <div style={{position:'absolute', top:140, left:22, background:'#FF3B30', color:'white', padding:'7px 16px', borderRadius:8, fontFamily:'monospace', fontSize:26, fontWeight:800, transform:`scale(${scale})`}}>{year}</div>;
};

export const MoneyCard: React.FC<{amount: string}> = ({amount}) => <div style={{position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', background:'white', padding:'20px 36px', borderRadius:14, textAlign:'center', boxShadow:'0 8px 30px rgba(0,0,0,0.4)'}}><div style={{fontSize:48, fontWeight:800, color:'#FF3B30'}}>{amount}</div></div>;
export const ChatBubble: React.FC<{text: string, title?: string}> = ({text, title}) => <div style={{position:'absolute', left:30, top:340, width:400, background:'#DCF8C6', borderRadius:14, padding:'14px 18px', fontFamily:'Noto Sans Bengali', fontSize:24}}>{title && <div style={{fontWeight:700, fontSize:18, color:'#075E54'}}>{title}</div>}{text}</div>;
