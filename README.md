# 👻 2D Horror Animation - Ghost Story (Lahuria Village) - FINAL PACKAGE

> Mobile + Browser Only | React + Remotion + GitHub Actions | No Device Needed | Flat Structure (No Subfolders)

This is the **FINAL complete package** after 8 steps. You can now create 2D horror animations like the reference video for your Facebook Page & YouTube Channel.

---

## 📦 What's Inside (Flat Structure)

**Core (Step 1):**
- `package.json`, `tsconfig.json`, `remotion.config.ts`, `index.ts`, `Root.tsx`, `Styles.tsx`

**Animation Engine (Step 2-6):**
- `Characters.tsx` - prahlad, wife, prakash, prabhas, pankaj, ghost, oldman, narrator, boy (SVG)
- `Backgrounds.tsx` - fasholi_field (your Lahuria vita), haunted_night, room_night, village_day, Props (candle, lantern)
- `UI.tsx` - DigitalClock (11:58->12:00 ticking), WallClock (rotating), EcomBadge, LocationTag, YearTag, MoneyCard
- `Effects.tsx` - FogOverlay, Vignette, CandleLight, Moonlight, GhostAppear, EyeGlow, Shake, Flicker, DustParticles, LanternSwing, AudioPulse (11 effects)
- `Animation.tsx` - useFadeIn, usePopIn, useSlideIn, useTypewriter, useShake, useLipSync, useClockTick, useCountUp
- `Subtitle.tsx` - Auto font sizing (26-34px), **bold** red, Typewriter cursor ▌, Bangla number ১৯৭৬, Money count-up ১০,০০,০০০
- `Scene.tsx` - Smart scene mapping, Ken Burns zoom, character entrance spring, progress bar
- `AudioEngine.tsx` - Parses Rizwan_story1.json (word-level) -> sentence groups, detects scene type, character, year, location
- `Composition.tsx` - Main composition 1080x1920 30fps, tries 5 paths for timestamp.json, auto duration

**Render (Step 7):**
- `.github/workflows/render.yml` - GitHub Actions: plan -> one job per 500-frame chunk (each uploads its own artifact when finished) -> stitch + audio

**Data:**
- `Rizwan_story1.json` (word timestamps), `audio.mp3`

**Docs / config:**
- `README.md` (this file), `.gitignore`, `package-lock.json`

---

## 🎯 Your Story: Lahuria 1976

Your `Rizwan_story1.json` has 144 words, 106 seconds:
- **Scene 0**: village_day, year `১৯৭৬`, location `নড়াইল • লোহাগাড়া • লাহুরিয়া` - "ঘটনাটির সময় উনিশশো ছিয়াত্তর সাল"
- **Scene 3-4**: fasholi_field, location `ফসলি জমির মাঝে ভিটা • ১০-১৫ মিনিট দূরে গ্রাম` - "ওই জমির চতুরদিকে রয়েছে ফসলি জমি। মাঝখানে একটি ভিটা।"
- **Haunted scenes**: When word "ভয়", "ভূত", "রাত" appears -> fog + vignette + red eye glow + shake

Perfect for ghost story!

---

## 📱 How to Use on Mobile (Browser Only) - Step by Step

### Option A: GitHub.dev (Recommended for Mobile)

1. **Create GitHub Repo:**
   - Go to github.com -> New Repository -> Name: `2d-horror-animation` -> Public -> Create

2. **Upload ZIP:**
   - Go to `https://github.dev/YOUR_USERNAME/2d-horror-animation` (replace YOUR_USERNAME)
   - Drag & drop all files from this ZIP (or upload via File -> Open Folder)
   - **Important**: Keep all files in ROOT, no subfolders except .github

3. **Upload Your Audio & Timestamp:**
   - Upload your `audio.mp3` to ROOT (or `public/` folder)
   - Upload your `Rizwan_story1.json` as `timestamp.json` to ROOT (or `public/`)
   - You can also keep both in `public/` folder: create `public/` folder and copy files there

4. **Workflow:**
   - `.github/workflows/render.yml` is already in the project - nothing to set up.

5. **Push:**
   ```bash
   git add .
   git commit -m "Initial: Lahuria ghost story"
   git push origin main
   ```

6. **Render:**
   - Go to github.com/YOUR_USERNAME/2d-horror-animation -> Actions tab
   - You will see "Render 2D Horror Animation" workflow
   - Click "Run workflow" -> Leave defaults (fps 30, chunk 500) -> Run
   - The 7 chunks (500 frames each) render as separate jobs, up to 4 at a time
   - As soon as a chunk finishes, its own artifact `video-chunk-<start>-<end>` appears on the run page - no need to wait for the others
   - If one chunk fails, use "Re-run failed jobs" - finished chunks are kept

7. **Download:**
   - After workflow finishes, go to workflow run page -> Scroll down to Artifacts
   - Download `final-video-full` -> This is your final 1080x1920 vertical video!
   - Each `video-chunk-<start>-<end>` artifact is a single 500-frame piece (backup, available as soon as it finishes)

8. **Post:**
   - Download final.mp4 to phone
   - Post to Facebook Page & YouTube Channel (Shorts or regular vertical video)

### Option B: GitHub Mobile App

Same steps, but use GitHub mobile app to upload files, then use github.dev in mobile browser for terminal.

---

## 🔧 Local Test (Optional, on PC)

If you have PC:
```bash
npm install
mkdir -p public
cp Rizwan_story1.json public/timestamp.json
cp audio.mp3 public/audio.mp3
npm run dev  # Opens Remotion Studio at localhost:3000
```

To render locally in chunks:
```bash
npm run render  # Full render
# OR a single chunk:
npx remotion render index.ts Composition out/chunk_0_499.mp4 --frames=0-499 --muted
```

---

## 📝 timestamp.json Formats Supported

**Format 1: Your Rizwan_story1.json (Word-level) - AUTO SUPPORTED:**
```json
{
  "transcription": [
    {"word": "ঘটনাটির", "start_ms": 0, "end_ms": 710},
    {"word": "সময়", "start_ms": 940, "end_ms": 2350}
  ]
}
```
Engine auto groups into sentences, detects scene type, character, year.

**Format 2: Scene-level (Recommended for new stories):**
```json
[
  {"start": 0, "end": 3.5, "text": "ঘটনাটির সময় উনিশশো ছিয়াত্তর সাল", "scene": "village_day", "character": "prahlad", "emotion": "normal"},
  {"start": 3.5, "end": 8, "text": "নড়াইল জেলার লোহাগাড়া উপজেলার লাহুরিয়া গ্রাম", "scene": "village_day", "character": "prahlad", "emotion": "normal"}
]
```

**Format 3: Simple array of words:**
```json
{"words": [{"word": "ঘটনাটির", "start_ms": 0, "end_ms": 710}]}
```

All 3 work!

---

## 🎨 Customization for New Ghost Stories

- **Change Character**: In timestamp.json scene format, set `"character": "ghost"` or `"prahlad"` or `"wife"`
- **Change Emotion**: `"emotion": "scared"` -> triggers shake + eye glow
- **Change Background**: `"scene": "fasholi_field"` or `"haunted_night"` or `"room_night"` or `"village_day"`
- **Add Year**: Text contains "1976" or "১৯৭৬" -> auto shows YearTag `১৯৭৬ সাল`
- **Add Location**: Text contains "ফসলি", "ভিটা", "নড়াইল" -> auto LocationTag

---

## 🚀 Performance & Limits

- **No timeout**: 360 min (6 hours) max per workflow, your 2-min story ~45-60 min
- **Every 500 frames artifact**: If crash, you have chunks
- **Concurrency 1**: Avoids OOM on GitHub free runner (2-core, 7GB)
- **Long video**: 30 min story = 54000 frames = 108 chunks, still within 360 min (approx 5-6 hours)
- **Final video**: 1080x1920, h264, aac, faststart (YouTube/Facebook optimized)

---

## 🆘 Troubleshooting

- **Workflow cannot push**: Go to Repo Settings -> Actions -> General -> Workflow permissions -> Check "Read and write permissions" -> Save
- **timestamp.json not found**: Keep `Rizwan_story1.json` (or `timestamp.json`) in the root. The workflow copies it to `public/timestamp.json`.
- **audio.mp3 not found**: Same, put in root or public.
- **Out of memory**: Reduce concurrency is already 1, reduce chunk_size to 250 in workflow dispatch inputs
- **Bangla font broken**: Root.tsx loads Noto Sans Bengali / Hind Siliguri via `@remotion/google-fonts` (waits until ready; needs internet during render - GitHub runner has it)
- **"frame range is not inbetween" error**: Frame count must be the same in `Root.tsx` and the `plan` job of `render.yml` (both use `ceil(last_end + 2s) x 30`)

---

## 📜 License

MIT - Free for your Facebook Page & YouTube Channel. No attribution needed.

---

## 🙏 Credits

- Reference video style: Ecom animation (flat 2D cartoon, digital clock, chat bubble)
- Your story: Lahuria village 1976 - Prahlad Biswas isolated vita in farmland
- Built with: React + Remotion + GitHub Actions + 11 horror effects
- Made for: Rakib - Mobile only workflow

---

## ✅ Final Checklist

- [x] Step 1: Project Foundation (Flat)
- [x] Step 2: Horror Asset Library (Ghost, fasholi field, 3 houses)
- [x] Step 3: Timestamp Engine (Rizwan_story1.json word->sentence)
- [x] Step 4: Animation Engine (Clock tick, Pop-in, Typewriter, Shake, Lip-sync)
- [x] Step 5: Bangla Typography (Auto sizing, ১৯৭৬, ১০,০০,০০০ count-up)
- [x] Step 6: Horror Effects (Fog, Candle, Moonlight, EyeGlow, Dust, Vignette)
- [x] Step 7: Render Workflow (No timeout, 500-frame chunks, stitch, push)
- [x] Step 8: Final Packaging (This README, example, final ZIP)

**You are ready to create ghost stories!**

**Next story idea**: After Lahuria, try "Pond ghost" or "Banyan tree" - just change scene to haunted_night and character to ghost.

---

Made with ❤️ for 2D horror animation. Follow for more practical business/ghost story animations.
