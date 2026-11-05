import React, {useEffect, useState} from 'react';
import {AbsoluteFill, useVideoConfig, Audio, staticFile, Sequence, Loop, delayRender, continueRender} from 'remotion';
import {Scene} from './Scene';
import {parseTimestampData, SceneGroup} from './AudioEngine';
import {LAYOUT} from './Styles';

export const MainComposition: React.FC = () => {
  const {fps} = useVideoConfig();
  const [groups, setGroups] = useState<SceneGroup[]>([]);
  const [loaded, setLoaded] = useState(false);
  // Hold the renderer until timestamp data is loaded - otherwise frames capture the "Loading" screen
  const [handle] = useState(() => delayRender('Loading timestamp.json'));

  useEffect(()=>{
    // Try multiple paths - for flat structure + public/
    const paths = [
      staticFile('timestamp.json'),
      staticFile('Rizwan_story1.json'),
      './timestamp.json',
      './Rizwan_story1.json',
      '/timestamp.json'
    ];
    
    const tryFetch = async (i=0) => {
      if(i>=paths.length){
        // Fallback demo for Lahuria story
        setGroups([
          {start:0, end:4, text:'ঘটনাটির সময় উনিশশো ছিয়াত্তর সাল। নড়াইল জেলার', words:[], sceneType:'village_day', character:'prahlad', emotion:'normal', year:'১৯৭৬', locationTag:'নড়াইল • লোহাগাড়া • লাহুরিয়া'},
          {start:4, end:9, text:'লোহাগাড়া উপজেলার লাহুরিয়া ইউনিয়নের ছোট্ট গ্রাম', words:[], sceneType:'village_day', character:'prahlad', emotion:'normal', locationTag:'লাহুরিয়া গ্রাম'},
          {start:9, end:15, text:'এই গ্রামেই প্রহ্লাদ বিশ্বাস, তার স্ত্রী, তিন ছেলে প্রভাষ, পঙ্কজ ও প্রকাশ।', words:[], sceneType:'room_night', character:'prahlad', emotion:'normal'},
          {start:15, end:22, text:'ফসলি জমির মাঝখানে একটি ভিটা। সেখানে প্রহ্লাদ বিশ্বাস পরিবার নিয়ে বসবাস করে।', words:[], sceneType:'fasholi_field', character:'prahlad', emotion:'worried', locationTag:'ফসলি জমির মাঝে ভিটা • ১০-১৫ মিনিট দূরে গ্রাম'},
        ]);
        setLoaded(true);
        return;
      }
      try{
        const res = await fetch(paths[i]);
        if(!res.ok) throw new Error('not found');
        const data = await res.json();
        const parsed = parseTimestampData(data);
        setGroups(parsed.groups);
        setLoaded(true);
        console.log('Loaded timestamp from', paths[i], parsed.groups.length, 'scenes');
      }catch(e){
        tryFetch(i+1);
      }
    };
    tryFetch();
  },[]);

  useEffect(()=>{
    if(loaded) continueRender(handle);
  },[loaded, handle]);

  if(!loaded){
    return <AbsoluteFill style={{background:'black', color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>Loading Lahuria story...</AbsoluteFill>;
  }

  return (
    <AbsoluteFill style={{width:LAYOUT.width, height:LAYOUT.height, background:'black'}}>
      <Audio src={staticFile('audio.mp3')} />
      
      {groups.map((g, idx)=>{
        const startFrame = Math.floor(g.start * fps);
        const duration = Math.max(fps*0.8, Math.floor((g.end - g.start)*fps + fps*0.3)); // add 0.3s buffer
        return (
          <Sequence key={idx} from={startFrame} durationInFrames={duration} name={`${idx}-${g.text.slice(0,20)}`}>
            <Scene group={g} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
