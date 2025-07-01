import { writable } from 'svelte/store';

const defaultSettings = {
    // General settings
    pages: 50,
    fps: 24,
    pageWidthMM: 90,
    pageHeightMM: 50,

    // Text settings
    text: 'Wow!',
    fontFamily: 'Inter, sans-serif',
    textColor1: '#EEEEEE',
    textColor2: '#00AAFF',
    enableStroke: false,
    strokeColor: '#111111',
    strokeWidth: 2,
    enableShadow: false,
    shadowColor: '#000000',
    shadowBlur: 5,
    shadowOffsetX: 5,
    shadowOffsetY: 5,

    // Background settings
    bgColor: '#2a2d35',
    enableBgShapes: false,
    bgShapeType: 'circle',
    bgShapeAnimation: 'borderPatrol',
    bgShapeColor: '#8e44ad',
    bgShapeCount: 10,
    bgShapeSize: 8,
    bgShapeSpeed: 1,

    // Animation settings
    animationStyle: 'wipeRight',

    // Print settings
    optimizeOrientation: true,
    bindingEdge: 'left',
    bindingMargin: 10,
    pageMargin: 0,
    frameSpacing: 0,

    // Generated frames
    generatedFrames: []
};

function createFlipbookStore() {
    const { subscribe, set, update } = writable(defaultSettings);

    return {
        subscribe,
        update,
        reset: () => set(defaultSettings),
        updateSetting: (key, value) => {
            update(store => ({
                ...store,
                [key]: value
            }));
        }
    };
}

export const flipbookStore = createFlipbookStore(); 