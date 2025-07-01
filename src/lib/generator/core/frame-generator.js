// src/lib/generator/core/frame-generator.js

import { createCanvas } from './canvas.js';
import { drawBackgroundLayer } from '../layers/background.js';
import { drawShapesLayer } from '../layers/shapes.js';
import { drawTextLayer } from '../layers/text.js';

/**
 * Generates the frames for the flipbook.
 * @param {object} settings - The flipbook settings.
 * @param {function} updateProgress - A function to call with the progress (0 to 1).
 * @returns {Promise<Array<string>>}
 */
export async function generateFrames(settings, updateProgress) {
    const frames = [];
    const totalFrames = settings.pages;
    const { canvas, ctx } = createCanvas(settings);

    // Define the layer drawing order
    const layers = [
        { draw: drawBackgroundLayer },
        { draw: drawShapesLayer },
        { draw: drawTextLayer },
        // To add a new layer, simply add it to this array
        // e.g. { draw: drawImageLayer },
    ];

    for (let i = 0; i < totalFrames; i++) {
        const progress = totalFrames > 1 ? i / (totalFrames - 1) : 0;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw all layers
        for (const layer of layers) {
            ctx.save();
            layer.draw(ctx, progress, settings);
            ctx.restore();
        }

        // Store the frame
        frames.push(canvas.toDataURL('image/png'));

        // Update progress
        if (updateProgress) {
            updateProgress((i + 1) / totalFrames);
        }

        // Yield to the event loop to prevent the browser from freezing
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    return frames;
}
