import React from 'react';
import {Audio, staticFile} from 'remotion';

export const AudioEngine: React.FC = () => {
  return <Audio src={staticFile('audio.mp3')} volume={1} />;
};

export type WordEntry = {word: string, start_ms: number, end_ms: number, source?: string};
export type SceneGroup = {
  start: number, // seconds
  end: number,
  text: string,
  words: WordEntry[],
  sceneType: string,
  character: string,
  emotion: string,
  locationTag?: string,
  year?: string
};

// Bangla keywords to detect scene type - tailored for Lahuria story
const SCENE_KEYWORDS: Record<string, string[]> = {
  fasholi_field: ['ফসলি', 'জমি', 'ভিটা', 'পতিত', 'চতুরদিকে', 'মাঝখানে', 'নির্মাণ', 'ঘর'],
  haunted_night: ['ভয়', 'অন্ধকার', 'রাত', 'ভূত', 'আত্মা', 'ছায়া', 'নিস্তব্ধ', 'শব্দ'],
  room_night: ['বাড়ি', 'ঘর', 'পরিবার', 'বসবাস', 'স্ত্রী', 'ছেলে'],
  village_day: ['গ্রাম', 'ইউনিয়ন', 'উপজেলা', 'জেলা', 'নড়াইল', 'লোহাগাড়া', 'লাহুরিয়া'],
};

const CHARACTER_KEYWORDS: Record<string, string[]> = {
  prahlad: ['প্রহ্লাদ', 'বিশ্বাস'],
  wife: ['স্ত্রী'],
  prakash: ['প্রকাশ'],
  prabhas: ['প্রভাষ', 'প্রভাস'],
  pankaj: ['পঙ্কজ'],
  ghost: ['ভূত', 'প্রেত', 'আত্মা'],
};

function detectSceneType(text: string): string {
  for(const [type, keywords] of Object.entries(SCENE_KEYWORDS)){
    for(const kw of keywords){
      if(text.includes(kw)) return type;
    }
  }
  return 'room_night';
}

function detectCharacter(text: string): {character: string, emotion: string} {
  for(const [char, keywords] of Object.entries(CHARACTER_KEYWORDS)){
    for(const kw of keywords){
      if(text.includes(kw)) return {character: char, emotion: 'normal'};
    }
  }
  // Emotion detection
  let emotion = 'normal';
  if(text.includes('ভয়') || text.includes('ভীত') || text.includes('আতঙ্ক')) emotion='scared';
  else if(text.includes('চিন্তা') || text.includes('দুঃখ') || text.includes('বনিবনা')) emotion='worried';
  else if(text.includes('আনন্দ') || text.includes('হাসি')) emotion='happy';
  return {character: 'prahlad', emotion};
}

function extractYear(text: string): string | undefined {
  // Look for Bengali or English year like ১৯৭৬ or 1976
  const match = text.match(/([১-৯০-৯]{4}|[0-9]{4})/);
  if(match){
    const y = match[0];
    // Filter plausible years 1900-2026
    if(y.includes('১৯') || y.includes('২০') || (parseInt(y) >= 1900 && parseInt(y) <= 2026)) return y;
  }
  return undefined;
}

function extractLocation(text: string): string | undefined {
  if(text.includes('নড়াইল') || text.includes('লোহাগাড়া') || text.includes('লাহুরিয়া')) return text.match(/নড়াইল|লোহাগাড়া|লাহুরিয়া.*?(গ্রাম|জেলা|উপজেলা|ইউনিয়ন)*/g)?.join(' • ');
  if(text.includes('ফসলি') || text.includes('ভিটা')) return 'ফসলি জমির মাঝে ভিটা';
  return undefined;
}

export function groupWordsToSentences(words: WordEntry[], maxGapMs=750, maxWords=14): SceneGroup[] {
  if(!words.length) return [];
  const groups: SceneGroup[] = [];
  let current: WordEntry[] = [words[0]];
  
  const flush = () => {
    if(!current.length) return;
    const txt = current.map(w=>w.word).join(' ').replace(/\s+/g,' ').trim();
    const sceneType = detectSceneType(txt);
    const {character, emotion} = detectCharacter(txt);
    const year = extractYear(txt);
    const locationTag = extractLocation(txt);
    groups.push({
      start: current[0].start_ms/1000,
      end: current[current.length-1].end_ms/1000,
      text: txt,
      words: [...current],
      sceneType,
      character,
      emotion,
      locationTag,
      year
    });
    current = [];
  };

  for(let i=1;i<words.length;i++){
    const gap = words[i].start_ms - words[i-1].end_ms;
    const punctEnd = /[।!?]$/.test(words[i-1].word); // Bangla dari
    if(gap > maxGapMs || current.length >= maxWords || punctEnd){
      flush();
      current = [words[i]];
    } else {
      current.push(words[i]);
    }
  }
  flush();
  return groups;
}

// Main parser - supports both formats
export function parseTimestampData(data: any): {groups: SceneGroup[], durationSec: number} {
  let words: WordEntry[] = [];
  let groups: SceneGroup[] = [];
  
  // Format 1: Your Rizwan_story1.json - {transcription: [{word,start_ms,end_ms}]}
  if(data.transcription && Array.isArray(data.transcription)){
    words = data.transcription;
    groups = groupWordsToSentences(words);
  }
  // Format 2: New format - [{start,end,text,scene,character,emotion}]
  else if(Array.isArray(data) && data[0]?.text){
    groups = data.map((d:any)=>({
      start: d.start, end: d.end, text: d.text,
      words: [], sceneType: d.scene || detectSceneType(d.text),
      character: d.character || detectCharacter(d.text).character,
      emotion: d.emotion || detectCharacter(d.text).emotion,
      locationTag: d.locationTag, year: d.year
    }));
  }
  // Format 3: {words: [...]}
  else if(data.words){
    words = data.words;
    groups = groupWordsToSentences(words);
  }
  
  const duration = groups.length ? Math.ceil(groups[groups.length-1].end + 1.5) : 30;
  return {groups, durationSec: duration};
}
