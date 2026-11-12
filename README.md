# After Effects & Premiere Pro Automation Toolkit

A curated collection of modular, production-ready automation scripts for **Adobe After Effects** and **Adobe Premiere Pro**, designed to streamline complex video editing workflows and replicate high-end trending visual aesthetics in 1 click.

---

## 🛠️ Included Automation Scripts

| Script | Aesthetic / Effect Style | Workflow Support |
| :--- | :--- | :--- |
| **`CreateCascadingDeck.jsx`** | Viral "Ok Jaanu" Rolling Cascading Card Deck | 1-Click Premiere Dynamic Link |
| **`CreateShutterDrag.jsx`** | Wong Kar-wai Step-Printing & Shutter Drag (Natural / B&W / Crimson) | 1-Click Premiere Dynamic Link |
| **`CreateCrimsonShutterDrag.jsx`** | Crimson / Aerochrome Shutter Drag Preset | 1-Click Premiere Dynamic Link |

---

## 🎬 Script 1: `CreateCascadingDeck.jsx`
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

## 🏎️ Script 2: `CreateShutterDrag.jsx`
### Wong Kar-wai Step-Printing & Shutter Drag Generator

![Cinematic Shutter Drag](https://img.shields.io/badge/Cinematic-Step--Printing-E60000?logo=quicktime&logoColor=white)
![Natural Color Preserved](https://img.shields.io/badge/Color%20Grade-Natural%20%26%20Monochrome-00A86B)

### 🏮 Origin & Inspiration
Recreates the iconic slow-shutter step-printing visual language pioneered by cinematographer **Christopher Doyle** and director **Wong Kar-wai** (*Chungking Express*, *Fallen Angels*), seen extensively in viral travel, late-night car/rickshaw rides, and moody street edits (such as the viral *"Alarm behave yourself"* rickshaw trend).

### ✨ Features
1. **6.0 FPS Step-Printing Shutter Cadence**:
   * Uses low-framerate sampling (`Posterize Time`) matching the empirical $5\text{--}6\text{ fps}$ hold rate of analog step-printing.
2. **Long-Exposure Light Streaks & Shutter Drag**:
   * Uses multi-echo temporal accumulation (`Maximum` blending) to produce crisp trailing light paths behind headlights, streetlights, neon signs, and fast-moving subjects without smearing the entire image into mud.
3. **Natural Colors Preserved by Default**:
   * **Zero unwanted tint!** By default, `COLOR_MODE = "NATURAL"` leaves 100% of your footage's native colors untouched while gently punching dynamic contrast.
   * Also includes quick 1-line preset switches for:
     * `"MONOCHROME"`: High-contrast film noir Black & White (as seen in *"Alarm behave yourself"*).
     * `"CRIMSON"`: Deep crimson/amber vintage night look.
4. **Diffuse Halation & Highlight Bloom**:
   * Soft exposure bloom around light sources simulating slow-shutter film exposure.
5. **Organic 35mm Analog Grain**:
   * Native `Add Grain` (Final Output mode) or procedural noise for vintage texture.
6. **Seamless Dynamic Link Support**:
   * Run directly on any linked Premiere Pro clip—all effects apply in-place with zero re-importing.

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
- [x] Viral "Ok Jaanu" Cascading Card Deck Generator (`CreateCascadingDeck.jsx`)
- [x] Wong Kar-wai Step-Printing & Shutter Drag (`CreateShutterDrag.jsx` / `CreateCrimsonShutterDrag.jsx`)
- [ ] 3x3 Editorial Multi-Screen Contact Sheet
- [ ] 3D Vinyl / CD Jewel Case Spin & Eject
- [ ] 2.5D Parallax Freeze-Frame Cutout

---

### 📄 License
Distributed under the MIT License. Copyright (c) 2026 Heerozq.
