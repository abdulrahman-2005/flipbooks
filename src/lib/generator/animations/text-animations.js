// src/lib/generator/animations/text-animations.js

/**
 * Applies a text animation.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} progress - The animation progress (0 to 1).
 * @param {object} settings - The flipbook settings.
 */
export function applyTextAnimation(ctx, progress, settings) {
    switch (settings.animationStyle) {
        case 'wipeRight':
            ctx.rect(0, 0, ctx.canvas.width * progress, ctx.canvas.height);
            ctx.clip();
            break;
        case 'wipeLeft':
            ctx.rect(ctx.canvas.width * (1 - progress), 0, ctx.canvas.width, ctx.canvas.height);
            ctx.clip();
            break;
        case 'wipeDown':
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height * progress);
            ctx.clip();
            break;
        case 'wipeUp':
            ctx.rect(0, ctx.canvas.height * (1 - progress), ctx.canvas.width, ctx.canvas.height);
            ctx.clip();
            break;
        case 'circleIn':
            const radius = Math.hypot(ctx.canvas.width, ctx.canvas.height) / 2 * progress;
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, Math.PI * 2);
            ctx.clip();
            break;
        case 'circleOut':
            const maxRadius = Math.hypot(ctx.canvas.width, ctx.canvas.height) / 2;
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, maxRadius, 0, Math.PI * 2);
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, maxRadius * (1 - progress), 0, Math.PI * 2, true);
            ctx.clip();
            break;
        case 'zoomIn':
            const scale = progress * progress;
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            ctx.scale(scale, scale);
            ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
            break;
    }
}
