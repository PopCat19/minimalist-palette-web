// --- Initial Data (Minimal Format: Strings for labels, #Hex for colors) ---
let sourceGridData = [
    // Freeze to prevent accidental modification
    [
        "100x",
        "#FFFFFF",
        "Red",
        "Vermilion",
        "Orange",
        "Amber",
        "Yellow",
        "Lime",
        "Chartreuse",
        "Ddahai",
        "Green",
        "Erin",
        "Spring",
        "Gashtanta",
        "Cyan",
        "Capri",
        "Azure",
        "Cerulean",
        "Blue",
        "Volta",
        "Violet",
        "Llew",
        "Magenta",
        "Cerise",
        "Rose",
        "Crimson",
        "100x",
    ],
    [
        "96x",
        "#F4F4F4",
        "#FFEBEB",
        "#FFF0EB",
        "#FFF5EB",
        "#FFFAEB",
        "#FFFFEB",
        "#FAFFEB",
        "#F5FFEB",
        "#F0FFEB",
        "#EBFFEB",
        "#EBFFF0",
        "#EBFFF5",
        "#EBFFFA",
        "#EBFFFF",
        "#EBFAFF",
        "#EBF5FF",
        "#EBF0FF",
        "#EBEBFF",
        "#F0EBFF",
        "#F5EBFF",
        "#FAEBFF",
        "#FFEBFF",
        "#FFEBFA",
        "#FFEBF5",
        "#FFEBF0",
        "96x",
    ],
    [
        "88x",
        "#E0E0E0",
        "#FFC2C2",
        "#FFD1C2",
        "#FFE0C2",
        "#FFF0C2",
        "#FFFFC2",
        "#F0FFC2",
        "#E0FFC2",
        "#D1FFC2",
        "#C2FFC2",
        "#C2FFD1",
        "#C2FFE0",
        "#C2FFF0",
        "#C2FFFF",
        "#C2F0FF",
        "#C2E0FF",
        "#C2D1FF",
        "#C2C2FF",
        "#D1C2FF",
        "#E0C2FF",
        "#F0C2FF",
        "#FFC2FF",
        "#FFC2F0",
        "#FFC2E0",
        "#FFC2D1",
        "88x",
    ],
    [
        "80x",
        "#CCCCCC",
        "#FF9999",
        "#FFB399",
        "#FFCC99",
        "#FFE599",
        "#FFFF99",
        "#E5FF99",
        "#CCFF99",
        "#B2FF99",
        "#99FF99",
        "#99FFB3",
        "#99FFCC",
        "#99FFE5",
        "#99FFFF",
        "#99E5FF",
        "#99CCFF",
        "#99B2FF",
        "#9999FF",
        "#B399FF",
        "#CC99FF",
        "#E599FF",
        "#FF99FF",
        "#FF99E5",
        "#FF99CC",
        "#FF99B2",
        "80x",
    ],
    [
        "64x",
        "#A3A3A3",
        "#FF4747",
        "#FF7547",
        "#FFA347",
        "#FFD147",
        "#FFFF47",
        "#D1FF47",
        "#A3FF47",
        "#75FF47",
        "#47FF47",
        "#47FF75",
        "#47FFA3",
        "#47FFD1",
        "#47FFFF",
        "#47D1FF",
        "#47A3FF",
        "#4775FF",
        "#4747FF",
        "#7547FF",
        "#A347FF",
        "#D147FF",
        "#FF47FF",
        "#FF47D1",
        "#FF47A3",
        "#FF4775",
        "64x",
    ],
    [
        "48x",
        "#7A7A7A",
        "#B54040",
        "#B55D40",
        "#B57A40",
        "#B59840",
        "#B5B540",
        "#98B540",
        "#7AB540",
        "#5DB540",
        "#40B540",
        "#40B55D",
        "#40B57A",
        "#40B598",
        "#40B5B5",
        "#4098B5",
        "#407AB5",
        "#405DB5",
        "#4040B5",
        "#5D40B5",
        "#7A40B5",
        "#9840B5",
        "#B540B5",
        "#B54098",
        "#B5407A",
        "#B5405D",
        "48x",
    ],
    [
        "32x",
        "#525252",
        "#792A2A",
        "#793E2A",
        "#79522A",
        "#79652A",
        "#79792A",
        "#65792A",
        "#52792A",
        "#3E792A",
        "#2A792A",
        "#2A793E",
        "#2A7952",
        "#2A7965",
        "#2A7979",
        "#2A6579",
        "#2A5279",
        "#2A3E79",
        "#2A2A79",
        "#3E2A79",
        "#522A79",
        "#652A79",
        "#792A79",
        "#792A65",
        "#792A52",
        "#792A3E",
        "32x",
    ],
    [
        "24x",
        "#3D3D3D",
        "#5B2020",
        "#5B2F20",
        "#5B3D20",
        "#5B4C20",
        "#5B5B20",
        "#4C5B20",
        "#3D5B20",
        "#2F5B20",
        "#205B20",
        "#205B2F",
        "#205B3D",
        "#205B4C",
        "#205B5B",
        "#204C5B",
        "#203D5B",
        "#202F5B",
        "#20205B",
        "#2F205B",
        "#3D205B",
        "#4C205B",
        "#5B205B",
        "#5B204C",
        "#5B203D",
        "#5B202F",
        "24x",
    ],
    [
        "16x",
        "#292929",
        "#3C1515",
        "#3C1F15",
        "#3C2915",
        "#3C3315",
        "#3C3C15",
        "#333C15",
        "#293C15",
        "#1F3C15",
        "#153C15",
        "#153C1F",
        "#153C29",
        "#153C33",
        "#153C3C",
        "#15333C",
        "#15293C",
        "#151F3C",
        "#15153C",
        "#1F153C",
        "#29153C",
        "#33153C",
        "#3C153C",
        "#3C1533",
        "#3C1529",
        "#3C151F",
        "16x",
    ],
    [
        "12x",
        "#1F1F1F",
        "#2D1010",
        "#2D1710",
        "#2D1F10",
        "#2D2610",
        "#2D2D10",
        "#262D10",
        "#1F2D10",
        "#172D10",
        "#102D10",
        "#102D17",
        "#102D1F",
        "#102D26",
        "#102D2D",
        "#10262D",
        "#101F2D",
        "#10172D",
        "#10102D",
        "#17102D",
        "#1F102D",
        "#26102D",
        "#2D102D",
        "#2D1026",
        "#2D101F",
        "#2D1017",
        "12x",
    ],
    [
        "8x",
        "#141414",
        "#1E0B0B",
        "#1E100B",
        "#1E140B",
        "#1E190B",
        "#1E1E0B",
        "#191E0B",
        "#141E0B",
        "#101E0B",
        "#0B1E0B",
        "#0B1E10",
        "#0B1E14",
        "#0B1E19",
        "#0B1E1E",
        "#0B191E",
        "#0B141E",
        "#0B101E",
        "#0B0B1E",
        "#100B1E",
        "#140B1E",
        "#190B1E",
        "#1E0B1E",
        "#1E0B19",
        "#1E0B14",
        "#1E0B10",
        "8x",
    ],
    [
        "0x",
        "#000000",
        "0",
        "15",
        "30",
        "45",
        "60",
        "75",
        "90",
        "105",
        "120",
        "135",
        "150",
        "165",
        "180",
        "195",
        "210",
        "225",
        "240",
        "255",
        "270",
        "285",
        "300",
        "315",
        "330",
        "345",
        "0x",
    ],
];

// --- State Variables ---
let currentGridData = [...sourceGridData.map((row) => [...row])];
let isInterpolationEnabled = false;
let interpolationSteps = 1;
let saturationOffset = 0;
// --- NEW: Panning State ---
let isPanning = false;
let startX, startY, currentX, currentY;
let paletteOffsetX = 50; // Initial offset matches CSS
let paletteOffsetY = 50;
// --- NEW: Zoom State ---
let scale = 1;
const minScale = 0.1;
const maxScale = 5;
const scaleStep = 0.1;
const zoomDebounceDelay = 10; // Optional: debounce zoom updates slightly
let zoomTimeout;
// --- NEW: Track forced cell size ---
// let lastForcedCellSizePx = null; // REMOVED - No longer needed
// --- NEW: Local Storage Key ---
const localStorageKey = 'minimalistPaletteAppState';
// --- NEW: Color Picker State ---
let pickerTargetRow = -1;
let pickerTargetCol = -1;
let isPickerUpdating = false; // Prevent recursive updates
// --- NEW: Color Picker Drag/Resize State ---
let isDraggingColorPicker = false;
let pickerStartX, pickerStartY, pickerInitialX, pickerInitialY;
let isResizingColorPicker = false;
let cpResizeStartX, cpResizeStartY, cpResizeInitialWidth, cpResizeInitialHeight;
// --- NEW: Color Picking Mode State ---
let isColorPickingMode = false;

// --- DOM Elements ---
// Palette display elements
const canvasViewport = document.getElementById('canvas-viewport');
const paletteContainer = document.getElementById('palette-container');
const paletteGrid = document.getElementById('palette-grid'); // New grid reference

// Config Modal elements
const configToggleButton = document.getElementById('config-toggle-button');
const configModal = document.getElementById('config-modal');
const closeModalButton = configModal.querySelector('.modal-close-button'); // Find close button inside modal
const editPaletteButton = document.getElementById('edit-palette-button');
const paletteEditorSection = document.getElementById('palette-editor-section');
const paletteInput = document.getElementById('palette-input');
const updateButton = document.getElementById('update-button');
const exportPngButton = document.getElementById('export-png-button');
const exportScaleInput = document.getElementById('export-scale-input'); // NEW: Export Scale Input

// Adjustment controls (now inside modal)
const interpolationToggle = document.getElementById('interpolation-toggle');
const interpolationStepsGroup = document.getElementById('interpolation-steps-group');
const stepsSlider = document.getElementById('interpolation-steps-slider');
const stepsNumber = document.getElementById('interpolation-steps-number');
const saturationOffsetSlider = document.getElementById('saturation-offset-slider');
const saturationOffsetNumber = document.getElementById('saturation-offset-number');

// --- NEW: Zoom Controls Elements --- REMOVED zoomSlider
const zoomSlider = document.getElementById('zoom-slider'); // Restore reference
const zoomNumber = document.getElementById('zoom-number');

// --- NEW: UI Scale Controls Elements --- REMOVED uiScaleSlider
// const uiScaleSlider = document.getElementById('ui-scale-slider');
const uiScaleNumber = document.getElementById('ui-scale-number');

// --- NEW: Generate X Row Elements ---
const generateXValueInput = document.getElementById('generate-x-value');
const generateRef1ValueInput = document.getElementById('generate-ref1-value'); // New Ref 1 Input
const generateRef2ValueInput = document.getElementById('generate-ref2-value'); // New Ref 2 Input
const generateXButton = document.getElementById('generate-x-button');

// --- NEW: Popout Editor Elements ---
const popoutEditor = document.getElementById('popout-editor');
const popoutHeader = popoutEditor.querySelector('.popout-header');
const popoutCloseButton = document.getElementById('popout-close-button');
const popoutPaletteInput = document.getElementById('popout-palette-input');
const popoutUpdateButton = document.getElementById('popout-update-button');
const popoutResizeHandle = document.getElementById('popout-resize-handle'); // NEW: Resize Handle
const popoutStatusMessage = document.getElementById('popout-status-message'); // NEW

// --- NEW: State Management Buttons ---
const saveStateButton = document.getElementById('save-state-button');
const resetStateButton = document.getElementById('reset-state-button');

// --- NEW: Palette Import/Export Elements ---
const exportPaletteButton = document.getElementById('export-palette-button');
const importPaletteButton = document.getElementById('import-palette-button');
const importPaletteFileInput = document.getElementById('import-palette-file-input');

// --- NEW: Color Picker Modal Elements ---
const colorPickerModal = document.getElementById('color-picker-modal');
const colorPickerCloseButton = document.getElementById('color-picker-close-button');
const colorPickerPreview = document.getElementById('color-picker-preview');
const pickerHueSlider = document.getElementById('picker-hue-slider');
const pickerHueNumber = document.getElementById('picker-hue-number');
const pickerSatSlider = document.getElementById('picker-sat-slider');
const pickerSatNumber = document.getElementById('picker-sat-number');
const pickerLumSlider = document.getElementById('picker-lum-slider');
const pickerLumNumber = document.getElementById('picker-lum-number');
const pickerHexInput = document.getElementById('picker-hex-input');
const pickerCopyHexButton = document.getElementById('picker-copy-hex-button');
const pickerCancelButton = document.getElementById('picker-cancel-button');
const pickerApplyButton = document.getElementById('picker-apply-button');
// --- NEW: Color Pick Toggle Button Element ---
const colorPickToggleButton = document.getElementById('color-pick-toggle-button');
const colorPickerHeader = colorPickerModal.querySelector('.color-picker-header'); // NEW: Header ref
const colorPickerResizeHandle = document.getElementById('color-picker-resize-handle'); // NEW: Resize handle ref

// --- Helper Functions ---
function isValidHex(str) {
    return (
        typeof str === "string" &&
        str.startsWith("#") &&
        (str.length === 4 || str.length === 7) &&
        /^#[0-9A-Fa-f]+$/.test(str)
    );
}
function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(
        shorthandRegex,
        (m, r, g, b) => r + r + g + g + b + b,
    );
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex,
    );
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return (
        "#" +
        componentToHex(r) +
        componentToHex(g) +
        componentToHex(b)
    );
}
function interpolateHexColor(hex1, hex2, steps) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return []; // Invalid input

    const interpolatedColors = [];
    const totalIntervals = steps + 1;

    for (let i = 1; i <= steps; i++) {
        const r = Math.round(
            rgb1.r + (rgb2.r - rgb1.r) * (i / totalIntervals),
        );
        const g = Math.round(
            rgb1.g + (rgb2.g - rgb1.g) * (i / totalIntervals),
        );
        const b = Math.round(
            rgb1.b + (rgb2.b - rgb1.b) * (i / totalIntervals),
        );
        interpolatedColors.push(rgbToHex(r, g, b));
    }
    return interpolatedColors;
}

// --- REVISED: HSL Conversion and Adjustment ---
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2; // Initialize h

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    // Return h in degrees (0-360), s and l in percent (0-100)
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

function hslToRgb(h, s, l) {
    // Convert h, s, l from picker range (0-360, 0-100, 0-100) to calculation range (0-1, 0-1, 0-1)
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

// --- NEW: Combined Converters for Picker ---
function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null; // Returns h(0-360), s(0-100), l(0-100)
}

function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function adjustSaturation(hexColor, offsetPercent) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return hexColor;

    const hslRaw = rgbToHslRaw(rgb.r, rgb.g, rgb.b); // Use raw HSL (0-1 range)

    const saturationThreshold = 0.01;
    if (hslRaw.s < saturationThreshold) {
        return hexColor;
    }

    const offset = offsetPercent / 100;
    hslRaw.s = Math.max(0, Math.min(1, hslRaw.s + offset)); // Clamp between 0 and 1

    const newRgb = hslToRgbRaw(hslRaw.h, hslRaw.s, hslRaw.l); // Use raw HSL
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// Keep original HSL calculation helpers for adjustSaturation (operating on 0-1 range)
function rgbToHslRaw(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h=0, s=0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l }; // h, s, l are in [0, 1] range
}
function hslToRgbRaw(h, s, l) {
    let r, g, b;
    if (s == 0) { r = g = b = l; }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3); g = hue2rgb(p, q, h); b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// NEW: Function to parse 'x' value from labels like '100x'
function parseXValue(label) {
    if (typeof label !== 'string' || !label.endsWith('x')) {
        return null;
    }
    const numPart = label.substring(0, label.length - 1);
    const value = parseInt(numPart, 10);
    return isNaN(value) ? null : value;
}

// NEW: Interpolate RGB (moved out from hex interpolation for reuse)
function interpolateRgb(rgb1, rgb2, t) {
    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
    return { r, g, b };
}

// NEW Helper to get coordinates from mouse or touch events
function getEventCoords(event) {
    if (event.touches && event.touches.length > 0) {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    } else {
        return { x: event.clientX, y: event.clientY };
    }
}

// --- NEW: UI Scale Function --- (UPDATED)
function applyUiScale(scalePercent) {
    const scaleValue = Math.max(50, Math.min(200, scalePercent)) / 100; // Clamp 50-200%, convert to 0.5-2.0
    document.documentElement.style.fontSize = `${10 * scaleValue}px`;
    console.log(`UI Scale set to ${scalePercent}% (root font size: ${10 * scaleValue}px)`);

    // Update number input ONLY if called externally (less likely now)
    if (uiScaleNumber.value !== String(scalePercent)) {
        uiScaleNumber.value = scalePercent;
    }
    // REMOVED Slider sync
    // if (uiScaleSlider.value !== String(scalePercent)) {
    //     uiScaleSlider.value = scalePercent;
    // }
}

// --- Core Logic ---

// Generate a new grid with vertically interpolated colors (inserts rows)
function generateInterpolatedPalette(originalData, steps) {
    if (steps <= 0) return originalData.map((row) => [...row]); // Return a copy

    const newGridData = [];
    if (!originalData || originalData.length === 0)
        return newGridData;

    const numCols = originalData[0].length;

    // Add the top header row (Row 0)
    newGridData.push([...originalData[0]]);

    // Iterate through original rows, checking pairs for interpolation
    // Skip first (header) and last (footer) rows for starting interpolation
    for (let i = 1; i < originalData.length - 2; i++) {
        const currentRow = originalData[i];
        const nextRow = originalData[i + 1];

        // Add the current original row to the new grid
        newGridData.push([...currentRow]);

        // Prepare arrays to hold interpolated colors for each step (new row)
        const interpolatedRowsData = Array.from(
            { length: steps },
            () => new Array(numCols).fill(""),
        );

        let canInterpolateRowPair = false; // Can we interpolate between row i and i+1?

        // Iterate through columns (excluding first and last label columns)
        for (let j = 1; j < numCols - 1; j++) {
            const cell1 = currentRow[j];
            const cell2 = nextRow[j];

            // Check if BOTH cells in the column are valid hex colors
            if (isValidHex(cell1) && isValidHex(cell2)) {
                canInterpolateRowPair = true; // Found a column to interpolate
                const interpolatedColors = interpolateHexColor(
                    cell1,
                    cell2,
                    steps,
                );

                // Place interpolated colors into the corresponding step's row data
                for (let s = 0; s < steps; s++) {
                    interpolatedRowsData[s][j] =
                        interpolatedColors[s];
                }
            } else {
                // If not interpolating this column, fill placeholder rows with empty strings
                for (let s = 0; s < steps; s++) {
                    interpolatedRowsData[s][j] = ""; // Keep empty or copy label? Empty is simpler.
                }
            }
        }

        // If interpolation was possible between these rows, add the new rows
        if (canInterpolateRowPair) {
            interpolatedRowsData.forEach((newRowData) => {
                // Add placeholders for first/last column labels in the new rows
                newRowData[0] = "-"; // Placeholder for left label
                newRowData[newRowData.length - 1] = "-"; // Placeholder for right label
                newGridData.push(newRowData);
            });
        }
    }

    // Add the second to last original row (which was skipped in the loop)
    if (originalData.length > 2) {
        newGridData.push([
            ...originalData[originalData.length - 2],
        ]);
    }
    // Add the last original row (bottom labels/colors)
    if (originalData.length > 1) {
        newGridData.push([
            ...originalData[originalData.length - 1],
        ]);
    }

    return newGridData;
}

function convertToSimpleFormat(gridData) {
    return gridData.map((row) => row.join(" ")).join("\n");
}
function parseSimpleFormat(textData) {
    const lines = textData.trim().split("\n");
    return lines.map((line) => {
        return line
            .trim()
            .split(" ")
            .filter((cell) => cell !== "");
    });
}
function getTextColor(hexBgColor) {
    if (!hexBgColor || typeof hexBgColor !== "string")
        return "#000000"; // Default to black
    const rgb = hexToRgb(hexBgColor);
    if (!rgb) return "#000000"; // Default to black on error
    // Calculate luminance (per WCAG)
    const lum = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    // Return pure white or black for maximum contrast
    return lum > 0.5 ? "#000000" : "#FFFFFF";
}
async function copyToClipboard(text, element) {
    if (!navigator.clipboard) {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            showCopiedFeedback(element);
        } catch (err) {
            console.error("Fallback copy failed: ", err);
            alert("Failed to copy. Your browser might not support this feature or require specific permissions.");
        }
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        showCopiedFeedback(element);
    } catch (err) {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy.");
    }
}
function showCopiedFeedback(element) {
    element.classList.add("copied");
    setTimeout(() => element.classList.remove("copied"), 1000);
}

// Render the palette grid from grid data
function renderPalette(gridData) {
    paletteGrid.innerHTML = ""; // Clear previous grid content
    if (!Array.isArray(gridData)) {
        console.error("Invalid grid data: not an array");
        return;
    }

    gridData.forEach((rowData, rowIndex) => {
        if (!Array.isArray(rowData)) {
            console.warn(`Skipping invalid row ${rowIndex}`);
            return;
        }

        rowData.forEach((cellData, cellIndex) => {
            const cellContentDiv = document.createElement('div');
            cellContentDiv.classList.add('cell-content');
            paletteGrid.appendChild(cellContentDiv);

            const isInterpolatedLabelPlaceholder = cellData === "-";

            if (isValidHex(cellData)) {
                const originalHexColor = cellData;
                const adjustedHexColor = adjustSaturation(originalHexColor, saturationOffset);
                const adjustedHexText = adjustedHexColor.substring(1).toUpperCase(); // Text to display/copy
                const textColor = getTextColor(adjustedHexColor);

                cellContentDiv.style.backgroundColor = adjustedHexColor;
                cellContentDiv.textContent = adjustedHexText;
                cellContentDiv.style.color = textColor;
                cellContentDiv.classList.add("swatch");
                cellContentDiv.dataset.originalHex = originalHexColor; // Store original for editing
                // Store indices relative to the *currently rendered* grid for potential use
                // IMPORTANT: For editing, we rely on interpolation being OFF, so these indices *will* match sourceGridData
                cellContentDiv.dataset.rowIndex = rowIndex;
                cellContentDiv.dataset.cellIndex = cellIndex;

                // --- REVISED Click Listener (Checks Picker Mode) ---
                cellContentDiv.addEventListener("click", (event) => { // Add event parameter
                    const clickRowIndex = parseInt(cellContentDiv.dataset.rowIndex, 10);
                    const clickCellIndex = parseInt(cellContentDiv.dataset.cellIndex, 10);

                    if (isColorPickingMode && !isInterpolationEnabled) {
                        // If pick mode is ON and interpolation is OFF, open the picker
                        // Use the stored indices, which refer to sourceGridData in this state
                        console.log(`Opening picker for sourceGridData[${clickRowIndex}][${clickCellIndex}]`);
                        // Pass the event to the open function
                        openColorPicker(clickRowIndex, clickCellIndex, event);
                    } else {
                        // Otherwise (pick mode OFF or interpolation ON), copy the displayed value
                        console.log(`Copying displayed color: ${adjustedHexText}`);
                        copyToClipboard(adjustedHexText, cellContentDiv);
                        if (isColorPickingMode && isInterpolationEnabled) {
                           console.log("Color picking disabled while interpolation is active. Copied adjusted color.");
                           // Optional: Add visual feedback here if desired
                        }
                    }
                });
                // --- END REVISED Click Listener ---

                cellContentDiv.addEventListener('mouseover', () => {
                    // Only show hover effect if NOT in color picking mode
                    if (!isColorPickingMode) {
                    cellContentDiv.style.boxShadow = `inset 0 0 0 2px ${textColor}`;
                    }
                });
                cellContentDiv.addEventListener('mouseout', () => {
                     cellContentDiv.style.boxShadow = 'none'; // Always remove on mouseout
                });

            } else if (typeof cellData === "string") {
                // Label rendering remains the same
                cellContentDiv.textContent = cellData;
                cellContentDiv.classList.add("label");
                if (isInterpolatedLabelPlaceholder) {
                    cellContentDiv.classList.add("interpolated-label");
                } else {
                    cellContentDiv.style.color = getTextColor('#2a2a2a');
                    if (cellIndex === 0 || cellIndex === rowData.length - 1 || rowIndex === 0 || rowIndex === gridData.length - 1) {
                        cellContentDiv.classList.add("legend-label");
                    }
                }
            } else {
                 // Error handling remains the same
                 console.warn(`Invalid cell data type at row ${rowIndex}, cell ${cellIndex}:`, typeof cellData, cellData);
                cellContentDiv.textContent = "?";
                cellContentDiv.style.backgroundColor = "#555";
                cellContentDiv.style.color = "var(--text-color)";
                 cellContentDiv.classList.add("invalid");
            }
        });
    });
}

// Update the view based on interpolation state
function updatePaletteView() {
    if (isInterpolationEnabled) {
        currentGridData = generateInterpolatedPalette(
            sourceGridData,
            interpolationSteps,
        );
    } else {
        // Reset to a fresh copy of the source data
        currentGridData = sourceGridData.map((row) => [...row]);
    }
    // Render the potentially interpolated grid.
    // Saturation is applied *during* renderPalette.
    renderPalette(currentGridData);
}

// --- NEW: Panning Logic ---
function startPan(event) {
    isPanning = true;
    startX = event.clientX || event.touches[0].clientX;
    startY = event.clientY || event.touches[0].clientY;
    canvasViewport.classList.add('grabbing');
    // Prevent text selection during drag
    event.preventDefault();
}

function panMove(event) {
    if (!isPanning) return;
    event.preventDefault();
    currentX = event.clientX || event.touches[0].clientX;
    currentY = event.clientY || event.touches[0].clientY;

    const dx = currentX - startX;
    const dy = currentY - startY;

    paletteOffsetX += dx;
    paletteOffsetY += dy;

    // Apply transform using the dedicated function
    updateTransform();

    // Update start for next move delta
    startX = currentX;
    startY = currentY;
}

function endPan() {
    if (isPanning) {
         isPanning = false;
         canvasViewport.classList.remove('grabbing');
    }
}

// --- REVISED: Zoom Logic (triggered by controls) ---
function applyZoom(newScalePercent) {
    const newScale = Math.max(minScale, Math.min(maxScale, newScalePercent / 100));

    // If scale didn't change, do nothing
    if (newScale === scale) return;

    // Get mouse position relative to the viewport
    const rect = canvasViewport.getBoundingClientRect();

    // Use viewport center as the zoom focal point
    const focalX = rect.width / 2;
    const focalY = rect.height / 2;

    // Calculate the point on the palette container under the mouse before zoom
    const pointX = (focalX - paletteOffsetX) / scale;
    const pointY = (focalY - paletteOffsetY) / scale;

    // Update scale
    scale = newScale;

    // Calculate the new offset to keep the point under the mouse stationary
    paletteOffsetX = focalX - pointX * scale;
    paletteOffsetY = focalY - pointY * scale;

    // Apply new transform
    updateTransform();
}

// --- NEW: Apply Transform Function ---
function updateTransform() {
    paletteContainer.style.transform = `translate(${paletteOffsetX}px, ${paletteOffsetY}px) scale(${scale})`;
}

// --- Event Listeners ---

// Panning Listeners
canvasViewport.addEventListener('mousedown', startPan);
canvasViewport.addEventListener('mousemove', panMove);
canvasViewport.addEventListener('mouseup', endPan);
canvasViewport.addEventListener('mouseleave', endPan); // Stop panning if mouse leaves viewport
// Touch Events for mobile
canvasViewport.addEventListener('touchstart', startPan, { passive: false }); // passive: false to allow preventDefault
canvasViewport.addEventListener('touchmove', panMove, { passive: false });
canvasViewport.addEventListener('touchend', endPan);
canvasViewport.addEventListener('touchcancel', endPan);

// --- NEW: Config Modal Functions ---

const focusableModalElementsSelector = 'button, [href], input:not([type="range"]), select, textarea, [tabindex]:not([tabindex="-1"])';
let firstFocusableElement = null;
let lastFocusableElement = null;

function openConfigModal() {
    configModal.classList.add('visible');
    configModal.classList.remove('editor-visible'); // Reset editor view
    configToggleButton.classList.add('active'); // Add active class to button

    // Set focus trap elements
    const focusableElements = configModal.querySelectorAll(focusableModalElementsSelector);
    if (focusableElements.length > 0) {
        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];
        // Defer focus setting until after transition/rendering
        requestAnimationFrame(() => {
             firstFocusableElement.focus(); // Focus the first element (usually close button)
        });
    } else {
        firstFocusableElement = null;
        lastFocusableElement = null;
    }

    document.addEventListener('keydown', handleGlobalKeyDown);
}

function closeConfigModal() {
    configModal.classList.remove('visible');
    configToggleButton.classList.remove('active'); // Remove active class from button
    document.removeEventListener('keydown', handleGlobalKeyDown);
    // Optionally return focus to the button that opened the modal
    configToggleButton.focus();
}

function handleGlobalKeyDown(event) {
    if (!configModal.classList.contains('visible')) return;

    // Close on Escape key
    if (event.key === 'Escape') {
        closeConfigModal();
        return;
    }

    // Trap focus on Tab key
    if (event.key === 'Tab') {
        if (!firstFocusableElement) return; // No focusable elements

        if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                event.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
        // If focus is currently outside the modal (e.g., browser UI), bring it back
        // This check might need refinement depending on specific browser behavior
        if (!configModal.contains(document.activeElement)) {
           firstFocusableElement.focus();
        }
    }
}

// Config Modal Toggle Listener (Uses new functions)
configToggleButton.addEventListener('click', () => {
    if (configModal.classList.contains('visible')) {
        closeConfigModal();
    } else {
        openConfigModal();
    }
});

// Close Button Listener (Uses new function)
closeModalButton.addEventListener('click', closeConfigModal);

// Background Click Listener (Uncommented and uses new function)
configModal.addEventListener('click', (event) => {
    // Close only if the click is directly on the modal background, not its children
    if (event.target === configModal) {
        closeConfigModal();
    }
});

// Show/Hide Palette Editor within Modal
editPaletteButton.addEventListener('click', () => {
    // configModal.classList.add('editor-visible'); // OLD: Show modal section
    popoutPaletteInput.value = convertToSimpleFormat(sourceGridData); // Load current source data
    popoutEditor.style.display = 'flex'; // Show the popout (use flex due to CSS)

    // Center the popout initially (optional)
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;
    popoutEditor.style.left = `${(viewportWidth - popoutEditor.offsetWidth) / 2}px`;
    popoutEditor.style.top = `${(viewportHeight - popoutEditor.offsetHeight) / 3}px`; // Position slightly higher than pure center

    popoutPaletteInput.focus(); // Focus the textarea
    popoutPaletteInput.select(); // Select text for easy replacement
});

// --- NEW: Popout Close Button Listener ---
popoutCloseButton.addEventListener('click', () => {
    popoutEditor.style.display = 'none'; // Hide the popout
});

// Update Button (now only for the modal editor, which is unused but kept for now)
// updateButton.addEventListener('click', () => { ... });

// Export PNG Event Listener (Target remains paletteTable)
exportPngButton.addEventListener('click', () => {
    // Read scale from input, default to 2 if invalid
    let exportScale = parseFloat(exportScaleInput.value) || 2;
    exportScale = Math.max(1, Math.min(10, exportScale)); // Clamp between 1 and 10
    exportScaleInput.value = exportScale; // Update input field in case it was invalid/clamped

    console.log(`Exporting PNG with scale: ${exportScale}x`); // Log the scale being used

    // Disable button temporarily
    exportPngButton.disabled = true;
    exportPngButton.textContent = 'Exporting...';
    exportScaleInput.disabled = true; // Disable scale input too

    // Slight delay to allow UI to settle if needed
    setTimeout(() => {
        // Determine the background color to use
        const tableBgColor = getComputedStyle(paletteContainer).backgroundColor;

        html2canvas(paletteGrid, {
            backgroundColor: tableBgColor, // Use container BG for capture
            useCORS: true,
            logging: false,
            scale: exportScale, // Use scale from input
            // Position/offset adjustments might be needed if transform interferes
            // x: paletteContainer.offsetLeft, // Experiment if capture is off
            // y: paletteContainer.offsetTop,
        })
        .then(canvas => {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
            downloadLink.download = 'palette.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
        })
        .catch(err => {
            console.error('Error exporting PNG:', err);
            alert('Error exporting palette as PNG. See console for details.');
        })
        .finally(() => {
            // Re-enable button and input
                exportPngButton.disabled = false;
            exportPngButton.textContent = 'Export as PNG';
            exportScaleInput.disabled = false;
            });
    }, 150); // Delay
});

// Interpolation/Saturation Listeners
interpolationToggle.addEventListener('change', (event) => {
    isInterpolationEnabled = event.target.checked;
    updatePaletteView();
});
stepsSlider.addEventListener('input', (event) => {
    interpolationSteps = parseInt(event.target.value, 10);
    stepsNumber.value = interpolationSteps;
    if (isInterpolationEnabled) { updatePaletteView(); }
});
stepsNumber.addEventListener('input', (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(stepsNumber.min, 10);
    const max = parseInt(stepsNumber.max, 10);
    if (isNaN(value)) { value = min; }
    else if (value < min) { value = min; }
    else if (value > max) { value = max; }
    stepsNumber.value = value;
    interpolationSteps = value;
    stepsSlider.value = interpolationSteps;
    if (isInterpolationEnabled) { updatePaletteView(); }
});
saturationOffsetSlider.addEventListener('input', (event) => {
    saturationOffset = parseInt(event.target.value, 10);
    saturationOffsetNumber.value = saturationOffset;
    renderPalette(currentGridData); // Just re-render
});
saturationOffsetNumber.addEventListener('input', (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(saturationOffsetNumber.min, 10);
    const max = parseInt(saturationOffsetNumber.max, 10);
    if (isNaN(value)) { value = 0; }
    else if (value < min) { value = min; }
    else if (value > max) { value = max; }
    saturationOffsetNumber.value = value;
    saturationOffset = value;
    saturationOffsetSlider.value = saturationOffset;
    renderPalette(currentGridData); // Just re-render
});

// --- Zoom Control Listeners --- (UPDATED)
// Restore zoomSlider listener
zoomSlider.addEventListener('input', (event) => {
    const zoomValue = parseInt(event.target.value, 10);
    zoomNumber.value = zoomValue; // Sync number input
    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(() => applyZoom(zoomValue), zoomDebounceDelay);
});

zoomNumber.addEventListener('input', (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(zoomNumber.min, 10);
    const max = parseInt(zoomNumber.max, 10);
    // -- TEMPORARILY REMOVE CLAMPING/DEFAULTING ON INPUT --
    // if (isNaN(value)) {
    //     value = 100; // Default to 100% if invalid
    // } else if (value < min) {
    //     value = min;
    // } else if (value > max) {
    //     value = max;
    // }
    // zoomNumber.value = value; // Don't immediately update input field

    // -- Sync slider ONLY if value is valid --
    if (!isNaN(value)) {
        zoomSlider.value = Math.max(min, Math.min(max, value)); // Clamp slider value
    }
    // -- Apply zoom (with debounce) using potentially un-clamped value --
    // ApplyZoom will handle clamping internally before using the scale
    clearTimeout(zoomTimeout);
    if (!isNaN(value)) { // Only set timeout if value is a number
    zoomTimeout = setTimeout(() => applyZoom(value), zoomDebounceDelay);
    }
});

// Add 'change' listener to zoomNumber for final validation/clamping
zoomNumber.addEventListener('change', (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(zoomNumber.min, 10);
    const max = parseInt(zoomNumber.max, 10);

    if (isNaN(value)) {
        value = 100; // Default to 100 if invalid
    } else {
        value = Math.max(min, Math.min(max, value)); // Clamp within min/max
    }
    // Update the input field visually to the clamped value
    zoomNumber.value = value;
    zoomSlider.value = value; // Sync slider to clamped value

    // Apply the final clamped value immediately (or keep debounce if preferred)
    clearTimeout(zoomTimeout); // Clear any pending timeouts from 'input'
    applyZoom(value);
});

// --- NEW: UI Scale Control Listeners --- (UPDATED)
// REMOVED uiScaleSlider listener
// ...

uiScaleNumber.addEventListener('input', (event) => {
    let value = parseInt(event.target.value, 10);
    // -- TEMPORARILY REMOVE CLAMPING/DEFAULTING ON INPUT --
    // const min = parseInt(uiScaleNumber.min, 10);
    // const max = parseInt(uiScaleNumber.max, 10);
    // if (isNaN(value)) {
    //     value = 100; // Default to 100 if invalid
    // } else {
    //     value = Math.max(min, Math.min(max, value)); // Clamp within min/max
    // }
    // uiScaleNumber.value = value; // Don't immediately update input field
    
    // Apply scale (applyUiScale handles clamping internally)
    if (!isNaN(value)) { // Only apply if it's a number
        applyUiScale(value);
    }
});

// Add 'change' listener to uiScaleNumber for final validation/clamping
uiScaleNumber.addEventListener('change', (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(uiScaleNumber.min, 10);
    const max = parseInt(uiScaleNumber.max, 10);

    if (isNaN(value)) {
        value = 100; // Default to 100 if invalid
    } else {
        value = Math.max(min, Math.min(max, value)); // Clamp within min/max
    }
    // Update the input field visually to the clamped value
    uiScaleNumber.value = value;
    // Apply the final clamped value
    applyUiScale(value);
});

// --- REVISED: Generate X Row Event Listener (Manual References) ---
generateXButton.addEventListener('click', () => {
    const targetX = parseInt(generateXValueInput.value, 10);
    const ref1X = parseInt(generateRef1ValueInput.value, 10);
    const ref2X = parseInt(generateRef2ValueInput.value, 10);

    console.log(`--- Generate Row Clicked --- Target: ${targetX}x, Ref1: ${ref1X}x, Ref2: ${ref2X}x`);

    if (isNaN(targetX) || isNaN(ref1X) || isNaN(ref2X)) {
        alert('Please enter valid numbers for Target X, Ref 1 X, and Ref 2 X.');
        return;
    }
    if (ref1X === ref2X) {
         alert('Reference 1 X and Reference 2 X cannot be the same.');
         return;
    }

    // Find the exact rows for ref1 and ref2
    let rowRef1 = null;
    let rowRef2 = null;
    let existingRowIndex = -1;

    sourceGridData.forEach((row, index) => {
        const currentX = parseXValue(row[0]);
        if (currentX === null) return;

        if (currentX === targetX) {
            existingRowIndex = index;
        }
        if (currentX === ref1X) {
            rowRef1 = row;
        }
        if (currentX === ref2X) {
            rowRef2 = row;
        }
    });

    if (existingRowIndex !== -1) {
        alert(`Row ${targetX}x already exists.`);
        return;
    }
    if (!rowRef1) {
        alert(`Could not find reference row ${ref1X}x.`);
        return;
    }
    if (!rowRef2) {
        alert(`Could not find reference row ${ref2X}x.`);
        return;
    }

    // Calculate interpolation/extrapolation factor t relative to ref1 and ref2
    // t = (targetX - ref1X) / (ref2X - ref1X);
    // Let's adjust the formula slightly to be consistent with previous interpolateRgb call (where t is between 0 and 1 for interpolation)
    // We define t based on the distance from ref1 towards ref2.
    const t = (targetX - ref1X) / (ref2X - ref1X);
    console.log(`Calculation factor t: ${t}`); // Can be < 0 or > 1 for extrapolation

    if (isNaN(t)) {
        console.error('Invalid factor (NaN). ref1X and ref2X might be identical.');
        alert('Internal error calculating factor (reference values might be identical).');
        return;
    }

    const newRow = [`${targetX}x`];
    const numCols = rowRef1.length; // Assume ref1 and ref2 have same length
    console.log(`Generating new row with ${numCols} columns...`);

    // Interpolate/Extrapolate columns
    for (let j = 1; j < numCols - 1; j++) {
        const colorRef1Str = rowRef1[j];
        const colorRef2Str = rowRef2[j];
        const rgbRef1 = isValidHex(colorRef1Str) ? hexToRgb(colorRef1Str) : null;
        const rgbRef2 = isValidHex(colorRef2Str) ? hexToRgb(colorRef2Str) : null;

        if (rgbRef1 && rgbRef2) {
            // Use the standard linear interpolation formula: R = R1 + (R2 - R1) * t
            const newR = Math.round(rgbRef1.r + (rgbRef2.r - rgbRef1.r) * t);
            const newG = Math.round(rgbRef1.g + (rgbRef2.g - rgbRef1.g) * t);
            const newB = Math.round(rgbRef1.b + (rgbRef2.b - rgbRef1.b) * t);

            // Clamp results to valid 0-255 range
            const clamp = (val) => Math.max(0, Math.min(255, val));

            newRow.push(rgbToHex(clamp(newR), clamp(newG), clamp(newB)));
        } else {
            // If colors can't be processed (e.g., one is a label), add placeholder
            newRow.push('-');
        }
    }

    newRow.push(`${targetX}x`);

    // Find insertion index (maintaining sort order, descending X)
    let insertIndex = sourceGridData.findIndex(row => {
        const currentX = parseXValue(row[0]);
        return currentX !== null && currentX < targetX;
    });
    if (insertIndex === -1) {
        // Find the last row with any X value (could be 0x)
        let lastXIndex = -1;
        for(let i = sourceGridData.length - 1; i >= 0; i--) {
            if (parseXValue(sourceGridData[i][0]) !== null) {
                lastXIndex = i;
                break;
            }
        }
        // Insert after the last row with an X, or at the very end if none found (!)
        insertIndex = (lastXIndex !== -1) ? lastXIndex + 1 : sourceGridData.length;
    }

    console.log(`Inserting new row at source index ${insertIndex}`);
    sourceGridData.splice(insertIndex, 0, newRow);

    // Update state and render
    console.log('Updating state and re-rendering...');
    isInterpolationEnabled = false; // Disable other interpolation
    interpolationToggle.checked = false;
    currentGridData = sourceGridData.map(row => [...row]);
    renderPalette(currentGridData);
    generateXValueInput.value = ''; // Clear only target input
    // Keep ref inputs populated for potentially generating sequences

    alert(`Generated row ${targetX}x using references ${ref1X}x and ${ref2X}x.`);
    console.log(`--- Generate Row Successful ---`);
});

// --- NEW: Popout Dragging State ---
let isDraggingPopout = false;
let popoutStartX, popoutStartY, popoutInitialX, popoutInitialY;

// --- NEW: Popout Resizing State ---
let isResizingPopout = false;
let resizeStartX, resizeStartY, resizeInitialWidth, resizeInitialHeight;

// --- NEW: Snapping Constants ---
const SNAP_THRESHOLD = 20; // Pixels within which snapping occurs
const SNAP_GAP = 16;       // Pixels gap from the edge when snapped

// --- Popout Drag Functions (UPDATED for Touch & Snap) ---
function startPopoutDrag(event) {
    // Prevent drag if resizing is active (or vice-versa, though less likely)
    if (isResizingPopout) return;

    isDraggingPopout = true;
    popoutInitialX = popoutEditor.offsetLeft;
    popoutInitialY = popoutEditor.offsetTop;
    const coords = getEventCoords(event);
    popoutStartX = coords.x;
    popoutStartY = coords.y;

    // Add listeners to the whole document
    document.addEventListener('mousemove', dragPopout);
    document.addEventListener('mouseup', stopPopoutDrag);
    document.addEventListener('touchmove', dragPopout, { passive: false }); // Prevent scroll on touch move
    document.addEventListener('touchend', stopPopoutDrag);

    popoutHeader.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
    if (event.type === 'touchstart') {
        event.preventDefault(); // Prevent default touch actions like scrolling
    }
}

function dragPopout(event) {
    if (!isDraggingPopout) return;
    const coords = getEventCoords(event);
    const dx = coords.x - popoutStartX;
    const dy = coords.y - popoutStartY;

    let potentialLeft = popoutInitialX + dx;
    let potentialTop = popoutInitialY + dy;

    // Get editor dimensions and viewport dimensions
    const editorWidth = popoutEditor.offsetWidth;
    const editorHeight = popoutEditor.offsetHeight;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;

    // Calculate potential edge positions
    let potentialRight = potentialLeft + editorWidth;
    let potentialBottom = potentialTop + editorHeight;

    // --- Snapping Logic ---
    // Snap Left Edge
    if (Math.abs(potentialLeft) < SNAP_THRESHOLD) {
        potentialLeft = SNAP_GAP;
    }
    // Snap Right Edge
    else if (Math.abs(potentialRight - viewportWidth) < SNAP_THRESHOLD) {
        potentialLeft = viewportWidth - editorWidth - SNAP_GAP;
    }

    // Snap Top Edge
    if (Math.abs(potentialTop) < SNAP_THRESHOLD) {
        potentialTop = SNAP_GAP;
    }
    // Snap Bottom Edge
    else if (Math.abs(potentialBottom - viewportHeight) < SNAP_THRESHOLD) {
        potentialTop = viewportHeight - editorHeight - SNAP_GAP;
    }
    // --- End Snapping --- 

    popoutEditor.style.left = `${potentialLeft}px`;
    popoutEditor.style.top = `${potentialTop}px`;

    // Necessary for touchmove to prevent scrolling
    if (event.type === 'touchmove') {
        event.preventDefault();
    }
}

function stopPopoutDrag() {
    if (isDraggingPopout) {
        isDraggingPopout = false;
        document.removeEventListener('mousemove', dragPopout);
        document.removeEventListener('mouseup', stopPopoutDrag);
        document.removeEventListener('touchmove', dragPopout);
        document.removeEventListener('touchend', stopPopoutDrag);
        popoutHeader.style.cursor = 'move';
        document.body.style.userSelect = ''; // Restore text selection
    }
}

// --- Popout Resize Functions (UPDATED for Touch & Snap) ---
function startPopoutResize(event) {
    // Prevent resize if dragging is active
    if (isDraggingPopout) return;

    isResizingPopout = true;
    const coords = getEventCoords(event);
    resizeStartX = coords.x;
    resizeStartY = coords.y;
    resizeInitialWidth = popoutEditor.offsetWidth;
    resizeInitialHeight = popoutEditor.offsetHeight;

    // Add listeners to the whole document
    document.addEventListener('mousemove', resizePopout);
    document.addEventListener('mouseup', stopPopoutResize);
    document.addEventListener('touchmove', resizePopout, { passive: false }); // Prevent scroll on touch move
    document.addEventListener('touchend', stopPopoutResize);

    document.body.style.cursor = 'nwse-resize'; // Apply resize cursor globally
    document.body.style.userSelect = 'none'; // Prevent text selection
    if (event.type === 'touchstart') {
        event.preventDefault(); // Prevent default touch actions
    }
}

function resizePopout(event) {
    if (!isResizingPopout) return;
    const coords = getEventCoords(event);
    const dx = coords.x - resizeStartX;
    const dy = coords.y - resizeStartY;

    // Get min dimensions from CSS and current position
    const minWidth = parseInt(getComputedStyle(popoutEditor).minWidth, 10) || 150;
    const minHeight = parseInt(getComputedStyle(popoutEditor).minHeight, 10) || 100;
    const currentLeft = popoutEditor.offsetLeft;
    const currentTop = popoutEditor.offsetTop;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;

    // Calculate potential new dimensions
    let newWidth = resizeInitialWidth + dx;
    let newHeight = resizeInitialHeight + dy;

    // Enforce minimum dimensions first
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);

    // Calculate potential edge positions based on resizing
    let potentialRight = currentLeft + newWidth;
    let potentialBottom = currentTop + newHeight;

    // --- Snapping Logic for Resize ---
    // Snap Right Edge
    if (Math.abs(potentialRight - viewportWidth) < SNAP_THRESHOLD) {
        newWidth = viewportWidth - currentLeft - SNAP_GAP;
        // Re-check min width after snapping
        newWidth = Math.max(minWidth, newWidth);
    }
    // Snap Bottom Edge
    if (Math.abs(potentialBottom - viewportHeight) < SNAP_THRESHOLD) {
        newHeight = viewportHeight - currentTop - SNAP_GAP;
        // Re-check min height after snapping
        newHeight = Math.max(minHeight, newHeight);
    }
    // --- End Snapping ---

    popoutEditor.style.width = `${newWidth}px`;
    popoutEditor.style.height = `${newHeight}px`;

    // Necessary for touchmove to prevent scrolling
    if (event.type === 'touchmove') {
        event.preventDefault();
    }
}

function stopPopoutResize() {
    if (isResizingPopout) {
        isResizingPopout = false;
        document.removeEventListener('mousemove', resizePopout);
        document.removeEventListener('mouseup', stopPopoutResize);
        document.removeEventListener('touchmove', resizePopout);
        document.removeEventListener('touchend', stopPopoutResize);
        document.body.style.cursor = ''; // Restore default cursor
        document.body.style.userSelect = ''; // Restore text selection
    }
}

// --- Popout Drag Listeners (UPDATED for Touch & Snap) ---
popoutHeader.addEventListener('mousedown', startPopoutDrag);
popoutHeader.addEventListener('touchstart', startPopoutDrag, { passive: false }); // Add touch listener

// --- Popout Resize Listener (UPDATED for Touch & Snap) ---
popoutResizeHandle.addEventListener('mousedown', startPopoutResize);
popoutResizeHandle.addEventListener('touchstart', startPopoutResize, { passive: false }); // Add touch listener

// --- NEW: Popout Update Button Listener (Uses Status Message) ---
popoutUpdateButton.addEventListener('click', () => {
    const textData = popoutPaletteInput.value;
    try {
        const newDataParsed = parseSimpleFormat(textData);
        if (!Array.isArray(newDataParsed) || newDataParsed.length === 0 || !Array.isArray(newDataParsed[0])) {
            throw new Error("Parsed data is not a valid grid.");
        }
        sourceGridData = newDataParsed;
        isInterpolationEnabled = false; // Reset interpolation
        interpolationToggle.checked = false;
        currentGridData = sourceGridData.map(row => [...row]);
        renderPalette(currentGridData); // Re-render main palette
        // popoutEditor.style.display = 'none'; // REMOVE: Don't hide popout on success
        showPopoutStatus('Palette updated.', false); // Use status message
    } catch (error) {
        console.error("Error parsing or processing text input:", error);
        showPopoutStatus(`Error: ${error.message}`, true); // Use status message
        // Don't hide popout on error
    }
});

// --- NEW: Popout Status Message Logic ---
let statusTimeout = null;

function showPopoutStatus(message, isError = false) {
    if (!popoutStatusMessage) return; // Element might not exist yet

    clearTimeout(statusTimeout);

    popoutStatusMessage.textContent = message;
    popoutStatusMessage.classList.remove('success', 'error', 'visible');

    // Need a tiny delay before adding class for transition to work if classes were just removed
    requestAnimationFrame(() => {
        popoutStatusMessage.classList.add(isError ? 'error' : 'success');
        popoutStatusMessage.classList.add('visible');

        // Set timeout to hide the message
        statusTimeout = setTimeout(() => {
            popoutStatusMessage.classList.remove('visible');
            // Optional: clear text after fade out
            // setTimeout(() => { popoutStatusMessage.textContent = ''; }, 300);
        }, 3000); // Display for 3 seconds
    });
}

// --- NEW: Palette Export Function ---
function exportPaletteData() {
    try {
        const paletteText = convertToSimpleFormat(sourceGridData);
        const blob = new Blob([paletteText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        downloadLink.download = `palette_${timestamp}.txt`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);

        console.log('Palette data exported.');
        alert('Palette exported as .txt file.');

    } catch (error) {
        console.error('Error exporting palette data:', error);
        alert('Failed to export palette data.');
    }
}

// --- Local Storage Functions ---

function saveStateToLocalStorage() {
    try {
        const stateToSave = {
            sourceGridData: sourceGridData,
            isInterpolationEnabled: isInterpolationEnabled,
            interpolationSteps: interpolationSteps,
            saturationOffset: saturationOffset,
            paletteZoom: scale,
            paletteOffsetX: paletteOffsetX,
            paletteOffsetY: paletteOffsetY,
            uiScalePercent: parseInt(uiScaleNumber.value, 10) || 100,
            popout: {
                left: popoutEditor.style.left || '',
                top: popoutEditor.style.top || '',
                width: popoutEditor.style.width || '',
                height: popoutEditor.style.height || '',
            }
        };
        localStorage.setItem(localStorageKey, JSON.stringify(stateToSave));
        console.log('Application state saved to local storage.');
        alert('Current state saved!');
    } catch (error) {
        console.error('Error saving state to local storage:', error);
        alert('Failed to save state. Local storage might be full or disabled.');
    }
}

function loadStateFromLocalStorage() {
    try {
        const savedStateJSON = localStorage.getItem(localStorageKey);
        if (!savedStateJSON) {
            console.log('No saved state found in local storage.');
            return;
        }
        const savedState = JSON.parse(savedStateJSON);
        console.log('Loading saved state:', savedState);

        if (Array.isArray(savedState.sourceGridData) && savedState.sourceGridData.length > 0 && Array.isArray(savedState.sourceGridData[0])) {
            sourceGridData = savedState.sourceGridData;
            currentGridData = sourceGridData.map(row => [...row]);
        } else {
            console.warn('Loaded sourceGridData is invalid, using default.');
        }
        isInterpolationEnabled = typeof savedState.isInterpolationEnabled === 'boolean' ? savedState.isInterpolationEnabled : false;
        interpolationSteps = typeof savedState.interpolationSteps === 'number' ? savedState.interpolationSteps : 1;
        saturationOffset = typeof savedState.saturationOffset === 'number' ? savedState.saturationOffset : 0;
        scale = typeof savedState.paletteZoom === 'number' ? Math.max(minScale, Math.min(maxScale, savedState.paletteZoom)) : 1;
        paletteOffsetX = typeof savedState.paletteOffsetX === 'number' ? savedState.paletteOffsetX : 50;
        paletteOffsetY = typeof savedState.paletteOffsetY === 'number' ? savedState.paletteOffsetY : 50;
        const uiScalePercent = typeof savedState.uiScalePercent === 'number' ? savedState.uiScalePercent : 100;
        applyUiScale(uiScalePercent);
        if (savedState.popout) {
            if (savedState.popout.left) popoutEditor.style.left = savedState.popout.left;
            if (savedState.popout.top) popoutEditor.style.top = savedState.popout.top;
            if (savedState.popout.width) popoutEditor.style.width = savedState.popout.width;
            if (savedState.popout.height) popoutEditor.style.height = savedState.popout.height;
        }
        interpolationToggle.checked = isInterpolationEnabled;
        stepsSlider.value = interpolationSteps;
        stepsNumber.value = interpolationSteps;
        saturationOffsetSlider.value = saturationOffset;
        saturationOffsetNumber.value = saturationOffset;
        zoomSlider.value = scale * 100;
        zoomNumber.value = scale * 100;
        console.log('Successfully loaded state from local storage.');
    } catch (error) {
        console.error('Error loading or parsing state from local storage:', error);
    }
}

// --- State Management Listeners ---
saveStateButton.addEventListener('click', saveStateToLocalStorage);
resetStateButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all saved settings and reload the page?')) {
        try {
            localStorage.removeItem(localStorageKey);
            console.log('Saved state removed from local storage.');
            alert('State reset. Reloading page...');
            location.reload();
        } catch (error) {
            console.error('Error removing state from local storage:', error);
            alert('Failed to reset state. Please clear local storage manually if needed.');
        }
    }
});

// --- NEW: Palette Export Listener ---
exportPaletteButton.addEventListener('click', exportPaletteData);

// --- Palette Import Logic --- (Implementation)
function handlePaletteImport(file) {
    if (!file || !file.type.match('text.*')) {
        console.warn('No text file selected or file type not supported.');
        alert('Please select a valid .txt file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
        const textData = event.target.result;
        try {
            const newDataParsed = parseSimpleFormat(textData);
            if (!Array.isArray(newDataParsed) || newDataParsed.length === 0 || !Array.isArray(newDataParsed[0])) {
                throw new Error("Imported data is not a valid grid. Check format.");
            }
            // Basic validation: check if first/last cell of first row looks like a label (e.g., ends with 'x')
            // This is a heuristic and might need refinement
            if (newDataParsed.length > 0 && newDataParsed[0].length > 0) {
                const firstCell = newDataParsed[0][0];
                const lastCell = newDataParsed[0][newDataParsed[0].length - 1];
                if (typeof firstCell !== 'string' || typeof lastCell !== 'string') { // || !firstCell.endsWith('x') || !lastCell.endsWith('x') -> Removed endsWith check for more flexibility
                    console.warn('Imported data format warning: First/last cells of first row may not be labels.');
                    // Optionally, you could alert the user here, but let's allow import for now.
                }
            }

            sourceGridData = newDataParsed;
            isInterpolationEnabled = false; // Reset interpolation
            interpolationToggle.checked = false;
            currentGridData = sourceGridData.map(row => [...row]);
            renderPalette(currentGridData); // Re-render main palette

            alert('Palette imported successfully!');
            console.log('Palette data imported from file:', file.name);

            // If popout is open, update its content too
            if (popoutEditor.style.display === 'flex') {
                popoutPaletteInput.value = convertToSimpleFormat(sourceGridData);
                showPopoutStatus('Palette imported.', false); // Show status in popout
            }

        } catch (error) {
            console.error("Error parsing or processing imported file:", error);
            alert(`Error importing palette: ${error.message}`);
        }
    };

    reader.onerror = (event) => {
        console.error("File reading error:", event.target.error);
        alert('Error reading the selected file.');
    };

    reader.readAsText(file); // Read the file as text
}

importPaletteButton.addEventListener('click', () => {
    importPaletteFileInput.click(); // Trigger the hidden file input
});

importPaletteFileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handlePaletteImport(file);
    }
    // Reset the input value so the change event fires even if the same file is selected again
    event.target.value = null;
});

// --- NEW: Color Picker Functions ---
function updatePickerPreview(hex) {
    colorPickerPreview.style.backgroundColor = hex;
    // Optional: Update hue slider background dynamically
    // pickerHueSlider.style.background = \`linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))\`;
}

function updatePickerFromHsl() {
    if (isPickerUpdating) return;
    isPickerUpdating = true;

    const h = parseInt(pickerHueNumber.value, 10);
    const s = parseInt(pickerSatNumber.value, 10);
    const l = parseInt(pickerLumNumber.value, 10);

    if (isNaN(h) || isNaN(s) || isNaN(l)) {
        isPickerUpdating = false;
        return; // Avoid errors if inputs are temporarily invalid
    }

    const newHex = hslToHex(h, s, l);
    pickerHexInput.value = newHex.toUpperCase();
    updatePickerPreview(newHex);

    isPickerUpdating = false;
}

function updatePickerFromHex() {
    if (isPickerUpdating) return;
    isPickerUpdating = true;

    let hex = pickerHexInput.value;
    if (!hex.startsWith('#')) {
        hex = '#' + hex;
    }

    if (isValidHex(hex)) {
        const hsl = hexToHsl(hex);
        if (hsl) {
            pickerHueSlider.value = hsl.h;
            pickerHueNumber.value = hsl.h;
            pickerSatSlider.value = hsl.s;
            pickerSatNumber.value = hsl.s;
            pickerLumSlider.value = hsl.l;
            pickerLumNumber.value = hsl.l;
            updatePickerPreview(hex);
            pickerHexInput.value = hex.toUpperCase(); // Ensure # and uppercase
        } else {
            console.warn("Could not convert valid HEX to HSL:", hex);
        }
    } else {
        // Maybe add visual feedback for invalid hex
        console.log("Invalid HEX input:", hex);
    }

    isPickerUpdating = false;
}

function openColorPicker(rowIndex, cellIndex, event = null) { // Add event parameter with default null
    const originalHex = sourceGridData[rowIndex][cellIndex];

    if (!isValidHex(originalHex)) {
        console.error(`Cannot open picker: Cell at source[${rowIndex}][${cellIndex}] is not a valid HEX color.`, originalHex);
        return;
    }

    pickerTargetRow = rowIndex;
    pickerTargetCol = cellIndex;

    const hsl = hexToHsl(originalHex);
    if (!hsl) {
        console.error("Error converting initial HEX to HSL:", originalHex);
        return;
    }

    isPickerUpdating = true;

    // Set initial values for controls
    pickerHueSlider.value = hsl.h;
    pickerHueNumber.value = hsl.h;
    pickerSatSlider.value = hsl.s;
    pickerSatNumber.value = hsl.s;
    pickerLumSlider.value = hsl.l;
    pickerLumNumber.value = hsl.l;
    pickerHexInput.value = originalHex.toUpperCase();
    updatePickerPreview(originalHex);

    isPickerUpdating = false;

    // --- NEW: Position modal near cursor if event is provided ---
    if (event) {
        const modalWidth = colorPickerModal.offsetWidth;
        const modalHeight = colorPickerModal.offsetHeight;
        const viewportWidth = window.innerWidth; // Use window for full viewport width
        const viewportHeight = window.innerHeight; // Use window for full viewport height
        const padding = 10; // Minimum distance from viewport edge

        let left = event.clientX + 15; // Position slightly offset from cursor
        let top = event.clientY + 15;

        // Adjust if position is too far right
        if (left + modalWidth + padding > viewportWidth) {
            left = event.clientX - modalWidth - 15; // Position to the left of cursor
        }
        // Adjust if position is too far left (in case left positioning pushes it < 0)
        if (left < padding) {
            left = padding;
        }

        // Adjust if position is too low
        if (top + modalHeight + padding > viewportHeight) {
            top = event.clientY - modalHeight - 15; // Position above cursor
        }
        // Adjust if position is too high (in case top positioning pushes it < 0)
        if (top < padding) {
            top = padding;
        }

        colorPickerModal.style.left = `${left}px`;
        colorPickerModal.style.top = `${top}px`;
    } else {
        // Optional: Add fallback positioning if event is not available
        // e.g., center it or use last known position
        // If left/top are not set, it will use the CSS default (150px/150px)
        // or the last dragged position if the user moved it.
    }
    // --- END NEW ---


    // Show the modal
    colorPickerModal.classList.add('visible');

    // --- Deactivate picker mode ---
    // ... existing code ...

    // Optionally focus the first element
    // ... existing code ...
}

function closeColorPicker() {
    colorPickerModal.classList.remove('visible');
    pickerTargetRow = -1; // Reset target indices
    pickerTargetCol = -1;
}

// --- NEW: Color Picker Event Listeners ---

// HSL Sliders
pickerHueSlider.addEventListener('input', () => { pickerHueNumber.value = pickerHueSlider.value; updatePickerFromHsl(); });
pickerSatSlider.addEventListener('input', () => { pickerSatNumber.value = pickerSatSlider.value; updatePickerFromHsl(); });
pickerLumSlider.addEventListener('input', () => { pickerLumNumber.value = pickerLumSlider.value; updatePickerFromHsl(); });

// HSL Number Inputs (using 'change' for final value after potential manual entry/spinners)
pickerHueNumber.addEventListener('change', () => {
    let val = parseInt(pickerHueNumber.value, 10);
    val = isNaN(val) ? 0 : Math.max(0, Math.min(360, val)); // Clamp 0-360
    pickerHueNumber.value = val; // Update input visually
    pickerHueSlider.value = val;
    updatePickerFromHsl();
});
pickerSatNumber.addEventListener('change', () => {
    let val = parseInt(pickerSatNumber.value, 10);
    val = isNaN(val) ? 50 : Math.max(0, Math.min(100, val)); // Clamp 0-100
    pickerSatNumber.value = val;
    pickerSatSlider.value = val;
    updatePickerFromHsl();
});
pickerLumNumber.addEventListener('change', () => {
    let val = parseInt(pickerLumNumber.value, 10);
    val = isNaN(val) ? 50 : Math.max(0, Math.min(100, val)); // Clamp 0-100
    pickerLumNumber.value = val;
    pickerLumSlider.value = val;
    updatePickerFromHsl();
});

// HEX Input (using 'change' to validate when user finishes editing)
pickerHexInput.addEventListener('change', () => {
    updatePickerFromHex();
});
// Optional: Live update from HEX input (can be laggy/janky)
// pickerHexInput.addEventListener('input', () => { updatePickerFromHex(); });

// Buttons
pickerApplyButton.addEventListener('click', () => {
    const finalHex = pickerHexInput.value;
    if (isValidHex(finalHex) && pickerTargetRow !== -1 && pickerTargetCol !== -1) {
        sourceGridData[pickerTargetRow][pickerTargetCol] = finalHex; // Update source data directly
        updatePaletteView(); // Re-render the main grid (will use source data as interpolation is off)
        closeColorPicker();
    } else {
        alert("Invalid HEX code. Cannot apply.");
        console.error("Apply failed: Invalid HEX or target indices missing.", finalHex, pickerTargetRow, pickerTargetCol);
    }
});

colorPickerCloseButton.addEventListener('click', closeColorPicker);

pickerCopyHexButton.addEventListener('click', () => {
    copyToClipboard(pickerHexInput.value, pickerCopyHexButton); // Use copy button for feedback
});

// Add Esc key listener for color picker modal
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && colorPickerModal.classList.contains('visible')) {
        closeColorPicker();
    }
});

// --- NEW: Color Pick Toggle Button Listener ---
colorPickToggleButton.addEventListener('click', () => {
    isColorPickingMode = !isColorPickingMode;
    colorPickToggleButton.classList.toggle('active', isColorPickingMode);
    document.body.classList.toggle('color-picking-active', isColorPickingMode);
    console.log("Color Picking Mode:", isColorPickingMode ? "ON" : "OFF");

    // Optional: Close color picker if it's open when mode is turned off
    if (!isColorPickingMode && colorPickerModal.classList.contains('visible')) {
        closeColorPicker();
    }
});

// --- NEW: Color Picker Drag Functions ---
function startColorPickerDrag(event) {
    if (isResizingColorPicker) return; // Don't drag if resizing

    isDraggingColorPicker = true;
    pickerInitialX = colorPickerModal.offsetLeft;
    pickerInitialY = colorPickerModal.offsetTop;
    const coords = getEventCoords(event);
    pickerStartX = coords.x;
    pickerStartY = coords.y;

    document.addEventListener('mousemove', dragColorPicker);
    document.addEventListener('mouseup', stopColorPickerDrag);
    document.addEventListener('touchmove', dragColorPicker, { passive: false });
    document.addEventListener('touchend', stopColorPickerDrag);

    colorPickerHeader.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
}

function dragColorPicker(event) {
    if (!isDraggingColorPicker) return;
    const coords = getEventCoords(event);
    const dx = coords.x - pickerStartX;
    const dy = coords.y - pickerStartY;

    let newLeft = pickerInitialX + dx;
    let newTop = pickerInitialY + dy;

    // Basic boundary checks (optional, could add snapping later)
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;
    const modalWidth = colorPickerModal.offsetWidth;
    const modalHeight = colorPickerModal.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, viewportWidth - modalWidth));
    newTop = Math.max(0, Math.min(newTop, viewportHeight - modalHeight));

    colorPickerModal.style.left = `${newLeft}px`;
    colorPickerModal.style.top = `${newTop}px`;

    if (event.type === 'touchmove') {
        event.preventDefault();
    }
}

function stopColorPickerDrag() {
    if (isDraggingColorPicker) {
        isDraggingColorPicker = false;
        document.removeEventListener('mousemove', dragColorPicker);
        document.removeEventListener('mouseup', stopColorPickerDrag);
        document.removeEventListener('touchmove', dragColorPicker);
        document.removeEventListener('touchend', stopColorPickerDrag);
        colorPickerHeader.style.cursor = 'move';
        document.body.style.userSelect = '';
    }
}

// --- NEW: Color Picker Resize Functions ---
function startColorPickerResize(event) {
    if (isDraggingColorPicker) return; // Don't resize if dragging

    isResizingColorPicker = true;
    const coords = getEventCoords(event);
    cpResizeStartX = coords.x;
    cpResizeStartY = coords.y;
    cpResizeInitialWidth = colorPickerModal.offsetWidth;
    cpResizeInitialHeight = colorPickerModal.offsetHeight;

    document.addEventListener('mousemove', resizeColorPicker);
    document.addEventListener('mouseup', stopColorPickerResize);
    document.addEventListener('touchmove', resizeColorPicker, { passive: false });
    document.addEventListener('touchend', stopColorPickerResize);

    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
}

function resizeColorPicker(event) {
    if (!isResizingColorPicker) return;
    const coords = getEventCoords(event);
    const dx = coords.x - cpResizeStartX;
    const dy = coords.y - cpResizeStartY;

    const minWidth = parseInt(getComputedStyle(colorPickerModal).minWidth, 10) || 250;
    const minHeight = parseInt(getComputedStyle(colorPickerModal).minHeight, 10) || 300;
    const currentLeft = colorPickerModal.offsetLeft;
    const currentTop = colorPickerModal.offsetTop;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;

    let newWidth = cpResizeInitialWidth + dx;
    let newHeight = cpResizeInitialHeight + dy;

    // Enforce minimum dimensions
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);

    // Enforce maximum dimensions (prevent resizing beyond viewport edges)
    newWidth = Math.min(newWidth, viewportWidth - currentLeft);
    newHeight = Math.min(newHeight, viewportHeight - currentTop);

    colorPickerModal.style.width = `${newWidth}px`;
    colorPickerModal.style.height = `${newHeight}px`;

    if (event.type === 'touchmove') {
        event.preventDefault();
    }
}

function stopColorPickerResize() {
    if (isResizingColorPicker) {
        isResizingColorPicker = false;
        document.removeEventListener('mousemove', resizeColorPicker);
        document.removeEventListener('mouseup', stopColorPickerResize);
        document.removeEventListener('touchmove', resizeColorPicker);
        document.removeEventListener('touchend', stopColorPickerResize);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }
}

// --- NEW: Add Color Picker Drag/Resize Listeners ---
colorPickerHeader.addEventListener('mousedown', startColorPickerDrag);
colorPickerHeader.addEventListener('touchstart', startColorPickerDrag, { passive: false });
colorPickerResizeHandle.addEventListener('mousedown', startColorPickerResize);
colorPickerResizeHandle.addEventListener('touchstart', startColorPickerResize, { passive: false });

// --- NEW: Color Pick Toggle Button Listener ---
// ... existing listener ...

// --- Initial Load --- (Restoring definition)
function initializeApp() {
    // Set initial default values FIRST
    isInterpolationEnabled = false;
    interpolationSteps = 1;
    saturationOffset = 0;
    scale = 1;
    paletteOffsetX = 50;
    paletteOffsetY = 50;

    // Attempt to load saved state (will override defaults if successful)
    loadStateFromLocalStorage();

    // Now update UI elements based on the final state (either default or loaded)
    stepsSlider.value = interpolationSteps;
    stepsNumber.value = interpolationSteps;
    saturationOffsetSlider.value = saturationOffset;
    saturationOffsetNumber.value = saturationOffset;
    zoomSlider.value = scale * 100;
    zoomNumber.value = scale * 100;
    uiScaleNumber.value = parseInt(document.documentElement.style.fontSize || '10', 10) / 10 * 100 || 100; // Read current UI scale or default
    interpolationToggle.checked = isInterpolationEnabled; // Set toggle AFTER loading state

    // Set initial palette position and scale (using final state)
    updateTransform();

    // Set initial UI scale (if not loaded, apply default - loadState handles this now)
    if (!document.documentElement.style.fontSize) {
        applyUiScale(100);
    }

    // Render the initial palette (using final state)
    updatePaletteView(); // Use updatePaletteView to handle potential initial interpolation

    // Ensure initial state of picker mode button and body class is correct
    isColorPickingMode = false; // Explicitly start with picker mode off
    colorPickToggleButton.classList.remove('active');
    document.body.classList.remove('color-picking-active');

    updatePaletteView();
}

initializeApp(); // Run initial setup 