// Save as: CreateCascadingDeck.jsx
// Premiere Pro Dynamic Link 1-Click Cascading Reel Generator for Adobe After Effects
// - IN-PLACE NESTING: Builds the 9:16 Cascading Reel directly inside the Premiere-linked comp!
// - ZERO RE-IMPORTING: Premiere Pro timeline updates automatically in real-time via Dynamic Link!
// - Structure: Premiere Linked Comp (1080x1920) -> Contains 4x5 Card (750x950) with Posterize Time & Film Grain
// - Tight rolling 4-5 card deck, audio-protected (no echo), zero rotation, zero shadows

{
    app.beginUndoGroup("Dynamic Link Cascading Reel Generator");

    // ================= CONFIGURATION SETTINGS =================
    var MASTER_W = 1080;              // Master 9:16 vertical width
    var MASTER_H = 1920;              // Master 9:16 vertical height
    var TARGET_CARD_W = 750;          // 4:5 Card width (px)
    var TARGET_CARD_H = 950;          // 4:5 Card height (px)

    // Base Layer Effects (Matching your exact screenshot):
    var POSTERIZE_FPS = 6.0;          // Posterize Time: 6.0 fps
    var GRAIN_INTENSITY = 3.700;      // Add Grain -> Tweaking -> Intensity: 3.7
    var GRAIN_SIZE = 1.000;           // Add Grain -> Tweaking -> Size: 1.0
    var GRAIN_SOFTNESS = 1.000;       // Add Grain -> Tweaking -> Softness: 1.0
    var GRAIN_ASPECT = 1.000;         // Add Grain -> Tweaking -> Aspect Ratio: 1.0

    var DELAY_PER_CARD = 1.0 / POSTERIZE_FPS; // Duration of 1 frame hold (~0.167s)
    var MAX_STACK_SIZE = 5;           // Rolling stack limit (4 to 5 cards max)

    // Tight Deck Offsets (Cards stay neatly clustered in center, ZERO wandering):
    var MIN_OFFSET_X = 14;            // Min horizontal step (px)
    var MAX_OFFSET_X = 26;            // Max horizontal step (px)
    var MIN_OFFSET_Y = 10;            // Min vertical step (px)
    var MAX_OFFSET_Y = 22;            // Max vertical step (px)
    // ==========================================================

    // Helper: Recursively search and set property values inside effect groups (like Tweaking)
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

    // Helper: Apply Posterize Time (6 FPS) and Add Grain (Final Output, Intensity 3.7) to base layer
    function applyBaseVideoEffects(layer) {
        if (!layer) return;

        // 1. Posterize Time (6.0 FPS)
        var postEffect = null;
        try { postEffect = layer.property("Effects").property("Posterize Time"); } catch(e) {}
        if (!postEffect) {
            try { postEffect = layer.property("Effects").addProperty("ADBE Posterize Time"); } catch(e) {}
        }
        if (postEffect) {
            try {
                postEffect.property(1).setValue(POSTERIZE_FPS);
            } catch(e1) {
                try { postEffect.property("Frame Rate").setValue(POSTERIZE_FPS); } catch(e2) {}
            }
        }

        // 2. Add Grain (Matching your exact screenshot)
        var grainEffect = null;
        try { grainEffect = layer.property("Effects").property("Add Grain"); } catch(e) {}
        if (!grainEffect) {
            try {
                grainEffect = layer.property("Effects").addProperty("VISINF Grain Implant");
            } catch(e1) {
                try { grainEffect = layer.property("Effects").addProperty("Add Grain"); } catch(e2) {}
            }
        }

        if (grainEffect) {
            // Viewing Mode -> Final Output (Option 3 in dropdown)
            try {
                var vm = grainEffect.property("Viewing Mode") || grainEffect.property(1);
                if (vm) vm.setValue(3); // 3 = Final Output
            } catch(eV) {
                setEffectProp(grainEffect, "Viewing Mode", 3);
            }

            // Tweaking parameters (Intensity: 3.7, Size: 1.0, Softness: 1.0, Aspect Ratio: 1.0)
            setEffectProp(grainEffect, "Intensity", GRAIN_INTENSITY);
            setEffectProp(grainEffect, "Size", GRAIN_SIZE);
            setEffectProp(grainEffect, "Softness", GRAIN_SOFTNESS);
            setEffectProp(grainEffect, "Aspect Ratio", GRAIN_ASPECT);
        }
    }

    var activeComp = app.project.activeItem;

    // -------------------------------------------------------------------------
    // WORKFLOW A: PREMIERE PRO DYNAMIC LINK (In-Place Transformation)
    // The active composition IS the linked comp Premiere Pro is listening to!
    // -------------------------------------------------------------------------
    if (activeComp && activeComp instanceof CompItem) {
        
        var compDuration = activeComp.duration;
        var compFps = activeComp.frameRate;
        var compAspect = activeComp.pixelAspect;
        var baseName = activeComp.name;

        // 1. Precompose all existing layers from Premiere into the 750x950 4:5 Card
        var layerIndices = [];
        for (var l = 1; l <= activeComp.numLayers; l++) {
            layerIndices.push(l);
        }

        if (layerIndices.length === 0) {
            alert("The active Premiere Pro composition is empty! Please ensure your video layer is present.");
        } else {
            // Move all attributes into the new nested 4:5 Card comp
            var cardComp = activeComp.layers.precompose(layerIndices, baseName + "_4x5_Card", true);

            // Set Card Comp to exact 750x950 dimensions
            cardComp.width = TARGET_CARD_W;
            cardComp.height = TARGET_CARD_H;

            // Inside the 4:5 card comp: auto-scale footage to fill 750x950 and apply effects
            if (cardComp.numLayers > 0) {
                var baseVideoLayer = cardComp.layer(1);
                var srcW = baseVideoLayer.source ? baseVideoLayer.source.width : baseVideoLayer.width;
                var srcH = baseVideoLayer.source ? baseVideoLayer.source.height : baseVideoLayer.height;

                if (srcW > 0 && srcH > 0) {
                    var scaleX = (TARGET_CARD_W / srcW) * 100;
                    var scaleY = (TARGET_CARD_H / srcH) * 100;
                    var fitScale = Math.max(scaleX, scaleY);

                    baseVideoLayer.property("Scale").setValue([fitScale, fitScale]);
                    baseVideoLayer.property("Position").setValue([TARGET_CARD_W / 2, TARGET_CARD_H / 2]);
                }

                // Apply Posterize Time (6.0 FPS) & Film Grain (Intensity: 3.7)
                applyBaseVideoEffects(baseVideoLayer);
            }

            // 2. Clean and convert the MAIN Premiere-linked comp into the 9:16 Reel
            // Remove the temporary single precomp layer created by precompose
            while (activeComp.numLayers > 0) {
                activeComp.layer(1).remove();
            }

            // Set main comp to 1080x1920 (9:16)
            activeComp.width = MASTER_W;
            activeComp.height = MASTER_H;

            var cx = MASTER_W / 2; // 540
            var cy = MASTER_H / 2; // 960

            // Add Black Canvas Solid (#000000)
            var bgSolid = activeComp.layers.addSolid([0, 0, 0], "Black Canvas (#000000)", MASTER_W, MASTER_H, 1);
            bgSolid.locked = true;

            // Add Master Deck Controller Null
            var deckController = activeComp.layers.addNull();
            deckController.name = "Deck Controller (Master Rig)";
            deckController.property("Position").setValue([cx, cy]);

            // Helper to generate tight, non-wandering offsets around center
            var lastSignX = 1;
            function getTightDeckOffset(idx) {
                var slot = idx % MAX_STACK_SIZE;
                if (slot === 0) return { x: 0, y: 0 };

                var signX = (lastSignX > 0) ? -1 : 1;
                lastSignX = signX;
                var signY = (slot % 2 === 1) ? 1 : -1;

                var distX = MIN_OFFSET_X + Math.random() * (MAX_OFFSET_X - MIN_OFFSET_X);
                var distY = MIN_OFFSET_Y + Math.random() * (MAX_OFFSET_Y - MIN_OFFSET_Y);

                return {
                    x: Math.round(signX * distX),
                    y: Math.round(signY * distY)
                };
            }

            // 3. Build Rolling Cascading Deck directly inside the Premiere-linked comp
            var totalCardSteps = Math.ceil(compDuration * POSTERIZE_FPS);

            for (var i = 0; i < totalCardSteps; i++) {
                var inTime = i * DELAY_PER_CARD;
                if (inTime >= compDuration) break;

                var outTime = Math.min(compDuration, (i + MAX_STACK_SIZE) * DELAY_PER_CARD);

                var card = activeComp.layers.add(cardComp);
                var offset = getTightDeckOffset(i);

                card.name = "Card " + (i + 1) + " (Frame " + (i + 1) + " @ " + inTime.toFixed(2) + "s)";
                
                // Timing (sliding window)
                card.inPoint = inTime;
                card.outPoint = outTime;

                // Position tightly anchored to center
                card.property("Position").setValue([cx + offset.x, cy + offset.y]);

                // Depth opacity: Top card 100%, background rim cards ~88-96%
                var stackDepth = (i % MAX_STACK_SIZE);
                var cardOpacity = (stackDepth === 0) ? 100 : Math.max(86, 97 - (stackDepth * 3));
                card.property("Opacity").setValue(cardOpacity);

                // Audio protection: Keep audio ONLY on the top card (Card 1) so audio from Premiere doesn't echo/multiply
                if (i > 0 && card.hasAudio) {
                    card.audioEnabled = false;
                }

                // Parent to Master Controller Null
                card.parent = deckController;
            }

            activeComp.openInViewer();
        }

    } 
    // -------------------------------------------------------------------------
    // WORKFLOW B: FALLBACK (User selected raw footage in Project Panel)
    // -------------------------------------------------------------------------
    else {
        var sourceFootage = (app.project.selection.length > 0) ? app.project.selection[0] : null;
        if (!sourceFootage) {
            var videoFile = File.openDialog("Select video file", "Video Files:*.mp4;*.mov;*.avi;All Files:*.*");
            if (videoFile) {
                sourceFootage = app.project.importFile(new ImportOptions(videoFile));
            }
        }

        if (sourceFootage && sourceFootage instanceof FootageItem) {
            var dur = sourceFootage.duration || 10;
            var fps = sourceFootage.frameRate || 30;

            // 1. Build Card Comp
            var cardCompFallback = app.project.items.addComp(sourceFootage.name + "_4x5_Card", TARGET_CARD_W, TARGET_CARD_H, 1, dur, fps);
            var fLayer = cardCompFallback.layers.add(sourceFootage);
            var sX = (TARGET_CARD_W / sourceFootage.width) * 100;
            var sY = (TARGET_CARD_H / sourceFootage.height) * 100;
            var fScale = Math.max(sX, sY);
            fLayer.property("Scale").setValue([fScale, fScale]);
            fLayer.property("Position").setValue([TARGET_CARD_W / 2, TARGET_CARD_H / 2]);
            applyBaseVideoEffects(fLayer);

            // 2. Build Master 9x16 Comp
            var masterFallback = app.project.items.addComp(sourceFootage.name + "_Final_9x16_Reel", MASTER_W, MASTER_H, 1, dur, fps);
            masterFallback.layers.addSolid([0, 0, 0], "Black Canvas", MASTER_W, MASTER_H, 1).locked = true;
            var nullCtrl = masterFallback.layers.addNull();
            nullCtrl.property("Position").setValue([MASTER_W / 2, MASTER_H / 2]);

            var steps = Math.ceil(dur * POSTERIZE_FPS);
            for (var k = 0; k < steps; k++) {
                var it = k * DELAY_PER_CARD;
                if (it >= dur) break;
                var ot = Math.min(dur, (k + MAX_STACK_SIZE) * DELAY_PER_CARD);
                var cLayer = masterFallback.layers.add(cardCompFallback);
                cLayer.inPoint = it;
                cLayer.outPoint = ot;
                cLayer.property("Position").setValue([MASTER_W / 2, MASTER_H / 2]);
                cLayer.parent = nullCtrl;
                if (k > 0 && cLayer.hasAudio) cLayer.audioEnabled = false;
            }
            masterFallback.openInViewer();
        } else {
            alert("Please have your Premiere Pro linked composition open in After Effects!");
        }
    }

    app.endUndoGroup();
}
