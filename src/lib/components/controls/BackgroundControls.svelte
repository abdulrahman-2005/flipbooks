<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';

    function handleChange(key, event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        flipbookStore.updateSetting(key, value);
    }
</script>

<div class="control-group">
    <label for="bgColor">
        <span>Background Color</span>
    </label>
    <input 
        type="color" 
        id="bgColor" 
        value={$flipbookStore.bgColor}
        on:input={(e) => handleChange('bgColor', e)}
    >
</div>

<div class="control-group">
    <div class="checkbox-group">
        <input 
            type="checkbox" 
            id="enableBgShapes"
            checked={$flipbookStore.enableBgShapes}
            on:change={(e) => handleChange('enableBgShapes', e)}
        >
        <label for="enableBgShapes">Enable Animated Shapes</label>
    </div>
</div>

{#if $flipbookStore.enableBgShapes}
    <div class="control-group">
        <label for="bgShapeType">
            <span>Shape Type</span>
        </label>
        <select 
            id="bgShapeType" 
            value={$flipbookStore.bgShapeType}
            on:change={(e) => handleChange('bgShapeType', e)}
        >
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="star">Star</option>
        </select>
    </div>

    <div class="control-group">
        <label for="bgShapeAnimation">
            <span>Shape Animation</span>
        </label>
        <select 
            id="bgShapeAnimation" 
            value={$flipbookStore.bgShapeAnimation}
            on:change={(e) => handleChange('bgShapeAnimation', e)}
        >
            <option value="borderPatrol">Border Patrol</option>
            <option value="floating">Floating</option>
            <option value="falling">Falling</option>
        </select>
    </div>

    <div class="control-group">
        <label>
            <span>Shape Color</span>
        </label>
        <input 
            type="color" 
            id="bgShapeColor" 
            value={$flipbookStore.bgShapeColor}
            on:input={(e) => handleChange('bgShapeColor', e)}
        >
    </div>

    <div class="control-group">
        <label for="bgShapeCount">
            <span>Shape Count</span>
            <span>{$flipbookStore.bgShapeCount}</span>
        </label>
        <input 
            type="range" 
            id="bgShapeCount" 
            min="1" 
            max="50" 
            value={$flipbookStore.bgShapeCount}
            on:input={(e) => handleChange('bgShapeCount', e)}
        >
    </div>

    <div class="control-group">
        <label for="bgShapeSize">
            <span>Shape Size</span>
            <span>{$flipbookStore.bgShapeSize}px</span>
        </label>
        <input 
            type="range" 
            id="bgShapeSize" 
            min="2" 
            max="30" 
            value={$flipbookStore.bgShapeSize}
            on:input={(e) => handleChange('bgShapeSize', e)}
        >
    </div>

    <div class="control-group">
        <label for="bgShapeSpeed">
            <span>Animation Speed</span>
            <span>{$flipbookStore.bgShapeSpeed}x</span>
        </label>
        <input 
            type="range" 
            id="bgShapeSpeed" 
            min="0.1" 
            max="5" 
            step="0.1" 
            value={$flipbookStore.bgShapeSpeed}
            on:input={(e) => handleChange('bgShapeSpeed', e)}
        >
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

    select {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: var(--bg-control);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        border-radius: 6px;
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