// A4 paper dimensions in millimeters
export const A4_WIDTH = 210;
export const A4_HEIGHT = 297;

export function calculateLayout(settings) {
    const {
        pageWidthMM,
        pageHeightMM,
        optimizeOrientation = false,
        bindingEdge = 'left',
        bindingMargin = 10,
        pageMargin = 10,
        cutMargin = 5,      // Add cut margin from settings
        frameSpacing = 0    // Add frame spacing from settings
    } = settings;

    // Determine page orientation and dimensions
    const isLandscape = optimizeOrientation ?
        (pageWidthMM > pageHeightMM) :
        false;

    const pageWidth = isLandscape ? A4_HEIGHT : A4_WIDTH;
    const pageHeight = isLandscape ? A4_WIDTH : A4_HEIGHT;

    // Calculate usable area accounting for all margins
    const usableWidth = pageWidth - (2 * pageMargin);
    const usableHeight = pageHeight - (2 * pageMargin);

    // Calculate effective frame dimensions including all spacing
    const frameWithSpacingWidth = pageWidthMM + bindingMargin + frameSpacing;
    const frameWithSpacingHeight = pageHeightMM + cutMargin;

    // Calculate how many frames can fit in each direction
    const cols = Math.floor(usableWidth / frameWithSpacingWidth);
    const rows = Math.floor(usableHeight / frameWithSpacingHeight);

    // Generate frame positions
    const frames = [];
    const isRTL = bindingEdge === 'right';

    // Calculate total width and height of all frames including spacing
    const totalWidth = cols * frameWithSpacingWidth - frameSpacing; // Subtract last frame's spacing
    const totalHeight = rows * frameWithSpacingHeight - cutMargin;  // Subtract last frame's spacing

    // Calculate starting position to center the grid
    const startX = pageMargin + (usableWidth - totalWidth) / 2;
    const startY = pageMargin + (usableHeight - totalHeight) / 2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // For RTL, start from the right side
            const x = isRTL ?
                startX + (cols - 1 - col) * frameWithSpacingWidth :
                startX + col * frameWithSpacingWidth;

            const y = startY + row * frameWithSpacingHeight;

            frames.push({
                x: isRTL ? x : x + bindingMargin, // Add binding margin to x position for LTR
                y,
                width: pageWidthMM,
                height: pageHeightMM,
                bindingX: isRTL ? x + pageWidthMM : x, // Store binding edge position
                cutMargin,
                frameSpacing
            });
        }
    }

    return {
        isLandscape,
        frames,
        rows,
        cols,
        framesPerPage: frames.length,
        pageWidth,
        pageHeight,
        bindingEdge,
        isRTL,
        bindingMargin,
        cutMargin,
        frameSpacing,
        pageMargin
    };
}

// Calculate positions for frames on the page
export function calculateFramePositions(layout, settings) {
    const { frames, isRTL, bindingMargin, cutMargin } = layout;

    return frames.map(frame => {
        const position = {
            ...frame,
            bindingGuides: [],
            cutGuides: []
        };

        // Add binding guides based on layout
        if (isRTL) {
            // Right-to-left: binding guides on the right of each frame
            position.bindingGuides.push({
                x: frame.bindingX,
                y: frame.y - (cutMargin / 2), // Extend guides into cut margin
                height: frame.height + cutMargin, // Make guides overlap cut margins
                orientation: 'vertical'
            });
        } else {
            // Left-to-right: binding guides on the left of each frame
            position.bindingGuides.push({
                x: frame.bindingX,
                y: frame.y - (cutMargin / 2), // Extend guides into cut margin
                height: frame.height + cutMargin, // Make guides overlap cut margins
                orientation: 'vertical'
            });
        }

        // Add cut guides for all edges, extending them by half the cut margin
        position.cutGuides = [
            // Horizontal guides
            {
                x: frame.x - (frame.frameSpacing / 2),
                y: frame.y,
                length: frame.width + frame.frameSpacing,
                orientation: 'horizontal'
            },
            {
                x: frame.x - (frame.frameSpacing / 2),
                y: frame.y + frame.height,
                length: frame.width + frame.frameSpacing,
                orientation: 'horizontal'
            },
            // Vertical guides
            {
                x: frame.x,
                y: frame.y - (cutMargin / 2),
                length: frame.height + cutMargin,
                orientation: 'vertical'
            },
            {
                x: frame.x + frame.width,
                y: frame.y - (cutMargin / 2),
                length: frame.height + cutMargin,
                orientation: 'vertical'
            }
        ];

        return position;
    });
}

// Calculate frame number position based on binding edge
export function calculateFrameNumberPosition(number, frame, layout) {
    const { bindingEdge, isRTL } = layout;
    const offset = 3;

    if (isRTL) {
        return {
            x: frame.bindingX - offset,
            y: frame.y + offset,
            align: 'right',
            baseline: 'top',
            fontSize: 8
        };
    } else {
        return {
            x: frame.bindingX + offset,
            y: frame.y + offset,
            align: 'left',
            baseline: 'top',
            fontSize: 8
        };
    }
}
