import React from 'react';
import {COLORS} from './Styles';

type Emotion = 'normal' | 'worried' | 'scared' | 'happy' | 'sad';
type CharacterName = 'shafik' | 'tareq' | 'sister' | 'narrator' | 'ghost' | 'oldman' | 'village_girl';

export const Character: React.FC<{name: CharacterName, emotion?: Emotion, size?: number}> = ({name, emotion='normal', size=280}) => {
  const eyeOffset = emotion === 'scared' ? -2 : emotion === 'worried' ? 1 : 0;
  const mouth = emotion === 'scared' ? 'O' : emotion === 'worried' ? '~' : emotion === 'happy' ? 'U' : '-';

  if(name === 'ghost'){
    return (
      <div style={{width:size, height:size*1.4, position:'relative', opacity:0.7}}>
        <svg viewBox="0 0 100 140" width="100%" height="100%">
          <path d="M20 40 Q50 10 80 40 L80 100 Q70 110 60 100 Q50 110 40 100 Q30 110 20 100 Z" fill="white" opacity={0.8} />
          <circle cx="35" cy="50" r="5" fill="black" />
          <circle cx="65" cy="50" r="5" fill="black" />
          <ellipse cx="50" cy="70" rx="5" ry="8" fill="black" />
        </svg>
      </div>
    );
  }

  // Flat cartoon human - like reference
  const shirtColor = name === 'shafik' ? '#7B5AE0' : name === 'tareq' ? '#E53935' : name === 'sister' ? '#4FC3F7' : '#8D6E63';
  
  return (
    <div style={{width:size, height:size*1.6, display:'flex', flexDirection:'column', alignItems:'center'}}>
      <svg viewBox="0 0 100 160" width="100%" height="100%">
        {/* Head */}
        <circle cx="50" cy="35" r="25" fill="#FFDBAC" stroke="#000" strokeWidth="1.5"/>
        {/* Hair */}
        <path d="M25 30 Q50 5 75 30 Q75 20 50 10 Q25 20 25 30" fill="#2D2D2D" />
        {/* Eyes */}
        <circle cx={38+eyeOffset} cy="35" r="3" fill="black" />
        <circle cx={62+eyeOffset} cy="35" r="3" fill="black" />
        {emotion === 'scared' && <circle cx="38" cy="38" r="1" fill="white" />}
        {/* Mouth */}
        <text x="50" y="48" fontSize="10" textAnchor="middle">{mouth}</text>
        {/* Body - purple shirt like reference */}
        <rect x="20" y="60" width="60" height="50" rx="5" fill={shirtColor} stroke="#000" strokeWidth="1.2"/>
        <circle cx="30" cy="65" r="2" fill="#000" /><circle cx="30" cy="75" r="2" fill="#000" /><circle cx="30" cy="85" r="2" fill="#000" />
        {/* Arms */}
        <rect x="10" y="65" width="12" height="30" rx="6" fill="#FFDBAC" stroke="#000" strokeWidth="1"/>
        <rect x="78" y="65" width="12" height="30" rx="6" fill="#FFDBAC" stroke="#000" strokeWidth="1"/>
        {/* Pants */}
        <rect x="25" y="110" width="22" height="40" fill="#2C3E50" /><rect x="53" y="110" width="22" height="40" fill="#2C3E50" />
      </svg>
    </div>
  );
};
