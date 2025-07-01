<script>
    import { onMount, onDestroy } from 'svelte';
    import { flipbookStore } from '$lib/stores/flipbook-store';
    import LivePreview from './preview/LivePreview.svelte';
    import PrintPreview from './preview/PrintPreview.svelte';

    let previewCanvas;
    let previewCtx;
    let previewInterval;
    let currentFrame = 0;
    let frames = [];

    onMount(() => {
        // Initialize preview canvas
        previewCanvas = document.getElementById('previewCanvas');
        previewCtx = previewCanvas.getContext('2d');
        
        // Set initial canvas size
        updateCanvasSize();
    });

    onDestroy(() => {
        clearInterval(previewInterval);
    });

    function updateCanvasSize() {
        if (!previewCanvas) return;
        
        const mmToPx = (mm) => Math.round(mm * 3.7795); // 96 DPI
        previewCanvas.width = mmToPx($flipbookStore.pageWidthMM);
        previewCanvas.height = mmToPx($flipbookStore.pageHeightMM);
    }

    $: if ($flipbookStore) {
        updateCanvasSize();
    }
</script>

<div class="main-content">
    <div class="preview-section">
        <h3>Live Preview</h3>
        <LivePreview />
    </div>
    <div class="output-section">
        <PrintPreview />
    </div>
</div>

<style>
    .main-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    }

    .preview-section {
        background: var(--bg-panel);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 24px var(--shadow-color);
        flex-shrink: 0;
        margin-bottom: 20px;
    }

    .preview-section h3 {
        margin-top: 0;
        text-align: center;
        color: var(--text-secondary);
    }

    .output-section {
        flex: 1;
        overflow: auto;
        background: var(--bg-panel);
        border-radius: 12px;
        box-shadow: 0 8px 24px var(--shadow-color);
    }
</style>
