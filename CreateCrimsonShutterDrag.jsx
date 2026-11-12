// Save as: CreateCrimsonShutterDrag.jsx
// Wong Kar-wai "Step-Printing" & Shutter Drag Generator for Adobe After Effects
// - 1-Click In-Place Dynamic Link with Premiere Pro (Zero re-importing needed!)
// - 6.0 FPS Step-Printing Shutter Cadence (Chungking Express / Fallen Angels / Alarm Behave Yourself look)
// - Long-Exposure Light Trails & Shutter Drag Motion Streaks
// - Preserves 100% Natural Footage Colors (Configurable Natural / B&W / Vintage modes)
// - Atmospheric Highlight Halation / Bloom & 35mm Analog Film Grain

{
    app.beginUndoGroup("Generate Shutter Drag Look");

    // ================= CONFIGURATION SETTINGS =================
    // 1. Step-Printing Cadence:
    // Drop base framerate to simulate low-speed film camera exposure (5.0 - 8.0 FPS)
    var STEP_PRINT_FPS = 6.0;

    // 2. Shutter Drag & Light Trails (Echo):
    var ECHO_COUNT = 4;              // Number of trailing motion echoes (3 - 6)
    var ECHO_TIME = -0.050;          // Shutter drag interval in seconds (-0.035 to -0.060)
    var ECHO_DECAY = 0.78;           // Decay fade of trailing streaks (0.70 - 0.85)
    // Echo Operator:
    // 3 = Maximum (Streaks night lights & bright highlights brilliantly across movement)
    // 1 = Composite in Back (Classic motion blur ghosting trailing behind subject)
    // 5 = Screen (Dreamy soft-light exposure accumulation)
    var ECHO_OPERATOR = 3;

    // 3. Color & Grade Mode:
    // "NATURAL"    = Preserves 100% original footage colors (NO forced tint!)
    // "MONOCHROME" = High-contrast Black & White film noir (as seen in "Alarm behave yourself")
    // "CRIMSON"    = Vintage monochromatic red/amber night grade
    var COLOR_MODE = "NATURAL";

    var EXTRA_CONTRAST = 18;         // Contrast punch to make highlights pop (0 - 35)

    // 4. Halation & Highlight Bloom (Glow):
    var APPLY_GLOW = true;           // Soft exposure bloom on streetlights & reflections
    var GLOW_THRESHOLD = 68;         // Highlight threshold % (higher = only true light sources bloom)
    var GLOW_RADIUS = 45;            // Bloom spread radius (px)
    var GLOW_INTENSITY = 0.85;       // Bloom strength

    // 5. Analog Film Grain Texture:
    var APPLY_FILM_GRAIN = true;     // Add organic film texture
    var GRAIN_INTENSITY = 2.0;       // Subtle analog grain

    // 6. Framing / Border:
    var APPLY_FILM_GATE = false;     // Set to true if you want rounded Super 8 cutout border
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

    // Main Engine: Applies the full Step-Printing & Shutter Drag pipeline
    function buildShutterDragStack(targetComp, baseVideoLayer) {
        if (!targetComp || !baseVideoLayer) return;

        // Clean up any previously applied effects from earlier runs
        var effectNamesToRemove = [
            "Posterize Time", "Echo", "Tint", "Glow", "Brightness & Contrast",
            "Add Grain", "Noise"
        ];
        var effectsProp = baseVideoLayer.property("Effects");
        if (effectsProp) {
            for (var e = effectsProp.numProperties; e >= 1; e--) {
                var curFx = effectsProp.property(e);
                for (var r = 0; r < effectNamesToRemove.length; r++) {
                    if (curFx.name === effectNamesToRemove[r] || curFx.matchName === effectNamesToRemove[r]) {
                        try { curFx.remove(); } catch(remErr) {}
                        break;
                    }
                }
            }
        }

        // 1. Step-Printing Framerate (Posterize Time)
        var postEffect = getOrAddEffect(baseVideoLayer, "ADBE Posterize Time", "Posterize Time");
        if (postEffect) {
            try { postEffect.property(1).setValue(STEP_PRINT_FPS); } catch(e) {
                try { postEffect.property("Frame Rate").setValue(STEP_PRINT_FPS); } catch(e2) {}
            }
        }

        // 2. Shutter Drag & Light Trails (Echo)
        var echoEffect = getOrAddEffect(baseVideoLayer, "ADBE Echo", "Echo");
        if (echoEffect) {
            try {
                // Echo Time (seconds)
                echoEffect.property("ADBE Echo-0001").setValue(ECHO_TIME);
                // Number Of Echoes
                echoEffect.property("ADBE Echo-0002").setValue(ECHO_COUNT);
                // Starting Intensity
                echoEffect.property("ADBE Echo-0003").setValue(0.95);
                // Decay
                echoEffect.property("ADBE Echo-0004").setValue(ECHO_DECAY);
                // Echo Operator (3 = Maximum, 1 = Composite in Back)
                echoEffect.property("ADBE Echo-0005").setValue(ECHO_OPERATOR);
            } catch(eEcho) {
                try {
                    echoEffect.property("Echo Time (seconds)").setValue(ECHO_TIME);
                    echoEffect.property("Number Of Echoes").setValue(ECHO_COUNT);
                    echoEffect.property("Starting Intensity").setValue(0.95);
                    echoEffect.property("Decay").setValue(ECHO_DECAY);
                    echoEffect.property("Echo Operator").setValue(ECHO_OPERATOR);
                } catch(eEchoFallback) {}
            }
        }

        // 3. Color Grading & Contrast
        if (COLOR_MODE === "MONOCHROME") {
            // High-Contrast Film Noir B&W (Alarm Behave Yourself style)
            var bkWhtEffect = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
            if (bkWhtEffect) {
                try {
                    bkWhtEffect.property("ADBE Tint-0001").setValue([0.0, 0.0, 0.0]); // Map Black to pure black
                    bkWhtEffect.property("ADBE Tint-0002").setValue([1.0, 1.0, 1.0]); // Map White to pure white
                    bkWhtEffect.property("ADBE Tint-0003").setValue(100);              // 100% B&W
                } catch(eTint) {
                    try {
                        bkWhtEffect.property("Map Black to").setValue([0.0, 0.0, 0.0]);
                        bkWhtEffect.property("Map White to").setValue([1.0, 1.0, 1.0]);
                        bkWhtEffect.property("Amount to Tint").setValue(100);
                    } catch(eTintFallback) {}
                }
            }
        } else if (COLOR_MODE === "CRIMSON") {
            // Deep Crimson / Amber vintage look
            var crimsonEffect = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
            if (crimsonEffect) {
                try {
                    crimsonEffect.property("ADBE Tint-0001").setValue([0.14, 0.01, 0.02]);
                    crimsonEffect.property("ADBE Tint-0002").setValue([1.00, 0.68, 0.28]);
                    crimsonEffect.property("ADBE Tint-0003").setValue(90);
                } catch(eC) {}
            }
        }
        // When COLOR_MODE === "NATURAL", NO Tint effect is added! 100% original colors remain intact!

        // Contrast Punch (Dynamic range expansion for crisp shutter streaks)
        if (EXTRA_CONTRAST !== 0) {
            var contrastEffect = getOrAddEffect(baseVideoLayer, "ADBE Brightness & Contrast 2", "Brightness & Contrast");
            if (contrastEffect) {
                try {
                    contrastEffect.property("ADBE Brightness & Contrast 2-0002").setValue(EXTRA_CONTRAST);
                } catch(eContrast) {
                    try { contrastEffect.property("Contrast").setValue(EXTRA_CONTRAST); } catch(eFallback) {}
                }
            }
        }

        // 4. Highlight Bloom & Halation (Glow)
        if (APPLY_GLOW) {
            var glowEffect = getOrAddEffect(baseVideoLayer, "ADBE Glo2", "Glow");
            if (glowEffect) {
                try {
                    glowEffect.property("ADBE Glo2-0001").setValue(GLOW_THRESHOLD); // Threshold
                    glowEffect.property("ADBE Glo2-0002").setValue(GLOW_RADIUS);    // Radius
                    glowEffect.property("ADBE Glo2-0003").setValue(GLOW_INTENSITY); // Intensity
                } catch(eGlow) {
                    try {
                        glowEffect.property("Glow Threshold").setValue(GLOW_THRESHOLD);
                        glowEffect.property("Glow Radius").setValue(GLOW_RADIUS);
                        glowEffect.property("Glow Intensity").setValue(GLOW_INTENSITY);
                    } catch(eGlowFallback) {}
                }
            }
        }

        // 5. Analog Film Grain Texture
        if (APPLY_FILM_GRAIN) {
            var grainEffect = getOrAddEffect(baseVideoLayer, "VISINF Grain Implant", "Add Grain");
            if (grainEffect) {
                try {
                    var vm = grainEffect.property("Viewing Mode") || grainEffect.property(1);
                    if (vm) vm.setValue(3); // 3 = Final Output
                } catch(eV) {
                    setEffectProp(grainEffect, "Viewing Mode", 3);
                }
                setEffectProp(grainEffect, "Intensity", GRAIN_INTENSITY);
                setEffectProp(grainEffect, "Size", 1.0);
                setEffectProp(grainEffect, "Softness", 1.0);
            } else {
                // Procedural Noise fallback if Add Grain is unavailable
                var noiseEffect = getOrAddEffect(baseVideoLayer, "ADBE Noise", "Noise");
                if (noiseEffect) {
                    try { noiseEffect.property(1).setValue(3.5); } catch(eN) {}
                }
            }
        }

        // 6. Super 8 Organic Film Gate (Vignette) - Optional
        // Remove previous film gate if re-running
        for (var l = targetComp.numLayers; l >= 1; l--) {
            if (targetComp.layer(l).name === "Super 8 Film Gate") {
                targetComp.layer(l).remove();
            }
        }

        if (APPLY_FILM_GATE) {
            var gateSolid = targetComp.layers.addSolid([0, 0, 0], "Super 8 Film Gate", targetComp.width, targetComp.height, 1);
            gateSolid.moveToBeginning(); // Place on top

            var mask = gateSolid.property("Masks").addProperty("Mask");
            mask.maskMode = MaskMode.SUBTRACT; // Cut out center window

            var cw = targetComp.width;
            var ch = targetComp.height;
            var marginX = cw * 0.04;
            var marginY = ch * 0.03;
            var cornerR = Math.min(cw, ch) * 0.08;

            var myShape = new Shape();
            var left = marginX;
            var right = cw - marginX;
            var top = marginY;
            var bottom = ch - marginY;

            myShape.vertices = [
                [left + cornerR, top],
                [right - cornerR, top],
                [right, top + cornerR],
                [right, bottom - cornerR],
                [right - cornerR, bottom],
                [left + cornerR, bottom],
                [left, bottom - cornerR],
                [left, top + cornerR]
            ];
            myShape.closed = true;

            mask.property("Mask Shape").setValue(myShape);
            mask.property("Mask Feather").setValue([28, 28]);
            mask.property("Mask Opacity").setValue(90);

            gateSolid.locked = true;
        }
    }

    // -------------------------------------------------------------------------
    // WORKFLOW A: PREMIERE PRO DYNAMIC LINK (In-Place Transformation)
    // -------------------------------------------------------------------------
    if (activeComp && activeComp instanceof CompItem && activeComp.numLayers > 0) {
        
        // Find the primary video layer from Premiere
        var baseLayer = null;
        for (var i = 1; i <= activeComp.numLayers; i++) {
            if (activeComp.layer(i).name !== "Super 8 Film Gate" && !activeComp.layer(i).nullLayer) {
                baseLayer = activeComp.layer(i);
                break;
            }
        }

        if (!baseLayer) baseLayer = activeComp.layer(1);

        buildShutterDragStack(activeComp, baseLayer);
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
            buildShutterDragStack(newComp, layer);
            newComp.openInViewer();
        } else {
            alert("Please open your Premiere Pro linked composition in After Effects, or select a video file!");
        }
    }

    app.endUndoGroup();
}
