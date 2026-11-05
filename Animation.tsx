import {useCurrentFrame, interpolate, spring, useVideoConfig, random} from 'remotion';

export const useFadeIn = (duration=15) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [0, duration], [0,1], {extrapolateRight:'clamp'});
};

export const usePopIn = (delay=0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame-delay, fps, config:{damping:12, stiffness:180}});
  return s;
};

export const useSlideIn = (from: 'left'|'right'|'bottom'= 'bottom', distance=50) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0,12], [0,1], {extrapolateRight:'clamp'});
  const x = from==='left' ? interpolate(progress, [0,1], [-distance,0]) : from==='right' ? interpolate(progress, [0,1], [distance,0]) : 0;
  const y = from==='bottom' ? interpolate(progress, [0,1], [distance,0]) : 0;
  return {x,y, opacity: progress};
};

export const useTypewriter = (text: string, speed=2) => {
  // speed = chars per frame
  const frame = useCurrentFrame();
  const totalChars = text.length;
  const shownChars = Math.min(totalChars, Math.floor(frame * speed));
  return text.slice(0, shownChars);
};

export const useShake = (intensity=0, startFrame=99999, duration=10) => {
  const frame = useCurrentFrame();
  if(frame < startFrame || frame > startFrame+duration) return {x:0, y:0};
  // Deterministic per-frame randomness (Math.random() breaks chunked/parallel rendering)
  const x = (random(`shake-x-${frame}`)-0.5)*intensity*2;
  const y = (random(`shake-y-${frame}`)-0.5)*intensity*2;
  return {x,y};
};

export const useLipSync = () => {
  const frame = useCurrentFrame();
  // Simple pulse illusion synced to audio - scaleY 1 to 1.08 every 8 frames
  const pulse = 1 + Math.sin(frame/4)*0.04;
  return {scaleY: pulse};
};

export const useClockTick = (startTime: string = "11:58") => {
  const frame = useCurrentFrame();
  // Parse 11:58 -> tick to 11:59 after 60 frames, 12:00 after 120 frames
  const [h,m] = startTime.split(':').map(Number);
  const totalMinutes = h*60 + m + Math.floor(frame/ (30*2)); // tick every 2 seconds for demo
  const newH = Math.floor(totalMinutes/60)%24;
  const newM = totalMinutes%60;
  return `${String(newH).padStart(2,'0')}:${String(newM).padStart(2,'0')}`;
};

export const useCountUp = (target: number, durationFrames=40) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, durationFrames], [0,1], {extrapolateRight:'clamp'});
  return Math.floor(progress * target);
};
