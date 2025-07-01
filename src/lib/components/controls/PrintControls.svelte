<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';

    function handleChange(key, event) {
        const value = event.target.type === 'checkbox' ? event.target.checked : 
                     event.target.type === 'number' ? Number(event.target.value) : 
                     event.target.value;
        flipbookStore.updateSetting(key, value);
    }
</script>

<div class="control-group">
    <div class="checkbox-group">
        <input 
            type="checkbox" 
            id="optimizeOrientation"
            checked={$flipbookStore.optimizeOrientation}
            on:change={(e) => handleChange('optimizeOrientation', e)}
        >
        <label for="optimizeOrientation">Auto-optimize Page Orientation</label>
    </div>
</div>

<div class="control-group">
    <label for="bindingEdge">
        <span>Binding Edge</span>
    </label>
    <select 
        id="bindingEdge" 
        value={$flipbookStore.bindingEdge}
        on:change={(e) => handleChange('bindingEdge', e)}
    >
        <option value="left">Left (LTR)</option>
        <option value="right">Right (RTL)</option>
        <option value="top">Top</option>
        <option value="none">None</option>
    </select>
</div>

<div class="control-group">
    <label for="bindingMargin">
        <span>Binding Margin (mm)</span>
    </label>
    <input 
        type="number" 
        id="bindingMargin" 
        min="0" 
        max="50" 
        value={$flipbookStore.bindingMargin}
        on:input={(e) => handleChange('bindingMargin', e)}
    >
</div>

<div class="control-group">
    <label for="pageMargin">
        <span>Page Margin (mm)</span>
    </label>
    <input 
        type="number" 
        id="pageMargin" 
        min="5" 
        max="30" 
        value={$flipbookStore.pageMargin}
        on:input={(e) => handleChange('pageMargin', e)}
    >
</div>

<div class="control-group">
    <label for="frameSpacing">
        <span>Frame Spacing (mm)</span>
    </label>
    <input 
        type="number" 
        id="frameSpacing" 
        min="2" 
        max="20" 
        value={$flipbookStore.frameSpacing}
        on:input={(e) => handleChange('frameSpacing', e)}
    >
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
