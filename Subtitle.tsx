import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';
import {usePopIn} from './Animation';
import {COLORS, FONTS, TYPOGRAPHY, toBanglaNumber, formatBanglaMoney} from './Styles';

type SubtitleProps = {
  text: string,
  useTypewriter?: boolean,
  highlight?: string,
  moneyAmount?: number // for count-up like 1000000
};

export const SubtitleBox: React.FC<SubtitleProps> = ({text, useTypewriter=false, highlight, moneyAmount}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0,10], [0,1], {extrapolateRight:'clamp'});
  const y = interpolate(frame, [0,10], [18,0], {extrapolateRight:'clamp'});
  const pop = usePopIn(2);
  
  // Auto font size based on length - Bangla needs bigger
  const fontSize = TYPOGRAPHY.getSubtitleFontSize(text);
  const lineHeight = TYPOGRAPHY.getLineHeight(fontSize);
  
  // Typewriter
  const twChars = useTypewriter ? Math.min(text.length, Math.floor(frame*2.2)) : text.length;
  const displayText = useTypewriter ? text.slice(0, twChars) : text;
  
  // Parse **bold** and numbers
  // Example: "**১০ লাখ** ক্ষতি" -> bold red
  // Example: numbers like 1976, 10,00,000 -> auto Bangla and highlight
  const renderText = (t: string) => {
    const parts = t.split(/(\*\*.*?\*\*)/g);
    return parts.map((p,i)=>{
      if(p.startsWith('**') && p.endsWith('**')){
        return <span key={i} style={{color:COLORS.dangerRed, fontWeight:800, background:'rgba(211,47,47,0.08)', padding:'0 4px', borderRadius:4}}>{p.slice(2,-2)}</span>;
      }
      // Auto highlight numbers with Bangla conversion
      // Find patterns like 10,00,000 or 1976
      // We'll highlight them orange
      return <span key={i}>{p}</span>;
    });
  };

  // Money count-up if provided
  const [count, setCount] = React.useState(0);
  // Use interpolate for count-up
  const countProgress = interpolate(frame, [0,40], [0,1], {extrapolateRight:'clamp'});
  const currentCount = moneyAmount ? Math.floor(countProgress * moneyAmount) : 0;
  const banglaCount = moneyAmount ? formatBanglaMoney(currentCount) : '';

  return (
    <div style={{
      position:'absolute', bottom:108, left:18, right:18, 
      background:COLORS.subtitleBg, borderRadius:TYPOGRAPHY.subtitleRadius, 
      padding:TYPOGRAPHY.subtitlePadding, 
      fontFamily:FONTS.bengali, fontSize, lineHeight:`${lineHeight}px`, color:COLORS.textBlack, 
      textAlign:'center', opacity, 
      transform:`translateY(${y}px) scale(${pop})`, 
      boxShadow:'0 -4px 28px rgba(0,0,0,0.35), 0 2px 12px rgba(0,0,0,0.15)', 
      border:`1.5px solid ${COLORS.subtitleBorder}`,
      transformOrigin:'bottom center',
      wordWrap:'break-word',
      overflowWrap:'break-word',
      hyphens:'auto'
    }}>
      {/* Main text */}
      <div style={{wordBreak:'break-word'}}>
        {renderText(displayText)}
        {useTypewriter && twChars < text.length && <span style={{opacity:0.6, marginLeft:2, animation:'blink 1s infinite'}}>▌</span>}
      </div>
      
      {/* Highlight row (like "১০ লাখ ক্ষতি" in reference) */}
      {highlight && (
        <div style={{marginTop:10, fontSize: fontSize*0.75, color:COLORS.dangerRed, fontWeight:700, background:'rgba(211,47,47,0.08)', padding:'6px 12px', borderRadius:8, display:'inline-block'}}>
          {highlight}
        </div>
      )}
      
      {/* Money count-up */}
      {moneyAmount !== undefined && (
        <div style={{marginTop:10, fontSize: fontSize*1.4, fontWeight:800, color:COLORS.dangerLight, fontFamily:FONTS.mono}}>
          {banglaCount}
          <span style={{fontSize: fontSize*0.6, color:'#666', marginLeft:8}}>টাকা</span>
        </div>
      )}
    </div>
  );
};

// Year tag with Bangla number support
export const YearTag: React.FC<{year: string}> = ({year}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0,12], [0,1], {extrapolateRight:'clamp'});
  const banglaYear = toBanglaNumber(year);
  return (
    <div style={{
      position:'absolute', top:145, left:22, 
      background:COLORS.yearRed, color:'white', 
      padding:'8px 18px', borderRadius:10, 
      fontFamily:FONTS.bengali, fontSize:26, fontWeight:800,
      transform:`scale(${scale})`, transformOrigin:'left',
      boxShadow:'0 4px 12px rgba(255,59,48,0.4)',
      letterSpacing:0.5
    }}>
      {banglaYear} সাল
    </div>
  );
};

// Location tag
export const LocationTag: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0,12], [-24,0], {extrapolateRight:'clamp'});
  const op = interpolate(frame, [0,12], [0,1], {extrapolateRight:'clamp'});
  return (
    <div style={{
      position:'absolute', bottom:328, left:22, 
      background:'rgba(0,0,0,0.82)', color:COLORS.locationGreen, 
      padding:'8px 16px', borderRadius:20, 
      fontFamily:FONTS.bengali, fontSize:19, fontWeight:500,
      border:`1.5px solid ${COLORS.locationGreen}`,
      transform:`translateX(${x}px)`, opacity:op,
      maxWidth:'85%', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'
    }}>
      📍 {text}
    </div>
  );
};

// Number animation component - like 10,00,000 counting
export const CountUpNumber: React.FC<{target: number, label?: string}> = ({target, label}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0,50], [0,1], {extrapolateRight:'clamp'});
  const current = Math.floor(progress * target);
  const formatted = formatBanglaMoney(current);
  
  return (
    <div style={{
      position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)',
      background:'white', padding:'28px 42px', borderRadius:16, textAlign:'center',
      boxShadow:'0 10px 36px rgba(0,0,0,0.4)', border:'2px solid #eee',
      transformOrigin:'center'
    }}>
      <div style={{fontFamily:FONTS.mono, fontSize:54, fontWeight:800, color:COLORS.dangerLight, letterSpacing:1}}>
        {formatted}
      </div>
      {label && <div style={{fontFamily:FONTS.bengali, fontSize:26, color:'#333', marginTop:6}}>{label}</div>}
    </div>
  );
};
