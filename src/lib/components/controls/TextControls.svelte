<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';

    function handleChange(key, event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        flipbookStore.updateSetting(key, value);
    }
</script>

<div class="control-group">
    <label for="text">
        <span>Text to Animate</span>
    </label>
    <input 
        type="text" 
        id="text" 
        value={$flipbookStore.text}
        on:input={(e) => handleChange('text', e)}
    >
</div>

<div class="control-group">
    <label for="fontFamily">
        <span>Font</span>
    </label>
    <select 
        id="fontFamily" 
        value={$flipbookStore.fontFamily}
        on:change={(e) => handleChange('fontFamily', e)}
    >
        <option value="Inter, sans-serif">Inter</option>
        <option value="Arial, sans-serif">Arial</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
    </select>
</div>

<div class="control-group">
    <label>
        <span>Text Color</span>
    </label>
    <div class="input-group">
        <input 
            type="color" 
            id="textColor1" 
            value={$flipbookStore.textColor1}
            on:input={(e) => handleChange('textColor1', e)}
        >
        <input 
            type="color" 
            id="textColor2" 
            value={$flipbookStore.textColor2}
            on:input={(e) => handleChange('textColor2', e)}
        >
    </div>
</div>

<div class="control-group">
    <div class="checkbox-group">
        <input 
            type="checkbox" 
            id="enableStroke"
            checked={$flipbookStore.enableStroke}
            on:change={(e) => handleChange('enableStroke', e)}
        >
        <label for="enableStroke">Enable Text Stroke</label>
    </div>
</div>

{#if $flipbookStore.enableStroke}
    <div class="control-group">
        <label>
            <span>Stroke Color & Width</span>
            <span>{$flipbookStore.strokeWidth}px</span>
        </label>
        <div class="input-group">
            <input 
                type="color" 
                id="strokeColor" 
                value={$flipbookStore.strokeColor}
                on:input={(e) => handleChange('strokeColor', e)}
            >
            <input 
                type="range" 
                id="strokeWidth" 
                min="1" 
                max="20" 
                value={$flipbookStore.strokeWidth}
                on:input={(e) => handleChange('strokeWidth', e)}
            >
        </div>
    </div>
{/if}

<div class="control-group">
    <div class="checkbox-group">
        <input 
            type="checkbox" 
            id="enableShadow"
            checked={$flipbookStore.enableShadow}
            on:change={(e) => handleChange('enableShadow', e)}
        >
        <label for="enableShadow">Enable Text Shadow</label>
    </div>
</div>

{#if $flipbookStore.enableShadow}
    <div class="control-group">
        <label>
            <span>Shadow Color</span>
        </label>
        <input 
            type="color" 
            id="shadowColor" 
            value={$flipbookStore.shadowColor}
            on:input={(e) => handleChange('shadowColor', e)}
        >
        
        <label for="shadowBlur" style="margin-top: 8px;">
            <span>Blur</span>
            <span>{$flipbookStore.shadowBlur}px</span>
        </label>
        <input 
            type="range" 
            id="shadowBlur" 
            min="0" 
            max="50" 
            value={$flipbookStore.shadowBlur}
            on:input={(e) => handleChange('shadowBlur', e)}
        >

        <div class="input-group" style="margin-top: 8px;">
            <div>
                <label for="shadowOffsetX">
                    <span>Offset X</span>
                    <span>{$flipbookStore.shadowOffsetX}px</span>
                </label>
                <input 
                    type="range" 
                    id="shadowOffsetX" 
                    min="-50" 
                    max="50" 
                    value={$flipbookStore.shadowOffsetX}
                    on:input={(e) => handleChange('shadowOffsetX', e)}
                >
            </div>
            <div>
                <label for="shadowOffsetY">
                    <span>Offset Y</span>
                    <span>{$flipbookStore.shadowOffsetY}px</span>
                </label>
                <input 
                    type="range" 
                    id="shadowOffsetY" 
                    min="-50" 
                    max="50" 
                    value={$flipbookStore.shadowOffsetY}
                    on:input={(e) => handleChange('shadowOffsetY', e)}
                >
            </div>
        </div>
    </div>
{/if}

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

    input[type="text"],
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
        display: flex;
        gap: 10px;
    }

    input[type="color"] {
        width: 100%;
        height: 38px;
        padding: 2px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 6px;
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

    .checkbox-group {
        display: flex;
        align-items: center;
        background: var(--bg-control);
        padding: 8px 12px;
        border-radius: 6px;
        gap: 10px;
    }

    .checkbox-group label {
        margin-bottom: 0;
        color: var(--text-primary);
    }

    .checkbox-group input[type="checkbox"] {
        accent-color: var(--accent-primary);
    }
</style>
