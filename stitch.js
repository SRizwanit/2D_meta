// stitch.js - Node script to stitch chunks locally (if you want to test on PC)
const fs = require('fs');
const { execSync } = require('child_process');

const chunkDir = 'out';
if(!fs.existsSync(chunkDir)) {
  console.log('No out/ folder, creating');
  fs.mkdirSync(chunkDir, {recursive:true});
}

const files = fs.readdirSync(chunkDir).filter(f=>f.startsWith('chunk_') && f.endsWith('.mp4')).sort((a,b)=>{
  const numA = parseInt(a.match(/chunk_(\d+)/)?.[1] || '0');
  const numB = parseInt(b.match(/chunk_(\d+)/)?.[1] || '0');
  return numA - numB;
});

if(files.length===0){
  console.log('No chunks found in out/');
  process.exit(0);
}

console.log(`Found ${files.length} chunks:`, files);

const concatContent = files.map(f=>`file '${f}'`).join('\n');
fs.writeFileSync(`${chunkDir}/concat.txt`, concatContent);
console.log('Created concat.txt');

try {
  console.log('Stitching with ffmpeg...');
  execSync(`ffmpeg -f concat -safe 0 -i ${chunkDir}/concat.txt -c copy ${chunkDir}/final_raw.mp4 -y`, {stdio:'inherit'});
  execSync(`ffmpeg -i ${chunkDir}/final_raw.mp4 -c:v libx264 -c:a aac -movflags +faststart ${chunkDir}/final.mp4 -y`, {stdio:'inherit'});
  console.log('Final video:', `${chunkDir}/final.mp4`);
} catch(e){
  console.error('FFmpeg stitch failed, is ffmpeg installed?', e.message);
  console.log('You can manually run: ffmpeg -f concat -safe 0 -i out/concat.txt -c copy out/final.mp4');
}
