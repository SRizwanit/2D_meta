# 2D Horror Animation - Step 1 Done

## Structure (Flat, No Subfolders)
All files are in root as requested.

## How to run on Mobile Browser
1. Go to github.dev (or Codespaces)
2. npm install
3. npm run dev -> Remotion Studio will open
4. Put your audio.mp3 and timestamp.json (your Rizwan_story1.json) in public/ folder
   - If you keep in root, copy: cp timestamp.json public/timestamp.json ; cp audio.mp3 public/audio.mp3
5. Edit Rizwan_story1.json -> rename to timestamp.json with { "transcription": [...] }

## Next Steps
Step 2 will add full horror characters, backgrounds, props.
Step 7 will add render.yml with 500-frame chunk upload.

## Files in Step 1
- Root.tsx, Composition.tsx, Scene.tsx, Characters.tsx, Backgrounds.tsx, UI.tsx, Subtitle.tsx, Effects.tsx, AudioEngine.tsx, Styles.tsx
- package.json, tsconfig.json, remotion.config.ts, index.ts
