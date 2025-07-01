<script>
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { flipbookStore } from '$lib/stores/flipbook-store';
    import { drawText, drawBackground, drawShapes } from '$lib/utils/animations';

    let canvas;
    let ctx;
    let animationFrame;
    let isAnimating = false;
    let lastFrameTime = 0;
    let progress = 0;
    
    // Create an offscreen canvas for better performance
    let offscreenCanvas;
    let offscreenCtx;

    onMount(() => {
        if (!browser) return;
        
        canvas = document.getElementById('previewCanvas');
        ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        
        // Create offscreen canvas
        offscreenCanvas = document.createElement('canvas');
        offscreenCtx = offscreenCanvas.getContext('2d', { alpha: false });
        
        updateCanvasSize();
        startAnimation();
    });

    onDestroy(() => {
        if (browser && animationFrame) {
            cancelAnimationFrame(animationFrame);
            isAnimating = false;
        }
    });

    function updateCanvasSize() {
        if (!canvas || !offscreenCanvas) return;
        
        const mmToPx = (mm) => Math.round(mm * 3.7795); // 96 DPI
        const width = mmToPx($flipbookStore.pageWidthMM);
        const height = mmToPx($flipbookStore.pageHeightMM);
        
        // Update both canvases
        canvas.width = width;
        canvas.height = height;
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;
        
        // Reset context properties after resize
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        offscreenCtx.imageSmoothingEnabled = true;
        offscreenCtx.imageSmoothingQuality = 'high';
    }

    function animate(timestamp) {
        if (!isAnimating) return;

        // Calculate frame timing
        const targetFPS = $flipbookStore.fps;
        const frameInterval = 1000 / targetFPS;
        const elapsed = timestamp - lastFrameTime;

        if (elapsed > frameInterval) {
            // Update progress
            progress = (progress + (elapsed / 1000)) % 1;
            lastFrameTime = timestamp - (elapsed % frameInterval);

            // Draw to offscreen canvas
            offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
            
            // Draw background
            drawBackground(offscreenCtx, $flipbookStore);

            // Draw animated shapes if enabled
            if ($flipbookStore.enableBgShapes) {
                drawShapes(offscreenCtx, progress, $flipbookStore);
            }

            // Draw animated text
            drawText(offscreenCtx, progress, $flipbookStore);

            // Copy to visible canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(offscreenCanvas, 0, 0);
        }

        animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (!browser) return;
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        isAnimating = true;
        lastFrameTime = 0;
        progress = 0;
        animationFrame = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        isAnimating = false;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    // Restart animation when settings change
    $: if ($flipbookStore && browser) {
        updateCanvasSize();
        startAnimation();
    }
</script>

<canvas id="previewCanvas" bind:this={canvas}></canvas>

<style>
    canvas {
        display: block;
        margin: 0 auto;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        max-width: 100%;
        height: auto;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
    }
</style>
