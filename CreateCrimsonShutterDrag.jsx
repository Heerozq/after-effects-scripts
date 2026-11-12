// Save as: CreateCrimsonShutterDrag.jsx
// Wong Kar-wai "Step-Printing" & Crimson Shutter Drag Generator for Adobe After Effects
// - 1-Click In-Place Dynamic Link with Premiere Pro (Zero re-importing needed!)
// - 12 FPS Step-Printing Shutter Lag (Long-exposure light trails & motion streaks)
// - Monochromatic Crimson & Amber Halation Grade (Fallen Angels / Kodak Aerochrome look)
// - Super 8 Curved Film Gate & Analog Grain Texture

{
    app.beginUndoGroup("Generate Crimson Shutter Drag Look");

    // ================= CONFIGURATION SETTINGS =================
    // Step-Printing Shutter Settings:
    var STEP_PRINT_FPS = 12.0;       // Classic Wong Kar-wai step-printing rate (10-12 fps)
    var ECHO_COUNT = 4;              // Number of trailing motion echoes (3-6)
    var ECHO_TIME = -0.045;          // Shutter drag interval in seconds
    var ECHO_DECAY = 0.78;           // Decay fade of trailing streaks (0.7 - 0.85)

    // Crimson Color Grade (RGB normalized 0.0 to 1.0):
    var BLACK_MAP_RGB = [0.14, 0.01, 0.02]; // Deep blood-crimson shadows
    var WHITE_MAP_RGB = [1.00, 0.68, 0.28]; // Glowing amber/gold highlights
    var TINT_AMOUNT = 92;                   // Percent of color grade applied (0 - 100)
    var EXTRA_CONTRAST = 25;                // Contrast punch (0 - 40)

    // Halation & Bloom Glow:
    var GLOW_THRESHOLD = 58;         // Highlight threshold (%)
    var GLOW_RADIUS = 48;            // Bloom spread radius (px)
    var GLOW_INTENSITY = 1.25;       // Glow strength

    // Analog Film Textures:
    var APPLY_FILM_GATE = true;      // Add Super 8 curved organic vignette gate
    var APPLY_FILM_GRAIN = true;     // Add organic film texture
    var GRAIN_INTENSITY = 2.200;     // Subtle analog texture
    // ==========================================================

    var activeComp = app.project.activeItem;

    // Helper: Safely apply or find an effect by matchName or displayName
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

    // Main Engine: Applies the full Wong Kar-wai Crimson Shutter Drag stack
    function buildCrimsonShutterStack(targetComp, baseVideoLayer) {
        if (!targetComp || !baseVideoLayer) return;

        // 1. Step-Printing Framerate (Posterize Time)
        var postEffect = getOrAddEffect(baseVideoLayer, "ADBE Posterize Time", "Posterize Time");
        if (postEffect) {
            try { postEffect.property(1).setValue(STEP_PRINT_FPS); } catch(e) {
                try { postEffect.property("Frame Rate").setValue(STEP_PRINT_FPS); } catch(e2) {}
            }
        }

        // 2. Long-Exposure Light Trails (Echo with Maximum operator)
        var echoEffect = getOrAddEffect(baseVideoLayer, "ADBE Echo", "Echo");
        if (echoEffect) {
            try {
                // Echo Time (seconds)
                echoEffect.property("ADBE Echo-0001").setValue(ECHO_TIME);
                // Number Of Echoes
                echoEffect.property("ADBE Echo-0002").setValue(ECHO_COUNT);
                // Starting Intensity
                echoEffect.property("ADBE Echo-0003").setValue(0.90);
                // Decay
                echoEffect.property("ADBE Echo-0004").setValue(ECHO_DECAY);
                // Echo Operator (3 = Maximum: keeps bright lights streaking cleanly)
                echoEffect.property("ADBE Echo-0005").setValue(3);
            } catch(eEcho) {
                try {
                    echoEffect.property("Echo Time (seconds)").setValue(ECHO_TIME);
                    echoEffect.property("Number Of Echoes").setValue(ECHO_COUNT);
                    echoEffect.property("Decay").setValue(ECHO_DECAY);
                    echoEffect.property("Echo Operator").setValue(3);
                } catch(eEchoFallback) {}
            }
        }

        // 3. Monochromatic Crimson & Amber Color Grade (Tint)
        var tintEffect = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
        if (tintEffect) {
            try {
                tintEffect.property("ADBE Tint-0001").setValue(BLACK_MAP_RGB); // Map Black To Crimson
                tintEffect.property("ADBE Tint-0002").setValue(WHITE_MAP_RGB); // Map White To Amber
                tintEffect.property("ADBE Tint-0003").setValue(TINT_AMOUNT);   // Amount to Tint
            } catch(eTint) {
                try {
                    tintEffect.property("Map Black to").setValue(BLACK_MAP_RGB);
                    tintEffect.property("Map White to").setValue(WHITE_MAP_RGB);
                    tintEffect.property("Amount to Tint").setValue(TINT_AMOUNT);
                } catch(eTintFallback) {}
            }
        }

        // 4. Halation & Diffuse Light Bloom (Glow)
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

        // 5. Punchy Film Contrast
        var contrastEffect = getOrAddEffect(baseVideoLayer, "ADBE Brightness & Contrast 2", "Brightness & Contrast");
        if (contrastEffect) {
            try {
                contrastEffect.property("ADBE Brightness & Contrast 2-0002").setValue(EXTRA_CONTRAST);
            } catch(eContrast) {
                try { contrastEffect.property("Contrast").setValue(EXTRA_CONTRAST); } catch(eFallback) {}
            }
        }

        // 6. Analog Film Grain Texture
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
                    try { noiseEffect.property(1).setValue(4.5); } catch(eN) {}
                }
            }
        }

        // 7. Super 8 Curved Organic Film Gate (Vignette)
        if (APPLY_FILM_GATE) {
            // Remove previous film gate if re-running
            for (var l = targetComp.numLayers; l >= 1; l--) {
                if (targetComp.layer(l).name === "Super 8 Film Gate") {
                    targetComp.layer(l).remove();
                }
            }

            var gateSolid = targetComp.layers.addSolid([0, 0, 0], "Super 8 Film Gate", targetComp.width, targetComp.height, 1);
            gateSolid.moveToBeginning(); // Place on top

            var mask = gateSolid.property("Masks").addProperty("Mask");
            mask.maskMode = MaskMode.SUBTRACT; // Cut out the center window

            var cw = targetComp.width;
            var ch = targetComp.height;
            var marginX = cw * 0.04; // 4% margin
            var marginY = ch * 0.03; // 3% margin
            var cornerR = Math.min(cw, ch) * 0.08; // Rounded organic film corner

            var myShape = new Shape();
            // Rounded rectangle path definition
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
            mask.property("Mask Feather").setValue([28, 28]); // Soft organic projection lens falloff
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

        buildCrimsonShutterStack(activeComp, baseLayer);
        activeComp.openInViewer();

    } 
    // -------------------------------------------------------------------------
    // WORKFLOW B: FOOTAGE SELECTION FALLBACK
    // -------------------------------------------------------------------------
    else {
        var sourceFootage = (app.project.selection.length > 0) ? app.project.selection[0] : null;
        if (!sourceFootage) {
            var videoFile = File.openDialog("Select video footage to apply Crimson Shutter Drag look", "Video Files:*.mp4;*.mov;*.avi;All Files:*.*");
            if (videoFile) {
                sourceFootage = app.project.importFile(new ImportOptions(videoFile));
            }
        }

        if (sourceFootage && sourceFootage instanceof FootageItem) {
            var dur = sourceFootage.duration || 10;
            var fps = sourceFootage.frameRate || 24;

            var newComp = app.project.items.addComp(
                sourceFootage.name.replace(/\.[^\.]+$/, "") + "_Crimson_Shutter_Look",
                sourceFootage.width,
                sourceFootage.height,
                sourceFootage.pixelAspect || 1.0,
                dur,
                fps
            );

            var layer = newComp.layers.add(sourceFootage);
            buildCrimsonShutterStack(newComp, layer);
            newComp.openInViewer();
        } else {
            alert("Please open your Premiere Pro linked composition in After Effects, or select a video file!");
        }
    }

    app.endUndoGroup();
}
