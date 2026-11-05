import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background} from './Backgrounds';
import {Character} from './Characters';
import {DigitalClock, WallClock, EcomBadge, LocationTag, YearTag} from './UI';
import {SubtitleBox} from './Subtitle';
import {FogOverlay, Vignette, CandleLight, Shake, Flicker, Moonlight, LanternSwing, DustParticles, GhostAppear, EyeGlow, AudioPulse} from './Effects';
import {SceneGroup} from './AudioEngine';
import {useFadeIn, usePopIn, useTypewriter, useShake, useLipSync, useClockTick} from './Animation';

export const Scene: React.FC<{group: SceneGroup}> = ({group}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  // Animations
  const fadeIn = useFadeIn(12);
  const popScale = usePopIn(0);
  const typewriterText = group.text.length > 40 ? group.text : useTypewriter(group.text, 1.8); // only typewriter for long? For ghost story, full text better
  const lipSync = useLipSync();
  const clockTime = useClockTick("11:58");
  const isScaryWord = group.text.includes('ভয়') || group.text.includes('ভূত') || group.emotion==='scared';
  const shake = useShake(isScaryWord ? 8 : 0, 15, 12);
  
  const isFasholi = group.sceneType.includes('fasholi') || group.sceneType.includes('field') || group.sceneType.includes('vita');
  const isHaunted = group.sceneType.includes('haunted') || group.sceneType.includes('ghost');
  const isRoom = group.sceneType.includes('room');
  
  // Character entrance - spring
  const charSpring = spring({frame, fps, config:{damping:14, stiffness:120}, delay:5});
  const charY = interpolate(charSpring, [0,1], [80,0]);
  const charOpacity = charSpring;

  return (
    <AbsoluteFill style={{background:'black', opacity: fadeIn}}>
      {/* Background with subtle zoom */}
      <div style={{transform:`scale(${1 + interpolate(frame, [0, 90], [1, 1.05])})`, width:'100%', height:'100%', position:'absolute'}}>
        <Background type={group.sceneType} />
      </div>
      
      <EcomBadge />
      
      {/* Year and Location */}
      {group.year && (
        <div style={{position:'absolute', top:140, left:22, background:'#FF3B30', color:'white', padding:'7px 16px', borderRadius:8, fontFamily:'monospace', fontSize:26, fontWeight:800, transform:`scale(${popScale})`, transformOrigin:'left'}}>
          {group.year}
        </div>
      )}
      {group.locationTag && (
        <div style={{position:'absolute', bottom:320, left:22, background:'rgba(0,0,0,0.75)', color:'#8BC34A', padding:'6px 14px', borderRadius:20, fontFamily:'Noto Sans Bengali', fontSize:18, border:'1px solid #8BC34A', opacity: fadeIn}}>
          {group.locationTag}
        </div>
      )}
      
      {/* Digital Clock - reference style 11:58 -> 11:59 -> 12:00 animation */}
      {isRoom && (
        <>
          <div style={{position:'absolute', top:72, left:'50%', transform:'translateX(-50%)', background:'black', padding:'10px 28px', borderRadius:12, border:'3px solid #333', fontFamily:'monospace', fontSize:38, color: isFasholi?'#FF6B35':'#00FF88', fontWeight:800, letterSpacing:2, boxShadow:'0 0 18px rgba(0,255,136,0.4)', opacity: fadeIn}}>
            {/* Animate last digit */}
            <span>{clockTime}</span>
            {frame % 60 < 30 && <span style={{opacity:0.8}}>●</span>}
          </div>
          <WallClock />
        </>
      )}

      {/* Character with lip-sync illusion and entrance */}
      <Shake active={isScaryWord}>
        <div style={{
          position:'absolute', 
          left:'50%', 
          top: isFasholi? '48%' : '42%', 
          transform:`translate(-50%,-50%) translateY(${charY}px) scaleY(${lipSync.scaleY})`,
          opacity: charOpacity,
          filter: isHaunted ? 'drop-shadow(0 0 15px rgba(255,255,255,0.3))' : 'none'
        }}>
          <div style={{transform:`scale(${popScale})`}}>
            <Character name={group.character as any} emotion={group.emotion as any} size={isFasholi? 310 : 275} />
          </div>
        </div>
      </Shake>

      {/* For fasholi field - family silhouettes when "পরিবার" mentioned */}
      {isFasholi && group.text.includes('পরিবার') && (
        <div style={{position:'absolute', bottom:285, left:'50%', transform:'translateX(-50%)', display:'flex', gap:12, opacity: interpolate(frame, [20,35], [0,0.65], {extrapolateRight:'clamp'})}}>
          <Character name="wife" size={85} /><Character name="prabhas" size={85} /><Character name="pankaj" size={85} /><Character name="prakash" size={75} />
        </div>
      )}

      {/* Effects layers */}
      {/* Horror Effects - Enhanced Step 6 */}
      {isHaunted && (
        <>
          <FogOverlay intensity={0.28} speed={1.2} />
          <Vignette strength={0.88} />
          <Moonlight />
          <DustParticles />
          {group.emotion==='scared' && <GhostAppear startFrame={10} duration={40}><div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center'}}><EyeGlow /></div></GhostAppear>}
        </>
      )}
      {isFasholi && (
        <>
          <FogOverlay intensity={0.16} speed={0.7} />
          <CandleLight flicker={true} />
          <Moonlight />
          <DustParticles />
          <div style={{position:'absolute', bottom:0, width:'100%', height:2, background:'rgba(139,195,74,0.3)', boxShadow:'0 0 10px #8BC34A'}}/>
        </>
      )}
      {group.sceneType.includes('village') && (
        <>
          <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(255,248,225,0.08), transparent)'}} />
          <DustParticles />
        </>
      )}
      <AudioPulse active={true} />
      
      {/* Subtitle - with typewriter option for horror */}
      <div style={{transform:`translate(${shake.x}px, ${shake.y}px)`}}>
        {/* Enhanced Subtitle with Typography system */}
      <SubtitleBox 
        text={group.text} 
        useTypewriter={isHaunted && group.text.length < 80} 
        highlight={group.text.includes('লাখ') || group.text.includes('হাজার') ? undefined : undefined}
        moneyAmount={group.text.match(/([০-৯0-9,]+)\s*(লাখ|হাজার|টাকা)/) ? 1000000 : undefined}
      />
      </div>

      {/* Progress bar - like reference had subtle */}
      <div style={{position:'absolute', bottom:0, left:0, height:4, background:'#00FF88', width:`${interpolate(frame, [0, 90], [0,100], {extrapolateRight:'clamp'})}%`, opacity:0.7}}/>
    </AbsoluteFill>
  );
};
