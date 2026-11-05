import React from 'react';
import {useCurrentFrame} from 'remotion';

type BgType = string;

export const Background: React.FC<{type: BgType}> = ({type}) => {
  const frame = useCurrentFrame();
  const common: React.CSSProperties = {position:'absolute', inset:0, width:'100%', height:'100%', overflow:'hidden'};

  // --- LAHURIA VILLAGE - FASHOLI JOMI (FARM LAND) - KEY FOR RIZWAN STORY ---
  if(type.includes('fasholi') || type.includes('vita') || type.includes('field')){
    return (
      <div style={{...common, background:'#0F1F0F'}}>
        {/* Night sky */}
        <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse at top, #1A2A4A 0%, #0A0A0A 70%)'}}/>
        {/* Moon */}
        <div style={{position:'absolute', top:60, right:80, width:70, height:70, borderRadius:'50%', background:'#FFF8E1', boxShadow:'0 0 40px #FFF8E1, 0 0 80px rgba(255,248,225,0.4)'}}/>
        {/* Stars */}
        {Array.from({length:30}).map((_,i)=>(
          <div key={i} style={{position:'absolute', left: `${(i*37)%100}%`, top: `${(i*23)%40}%`, width:2, height:2, borderRadius:'50%', background:'white', opacity:0.5+Math.sin(frame/20+i)*0.3}}/>
        ))}
        {/* Farmland */}
        <div style={{position:'absolute', bottom:0, width:'100%', height:'55%', background:'linear-gradient(to top, #1B5E20 0%, #2E7D32 40%, #388E3C 100%)'}}/>
        {/* Crop lines */}
        <div style={{position:'absolute', bottom:50, width:'100%', height:200, display:'flex', flexDirection:'column', justifyContent:'space-around', opacity:0.3}}>
          {Array.from({length:8}).map((_,i)=><div key={i} style={{height:1, background:'rgba(255,255,255,0.2)', width:'100%'}}/>)}
        </div>
        {/* Isolated Vita - 3 houses */}
        <div style={{position:'absolute', left:'50%', bottom:200, transform:'translateX(-50%)', display:'flex', gap:15}}>
          {[0,1,2].map(idx=>(
            <div key={idx} style={{width:110, height:90, position:'relative'}}>
              <div style={{position:'absolute', bottom:0, width:110, height:60, background: idx===1?'#4E342E':'#3E2723', border:'2px solid #1A0F0A', borderRadius:'4px 4px 0 0'}}/>
              <div style={{position:'absolute', top:0, left:-5, width:120, height:35, background:'#2E1F1A', clipPath:'polygon(50% 0%, 0% 100%, 100% 100%)', border:'1px solid black'}}/>
              {/* Light from window - eerie */}
              <div style={{position:'absolute', bottom:15, left:35, width:30, height:20, background:'#FFEB3B', opacity:0.6+Math.sin(frame/15)*0.2, boxShadow:'0 0 15px #FFEB3B'}}/>
            </div>
          ))}
        </div>
        {/* Path to village */}
        <div style={{position:'absolute', bottom:0, left:'10%', width:'25%', height:'45%', background:'linear-gradient(to top, #3E2723, transparent)', clipPath:'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)', opacity:0.5}}/>
        <div style={{position:'absolute', bottom:20, left:20, fontFamily:'sans-serif', fontSize:18, color:'#8BC34A', opacity:0.7}}>ফসলি জমির মাঝে ভিটা • ১০-১৫ মিনিট দূরে গ্রাম</div>
      </div>
    );
  }

  // --- HAUNTED / GHOST ---
  if(type.includes('haunted') || type.includes('ghost')){
    return (
      <div style={{...common, background:'#050505'}}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 30%, #1A1A3A 0%, #000 70%)'}}/>
        {/* Creepy trees silhouette */}
        <div style={{position:'absolute', bottom:0, width:'100%', height:'60%', display:'flex', justifyContent:'space-between', opacity:0.6}}>
          <div style={{width:80, height:300, background:'black', clipPath:'polygon(40% 0%, 20% 20%, 60% 20%, 30% 50%, 70% 50%, 50% 100%, 0% 100%, 0% 0%)'}}/>
          <div style={{width:100, height:400, background:'black', clipPath:'polygon(50% 0%, 10% 30%, 40% 30%, 20% 60%, 80% 60%, 60% 30%, 90% 30%)', marginTop:20}}/>
        </div>
        {/* Fog animated */}
        <div style={{position:'absolute', bottom:0, width:'120%', height:'45%', left:'-10%', background:'linear-gradient(to top, rgba(200,220,255,0.18), transparent)', filter:'blur(18px)', transform:`translateX(${Math.sin(frame/60)*30}px)`}}/>
      </div>
    );
  }

  // --- ROOM NIGHT (reference style) ---
  if(type.includes('night')){
    return (
      <div style={{...common, background:'#2D1B2D'}}>
        <div style={{position:'absolute', left:40, top:140, width:190, height:260, background:'#0F0F23', border:'4px solid #5D4037', borderRadius:4}}>
          <div style={{position:'absolute', top:25, right:25, width:32, height:32, borderRadius:'50%', background:'#FFF9C4', boxShadow:'0 0 20px #FFF9C4'}}/>
          <div style={{position:'absolute', top:0, left:'50%', width:2, height:'100%', background:'#5D4037'}}/>
          <div style={{position:'absolute', top:'50%', left:0, width:'100%', height:2, background:'#5D4037'}}/>
        </div>
        <div style={{position:'absolute', right:40, top:420, width:320, height:130, background:'#37474F', borderRadius:10, border:'2px solid #263238'}}/>
        <div style={{position:'absolute', right:40, top:435, width:320, height:45, background:'#2E7D32'}}/>
      </div>
    );
  }

  // --- DAY ROOM ---
  return (
    <div style={{...common, background:'#F5F1E8'}}>
      <div style={{position:'absolute', left:35, top:130, width:210, height:290, background:'#E3F2FD', border:'4px solid #8D6E63', borderRadius:6}}/>
      <div style={{position:'absolute', right:35, top:400, width:340, height:150, background:'#C8E6C9', borderRadius:12, border:'3px solid #5D4037'}}/>
    </div>
  );
};

export const Props: React.FC<{type: 'candle'|'lantern'|'moon'|'owl'}> = ({type}) => {
  const frame = useCurrentFrame();
  if(type==='candle'){
    const flicker = 0.7 + Math.sin(frame/5)*0.3;
    return (
      <div style={{width:40, height:80, position:'relative'}}>
        <div style={{position:'absolute', bottom:0, width:30, height:45, background:'#FFF8E1', left:5, borderRadius:'4px'}}/>
        <div style={{position:'absolute', top:10, left:15, width:12, height:22, background:`rgba(255,${180+flicker*40},0,${flicker})`, borderRadius:'50% 50% 50% 50% / 60% 60% 40% 40%', boxShadow:`0 0 ${10*flicker}px orange`, transform:`scale(${0.8+flicker*0.4})`}}/>
      </div>
    );
  }
  if(type==='lantern'){
    return (
      <div style={{width:60, height:90, background:'#FFA000', borderRadius:'10px 10px 20px 20px', border:'3px solid #3E2723', boxShadow:'0 0 30px #FFA000', position:'relative'}}>
        <div style={{position:'absolute', top:10, left:10, right:10, bottom:20, background:'#FFECB3', borderRadius:6, opacity:0.8+Math.sin(frame/10)*0.2}}/>
      </div>
    );
  }
  return null;
};
