import React from 'react';

type Emotion = 'normal' | 'worried' | 'scared' | 'happy' | 'sad' | 'angry' | 'ghostly';
type CharacterName = 'prahlad' | 'wife' | 'prakash' | 'prabhas' | 'pankaj' | 'ghost' | 'oldman' | 'shafik' | 'tareq' | 'sister' | 'narrator' | 'village_girl' | 'boy';

export const Character: React.FC<{name: CharacterName, emotion?: Emotion, size?: number, flip?: boolean}> = ({name, emotion='normal', size=280, flip=false}) => {
  
  // --- GHOST ---
  if(name === 'ghost'){
    return (
      <div style={{width:size, height:size*1.5, position:'relative', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))'}}>
        <svg viewBox="0 0 120 160" width="100%" height="100%">
          <defs>
            <radialGradient id="ghostGlow" cx="50%" cy="40%"><stop offset="0%" stopColor="white" stopOpacity="1"/><stop offset="100%" stopColor="#B0E0E6" stopOpacity="0.6"/></radialGradient>
          </defs>
          <path d="M20 50 Q60 5 100 50 L100 120 Q90 135 80 120 Q70 135 60 120 Q50 135 40 120 Q30 135 20 120 Z" fill="url(#ghostGlow)" stroke="white" strokeWidth="1.5" opacity={emotion==='ghostly'?0.9:0.75}/>
          <ellipse cx="42" cy="65" rx="7" ry="9" fill="black" opacity="0.9"/>
          <ellipse cx="78" cy="65" rx="7" ry="9" fill="black" opacity="0.9"/>
          <circle cx="44" cy="62" r="2.5" fill="white" opacity="0.8"/>
          <circle cx="80" cy="62" r="2.5" fill="white" opacity="0.8"/>
          <ellipse cx="60" cy="85" rx="4" ry="7" fill="black" opacity="0.7"/>
          {/* Tears / drool */}
          {emotion==='scared' && <path d="M42 74 Q42 95 42 100" stroke="#88CCFF" strokeWidth="1.5" fill="none" opacity="0.6"/>}
        </svg>
      </div>
    );
  }

  // Common human template for village characters
  const isOld = name==='prahlad' || name==='oldman';
  const isFemale = name==='wife' || name==='village_girl' || name==='sister';
  
  let skin = '#FFDBAC';
  let shirt = '#7B5AE0';
  let hair = '#2D2D2D';
  let ageLines = false;

  if(name==='prahlad'){ shirt='#8D6E63'; hair='#9E9E9E'; ageLines=true; skin='#E8C4A0'; }
  else if(name==='wife'){ shirt='#E91E63'; hair='#3E2723'; skin='#F5D0B0'; }
  else if(name==='prakash'){ shirt='#42A5F5'; hair='#1A1A1A'; }
  else if(name==='prabhas'){ shirt='#66BB6A'; hair='#212121'; }
  else if(name==='pankaj'){ shirt='#FFA726'; hair='#212121'; }
  else if(name==='boy'){ shirt='#FFEE58'; size=size*0.75; }
  else if(isFemale){ shirt='#4FC3F7'; }

  const eyeWorry = emotion==='worried' ? 2 : emotion==='scared' ? -3 : 0;
  const mouthChar = emotion==='scared' ? 'O' : emotion==='worried' ? '︿' : emotion==='happy' ? '‿' : emotion==='angry' ? '—' : '–';
  const mouthY = emotion==='scared' ? 52 : 50;

  return (
    <div style={{width:size, height:size*1.65, transform: flip? 'scaleX(-1)': undefined}}>
      <svg viewBox="0 0 100 165" width="100%" height="100%">
        {/* Head */}
        <circle cx="50" cy="38" r={isOld?26:24} fill={skin} stroke="black" strokeWidth="1.4"/>
        {/* Hair */}
        {isOld ? (
          <path d="M24 28 Q50 8 76 28 Q76 18 50 12 Q24 18 24 28" fill={hair} stroke="black" strokeWidth="0.8"/>
        ): (
          <path d="M22 30 Q50 3 78 30 Q78 20 50 10 Q22 20 22 30" fill={hair}/>
        )}
        {isFemale && <circle cx="78" cy="35" r="5" fill="#E91E63"/>}
        {/* Wrinkles for old */}
        {ageLines && <>
          <path d="M30 35 Q50 38 70 35" stroke="#8D6E63" strokeWidth="0.5" fill="none"/>
          <path d="M32 42 Q50 45 68 42" stroke="#8D6E63" strokeWidth="0.5" fill="none"/>
        </>}
        {/* Eyes */}
        <g>
          <circle cx={38+eyeWorry} cy="37" r={emotion==='scared'?4:3} fill="white" stroke="black" strokeWidth="0.8"/>
          <circle cx={38+eyeWorry} cy="37" r="2" fill="black"/>
          <circle cx={62+eyeWorry} cy="37" r={emotion==='scared'?4:3} fill="white" stroke="black" strokeWidth="0.8"/>
          <circle cx={62+eyeWorry} cy="37" r="2" fill="black"/>
          {emotion==='scared' && <>
            <circle cx="36" cy="34" r="1" fill="white"/><circle cx="60" cy="34" r="1" fill="white"/>
            {/* sweat */}
            <circle cx="70" cy="28" r="2" fill="#81D4FA" opacity="0.8"/>
          </>}
        </g>
        {/* Eyebrows */}
        <path d={emotion==='angry' ? "M30 28 L45 32 M55 32 L70 28" : "M30 30 Q37 28 44 30 M56 30 Q63 28 70 30"} stroke="black" strokeWidth="1.2" fill="none"/>
        {/* Mouth */}
        <text x="50" y={mouthY} fontSize={emotion==='scared'?14:10} textAnchor="middle" fontWeight="bold">{mouthChar}</text>
        {/* Body */}
        <rect x="18" y="62" width="64" height="52" rx="6" fill={shirt} stroke="black" strokeWidth="1.3"/>
        {/* Buttons */}
        <circle cx="50" cy="72" r="2" fill="black"/><circle cx="50" cy="82" r="2" fill="black"/><circle cx="50" cy="92" r="2" fill="black"/>
        {/* Dhoti/Lungi for prahlad */}
        {name==='prahlad' ? (
          <path d="M18 114 L18 155 L82 155 L82 114 Z" fill="#F5F5DC" stroke="black" strokeWidth="1"/>
        ):(
          <>
            <rect x="22" y="114" width="24" height="42" fill="#2C3E50" stroke="black" strokeWidth="0.8"/>
            <rect x="54" y="114" width="24" height="42" fill="#2C3E50" stroke="black" strokeWidth="0.8"/>
          </>
        )}
        {/* Arms */}
        <rect x="6" y="68" width="14" height="34" rx="7" fill={skin} stroke="black" strokeWidth="1"/>
        <rect x="80" y="68" width="14" height="34" rx="7" fill={skin} stroke="black" strokeWidth="1"/>
      </svg>
    </div>
  );
};

export const CharacterGroup: React.FC<{names: CharacterName[], emotions?: Emotion[]}> = ({names, emotions}) => {
  return (
    <div style={{display:'flex', gap:-20, alignItems:'flex-end'}}>
      {names.map((n,i)=><div key={i} style={{marginLeft: i===0?0:-30, zIndex: names.length-i}}><Character name={n} emotion={emotions?.[i]||'normal'} size={180+ i*10} /></div>)}
    </div>
  );
};
