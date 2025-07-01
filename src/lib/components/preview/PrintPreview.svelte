<script>
    import { flipbookStore } from '$lib/stores/flipbook-store';

    let pages = [];
    let generatedFrames = [];

    function calculateLayout() {
        const A4_WIDTH = 210;  // mm
        const A4_HEIGHT = 297; // mm

        const {
            bindingEdge,
            bindingMargin,
            pageMargin,
            frameSpacing,
            pageWidthMM: frameWidth,
            pageHeightMM: frameHeight
        } = $flipbookStore;

        // Calculate margins based on binding direction
        let leftMargin = pageMargin;
        let rightMargin = pageMargin;
        let topMargin = pageMargin;
        let bottomMargin = pageMargin;

        // Apply binding margin based on direction
        switch (bindingEdge) {
            case 'left':
                leftMargin = Math.max(pageMargin, bindingMargin);
                break;
            case 'right':
                rightMargin = Math.max(pageMargin, bindingMargin);
                break;
            case 'top':
                topMargin = Math.max(pageMargin, bindingMargin);
                break;
        }

        // Calculate effective page area considering margins
        const effectiveWidth = A4_WIDTH - leftMargin - rightMargin;
        const effectiveHeight = A4_HEIGHT - topMargin - bottomMargin;

        // Calculate minimum spacing between frames
        const minSpacing = bindingEdge === 'left' || bindingEdge === 'right' 
            ? Math.max(frameSpacing, bindingMargin)
            : frameSpacing;

        // Calculate how many frames can fit with the minimum spacing
        const cols = Math.floor((effectiveWidth + minSpacing) / (frameWidth + minSpacing));
        const rows = Math.floor((effectiveHeight + frameSpacing) / (frameHeight + frameSpacing));
        const framesPerPage = cols * rows;

        // Calculate actual spacing to distribute remaining space evenly
        const horizontalGap = cols > 1 
            ? Math.max(minSpacing, (effectiveWidth - cols * frameWidth) / (cols - 1))
            : 0;
        const verticalGap = rows > 1
            ? Math.max(frameSpacing, (effectiveHeight - rows * frameHeight) / (rows - 1))
            : 0;

        return {
            cols,
            rows,
            framesPerPage,
            leftMargin,
            rightMargin,
            topMargin,
            bottomMargin,
            horizontalGap,
            verticalGap
        };
    }
</script>

<div class="print-preview">
    {#if generatedFrames.length === 0}
        <div class="empty-state">
            <p>Generate your flipbook to see the print preview</p>
        </div>
    {:else}
        {#each pages as page}
            <div class="print-page">
                <!-- Page content will be added here -->
            </div>
        {/each}
    {/if}
</div>

<style>
    .print-preview {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .empty-state {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 100%;
        color: var(--text-secondary);
        font-style: italic;
    }

    .print-page {
        background: white;
        width: 210mm;
        height: 297mm;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        margin: 20px auto;
        position: relative;
        display: grid;
        box-sizing: border-box;
    }

    @media print {
        .print-preview {
            padding: 0;
            gap: 0;
        }

        .print-page {
            margin: 0;
            box-shadow: none;
            page-break-after: always;
        }
    }
</style>
