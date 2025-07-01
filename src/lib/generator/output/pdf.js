// src/lib/generator/output/pdf.js

import { calculateLayout, calculateFramePositions, calculateFrameNumberPosition } from '../../utils/print-layout';

/**
 * Generates a PDF from the frames. 
 * @param {Array<string>} frames - The generated frames (data URLs).
 * @param {object} settings - The flipbook settings.
 * @returns {Promise<jsPDF>}
 */
export async function generatePdf(frames, settings) {
    // Import jsPDF dynamically
    const { jsPDF } = await import('jspdf');

    // Calculate layout
    const layout = calculateLayout(settings);
    const positions = calculateFramePositions(layout, settings);
    const { isLandscape, framesPerPage } = layout;

    // Create PDF document
    const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Calculate total pages needed
    const totalPages = Math.ceil(frames.length / framesPerPage);

    // Process each page
    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
        if (pageNum > 0) {
            pdf.addPage();
        }

        // Calculate frame range for this page
        const startFrame = pageNum * framesPerPage;
        const endFrame = Math.min((pageNum + 1) * framesPerPage, frames.length);
        const pageFrames = positions.slice(0, framesPerPage); // Use positions for current page

        // Draw all frames first
        for (let i = startFrame; i < endFrame; i++) {
            const frameIndex = i - startFrame;
            const position = pageFrames[frameIndex];
            const frame = frames[i];

            if (!position || !frame) {
                console.warn(`Missing position or frame data for index ${i}`);
                continue;
            }

            try {
                // Add the frame image
                pdf.addImage(
                    frame,
                    'PNG',
                    position.x,
                    position.y,
                    position.width,
                    position.height
                );

                // Add frame number
                const numberPos = calculateFrameNumberPosition(i + 1, position, layout);
                pdf.setFontSize(numberPos.fontSize || 8);
                pdf.setTextColor(0);
                pdf.text(
                    (i + 1).toString(),
                    numberPos.x,
                    numberPos.y,
                    { baseline: numberPos.baseline, align: numberPos.align }
                );
            } catch (error) {
                console.error(`Error adding frame ${i + 1} to PDF:`, error, position);
            }
        }

        // Draw cut guides
        pdf.setDrawColor(0);
        pdf.setLineDashPattern([], 0);
        pdf.setLineWidth(0.2);
        pageFrames.forEach(position => {
            if (!position) return;
            position.cutGuides.forEach(guide => {
                if (guide.orientation === 'horizontal') {
                    pdf.line(guide.x, guide.y, guide.x + guide.length, guide.y);
                } else {
                    pdf.line(guide.x, guide.y, guide.x, guide.y + guide.length);
                }
            });
        });

        // Draw binding guides
        pdf.setDrawColor(0, 0, 255);
        pdf.setLineDashPattern([2, 2], 0);
        pdf.setLineWidth(0.3);
        pageFrames.forEach(position => {
            if (!position) return;
            position.bindingGuides.forEach(guide => {
                if (guide.orientation === 'horizontal') {
                    pdf.line(guide.x, guide.y, guide.x + guide.width, guide.y);
                } else {
                    pdf.line(guide.x, guide.y, guide.x, guide.y + guide.height);
                }
            });
        });
    }

    return pdf;
}
