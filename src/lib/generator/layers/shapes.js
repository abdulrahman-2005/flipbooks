// src/lib/generator/layers/shapes.js

import { calculateShapePositions } from '../animations/shape-animations.js';

/**
 * Draws a star shape.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} cx - The x-coordinate of the center.
 * @param {number} cy - The y-coordinate of the center.
 * @param {number} spikes - The number of spikes.
 * @param {number} outerRadius - The outer radius.
 * @param {number} innerRadius - The inner radius.
 */
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
}

/**
 * Draws the shapes layer.
 * @param {CanvasRenderingContext2D} ctx - The canvas context.
 * @param {number} progress - The animation progress (0 to 1).
 * @param {object} settings - The flipbook settings.
 */
export function drawShapesLayer(ctx, progress, settings) {
    if (!settings.enableBgShapes) return;

    const shapes = calculateShapePositions(progress, settings);
    ctx.fillStyle = settings.bgShapeColor;

    shapes.forEach(shape => {
        ctx.beginPath();
        switch (settings.bgShapeType) {
            case 'circle':
                ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
                break;
            case 'star':
                drawStar(ctx, shape.x, shape.y, 5, shape.size / 2, shape.size / 4);
                break;
        }
        ctx.fill();
    });
}
