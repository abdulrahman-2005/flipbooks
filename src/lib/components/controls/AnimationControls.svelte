<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';

    function handleChange(key, event) {
        const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
        flipbookStore.updateSetting(key, value);
    }
</script>

<div class="control-group">
    <label for="pages">
        <span>Number of Pages</span>
        <span>{$flipbookStore.pages}</span>
    </label>
    <input 
        type="range" 
        id="pages" 
        min="10" 
        max="500" 
        value={$flipbookStore.pages}
        on:input={(e) => handleChange('pages', e)}
    >
</div>

<div class="control-group">
    <label for="fps">
        <span>Animation FPS</span>
        <span>{$flipbookStore.fps}</span>
    </label>
    <input 
        type="range" 
        id="fps" 
        min="1" 
        max="60" 
        value={$flipbookStore.fps}
        on:input={(e) => handleChange('fps', e)}
    >
</div>

<div class="control-group">
    <label for="animationStyle">
        <span>Text Reveal Effect</span>
    </label>
    <select 
        id="animationStyle" 
        value={$flipbookStore.animationStyle}
        on:change={(e) => handleChange('animationStyle', e)}
    >
        <option value="wipeRight">Wipe Right</option>
        <option value="wipeLeft">Wipe Left</option>
        <option value="wipeDown">Wipe Down</option>
        <option value="wipeUp">Wipe Up</option>
        <option value="circleIn">Circle In</option>
        <option value="circleOut">Circle Out</option>
        <option value="zoomIn">Zoom In</option>
        <option value="blindsHorizontal">Blinds (Horizontal)</option>
        <option value="blindsVertical">Blinds (Vertical)</option>
        <option value="dissolve">Digital Dissolve (Slow)</option>
    </select>
</div>

<div class="control-group">
    <label>
        <span>Flipbook Page Size (mm)</span>
    </label>
    <div class="input-group">
        <div>
            <label for="pageWidth">Width</label>
            <input 
                type="number" 
                id="pageWidth" 
                min="10" 
                value={$flipbookStore.pageWidthMM}
                on:input={(e) => handleChange('pageWidthMM', e)}
            >
        </div>
        <div>
            <label for="pageHeight">Height</label>
            <input 
                type="number" 
                id="pageHeight" 
                min="10" 
                value={$flipbookStore.pageHeightMM}
                on:input={(e) => handleChange('pageHeightMM', e)}
            >
        </div>
    </div>
</div>

<style>
    .control-group {
        margin-bottom: 18px;
    }

    .control-group label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 0.9em;
        color: var(--text-secondary);
    }

    .control-group label span:first-child {
        font-weight: 500;
        color: var(--text-primary);
    }

    input[type="number"],
    select {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: var(--bg-control);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        border-radius: 6px;
    }

    .input-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .input-group > div {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .input-group label {
        font-size: 0.8em;
        color: var(--text-secondary);
    }

    input[type="range"] {
        width: 100%;
        -webkit-appearance: none;
        background: transparent;
    }

    input[type="range"]::-webkit-slider-runnable-track {
        height: 4px;
        background: var(--bg-control);
        border-radius: 2px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: var(--accent-secondary);
        margin-top: -6px;
        cursor: pointer;
    }
</style>
