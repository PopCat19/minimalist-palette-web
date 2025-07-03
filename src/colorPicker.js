// Color Picker Module
// Handles the color picker modal functionality for editing palette colors

import { isValidHex, hexToHsl, hslToHex, hexToRgb } from './colorUtils.js';
import { getEventCoords, copyToClipboard } from './domUtils.js';
import {
    sourceGridData,
    currentGridData,
    selectedCells,
    pickerTargetRow,
    pickerTargetCol,
    isPickerUpdating,
    setPickerTargetRow,
    setPickerTargetCol,
    setIsPickerUpdating,
    clearSelection
} from './state.js';
import { renderPalette } from './rendering.js';

// DOM Elements
let colorPickerModal;
let colorPickerCloseButton;
let colorPickerPreview;
let pickerHueSlider;
let pickerHueNumber;
let pickerSatSlider;
let pickerSatNumber;
let pickerLumSlider;
let pickerLumNumber;
let pickerHexInput;
let pickerCopyHexButton;
let pickerCancelButton;
let pickerApplyButton;
let colorPickerHeader;
let colorPickerResizeHandle;

// Drag/Resize State
let isDraggingColorPicker = false;
let pickerStartX, pickerStartY, pickerInitialX, pickerInitialY;
let isResizingColorPicker = false;
let cpResizeStartX, cpResizeStartY, cpResizeInitialWidth, cpResizeInitialHeight;

// Constants
const multiSelectTolerance = 2;
const multiSelectHueTolerance = 2;

// Initialize color picker
export function initColorPicker() {
    // Get DOM elements
    colorPickerModal = document.getElementById('color-picker-modal');
    colorPickerCloseButton = document.getElementById('color-picker-close-button');
    colorPickerPreview = document.getElementById('color-picker-preview');
    pickerHueSlider = document.getElementById('picker-hue-slider');
    pickerHueNumber = document.getElementById('picker-hue-number');
    pickerSatSlider = document.getElementById('picker-sat-slider');
    pickerSatNumber = document.getElementById('picker-sat-number');
    pickerLumSlider = document.getElementById('picker-lum-slider');
    pickerLumNumber = document.getElementById('picker-lum-number');
    pickerHexInput = document.getElementById('picker-hex-input');
    pickerCopyHexButton = document.getElementById('picker-copy-hex-button');
    pickerCancelButton = document.getElementById('picker-cancel-button');
    pickerApplyButton = document.getElementById('picker-apply-button');
    colorPickerHeader = colorPickerModal?.querySelector('.color-picker-header');
    colorPickerResizeHandle = document.getElementById('color-picker-resize-handle');

    if (!colorPickerModal) return;

    // Setup event listeners
    setupColorPickerEventListeners();
}

// Setup all color picker event listeners
function setupColorPickerEventListeners() {
    // Close button
    if (colorPickerCloseButton) {
        colorPickerCloseButton.addEventListener('click', closeColorPicker);
    }

    // Cancel button
    if (pickerCancelButton) {
        pickerCancelButton.addEventListener('click', closeColorPicker);
    }

    // Apply button
    if (pickerApplyButton) {
        pickerApplyButton.addEventListener('click', applyColorChanges);
    }

    // Copy hex button
    if (pickerCopyHexButton) {
        pickerCopyHexButton.addEventListener('click', () => {
            const hexValue = pickerHexInput.value;
            copyToClipboard(hexValue).then(() => {
                const originalText = pickerCopyHexButton.textContent;
                pickerCopyHexButton.textContent = 'Copied!';
                setTimeout(() => {
                    pickerCopyHexButton.textContent = originalText;
                }, 1500);
            });
        });
    }

    // HSL sliders
    if (pickerHueSlider && pickerHueNumber) {
        pickerHueSlider.addEventListener('input', (e) => {
            pickerHueNumber.value = e.target.value;
            updatePickerFromHsl();
        });
        pickerHueNumber.addEventListener('input', (e) => {
            pickerHueSlider.value = e.target.value;
            updatePickerFromHsl();
        });
    }

    if (pickerSatSlider && pickerSatNumber) {
        pickerSatSlider.addEventListener('input', (e) => {
            pickerSatNumber.value = e.target.value;
            updatePickerFromHsl();
        });
        pickerSatNumber.addEventListener('input', (e) => {
            pickerSatSlider.value = e.target.value;
            updatePickerFromHsl();
        });
    }

    if (pickerLumSlider && pickerLumNumber) {
        pickerLumSlider.addEventListener('input', (e) => {
            pickerLumNumber.value = e.target.value;
            updatePickerFromHsl();
        });
        pickerLumNumber.addEventListener('input', (e) => {
            pickerLumSlider.value = e.target.value;
            updatePickerFromHsl();
        });
    }

    // Hex input
    if (pickerHexInput) {
        pickerHexInput.addEventListener('input', updatePickerFromHex);
    }

    // Drag functionality
    if (colorPickerHeader) {
        colorPickerHeader.addEventListener('mousedown', startColorPickerDrag);
        colorPickerHeader.addEventListener('touchstart', startColorPickerDrag, { passive: false });
    }

    // Resize functionality
    if (colorPickerResizeHandle) {
        colorPickerResizeHandle.addEventListener('mousedown', startColorPickerResize);
        colorPickerResizeHandle.addEventListener('touchstart', startColorPickerResize, { passive: false });
    }
}

// Open color picker
export function openColorPicker(rowIndex, cellIndex, event = null) {
    // Check if source data exists for the coordinates
    if (rowIndex >= sourceGridData.length || cellIndex >= sourceGridData[rowIndex].length) {
        console.error(`Invalid coordinates for sourceGridData: [${rowIndex}][${cellIndex}]`);
        clearSelection();
        return;
    }

    setPickerTargetRow(rowIndex);
    setPickerTargetCol(cellIndex);

    const sourceHex = sourceGridData[rowIndex][cellIndex];
    if (!isValidHex(sourceHex)) {
        console.error(`Invalid hex color at sourceGridData[${rowIndex}][${cellIndex}]: ${sourceHex}`);
        clearSelection();
        return;
    }

    // Initialize picker with color
    const hsl = hexToHsl(sourceHex);
    if (!hsl) {
        console.error(`Failed to convert hex to HSL: ${sourceHex}`);
        clearSelection();
        return;
    }

    setIsPickerUpdating(true);
    pickerHueSlider.value = hsl.h;
    pickerHueNumber.value = hsl.h;
    pickerSatSlider.value = hsl.s;
    pickerSatNumber.value = hsl.s;
    pickerLumSlider.value = hsl.l;
    pickerLumNumber.value = hsl.l;
    pickerHexInput.value = sourceHex.toUpperCase();
    updatePickerPreview(sourceHex);
    setIsPickerUpdating(false);

    // Handle multi-selection
    const isMultiSelect = selectedCells.length > 1;
    const isSimilarSelection = checkSimilarSelection();

    // Configure picker based on selection type
    if (isMultiSelect) {
        if (isSimilarSelection) {
            // Allow only hue editing
            pickerSatSlider.disabled = true;
            pickerSatNumber.disabled = true;
            pickerLumSlider.disabled = true;
            pickerLumNumber.disabled = true;
            pickerHexInput.disabled = true;
        } else {
            // No constraints for dissimilar selection
            pickerSatSlider.disabled = false;
            pickerSatNumber.disabled = false;
            pickerLumSlider.disabled = false;
            pickerLumNumber.disabled = false;
            pickerHexInput.disabled = false;
        }
    } else {
        // Single selection - enable all controls
        pickerHueSlider.disabled = false;
        pickerHueNumber.disabled = false;
        pickerSatSlider.disabled = false;
        pickerSatNumber.disabled = false;
        pickerLumSlider.disabled = false;
        pickerLumNumber.disabled = false;
        pickerHexInput.disabled = false;
    }

    // Position and show modal
    positionColorPicker(event);
    colorPickerModal.classList.add('visible');
}

// Close color picker
export function closeColorPicker() {
    if (colorPickerModal) {
        colorPickerModal.classList.remove('visible');
        clearSelection();

        // Re-enable all controls for next time
        pickerHueSlider.disabled = false;
        pickerHueNumber.disabled = false;
        pickerSatSlider.disabled = false;
        pickerSatNumber.disabled = false;
        pickerLumSlider.disabled = false;
        pickerLumNumber.disabled = false;
        pickerHexInput.disabled = false;
    }
}

// Update picker preview
function updatePickerPreview(hex) {
    if (colorPickerPreview) {
        colorPickerPreview.style.backgroundColor = hex;
    }
}

// Update picker from HSL values
function updatePickerFromHsl() {
    if (isPickerUpdating) return;
    setIsPickerUpdating(true);

    const h = parseInt(pickerHueNumber.value, 10);
    const s = parseInt(pickerSatNumber.value, 10);
    const l = parseInt(pickerLumNumber.value, 10);

    if (isNaN(h) || isNaN(s) || isNaN(l)) {
        setIsPickerUpdating(false);
        return;
    }

    const newHex = hslToHex(h, s, l);
    pickerHexInput.value = newHex.toUpperCase();
    updatePickerPreview(newHex);

    setIsPickerUpdating(false);
}

// Update picker from hex value
function updatePickerFromHex() {
    if (isPickerUpdating) return;
    setIsPickerUpdating(true);

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
            pickerHexInput.value = hex.toUpperCase();
        }
    }

    setIsPickerUpdating(false);
}

// Apply color changes
function applyColorChanges() {
    const newHex = pickerHexInput.value;
    if (!isValidHex(newHex)) {
        console.error('Invalid hex color:', newHex);
        return;
    }

    if (selectedCells.length > 1) {
        // Multi-selection update
        applyMultiSelectChanges();
    } else if (pickerTargetRow >= 0 && pickerTargetCol >= 0) {
        // Single cell update
        sourceGridData[pickerTargetRow][pickerTargetCol] = newHex.toUpperCase();
    }

    renderPalette(currentGridData);
    closeColorPicker();
}

// Apply changes for multi-selection
function applyMultiSelectChanges() {
    const isSimilarSelection = checkSimilarSelection();
    const newHue = parseInt(pickerHueNumber.value, 10);
    const newSat = parseInt(pickerSatNumber.value, 10);
    const newLum = parseInt(pickerLumNumber.value, 10);
    const newHex = pickerHexInput.value;

    selectedCells.forEach(([row, col]) => {
        const currentHex = sourceGridData[row][col];
        if (!isValidHex(currentHex)) return;

        if (isSimilarSelection) {
            // Only update hue, preserve S and L
            const currentHsl = hexToHsl(currentHex);
            if (currentHsl) {
                const updatedHex = hslToHex(newHue, currentHsl.s, currentHsl.l);
                sourceGridData[row][col] = updatedHex.toUpperCase();
            }
        } else {
            // Update all cells to the same color
            sourceGridData[row][col] = newHex.toUpperCase();
        }
    });
}

// Check if selection is similar (for hue-only editing)
function checkSimilarSelection() {
    if (selectedCells.length <= 1) return false;

    const firstHex = sourceGridData[selectedCells[0][0]][selectedCells[0][1]];
    if (!isValidHex(firstHex)) return false;

    const firstHsl = hexToHsl(firstHex);
    if (!firstHsl) return false;

    return selectedCells.every(([row, col]) => {
        const hex = sourceGridData[row][col];
        if (!isValidHex(hex)) return false;

        const hsl = hexToHsl(hex);
        if (!hsl) return false;

        const hueDiff = Math.abs(hsl.h - firstHsl.h);
        const hueDiffWrapped = Math.min(hueDiff, 360 - hueDiff);

        return Math.abs(hsl.s - firstHsl.s) <= multiSelectTolerance &&
               Math.abs(hsl.l - firstHsl.l) <= multiSelectTolerance &&
               hueDiffWrapped <= multiSelectHueTolerance;
    });
}

// Position color picker modal
function positionColorPicker(event) {
    if (!colorPickerModal || !event) return;

    const canvasViewport = document.getElementById('canvas-viewport');
    const viewportRect = canvasViewport.getBoundingClientRect();

    let left = event.clientX - viewportRect.left + 20;
    let top = event.clientY - viewportRect.top + 20;

    // Ensure picker stays within viewport
    const pickerWidth = colorPickerModal.offsetWidth || 300;
    const pickerHeight = colorPickerModal.offsetHeight || 400;

    if (left + pickerWidth > viewportRect.width) {
        left = viewportRect.width - pickerWidth - 10;
    }
    if (top + pickerHeight > viewportRect.height) {
        top = viewportRect.height - pickerHeight - 10;
    }

    left = Math.max(10, left);
    top = Math.max(10, top);

    colorPickerModal.style.left = `${left}px`;
    colorPickerModal.style.top = `${top}px`;
}

// Drag functionality
function startColorPickerDrag(event) {
    if (event.target.closest('button')) return;
    if (isResizingColorPicker) return;

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

    const canvasViewport = document.getElementById('canvas-viewport');
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;

    let newLeft = pickerInitialX + dx;
    let newTop = pickerInitialY + dy;

    // Constrain to viewport
    newLeft = Math.max(0, Math.min(newLeft, viewportWidth - colorPickerModal.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, viewportHeight - colorPickerModal.offsetHeight));

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

// Resize functionality
function startColorPickerResize(event) {
    if (event.target !== colorPickerResizeHandle) return;
    if (isDraggingColorPicker) return;

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

    const canvasViewport = document.getElementById('canvas-viewport');
    const minWidth = 250;
    const minHeight = 300;
    const currentLeft = colorPickerModal.offsetLeft;
    const currentTop = colorPickerModal.offsetTop;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;

    let newWidth = cpResizeInitialWidth + dx;
    let newHeight = cpResizeInitialHeight + dy;

    // Apply constraints
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);

    // Prevent resizing beyond viewport
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

// Get color picker state for saving
export function getColorPickerState() {
    if (!colorPickerModal) return null;

    return {
        left: colorPickerModal.style.left || '',
        top: colorPickerModal.style.top || '',
        width: colorPickerModal.style.width || '',
        height: colorPickerModal.style.height || ''
    };
}

// Restore color picker state
export function restoreColorPickerState(state) {
    if (!colorPickerModal || !state) return;

    if (state.left) colorPickerModal.style.left = state.left;
    if (state.top) colorPickerModal.style.top = state.top;
    if (state.width) colorPickerModal.style.width = state.width;
    if (state.height) colorPickerModal.style.height = state.height;
}

// Check if dragging/resizing is active
export function isColorPickerDragging() {
    return isDraggingColorPicker;
}

export function isColorPickerResizing() {
    return isResizingColorPicker;
}
