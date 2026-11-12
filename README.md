# After Effects & Premiere Pro Automation Toolkit

A curated collection of modular, production-ready automation scripts for **Adobe After Effects** and **Adobe Premiere Pro**, designed to streamline complex video editing workflows and replicate high-end trending visual aesthetics in 1 click.

---

## 🛠️ Included Automation Scripts

| Script | Aesthetic / Effect Style | Workflow Support |
| :--- | :--- | :--- |
| **`CreateCascadingDeck.jsx`** | Viral "Ok Jaanu" Rolling Cascading Card Deck | 1-Click Premiere Dynamic Link |
| **`CreateCrimsonShutterDrag.jsx`** | Wong Kar-wai Step-Printing & Crimson Shutter Drag | 1-Click Premiere Dynamic Link |

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

## 🔴 Script 2: `CreateCrimsonShutterDrag.jsx`
### Wong Kar-wai Step-Printing & Crimson Shutter Drag Generator

![Cinematic Shutter Drag](https://img.shields.io/badge/Cinematic-Step--Printing-E60000?logo=quicktime&logoColor=white)
![Kodak Aerochrome](https://img.shields.io/badge/Color%20Grade-Crimson%20Aerochrome-8B0000)

### 🏮 Origin & Inspiration
Recreates the legendary visual language of cinematographer **Christopher Doyle** and director **Wong Kar-wai** (*Fallen Angels*, *Chungking Express*, and The Weeknd's *After Hours*). It transforms raw night drives, subway rides, and street footage into long-exposure, dreamlike crimson cinema.

### ✨ Features
1. **12 FPS Step-Printing Motion Drag**:
   * Uses low-framerate sampling with trailing multi-echo frame accumulation (`Maximum` blending) to create authentic light streaks and motion blur trails behind headlights, neon, and moving subjects.
2. **Monochromatic Crimson & Amber Aerochrome Palette**:
   * Remaps dark shadows to deep blood-crimson (`RGB: [0.14, 0.01, 0.02]`) and specular highlights into glowing warm amber/gold (`RGB: [1.00, 0.68, 0.28]`).
3. **Diffuse Halation & Bloom**:
   * Simulates vintage anamorphic film light bleeding around streetlights, tunnel fixtures, and reflective surfaces.
4. **Super 8 Curved Film Gate**:
   * Automatically adds an authentic curved, rounded-corner vignette border with soft organic edge falloff.
5. **Seamless Dynamic Link Support**:
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
- [x] Wong Kar-wai Step-Printing & Crimson Shutter Drag (`CreateCrimsonShutterDrag.jsx`)
- [ ] 3x3 Editorial Multi-Screen Contact Sheet
- [ ] 3D Vinyl / CD Jewel Case Spin & Eject
- [ ] 2.5D Parallax Freeze-Frame Cutout

---

### 📄 License
Distributed under the MIT License. Copyright (c) 2026 Heerozq.
