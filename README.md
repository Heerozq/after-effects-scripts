# After Effects & Premiere Pro Automation Toolkit

A curated collection of modular, production-ready automation scripts for **Adobe After Effects** and **Adobe Premiere Pro**, designed to streamline complex video editing workflows and replicate high-end trending visual aesthetics in 1 click.

---

## 🛠️ Included Automation Scripts

| Script | Aesthetic / Effect Style | Workflow Support |
| :--- | :--- | :--- |
| **`CreateOldFootage.jsx`** | CapCut "Old Footage" Retro Film & Projector Look | 1-Click Premiere Dynamic Link |
| **`CreateCascadingDeck.jsx`** | Viral "Ok Jaanu" Rolling Cascading Card Deck | 1-Click Premiere Dynamic Link |
| **`CreateShutterDrag.jsx`** | Wong Kar-wai Step-Printing & Shutter Drag | 1-Click Premiere Dynamic Link |
| **`CreateCrimsonShutterDrag.jsx`** | Crimson / Aerochrome Shutter Drag Preset | 1-Click Premiere Dynamic Link |

---

## 📽️ Script 1: `CreateOldFootage.jsx`
### The CapCut "Old Footage" Retro Film Generator

![CapCut Retro](https://img.shields.io/badge/Style-CapCut%20Old%20Footage-000000?logo=tiktok&logoColor=white)
![Sharp Subject](https://img.shields.io/badge/Subject-100%25%20In--Focus-brightgreen)
![Dynamic Link](https://img.shields.io/badge/Workflow-1--Click%20Dynamic%20Link-EA77FF?logo=adobepremierepro&logoColor=white)

### 🎞️ Origin & Inspiration
Replicates the viral **"Old Footage"** filter and retro video effect featured heavily in **CapCut**, TikTok, and Instagram Reels (popularized by moody street edits like the viral *"Alarm behave yourself"* rickshaw trend).

### ✨ Features
* **Zero Ghosting & Zero Blur**: Unlike crude multi-echo presets, your subject's face, hands, and clothing remain **100% pin-sharp and in-focus**.
* **Zero Fake Glow**: Eliminates artificial digital halos and milky washed-out blurs.
* **6.0 FPS Projector Cadence**: Native `Posterize Time (6.0 FPS)` recreates the authentic hand-cranked 8mm/16mm film reel stutter.
* **Mechanical Projector Flicker**: Adds organic $\pm 2.5\%$ mechanical exposure fluctuation simulating vintage projector lamps.
* **High-Contrast Film Noir or Natural Color**:
  * `"MONOCHROME"`: Rich, velvety black-and-white film noir (exact match for the *Alarm behave yourself* reference).
  * `"NATURAL"`: Preserves 100% of your native footage colors while punching vintage film contrast.
  * `"SEPIA_VINTAGE"`: Warm historic amber archival look.
* **Organic 35mm Celluloid Grain**: Native `Add Grain (Final Output)` with zero digital banding.
* **Soft Optical Lens Vignette**: Realistic lens falloff around the frame edges.

---

## 🃏 Script 2: `CreateCascadingDeck.jsx`
### The Viral "Ok Jaanu" Cascading Card Deck Generator

![After Effects Automation](https://img.shields.io/badge/Adobe%20After%20Effects-CC%202022%2B-9999FF?logo=adobeaftereffects&logoColor=white)
![Premiere Pro Dynamic Link](https://img.shields.io/badge/Adobe%20Premiere%20Pro-Dynamic%20Link-EA77FF?logo=adobepremierepro&logoColor=white)

### 🎵 Origin & Inspiration
Automates the viral Instagram Reel and CapCut/VN template trend popularized by the soulful Bollywood track **"Saajan Aayo Re"** from the film ***OK Jaanu*** (composed by A. R. Rahman, penned by Gulzar):
> *"Naa samajh see ek ladki, poore din kee chor nikali, de gayi maathe pe rakh ke shaam ke sooraj ki tikli..."*

### ✨ Features
* **In-Place Dynamic Link**: Converts Premiere-linked comps into the $1080 \times 1920$ master canvas in real-time with zero re-importing.
* **Auto 4:5 Card Pre-Comp ($750 \times 950$)**: Auto-scales 16:9 widescreen footage with zero letterboxing.
* **Film Texture**: Native `Posterize Time (6.0 FPS)` + `Add Grain (Final Output, Intensity: 3.7)`.
* **Rolling 4–5 Card FIFO Stack**: Oldest bottom card automatically drops off as each new card arrives.
* **Zero Wandering**: Clamped micro-offsets ($14\text{--}26\text{px}$) keep the deck cleanly centered.
* **Audio Echo Protection**: Mutes background duplicate card layers automatically.

---

## 🏎️ Script 3: `CreateShutterDrag.jsx`
### Wong Kar-wai Step-Printing & Optical Shutter Drag Generator

![Cinematic Shutter Drag](https://img.shields.io/badge/Cinematic-Step--Printing-E60000?logo=quicktime&logoColor=white)
![Natural Color Preserved](https://img.shields.io/badge/Color%20Grade-Natural%20%26%20Monochrome-00A86B)

### 🏮 Origin & Inspiration
Recreates the slow-shutter step-printing visual language pioneered by cinematographer **Christopher Doyle** and director **Wong Kar-wai** (*Chungking Express*, *Fallen Angels*).

### ✨ Features
* **Dual-Layer Architecture**: Base layer keeps the subject 100% sharp while the top layer streaks only high-luminance light sources.
* **Natural Colors Preserved by Default**: Leaves 100% of your footage's native colors untouched with zero unwanted tint.

---

### 🚀 3-Second Workflow (For Any Script)

```
[Premiere Pro Timeline]
  └─ Right-click clip -> "Replace with After Effects Composition"
       │
       ▼ (Dynamic Link)
[After Effects]
  └─ File -> Scripts -> Run Script File... -> Select any script from this repo
       │
       ▼ (Instant in-place update)
[Premiere Pro Timeline]
  └─ DONE! The finished cinematic effect plays live on your sequence.
```

---

### 📂 Permanent Installation in After Effects

To make all scripts appear directly in your After Effects menu:

1. Copy the `.jsx` files to:
   * **Windows**: `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\`
   * **macOS**: `/Applications/Adobe After Effects <Version>/Scripts/`
2. Restart After Effects.
3. Access anytime via **File $\rightarrow$ Scripts $\rightarrow$ [ScriptName].jsx**.

---

### 🗺️ Toolkit Roadmap
- [x] CapCut "Old Footage" Retro Film Look (`CreateOldFootage.jsx`)
- [x] Viral "Ok Jaanu" Cascading Card Deck Generator (`CreateCascadingDeck.jsx`)
- [x] Wong Kar-wai Step-Printing & Optical Shutter Drag (`CreateShutterDrag.jsx`)
- [ ] 3x3 Editorial Multi-Screen Contact Sheet
- [ ] 3D Vinyl / CD Jewel Case Spin & Eject
- [ ] 2.5D Parallax Freeze-Frame Cutout

---

### 📄 License
Distributed under the MIT License. Copyright (c) 2026 Heerozq.
