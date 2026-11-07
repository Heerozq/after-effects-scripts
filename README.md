# After Effects & Premiere Pro Automation Toolkit

A curated collection of modular, production-ready automation scripts for **Adobe After Effects** and **Adobe Premiere Pro**, designed to streamline complex video editing workflows and replicate high-end trending visual aesthetics in 1 click.

---

## 🌟 Featured Script: `CreateCascadingDeck.jsx`
### The Viral "Ok Jaanu" Cascading Card Deck Generator

![After Effects Automation](https://img.shields.io/badge/Adobe%20After%20Effects-CC%202022%2B-9999FF?logo=adobeaftereffects&logoColor=white)
![Premiere Pro Dynamic Link](https://img.shields.io/badge/Adobe%20Premiere%20Pro-Dynamic%20Link-EA77FF?logo=adobepremierepro&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

### 🎵 The Virality & Origin: *The "Ok Jaanu" Aesthetic*
This script reverse-engineers and fully automates the viral Instagram Reel and CapCut/VN template trend popularized by the soulful Bollywood track **"Saajan Aayo Re"** from the film ***OK Jaanu*** (composed by A. R. Rahman, penned by Gulzar):

> *"Naa samajh see ek ladki,*  
> *Poore din kee chor nikali,*  
> *De gayi maathe pe rakh ke,*  
> *Shaam ke sooraj ki tikli..."*

The trend captivated millions across social media through its signature aesthetic: a continuous, rhythmic deck of portrait cards stepping, fanning out, and shedding layers on every beat over a deep pitch-black canvas.

Manual recreation in After Effects typically requires dozens of pre-comps, tedious parenting, manual offsets, and constant re-importing back into Premiere Pro. This script automates the **entire end-to-end pipeline in 1 click**.

---

### ✨ Key Features

1. **Seamless Adobe Dynamic Link (Zero Re-importing)**:
   * Select a clip in Premiere Pro $\rightarrow$ click **Replace with After Effects Composition**.
   * Run the script in After Effects.
   * It performs an **in-place transformation** directly inside the linked composition.
   * Switch back to Premiere Pro: **The finished 9:16 cascading reel is already playing on your timeline!**

2. **Automatic 4:5 Card Generation ($750 \times 950$)**:
   * Automatically takes your 16:9 landscape (or any aspect) footage and nests it into a custom $750 \times 950$ card comp.
   * Auto-scales footage to fill the card height with zero black letterboxing and centers the subject.

3. **Authentic Film Shutter & Grain Baked In**:
   * Automatically applies **`Posterize Time`** set to **`6.0 FPS`** for that vintage stop-motion / indie shutter feel.
   * Automatically applies native **`Add Grain`** set to **`Final Output`** mode with **`Intensity: 3.700`**, `Size: 1.0`, `Softness: 1.0`, and `Aspect Ratio: 1.0`.

4. **Rolling FIFO 4–5 Card Stack (No Clutter)**:
   * Keeps the stack tightly capped at **4 to 5 cards max**.
   * On every 6 FPS frame hold, a new card lands on top, while the oldest bottom card automatically expires.

5. **Anti-Wandering Geometry (Rock-Solid Center)**:
   * Offsets are clamped to subtle micro-steps ($14\text{px}\text{--}26\text{px}$ horizontally, $10\text{px}\text{--}22\text{px}$ vertically).
   * Cards never wander, drift, or clip off the screen, leaving clean black margins for lyric overlays.
   * Strictly flat cards: zero rotation, zero drop shadows.

6. **Audio Echo Protection**:
   * Duplicated background card layers have their audio automatically disabled (`audioEnabled = false`).
   * Audio remains active only on the primary card, preventing echoes, volume spikes, or phase flanging.

---

### 🚀 3-Second Workflow

```
[Premiere Pro Timeline]
  └─ Right-click clip -> "Replace with After Effects Composition"
       │
       ▼ (Dynamic Link)
[After Effects]
  └─ File -> Scripts -> Run Script File... -> Select "CreateCascadingDeck.jsx"
       │
       ▼ (Instant in-place update)
[Premiere Pro Timeline]
  └─ DONE! The cascading card reel is playing live on your sequence.
```

---

### ⚙️ Customizable Settings

Open `CreateCascadingDeck.jsx` in any text editor to adjust parameters at the top of the file:

| Parameter | Default | Description |
| :--- | :---: | :--- |
| `POSTERIZE_FPS` | `6.0` | Frame rate of the stop-motion shutter hold |
| `MAX_STACK_SIZE` | `5` | Maximum number of visible cards in the rolling deck |
| `GRAIN_INTENSITY` | `3.700` | Film grain intensity applied to base layer |
| `TARGET_CARD_W` | `750` | Width of the central photo/video card |
| `TARGET_CARD_H` | `950` | Height of the central photo/video card |
| `MIN_OFFSET_X` | `14` | Minimum horizontal step offset (px) |
| `MAX_OFFSET_X` | `26` | Maximum horizontal step offset (px) |
| `MIN_OFFSET_Y` | `10` | Minimum vertical step offset (px) |
| `MAX_OFFSET_Y` | `22` | Maximum vertical step offset (px) |

---

### 📂 Permanent Installation in After Effects

To make the script appear directly in your After Effects menu:

1. Copy `CreateCascadingDeck.jsx` to:
   * **Windows**: `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\`
   * **macOS**: `/Applications/Adobe After Effects <Version>/Scripts/`
2. Restart After Effects.
3. Access anytime via **File $\rightarrow$ Scripts $\rightarrow$ CreateCascadingDeck.jsx**.

---

### 🗺️ Toolkit Roadmap
- [x] Viral "Ok Jaanu" Cascading Card Deck Generator (`CreateCascadingDeck.jsx`)
- [ ] Automated Beat-Sync Marker Cutter
- [ ] Dynamic Lyric Quadrant Animator
- [ ] Vintage Film Burn & Halation Rig

---

### 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
