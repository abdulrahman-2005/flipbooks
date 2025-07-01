<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';
    import { generateFlipbook } from '$lib/generator';
    
    import TextControls from './controls/TextControls.svelte';
    import BackgroundControls from './controls/BackgroundControls.svelte';
    import AnimationControls from './controls/AnimationControls.svelte';
    import PrintControls from './controls/PrintControls.svelte';

    let isGenerating = false;
    let progress = 0;
    let showDownloadButton = false;
    let generatedPdf = null;

    async function handleGenerate() {
        if (isGenerating) return;
        
        isGenerating = true;
        progress = 0;
        showDownloadButton = false;
        generatedPdf = null;

        try {
            const { frames, pdf } = await generateFlipbook($flipbookStore, (currentProgress) => {
                progress = currentProgress;
            });

            // Store the generated frames in the store
            flipbookStore.update(store => ({
                ...store,
                generatedFrames: frames
            }));
            
            generatedPdf = pdf;
            showDownloadButton = true;
        } catch (error) {
            console.error('Error generating flipbook:', error);
            alert('Error generating flipbook. Please try again.');
        } finally {
            isGenerating = false;
        }
    }

    function handleDownloadPDF() {
        if (!generatedPdf) {
            console.error('PDF not generated yet.');
            alert('Please generate the flipbook first.');
            return;
        }
        generatedPdf.save('flipbook.pdf');
    }
</script>

<div class="controls">
    <div class="controls-header">
        <h2>Flipbook Studio</h2>
    </div>

    <div class="controls-content">
        <details open>
            <summary>Text & Font</summary>
            <div class="control-group-container">
                <TextControls />
            </div>
        </details>

        <details>
            <summary>Background</summary>
            <div class="control-group-container">
                <BackgroundControls />
            </div>
        </details>

        <details>
            <summary>Animation</summary>
            <div class="control-group-container">
                <AnimationControls />
            </div>
        </details>

        <details>
            <summary>Print Settings</summary>
            <div class="control-group-container">
                <PrintControls />
            </div>
        </details>
    </div>

    <div class="controls-footer">
        <button class="generate-btn" on:click={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate Flipbook'}
        </button>
        
        {#if showDownloadButton}
            <button 
                class="download-btn" 
                on:click={handleDownloadPDF}
            >
                Download PDF
            </button>
        {/if}

        {#if isGenerating}
            <div class="progress-container">
                <div class="progress-bar" style="width: {progress * 100}%">
                    {Math.round(progress * 100)}%
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .controls {
        background: var(--bg-panel);
        border-radius: 12px;
        box-shadow: 0 8px 24px var(--shadow-color);
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow-y: auto;
    }

    .controls-header {
        padding: 15px 15px 10px;
        text-align: center;
    }

    .controls-header h2 {
        margin: 0;
        font-size: 1.8em;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .controls-content {
        padding: 0 15px;
        flex: 1;
        overflow-y: auto;
    }

    .controls-footer {
        padding: 20px 15px;
        border-top: 1px solid var(--border-color);
    }

    details {
        border-bottom: 1px solid var(--border-color);
        margin-bottom: 10px;
    }

    details:last-of-type {
        border-bottom: none;
    }

    summary {
        font-weight: 500;
        font-size: 1.1em;
        padding: 15px 5px;
        cursor: pointer;
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: color 0.2s;
    }

    summary:hover {
        color: var(--accent-secondary);
    }

    summary::after {
        content: '›';
        font-size: 1.5em;
        transform: rotate(90deg);
        transition: transform 0.2s ease-in-out;
    }

    details[open] > summary::after {
        transform: rotate(-90deg);
    }

    .control-group-container {
        padding: 0 5px 15px;
    }

    .generate-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .generate-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(142, 68, 173, 0.4);
    }

    .generate-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .download-btn {
        background: var(--accent-secondary);
        color: white;
        margin-top: 10px;
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .download-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px var(--shadow-color);
    }

    .progress-container {
        width: 100%;
        background-color: var(--bg-control);
        border-radius: 4px;
        margin-top: 15px;
        overflow: hidden;
    }

    .progress-bar {
        height: 20px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 4px;
        text-align: center;
        line-height: 20px;
        color: white;
        font-size: 12px;
        font-weight: 500;
        transition: width 0.1s;
    }
</style>
