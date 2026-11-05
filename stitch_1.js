// Node script to stitch chunks: ffmpeg -f concat
import fs from 'fs';
const chunkDir = 'out';
if(!fs.existsSync(chunkDir)) fs.mkdirSync(chunkDir, {recursive:true});
const files = fs.readdirSync(chunkDir).filter(f=>f.startsWith('chunk_')).sort();
const list = files.map(f=>`file '${f}'`).join('\n');
fs.writeFileSync(`${chunkDir}/concat.txt`, list);
console.log('Stitch list created:', files.length, 'chunks');
