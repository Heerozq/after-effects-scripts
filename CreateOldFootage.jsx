// Save as: CreateOldFootage.jsx
// CapCut "Old Footage" (Retro Film / Archive Look) Generator for Adobe After Effects
// - 1-Click In-Place Dynamic Link with Premiere Pro (Zero re-importing needed!)
// - Replicates the iconic CapCut "Old Footage" Retro Film Filter
// - 6.0 FPS Hand-Cranked Film Cadence (Posterize Time)
// - Organic Projector Flicker & Mechanical Exposure Pulse
// - Authentic Celluloid Film Grain Texture
// - High-Contrast Film Noir (Alarm Behave Yourself style) or Natural Vintage Color
// - Soft Optical Lens Vignette
// - ZERO Artificial Glow, ZERO Blurry Ghosting: Subject remains 100% sharp & in-focus!

{
    app.beginUndoGroup("Generate CapCut Old Footage Look");

    // ================= CONFIGURATION SETTINGS =================
    // 1. Cadence (Speed / Shutter Stutter):
    // 6.0 FPS gives the classic hand-cranked 8mm/16mm old projector cadence
    var CADENCE_FPS = 6.0;

    // 2. Color Profile (Filter Tone):
    // "MONOCHROME"    = High-contrast Black & White film noir (Alarm Behave Yourself style)
    // "NATURAL"       = Keeps your original footage colors with punchy retro contrast
    // "SEPIA_VINTAGE" = Warm amber / sepia historic archival look
    var COLOR_PROFILE = "MONOCHROME";

    var FILM_CONTRAST = 25;          // Dynamic contrast punch for rich blacks (15 - 35)

    // 3. Projector Light Flicker:
    // Adds organic mechanical lamp exposure pulse
    var APPLY_FLICKER = true;

    // 4. Celluloid Film Grain:
    var APPLY_FILM_GRAIN = true;     // Authentic 35mm / 16mm grain texture
    var GRAIN_INTENSITY = 2.2;

    // 5. Optical Lens Vignette:
    var APPLY_VIGNETTE = true;       // Soft organic corner darkening
    var VIGNETTE_STRENGTH = 35;      // Vignette opacity % (20 - 50)
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

    // Main Engine: Applies the full CapCut "Old Footage" pipeline
    function buildOldFootageStack(targetComp, baseVideoLayer) {
        if (!targetComp || !baseVideoLayer) return;

        // Clean up any previously applied effects or vignette layers
        for (var l = targetComp.numLayers; l >= 1; l--) {
            var curLayer = targetComp.layer(l);
            if (curLayer.name === "CapCut Film Vignette" || curLayer.name === "Shutter Drag Highlights" || curLayer.name === "Super 8 Film Gate") {
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

        // 1. Cadence (Posterize Time): Dropped to 6.0 FPS (Zero blur / zero ghosting!)
        var postEffect = getOrAddEffect(baseVideoLayer, "ADBE Posterize Time", "Posterize Time");
        if (postEffect) {
            try { postEffect.property(1).setValue(CADENCE_FPS); } catch(e) {
                try { postEffect.property("Frame Rate").setValue(CADENCE_FPS); } catch(e2) {}
            }
        }

        // 2. Color Profile / Vintage Filter
        if (COLOR_PROFILE === "MONOCHROME") {
            // High-Contrast Film Noir B&W (Alarm Behave Yourself style)
            var bkWht = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
            if (bkWht) {
                try {
                    bkWht.property(1).setValue([0.0, 0.0, 0.0]); // Map Black to pure black
                    bkWht.property(2).setValue([1.0, 1.0, 1.0]); // Map White to clean white
                    bkWht.property(3).setValue(100);              // 100% Monochrome
                } catch(eBw) {
                    try {
                        bkWht.property("Map Black to").setValue([0.0, 0.0, 0.0]);
                        bkWht.property("Map White to").setValue([1.0, 1.0, 1.0]);
                        bkWht.property("Amount to Tint").setValue(100);
                    } catch(eBw2) {}
                }
            }
        } else if (COLOR_PROFILE === "SEPIA_VINTAGE") {
            // Warm Amber / Sepia historical archive
            var sepiaTint = getOrAddEffect(baseVideoLayer, "ADBE Tint", "Tint");
            if (sepiaTint) {
                try {
                    sepiaTint.property(1).setValue([0.08, 0.04, 0.02]);
                    sepiaTint.property(2).setValue([1.00, 0.92, 0.76]);
                    sepiaTint.property(3).setValue(95);
                } catch(eSep) {}
            }
        }
        // When COLOR_PROFILE === "NATURAL", NO Tint is applied (100% original footage colors!)

        // 3. Contrast & Projector Light Flicker
        var contrastEffect = getOrAddEffect(baseVideoLayer, "ADBE Brightness & Contrast 2", "Brightness & Contrast");
        if (contrastEffect) {
            try {
                contrastEffect.property("ADBE Brightness & Contrast 2-0002").setValue(FILM_CONTRAST);
            } catch(eCont) {
                try { contrastEffect.property("Contrast").setValue(FILM_CONTRAST); } catch(eCont2) {}
            }

            // Projector exposure flicker
            if (APPLY_FLICKER) {
                try {
                    var brightProp = contrastEffect.property("ADBE Brightness & Contrast 2-0001") || contrastEffect.property("Brightness");
                    if (brightProp) {
                        brightProp.expression = "posterizeTime(12); (Math.sin(time * 18.0) * 2.5 + random(-2.0, 2.0));";
                    }
                } catch(eFlick) {}
            }
        }

        // 4. Analog Film Grain Texture
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
                setEffectProp(grainEffect, "Softness", 0.9);
            } else {
                var noiseEffect = getOrAddEffect(baseVideoLayer, "ADBE Noise", "Noise");
                if (noiseEffect) {
                    try { noiseEffect.property(1).setValue(3.5); } catch(eN) {}
                }
            }
        }

        // 5. Soft Optical Lens Vignette
        if (APPLY_VIGNETTE) {
            try {
                var cw = targetComp.width;
                var ch = targetComp.height;
                var vigSolid = targetComp.layers.addSolid([0, 0, 0], "CapCut Film Vignette", cw, ch, 1);
                vigSolid.moveToBeginning(); // Place on top

                var maskGroup = vigSolid.property("Masks") || vigSolid.property("ADBE Mask Parade");
                if (maskGroup) {
                    var mask = maskGroup.addProperty("Mask") || maskGroup.addProperty("ADBE Mask Atom");
                    if (mask) {
                        mask.maskMode = MaskMode.SUBTRACT; // Center transparent, edges dark

                        var myShape = new Shape();
                        var left = cw * 0.05;
                        var right = cw * 0.95;
                        var top = ch * 0.05;
                        var bottom = ch * 0.95;
                        var cornerR = Math.min(cw, ch) * 0.35; // Large elliptical curve

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

                        // Robust multi-version property access:
                        var shapeProp = mask.maskShape || mask.property("ADBE Mask Shape") || mask.property("Mask Path") || mask.property("Mask Shape");
                        if (shapeProp) {
                            try { shapeProp.setValue(myShape); } catch(eShpVal) {}
                        }

                        var featherProp = mask.maskFeather || mask.property("ADBE Mask Feather") || mask.property("Mask Feather");
                        if (featherProp) {
                            try { featherProp.setValue([cw * 0.22, ch * 0.22]); } catch(eFthVal) {}
                        }

                        var opacityProp = mask.maskOpacity || mask.property("ADBE Mask Opacity") || mask.property("Mask Opacity");
                        if (opacityProp) {
                            try { opacityProp.setValue(VIGNETTE_STRENGTH); } catch(eOpVal) {}
                        }
                    }
                }

                vigSolid.locked = true;
            } catch(eVignetteErr) {}
        }
    }

    // -------------------------------------------------------------------------
    // WORKFLOW A: PREMIERE PRO DYNAMIC LINK (In-Place Transformation)
    // -------------------------------------------------------------------------
    if (activeComp && activeComp instanceof CompItem && activeComp.numLayers > 0) {
        
        var baseLayer = null;
        for (var i = 1; i <= activeComp.numLayers; i++) {
            var lyr = activeComp.layer(i);
            if (lyr.name !== "CapCut Film Vignette" && !lyr.nullLayer) {
                baseLayer = lyr;
                break;
            }
        }

        if (!baseLayer) baseLayer = activeComp.layer(1);

        buildOldFootageStack(activeComp, baseLayer);
        activeComp.openInViewer();

    } 
    // -------------------------------------------------------------------------
    // WORKFLOW B: FOOTAGE SELECTION / FILE DIALOG FALLBACK
    // -------------------------------------------------------------------------
    else {
        var sourceFootage = (app.project.selection.length > 0) ? app.project.selection[0] : null;
        if (!sourceFootage) {
            var videoFile = File.openDialog("Select video footage to apply CapCut Old Footage look", "Video Files:*.mp4;*.mov;*.avi;All Files:*.*");
            if (videoFile) {
                sourceFootage = app.project.importFile(new ImportOptions(videoFile));
            }
        }

        if (sourceFootage && sourceFootage instanceof FootageItem) {
            var dur = sourceFootage.duration || 10;
            var fps = sourceFootage.frameRate || 24;

            var newComp = app.project.items.addComp(
                sourceFootage.name.replace(/\.[^\.]+$/, "") + "_Old_Footage",
                sourceFootage.width,
                sourceFootage.height,
                sourceFootage.pixelAspect || 1.0,
                dur,
                fps
            );

            var layer = newComp.layers.add(sourceFootage);
            buildOldFootageStack(newComp, layer);
            newComp.openInViewer();
        } else {
            alert("Please open your Premiere Pro linked composition in After Effects, or select a video file!");
        }
    }

    app.endUndoGroup();
}
