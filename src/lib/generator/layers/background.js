// src/lib/generator/layers/background.js

/**
 * Draws the background layer.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {object} settings - The flipbook settings.
 */
export function drawBackgroundLayer(ctx, settings) {
    ctx.fillStyle = settings.bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
