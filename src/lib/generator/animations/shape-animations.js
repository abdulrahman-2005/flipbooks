// src/lib/generator/animations/shape-animations.js

import { mmToPx } from '../core/canvas.js';

/**
 * Calculates the positions of background shapes.
 * @param {number} progress - The animation progress (0 to 1).
 * @param {object} settings - The flipbook settings.
 * @returns {Array<object>}
 */
export function calculateShapePositions(progress, settings) {
    const shapes = [];
    const { bgShapeCount, bgShapeSize, bgShapeSpeed, bgShapeAnimation } = settings;
    const width = mmToPx(settings.pageWidthMM);
    const height = mmToPx(settings.pageHeightMM);

    for (let i = 0; i < bgShapeCount; i++) {
        const baseOffset = i / bgShapeCount;
        let x, y;

        switch (bgShapeAnimation) {
            case 'borderPatrol':
                const perimeter = 2 * (width + height);
                let distance = ((progress * bgShapeSpeed + baseOffset) % 1) * perimeter;
                if (distance < width) {
                    x = distance;
                    y = 0;
                } else if (distance < width + height) {
                    x = width;
                    y = distance - width;
                } else if (distance < 2 * width + height) {
                    x = width - (distance - width - height);
                    y = height;
                } else {
                    x = 0;
                    y = height - (distance - 2 * width - height);
                }
                break;
            case 'floating':
                x = width / 2 + Math.sin(progress * 2 * Math.PI + baseOffset * Math.PI * 2) * (width / 3);
                y = height / 2 + Math.cos(progress * 2 * Math.PI + baseOffset * Math.PI * 2) * (height / 3);
                break;
            case 'falling':
                x = baseOffset * width;
                y = ((progress * bgShapeSpeed + baseOffset) % 1) * height;
                break;
        }

        shapes.push({ x, y, size: bgShapeSize });
    }

    return shapes;
}
