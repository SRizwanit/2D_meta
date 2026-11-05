import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {FONTS, COLORS} from './Styles';

export const SubtitleBox: React.FC<{text: string, highlight?: string}> = ({text, highlight}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0,8], [0,1], {extrapolateRight:'clamp'});
  
  // Parse **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return (
    <div style={{
      position:'absolute', bottom:120, left:20, right:20,
      background: COLORS.subtitleBg, borderRadius:16, padding:'18px 22px',
      fontFamily:FONTS.bengali, fontSize:28, lineHeight:1.4, color:COLORS.textBlack,
      textAlign:'center', opacity, boxShadow:'0 -4px 20px rgba(0,0,0,0.25)',
      border:'1px solid #E0E0E0'
    }}>
      {parts.map((p,i)=>{
        if(p.startsWith('**') && p.endsWith('**')){
          return <span key={i} style={{color:COLORS.dangerRed, fontWeight:800}}>{p.slice(2,-2)}</span>
        }
        return <span key={i}>{p}</span>
      })}
      {highlight && <div style={{marginTop:4, fontSize:22, color:COLORS.dangerRed, fontWeight:700}}>{highlight}</div>}
    </div>
  );
};
