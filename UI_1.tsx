import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONTS} from './Styles';

export const DigitalClock: React.FC<{time: string, color?: string}> = ({time, color='#00FF88'}) => {
  return (
    <div style={{
      position:'absolute', top:80, left:'50%', transform:'translateX(-50%)',
      background:'#000', padding:'12px 28px', borderRadius:12, border:'3px solid #333',
      fontFamily: FONTS.mono, fontSize:42, color, fontWeight:800, letterSpacing:2,
      boxShadow:'0 0 20px rgba(0,255,136,0.5)'
    }}>{time}</div>
  );
};

export const WallClock: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = (frame/30)*6;
  return (
    <div style={{position:'absolute', top:90, right:60, width:70, height:70, background:'white', borderRadius:'50%', border:'3px solid #333'}}>
      <div style={{position:'absolute', left:'50%', top:10, width:2, height:25, background:'black', transformOrigin:'bottom', transform:`translateX(-50%) rotate(${rotation}deg)`}}/>
      <div style={{position:'absolute', left:'50%', top:15, width:2, height:20, background:'black', transformOrigin:'bottom', transform:`translateX(-50%) rotate(${rotation*0.5}deg)`}}/>
    </div>
  );
};

export const ChatBubble: React.FC<{text: string, side?: 'left'|'right', title?: string}> = ({text, side='left', title}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0,10], [0,1], {extrapolateRight:'clamp'});
  const y = interpolate(frame, [0,10], [20,0], {extrapolateRight:'clamp'});
  return (
    <div style={{
      position:'absolute', left: side==='left'?30:undefined, right: side==='right'?30:undefined,
      top:350, width:420, background:'#DCF8C6', borderRadius:16, padding:'16px 20px',
      fontFamily:FONTS.bengali, fontSize:26, color:'#000', opacity, transform:`translateY(${y}px)`,
      boxShadow:'0 4px 12px rgba(0,0,0,0.3)', border:'1px solid #ccc'
    }}>
      {title && <div style={{fontWeight:700, fontSize:20, color:'#075E54', marginBottom:6}}>{title}</div>}
      {text}
      <div style={{fontSize:18, color:'#666', textAlign:'right', marginTop:6}}>11:58 PM</div>
    </div>
  );
};

export const MoneyCard: React.FC<{amount: string, label?: string}> = ({amount, label='ক্ষতি'}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0,12], [0,1], {extrapolateRight:'clamp'});
  return (
    <div style={{
      position:'absolute', top:'42%', left:'50%', transform:`translate(-50%, -50%) scale(${scale})`,
      background:'white', padding:'24px 40px', borderRadius:16, textAlign:'center',
      boxShadow:'0 8px 30px rgba(0,0,0,0.4)', border:'2px solid #ddd'
    }}>
      <div style={{fontFamily:FONTS.bengali, fontSize:52, fontWeight:800, color:COLORS.dangerRed}}>{amount}</div>
      <div style={{fontSize:28, color:'#333'}}>{label}</div>
    </div>
  );
};

export const EcomBadge: React.FC = () => (
  <div style={{position:'absolute', top:20, left:'50%', transform:'translateX(-50%)', background:'white', padding:'6px 18px', borderRadius:20, display:'flex', alignItems:'center', gap:6, boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
    <div style={{width:8, height:8, background:'#FF6B35', borderRadius:'50%'}}/>
    <span style={{fontSize:20, fontWeight:700, fontFamily:'sans-serif'}}>Ecom</span>
  </div>
);
