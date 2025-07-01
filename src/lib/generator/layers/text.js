// src/lib/generator/layers/text.js

import { applyTextAnimation } from '../animations/text-animations.js';

/**
 * Draws the text layer.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} progress - The animation progress (0 to 1).
 * @param {object} settings - The flipbook settings.
 */
export function drawTextLayer(ctx, progress, settings) {
    const { text, fontFamily, textColor1, textColor2, enableStroke, strokeColor, strokeWidth,
            enableShadow, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY } = settings;

    // Set up text style
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Calculate font size
    let fontSize = ctx.canvas.height * 0.8;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    while (ctx.measureText(text).width > ctx.canvas.width * 0.95 && fontSize > 1) {
        fontSize--;
        ctx.font = `bold ${fontSize}px ${fontFamily}`;
    }

    // Create gradient for text fill
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, textColor1);
    gradient.addColorStop(1, textColor2);

    // Apply shadow if enabled
    if (enableShadow) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.shadowOffsetX = shadowOffsetX;
        ctx.shadowOffsetY = shadowOffsetY;
    }

    // Apply animation clipping
    ctx.save();
    applyTextAnimation(ctx, progress, settings);

    // Draw text
    ctx.fillStyle = gradient;
    ctx.fillText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);

    // Reset shadow for stroke
    ctx.shadowColor = 'transparent';

    // Apply stroke if enabled
    if (enableStroke && strokeWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(text, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }

    ctx.restore();
}
