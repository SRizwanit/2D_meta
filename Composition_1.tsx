import React, {useEffect, useState} from 'react';
import {AbsoluteFill, useVideoConfig, Audio, staticFile, Sequence} from 'remotion';
import {Scene} from './Scene';
import {groupWordsToSentences, WordEntry} from './AudioEngine';
import {LAYOUT} from './Styles';

export const MainComposition: React.FC = () => {
  const {fps} = useVideoConfig();
  const [groups, setGroups] = useState<{start:number,end:number,text:string}[]>([]);
  const [durationSec, setDurationSec] = useState(30);

  useEffect(()=>{
    // Try to load timestamp.json from public or root
    fetch(staticFile('timestamp.json'))
      .then(r=>r.json())
      .then((data:any)=>{
        let words: WordEntry[] = [];
        if(Array.isArray(data.transcription)) words = data.transcription;
        else if(Array.isArray(data)) words = data; // direct array
        else if(data.words) words = data.words;
        
        const g = groupWordsToSentences(words);
        setGroups(g);
        if(words.length){
          const last = words[words.length-1];
          setDurationSec(Math.ceil(last.end_ms/1000)+2);
        }
      })
      .catch(()=>{
        // Fallback example for ghost story
        setGroups([
          {start:0, end:3, text:'ঘটনাটি ১৯৭৬ সালের নড়াইল জেলার'},
          {start:3, end:7, text:'লোহাগাড়া উপজেলার ছোট্ট গ্রাম লাহুরিয়ার'},
          {start:7, end:12, text:'সেখানে প্রহ্লাদ বিশ্বাস একা একটি ভিটায় বসবাস করতেন'},
        ]);
      });
  },[]);

  return (
    <AbsoluteFill style={{width:LAYOUT.width, height:LAYOUT.height}}>
      {/* Audio */}
      <Audio src={staticFile('audio.mp3')} />
      
      {groups.map((g, idx)=>{
        const startFrame = Math.floor(g.start * fps);
        const duration = Math.max(1, Math.floor((g.end - g.start)*fps));
        const isNight = idx % 2 === 0;
        return (
          <Sequence key={idx} from={startFrame} durationInFrames={duration}>
            <Scene text={g.text} sceneType={isNight ? 'room_night' : 'haunted_night'} time={`11:${String(58+idx%2).padStart(2,'0')}`} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
