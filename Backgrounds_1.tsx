import React from 'react';
import {COLORS} from './Styles';

export const Background: React.FC<{type: string}> = ({type}) => {
  const common: React.CSSProperties = {position:'absolute', inset:0, width:'100%', height:'100%'};
  
  if(type.includes('night') || type==='room_night'){
    return (
      <div style={{...common, background: COLORS.bgRoomDark}}>
        {/* Window with moon */}
        <div style={{position:'absolute', left:40, top:150, width:180, height:250, background:'#0F0F23', border:'4px solid #5D4037', borderRadius:4}}>
          <div style={{position:'absolute', top:20, right:20, width:30, height:30, borderRadius:'50%', background:'#FFF9C4', boxShadow:'0 0 20px #FFF9C4'}}/>
          <div style={{position:'absolute', top:0, left:'50%', width:2, height:'100%', background:'#5D4037'}}/>
          <div style={{position:'absolute', top:'50%', left:0, width:'100%', height:2, background:'#5D4037'}}/>
        </div>
        {/* Bed */}
        <div style={{position:'absolute', right:40, top:400, width:300, height:120, background:'#37474F', borderRadius:10}}/>
        <div style={{position:'absolute', right:40, top:410, width:300, height:40, background:'#4CAF50'}}/>
      </div>
    );
  }
  if(type.includes('haunted') || type.includes('ghost')){
    return (
      <div style={{...common, background:'#0A0A0A'}}>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse at center, #1A1A2E 0%, #000 70%)'}}/>
        {/* Fog */}
        <div style={{position:'absolute', bottom:0, width:'100%', height:'40%', background:'linear-gradient(to top, rgba(255,255,255,0.15), transparent)', filter:'blur(20px)'}}/>
      </div>
    );
  }
  // Day room - light
  return (
    <div style={{...common, background: COLORS.bgLight}}>
      <div style={{position:'absolute', left:30, top:120, width:200, height:280, background:'#E3F2FD', border:'4px solid #8D6E63', borderRadius:4}}/>
      <div style={{position:'absolute', right:30, top:380, width:320, height:140, background:'#C8E6C9', borderRadius:12, border:'3px solid #5D4037'}}/>
      <div style={{position:'absolute', right:30, top:400, width:320, height:50, background:'#2E7D32', borderRadius:6}}/>
    </div>
  );
};
