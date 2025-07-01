// Helper function to convert millimeters to pixels
export const mmToPx = (mm) => Math.round(mm * 3.7795); // 96 DPI

// Draw background with solid color
export function drawBackground(ctx, settings) {
    ctx.fillStyle = settings.bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Draw text with gradient and effects
export function drawText(ctx, progress, settings) {
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
    applyAnimation(ctx, progress, settings);

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

// Draw background shapes
export function drawShapes(ctx, progress, settings) {
    if (!settings.enableBgShapes) return;

    const shapes = calculateShapes(progress, settings);
    ctx.fillStyle = settings.bgShapeColor;

    shapes.forEach(shape => {
        ctx.beginPath();
        switch (settings.bgShapeType) {
            case 'circle':
                ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.rect(shape.x - shape.size/2, shape.y - shape.size/2, shape.size, shape.size);
                break;
            case 'star':
                drawStar(ctx, shape.x, shape.y, 5, shape.size / 2, shape.size / 4);
                break;
        }
        ctx.fill();
    });
}

// Animation clipping functions
function applyAnimation(ctx, progress, settings) {
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
            ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, maxRadius, 0, Math.PI * 2);
            ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, maxRadius * (1 - progress), 0, Math.PI * 2, true);
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

// Shape drawing helpers
function drawCircle(ctx, size) {
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawSquare(ctx, size) {
    const half = size / 2;
    ctx.fillRect(-half, -half, size, size);
}

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

// Calculate shape position based on animation type
function calculateShapePosition(progress, settings) {
    const { bgShapeAnimation, bgShapeSpeed } = settings;
    const width = mmToPx(settings.pageWidthMM);
    const height = mmToPx(settings.pageHeightMM);
    
    const p = (progress * bgShapeSpeed) % 1;
    
    switch (bgShapeAnimation) {
        case 'borderPatrol':
            const perimeter = 2 * width + 2 * height;
            const distance = p * perimeter;
            
            if (distance < width) {
                return { x: distance, y: 0 };
            } else if (distance < width + height) {
                return { x: width, y: distance - width };
            } else if (distance < 2 * width + height) {
                return { x: width - (distance - width - height), y: height };
            } else {
                return { x: 0, y: height - (distance - 2 * width - height) };
            }
        
        case 'floating':
            const angle = p * Math.PI * 2;
            return {
                x: width * 0.5 + Math.sin(angle) * width * 0.4,
                y: height * 0.5 + Math.cos(angle) * height * 0.4
            };
        
        case 'falling':
            return {
                x: width * (0.1 + 0.8 * Math.sin(p * Math.PI * 4)),
                y: (p * height * 1.2) % height
            };
    }
}

// Calculate shape positions based on animation type
function calculateShapes(progress, settings) {
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
                x = width/2 + Math.sin(progress * 2 * Math.PI + baseOffset * Math.PI * 2) * (width/3);
                y = height/2 + Math.cos(progress * 2 * Math.PI + baseOffset * Math.PI * 2) * (height/3);
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

// Main frame generation function
export async function generateFrames(settings, updateProgress) {
    const frames = [];
    const totalFrames = settings.pages;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = mmToPx(settings.pageWidthMM);
    canvas.height = mmToPx(settings.pageHeightMM);

    // Generate each frame
    for (let i = 0; i < totalFrames; i++) {
        const progress = i / (totalFrames - 1);

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        drawBackground(ctx, settings);

        // Draw shapes if enabled
        if (settings.enableBgShapes) {
            drawShapes(ctx, progress, settings);
        }

        // Draw text with animation
        drawText(ctx, progress, settings);

        // Convert to data URL and store
        frames.push(canvas.toDataURL('image/png'));

        // Update progress
        if (updateProgress) {
            updateProgress((i + 1) / totalFrames);
        }

        // Yield to browser to prevent freezing
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    return frames;
}
