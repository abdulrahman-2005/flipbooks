// src/lib/generator/core/canvas.js

/**
 * Converts millimeters to pixels based on 96 DPI.
 * @param {number} mm - The value in millimeters.
 * @returns {number} The value in pixels.
 */
export const mmToPx = (mm) => Math.round(mm * 3.7795);

/**
 * Creates a canvas element with the specified dimensions.
 * @param {object} settings - The flipbook settings.
 * @returns {{canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}}
 */
export function createCanvas(settings) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = mmToPx(settings.pageWidthMM);
    canvas.height = mmToPx(settings.pageHeightMM);
    return { canvas, ctx };
}
