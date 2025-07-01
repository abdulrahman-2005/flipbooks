// src/lib/generator/index.js

import { generateFrames } from './core/frame-generator.js';
import { generatePdf } from './output/pdf.js';

/**
 * Generates a flipbook.
 * @param {object} settings - The flipbook settings.
 * @param {function} updateProgress - A function to call with the progress (0 to 1).
 * @returns {Promise<{frames: Array<string>, pdf: jsPDF}>}
 */
export async function generateFlipbook(settings, updateProgress) {
    const frames = await generateFrames(settings, updateProgress);
    const pdf = await generatePdf(frames, settings);
    return { frames, pdf };
}
