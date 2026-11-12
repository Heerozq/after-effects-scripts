// Save as: CreateShutterDrag.jsx
// Wong Kar-wai "Step-Printing" & Optical Shutter Drag Generator for Adobe After Effects
// - 1-Click In-Place Dynamic Link with Premiere Pro (Zero re-importing needed!)
// - Dual-Layer Architecture: 100% SHARP in-focus subject + Luma-isolated shutter drag light trails
// - 6.0 FPS Step-Printing Film Cadence (Chungking Express / Fallen Angels / Alarm Behave Yourself)
// - Zero Artificial Glow: Highlights streak naturally without milky halos or digital haze
// - 100% Natural Footage Colors preserved (Configurable Natural / B&W Film Noir modes)

{
    app.beginUndoGroup("Generate Shutter Drag Look");

    // ================= CONFIGURATION SETTINGS =================
    // 1. Step-Printing Cadence:
    // Drop base framerate to simulate low-speed film camera exposure (5.0 - 8.0 FPS)
    var STEP_PRINT_FPS = 6.0;

    // 2. Highlight Shutter Drag & Light Trails (Only applies to bright lights!):
    var HIGHLIGHT_THRESHOLD = 165;   // 0 to 255. Darks/Skin/Clothes below this are excluded (keeps subject sharp!)
    var HIGHLIGHT_SOFTNESS = 35;     // Smooth transition into light streaks
    var ECHO_COUNT = 4;              // Number of trailing motion echoes (3 - 5)
    var ECHO_TIME = -0.045;          // Shutter drag interval in seconds (-0.035 to -0.055)
    var ECHO_DECAY = 0.75;           // Decay fade of trailing streaks (0.65 - 0.82)
    var ECHO_OPERATOR = 3;           // 3 = Maximum (streaks lights across movement cleanly)
    var APPLY_STREAK_BLUR = true;    // Subtle horizontal streak for anamorphic shutter drag look
    var STREAK_BLUR_LENGTH = 10;     // Streak length (px)
    var STREAK_BLUR_ANGLE = 90;      // 90 = Horizontal light streak

    // 3. Color & Grade Mode:
    // "NATURAL"    = Preserves 100% original footage colors (NO forced tint!)
    // "MONOCHROME" = High-contrast Black & White film noir (as seen in "Alarm behave yourself")
    var COLOR_MODE = "NATURAL";
    var EXTRA_CONTRAST = 12;         // Subtle dynamic punch for crisp shadows (0 - 25)

    // 4. Artificial Glow Setting:
    // Kept FALSE by default to eliminate artificial milky halos and keep image crisp
    var APPLY_ARTIFICIAL_GLOW = false;

    // 5. Analog Film Grain Texture:
    var APPLY_FILM_GRAIN = true;     // Add organic 35mm film texture
    var GRAIN_INTENSITY = 1.8;       // Subtle analog grain
    // ==========================================================

    var activeComp = app.project.activeItem;

    // Helper: Safely add or retrieve an effect
    function getOrAddEffect(layer, matchName, displayName) {
        var fx = null;
        try { fx = layer.property("Effects").property(matchName); } catch(e) {}
        if (!fx) {
            try { fx = layer.property("Effects").property(displayName); } catch(e) {}
        }
        if (!fx) {
            try { fx = layer.property("Effects").addProperty(matchName); } catch(e) {}
        }
        if (!fx) {
            try { fx = layer.property("Effects").addProperty(displayName); } catch(e) {}
        }
        return fx;
    }

    // Helper: Recursively search and set property values inside effect groups
    function setEffectProp(group, targetName, val) {
        if (!group) return false;
        for (var p = 1; p <= group.numProperties; p++) {
            var prop = group.property(p);
            if (prop.name === targetName) {
                try { prop.setValue(val); return true; } catch(err) {}
            }
            if (prop.numProperties > 0) {
                if (setEffectProp(prop, targetName, val)) return true;
            }
        }
        return false;
    }

    // Main Engine: Dual-Layer Shutter Drag (Sharp Subject Base + Isolated Highlight Trails)
    function buildCleanShutterDragStack(targetComp, baseVideoLayer) {
        if (!targetComp || !baseVideoLayer) return;

        // --- STEP 1: CLEANUP ANY PREVIOUS RUNS ---
        for (var l = targetComp.numLayers; l >= 1; l--) {
            var curLayer = targetComp.layer(l);
            if (curLayer.name === "Shutter Drag Highlights" || curLayer.name === "Super 8 Film Gate") {
                try { curLayer.remove(); } catch(remL) {}
            }
        }

        var baseEffects = baseVideoLayer.property("Effects");
        if (baseEffects) {
            var effectNamesToRemove = [
                "Posterize Time", "Echo", "Tint", "Glow", "Brightness & Contrast",
                "Add Grain", "Noise", "Extract", "Levels (Individual Controls)", "Directional Blur"
            ];
            for (var e = baseEffects.numProperties; e >= 1; e--) {
                var fx = baseEffects.property(e);
                for (var r = 0; r < effectNamesToRemove.length; r++) {
                    if (fx.name === effectNamesToRemove[r] || fx.matchName === effectNamesToRemove[r]) {
                        try { fx.remove(); } catch(remErr) {}
                        break;
                    }
                }
            }
        }

        // --- STEP 2: CONFIGURE BASE LAYER (100% SHARP & IN-FOCUS SUBJECT) ---
        // A. Step-Printing Cadence
        var postEffect = getOrAddEffect(baseVideoLayer, "ADBE Posterize Time", "Posterize Time");
        if (postEffect) {
            try { postEffect.property(1).setValue(STEP_PRINT_FPS); } catch(e) {
                try { postEffect.property("Frame Rate").setValue(STEP_PRINT_FPS); } catch(e2) {}
            }
        }

        // B. Color Grading / Dynamic Contrast
        if (COLOR_MODE === "MONOCHROME") {
            var bkWht = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
            if (bkWht) {
                try {
                    bkWht.property(1).setValue([0, 0, 0]);
                    bkWht.property(2).setValue([1, 1, 1]);
                    bkWht.property(3).setValue(100);
                } catch(eBw) {}
            }
        }

        if (EXTRA_CONTRAST !== 0) {
            var contrastEffect = getOrAddEffect(baseVideoLayer, "ADBE Brightness & Contrast 2", "Brightness & Contrast");
            if (contrastEffect) {
                try {
                    contrastEffect.property("ADBE Brightness & Contrast 2-0002").setValue(EXTRA_CONTRAST);
                } catch(eCont) {
                    try { contrastEffect.property("Contrast").setValue(EXTRA_CONTRAST); } catch(eCont2) {}
                }
            }
        }

        // C. Analog Film Grain (Subtle texture on base)
        if (APPLY_FILM_GRAIN) {
            var grainEffect = getOrAddEffect(baseVideoLayer, "VISINF Grain Implant", "Add Grain");
            if (grainEffect) {
                try {
                    var vm = grainEffect.property("Viewing Mode") || grainEffect.property(1);
                    if (vm) vm.setValue(3); // Final Output
                } catch(eV) {
                    setEffectProp(grainEffect, "Viewing Mode", 3);
                }
                setEffectProp(grainEffect, "Intensity", GRAIN_INTENSITY);
                setEffectProp(grainEffect, "Size", 1.0);
                setEffectProp(grainEffect, "Softness", 1.0);
            } else {
                var noiseEffect = getOrAddEffect(baseVideoLayer, "ADBE Noise", "Noise");
                if (noiseEffect) {
                    try { noiseEffect.property(1).setValue(2.8); } catch(eN) {}
                }
            }
        }

        // --- STEP 3: CREATE HIGHLIGHT SHUTTER DRAG LAYER ---
        // Duplicating the layer placed directly above base layer
        var dragLayer = baseVideoLayer.duplicate();
        dragLayer.name = "Shutter Drag Highlights";
        dragLayer.moveBefore(baseVideoLayer);
        dragLayer.audioEnabled = false; // Prevent audio multiplication/echo

        // Remove Posterize Time & Grain from drag layer so trails are smooth continuous light
        var dragFx = dragLayer.property("Effects");
        if (dragFx) {
            for (var d = dragFx.numProperties; d >= 1; d--) {
                var dfx = dragFx.property(d);
                if (dfx.name === "Posterize Time" || dfx.matchName === "ADBE Posterize Time" ||
                    dfx.name === "Add Grain" || dfx.name === "Noise") {
                    try { dfx.remove(); } catch(remD) {}
                }
            }
        }

        // Set Blending Mode to SCREEN (or ADD): Black is 100% transparent, lights add cleanly
        try {
            dragLayer.blendingMode = BlendingMode.SCREEN;
        } catch(eBlend) {}

        // 1. Highlight Isolation: Extract lights only (crushes darks/skin/clothes to pure black)
        var extractFx = getOrAddEffect(dragLayer, "ADBE Extract", "Extract");
        if (extractFx) {
            try {
                // ADBE Extract-0001 = Black Point
                extractFx.property(1).setValue(HIGHLIGHT_THRESHOLD);
                // ADBE Extract-0002 = Black Softness
                extractFx.property(2).setValue(HIGHLIGHT_SOFTNESS);
                // ADBE Extract-0003 = White Point
                extractFx.property(3).setValue(255);
                // ADBE Extract-0004 = White Softness
                extractFx.property(4).setValue(0);
            } catch(eExt) {
                try {
                    extractFx.property("Black Point").setValue(HIGHLIGHT_THRESHOLD);
                    extractFx.property("Black Softness").setValue(HIGHLIGHT_SOFTNESS);
                } catch(eExt2) {}
            }
        } else {
            // Fallback: Levels (Individual Controls)
            var levelsFx = getOrAddEffect(dragLayer, "ADBE Levels2", "Levels (Individual Controls)");
            if (levelsFx) {
                try {
                    // Set Input Black to threshold / 255.0
                    levelsFx.property("ADBE Levels2-0002").setValue(HIGHLIGHT_THRESHOLD / 255.0);
                } catch(eLev) {}
            }
        }

        // 2. Light Trails (Echo on isolated lights only)
        var echoEffect = getOrAddEffect(dragLayer, "ADBE Echo", "Echo");
        if (echoEffect) {
            try {
                echoEffect.property("ADBE Echo-0001").setValue(ECHO_TIME);
                echoEffect.property("ADBE Echo-0002").setValue(ECHO_COUNT);
                echoEffect.property("ADBE Echo-0003").setValue(0.95);
                echoEffect.property("ADBE Echo-0004").setValue(ECHO_DECAY);
                echoEffect.property("ADBE Echo-0005").setValue(ECHO_OPERATOR);
            } catch(eEcho) {
                try {
                    echoEffect.property("Echo Time (seconds)").setValue(ECHO_TIME);
                    echoEffect.property("Number Of Echoes").setValue(ECHO_COUNT);
                    echoEffect.property("Starting Intensity").setValue(0.95);
                    echoEffect.property("Decay").setValue(ECHO_DECAY);
                    echoEffect.property("Echo Operator").setValue(ECHO_OPERATOR);
                } catch(eEcho2) {}
            }
        }

        // 3. Subtle Anamorphic Shutter Streak (Directional Blur)
        if (APPLY_STREAK_BLUR) {
            var dirBlur = getOrAddEffect(dragLayer, "ADBE Directional Blur", "Directional Blur");
            if (dirBlur) {
                try {
                    dirBlur.property(1).setValue(STREAK_BLUR_ANGLE);
                    dirBlur.property(2).setValue(STREAK_BLUR_LENGTH);
                } catch(eBlur) {
                    try {
                        dirBlur.property("Direction").setValue(STREAK_BLUR_ANGLE);
                        dirBlur.property("Blur Length").setValue(STREAK_BLUR_LENGTH);
                    } catch(eBlur2) {}
                }
            }
        }

        // 4. Artificial Glow (Completely optional, off by default)
        if (APPLY_ARTIFICIAL_GLOW) {
            var glowEffect = getOrAddEffect(dragLayer, "ADBE Glo2", "Glow");
            if (glowEffect) {
                try {
                    glowEffect.property(1).setValue(80);  // High threshold
                    glowEffect.property(2).setValue(30);  // Tight radius
                    glowEffect.property(3).setValue(0.5); // Soft intensity
                } catch(eGlow) {}
            }
        }
    }

    // -------------------------------------------------------------------------
    // WORKFLOW A: PREMIERE PRO DYNAMIC LINK (In-Place Transformation)
    // -------------------------------------------------------------------------
    if (activeComp && activeComp instanceof CompItem && activeComp.numLayers > 0) {
        
        // Find base video layer from Premiere
        var baseLayer = null;
        for (var i = 1; i <= activeComp.numLayers; i++) {
            var lyr = activeComp.layer(i);
            if (lyr.name !== "Shutter Drag Highlights" && lyr.name !== "Super 8 Film Gate" && !lyr.nullLayer) {
                baseLayer = lyr;
                break;
            }
        }

        if (!baseLayer) baseLayer = activeComp.layer(1);

        buildCleanShutterDragStack(activeComp, baseLayer);
        activeComp.openInViewer();

    } 
    // -------------------------------------------------------------------------
    // WORKFLOW B: FOOTAGE SELECTION / FILE DIALOG FALLBACK
    // -------------------------------------------------------------------------
    else {
        var sourceFootage = (app.project.selection.length > 0) ? app.project.selection[0] : null;
        if (!sourceFootage) {
            var videoFile = File.openDialog("Select video footage to apply Shutter Drag look", "Video Files:*.mp4;*.mov;*.avi;All Files:*.*");
            if (videoFile) {
                sourceFootage = app.project.importFile(new ImportOptions(videoFile));
            }
        }

        if (sourceFootage && sourceFootage instanceof FootageItem) {
            var dur = sourceFootage.duration || 10;
            var fps = sourceFootage.frameRate || 24;

            var newComp = app.project.items.addComp(
                sourceFootage.name.replace(/\.[^\.]+$/, "") + "_Shutter_Drag",
                sourceFootage.width,
                sourceFootage.height,
                sourceFootage.pixelAspect || 1.0,
                dur,
                fps
            );

            var layer = newComp.layers.add(sourceFootage);
            buildCleanShutterDragStack(newComp, layer);
            newComp.openInViewer();
        } else {
            alert("Please open your Premiere Pro linked composition in After Effects, or select a video file!");
        }
    }

    app.endUndoGroup();
}
