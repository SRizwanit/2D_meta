import React from 'react';
import {Audio, staticFile, useCurrentFrame} from 'remotion';

// This loads audio.mp3 and timestamp.json from root/public
// For flat structure, place files in public/ OR root and copy in workflow

export const AudioEngine: React.FC = () => {
  // Try both locations
  return (
    <>
      {/* Audio will be provided by user as audio.mp3 */}
      <Audio src={staticFile('audio.mp3')} volume={1} />
    </>
  );
};

// Helper to convert word-level transcription to scene groups
export type WordEntry = {word: string, start_ms: number, end_ms: number};
export type SceneGroup = {start: number, end: number, text: string};

export function groupWordsToSentences(words: WordEntry[], maxGapMs=800): SceneGroup[] {
  if(!words.length) return [];
  const groups: SceneGroup[] = [];
  let current: WordEntry[] = [words[0]];
  for(let i=1;i<words.length;i++){
    const gap = words[i].start_ms - words[i-1].end_ms;
    if(gap > maxGapMs || current.length >= 12){
      const txt = current.map(w=>w.word).join(' ');
      groups.push({start: current[0].start_ms/1000, end: current[current.length-1].end_ms/1000, text: txt});
      current = [words[i]];
    } else {
      current.push(words[i]);
    }
  }
  if(current.length){
    const txt = current.map(w=>w.word).join(' ');
    groups.push({start: current[0].start_ms/1000, end: current[current.length-1].end_ms/1000, text: txt});
  }
  return groups;
}
