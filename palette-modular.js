// --- Minimalist Palette Application ---
// Main application file that coordinates all modules

import { getDefaultPaletteCopy } from './src/default-palette.js';
import {
    sourceGridData,
    currentGridData,
    isInterpolationEnabled,
    interpolationSteps,
    saturationOffset,
    scale,
    paletteOffsetX,
    paletteOffsetY,
    isColorPickingMode,
    selectedCells,
    selectionAnchor,
    setSourceGridData,
    setCurrentGridData,
    setInterpolationEnabled,
    setInterpolationSteps,
    setSaturationOffset,
    setScale,
    setPaletteOffset,
    setColorPickingMode,
    clearSelection,
    setShiftHeld,
    setStateLoadedSuccessfully
} from './src/state.js';
import { CONSTANTS } from './src/config.js';
import {
    isValidHex,
    hexToRgb,
    rgbToHex,
    hexToHsl,
    hslToHex,
    interpolateHexColor,
    adjustSaturation,
    parseSimpleFormat,
    convertToSimpleFormat,
    getTextColor
} from './src/colorUtils.js';
import {
    getDOMElements,
    getEventCoords,
    applyUiScale,
    copyToClipboard,
    showCopiedFeedback
} from './src/domUtils.js';
import {
    renderPalette,
    updatePaletteView,
    generateInterpolatedPalette
} from './src/rendering.js';
import {
    updateAndShowPaletteTooltip,
    hidePaletteTooltip,
    handleTooltipCopy,
    setupTooltipEventListeners,
    handleTooltipHotkeysCopy
} from './src/tooltips.js';
import {
    initColorPicker,
    openColorPicker,
    closeColorPicker,
    getColorPickerState,
    restoreColorPickerState
} from './src/colorPicker.js';
import {
    initPopoutEditor,
    openPopoutEditor,
    closePopoutEditor,
    getPopoutState,
    restorePopoutState,
    showPopoutStatus
} from './src/popoutEditor.js';
import {
    initImportExport,
    exportPaletteData,
    handlePaletteImport,
    exportPNG
} from './src/importExport.js';
import { CanvasInteractionManager } from './src/canvasManager.js';

// DOM Elements
let elements = {};
let canvasManager = null;

// Local Storage Key
const localStorageKey = CONSTANTS.LOCAL_STORAGE_KEY;

// Initialize Application
function initializeApp() {
    console.log('Initializing Minimalist Palette Application...');

    // Get DOM elements
    elements = getDOMElements();

    if (!elements.canvasViewport || !elements.paletteContainer || !elements.paletteGrid) {
        console.error('Required DOM elements not found. Cannot initialize app.');
        return;
    }

    // Initialize canvas manager
    canvasManager = new CanvasInteractionManager(
        elements.canvasViewport,
        elements.paletteContainer
    );

    // Initialize modules
    initColorPicker();
    initPopoutEditor();
    initImportExport();
    setupTooltipEventListeners();

    // Load saved state
    loadState();

    // Setup event listeners
    setupEventListeners();

    // Initial render
    updatePaletteView();

    // Apply UI scale
    const uiScaleNumber = document.getElementById('ui-scale-number');
    const uiScale = parseInt(uiScaleNumber?.value || '100', 10);
    applyUiScale(uiScale);

    console.log('Application initialized successfully.');
}

// Setup Event Listeners
function setupEventListeners() {
    // Config modal
    setupConfigModalListeners();

    // Control listeners
    setupControlListeners();

    // Palette editor
    setupPaletteEditorListeners();

    // State management
    setupStateManagementListeners();

    // Keyboard listeners
    setupKeyboardListeners();

    // Canvas listeners
    canvasManager?.init();
}

// Config Modal Listeners
function setupConfigModalListeners() {
    const configToggleButton = document.getElementById('config-toggle-button');
    const configModal = document.getElementById('config-modal');
    const closeModalButton = configModal?.querySelector('.modal-close-button');

    configToggleButton?.addEventListener('click', openConfigModal);
    closeModalButton?.addEventListener('click', closeConfigModal);

    // Close modal on outside click
    configModal?.addEventListener('click', (e) => {
        if (e.target === configModal) {
            closeConfigModal();
        }
    });
}

// Control Listeners
function setupControlListeners() {
    // Interpolation toggle
    const interpolationToggle = document.getElementById('interpolation-toggle');
    interpolationToggle?.addEventListener('change', (e) => {
        setInterpolationEnabled(e.target.checked);
        updatePaletteView();
    });

    // Interpolation steps
    const stepsSlider = document.getElementById('interpolation-steps-slider');
    const stepsNumber = document.getElementById('interpolation-steps-number');

    stepsSlider?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (stepsNumber) stepsNumber.value = value;
        setInterpolationSteps(value);
        if (isInterpolationEnabled) {
            updatePaletteView();
        }
    });

    stepsNumber?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1 && value <= 10) {
            if (stepsSlider) stepsSlider.value = value;
            setInterpolationSteps(value);
            if (isInterpolationEnabled) {
                updatePaletteView();
            }
        }
    });

    // Saturation offset
    const saturationSlider = document.getElementById('saturation-offset-slider');
    const saturationNumber = document.getElementById('saturation-offset-number');

    saturationSlider?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (saturationNumber) saturationNumber.value = value;
        setSaturationOffset(value);
        updatePaletteView();
    });

    saturationNumber?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= -100 && value <= 100) {
            if (saturationSlider) saturationSlider.value = value;
            setSaturationOffset(value);
            updatePaletteView();
        }
    });

    // Zoom controls
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomNumber = document.getElementById('zoom-number');

    zoomSlider?.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (zoomNumber) zoomNumber.value = value.toFixed(1);
        canvasManager?.setZoomLevel(value);
    });

    zoomNumber?.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= CONSTANTS.MIN_SCALE && value <= CONSTANTS.MAX_SCALE) {
            if (zoomSlider) zoomSlider.value = value;
            canvasManager?.setZoomLevel(value);
        }
    });

    // UI Scale
    const uiScaleNumber = document.getElementById('ui-scale-number');
    uiScaleNumber?.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 50 && value <= 200) {
            applyUiScale(value);
        }
    });

    // Color picking mode toggle
    const colorPickToggle = document.getElementById('color-pick-toggle-button');
    colorPickToggle?.addEventListener('click', () => {
        const newMode = !isColorPickingMode;
        setColorPickingMode(newMode);
        colorPickToggle.classList.toggle('active', newMode);

        if (!newMode) {
            clearSelection();
            closeColorPicker();
        }
    });

    // Export PNG
    const exportPngButton = document.getElementById('export-png-button');
    exportPngButton?.addEventListener('click', exportPNG);
}

// Palette Editor Listeners
function setupPaletteEditorListeners() {
    const editPaletteButton = document.getElementById('edit-palette-button');
    editPaletteButton?.addEventListener('click', openPopoutEditor);

    // Generate X row
    const generateXButton = document.getElementById('generate-x-button');
    generateXButton?.addEventListener('click', handleGenerateXRow);
}

// State Management Listeners
function setupStateManagementListeners() {
    const saveStateButton = document.getElementById('save-state-button');
    const resetStateButton = document.getElementById('reset-state-button');
    const exportPaletteButton = document.getElementById('export-palette-button');
    const importPaletteButton = document.getElementById('import-palette-button');
    const importFileInput = document.getElementById('import-palette-file-input');

    saveStateButton?.addEventListener('click', saveState);
    resetStateButton?.addEventListener('click', resetState);
    exportPaletteButton?.addEventListener('click', exportPaletteData);

    importPaletteButton?.addEventListener('click', () => {
        importFileInput?.click();
    });

    importFileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePaletteImport(file);
            e.target.value = ''; // Reset for re-selection
        }
    });
}

// Keyboard Listeners
function setupKeyboardListeners() {
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Shift') {
            setShiftHeld(false);
            hidePaletteTooltip();
        }
    });
}

// Global Keyboard Handler
function handleGlobalKeyDown(event) {
    // Shift key for tooltip interaction
    if (event.key === 'Shift' && !event.repeat) {
        setShiftHeld(true);
    }

    // Escape key handlers
    if (event.key === 'Escape') {
        const configModal = document.getElementById('config-modal');
        if (configModal?.classList.contains('visible')) {
            closeConfigModal();
        } else if (document.getElementById('color-picker-modal')?.classList.contains('visible')) {
            closeColorPicker();
        }
    }

    // Tooltip hotkeys (1, 2, 3)
    if (['1', '2', '3'].includes(event.key)) {
        handleTooltipHotkeysCopy(event);
    }
}

// Config Modal Functions
function openConfigModal() {
    const configModal = document.getElementById('config-modal');
    if (!configModal) return;

    configModal.classList.add('visible');

    // Trap focus
    const focusableElements = configModal.querySelectorAll(CONSTANTS.FOCUSABLE_MODAL_ELEMENTS_SELECTOR);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    configModal.addEventListener('keydown', function trapFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable?.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable?.focus();
            }
        }
    });
}

function closeConfigModal() {
    const configModal = document.getElementById('config-modal');
    configModal?.classList.remove('visible');
}

// Generate X Row Handler
function handleGenerateXRow() {
    const xValueInput = document.getElementById('generate-x-value');
    const ref1Input = document.getElementById('generate-ref1-value');
    const ref2Input = document.getElementById('generate-ref2-value');

    const xValue = xValueInput?.value.trim();
    const ref1Value = ref1Input?.value.trim();
    const ref2Value = ref2Input?.value.trim();

    if (!xValue || !ref1Value || !ref2Value) {
        alert('Please enter all three values: X value and two reference values.');
        return;
    }

    // Parse X value
    const xData = parseXValue(xValue);
    if (!xData) {
        alert('Invalid X value. Use format like "72x" or "H:180 S:100"');
        return;
    }

    // Parse reference values
    const ref1Hex = isValidHex(ref1Value) ? ref1Value : null;
    const ref2Hex = isValidHex(ref2Value) ? ref2Value : null;

    if (!ref1Hex || !ref2Hex) {
        alert('Reference values must be valid hex colors (e.g., #FF0000)');
        return;
    }

    // Generate the row
    const newRow = generateXRow(xData, ref1Hex, ref2Hex);

    // Insert into sourceGridData
    insertXRow(newRow, xData);

    // Update display
    updatePaletteView();

    // Clear inputs
    if (xValueInput) xValueInput.value = '';
    if (ref1Input) ref1Input.value = '';
    if (ref2Input) ref2Input.value = '';
}

// Parse X value (e.g., "72x" or "H:180 S:100")
function parseXValue(input) {
    // Check for simple X format (e.g., "72x")
    const xMatch = input.match(/^(\d+)x$/i);
    if (xMatch) {
        return {
            type: 'lightness',
            value: parseInt(xMatch[1], 10),
            label: input
        };
    }

    // Check for HSL format (e.g., "H:180 S:100")
    const hslMatch = input.match(/H:(\d+)\s+S:(\d+)/i);
    if (hslMatch) {
        return {
            type: 'hsl',
            hue: parseInt(hslMatch[1], 10),
            saturation: parseInt(hslMatch[2], 10),
            label: input
        };
    }

    return null;
}

// Generate X row
function generateXRow(xData, ref1Hex, ref2Hex) {
    const row = [xData.label];

    // Generate grayscale if lightness-based
    if (xData.type === 'lightness') {
        const gray = Math.round(255 * (xData.value / 100));
        row.push(rgbToHex(gray, gray, gray));
    } else {
        // Generate color based on HSL
        row.push(hslToHex(xData.hue, xData.saturation, xData.value || 50));
    }

    // Add reference colors
    row.push(ref1Hex, ref2Hex);

    // Generate intermediate colors
    for (let i = 4; i < 26; i++) {
        // Simple interpolation for now
        const t = (i - 2) / 23;
        const rgb1 = hexToRgb(ref1Hex);
        const rgb2 = hexToRgb(ref2Hex);

        if (rgb1 && rgb2) {
            const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * t);
            const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * t);
            const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * t);
            row.push(rgbToHex(r, g, b));
        }
    }

    row.push(xData.label);
    return row;
}

// Insert X row into correct position
function insertXRow(newRow, xData) {
    if (xData.type === 'lightness') {
        // Find correct position based on lightness
        let insertIndex = sourceGridData.length - 1;

        for (let i = 1; i < sourceGridData.length - 1; i++) {
            const rowLabel = sourceGridData[i][0];
            const match = rowLabel.match(/^(\d+)x$/);
            if (match) {
                const rowValue = parseInt(match[1], 10);
                if (rowValue < xData.value) {
                    insertIndex = i;
                    break;
                }
            }
        }

        sourceGridData.splice(insertIndex, 0, newRow);
    } else {
        // For HSL rows, add before the last row
        sourceGridData.splice(sourceGridData.length - 1, 0, newRow);
    }
}

// State Management
function saveState() {
    try {
        const state = {
            sourceGridData: sourceGridData,
            isInterpolationEnabled: isInterpolationEnabled,
            interpolationSteps: interpolationSteps,
            saturationOffset: saturationOffset,
            paletteZoom: scale,
            paletteOffsetX: paletteOffsetX,
            paletteOffsetY: paletteOffsetY,
            uiScalePercent: parseInt(document.getElementById('ui-scale-number')?.value || '100', 10),
            popout: getPopoutState(),
            colorPicker: getColorPickerState()
        };

        localStorage.setItem(localStorageKey, JSON.stringify(state));

        // Show feedback
        const saveButton = document.getElementById('save-state-button');
        if (saveButton) {
            const originalText = saveButton.textContent;
            saveButton.textContent = 'Saved!';
            setTimeout(() => {
                saveButton.textContent = originalText;
            }, 1500);
        }
    } catch (error) {
        console.error('Error saving state:', error);
        alert('Failed to save state to localStorage.');
    }
}

function loadState() {
    try {
        const savedState = localStorage.getItem(localStorageKey);
        if (!savedState) return;

        const state = JSON.parse(savedState);

        // Restore palette data
        if (state.sourceGridData && Array.isArray(state.sourceGridData)) {
            setSourceGridData(state.sourceGridData);
        }

        // Restore settings
        if (typeof state.isInterpolationEnabled === 'boolean') {
            setInterpolationEnabled(state.isInterpolationEnabled);
        }
        if (typeof state.interpolationSteps === 'number') {
            setInterpolationSteps(state.interpolationSteps);
        }
        if (typeof state.saturationOffset === 'number') {
            setSaturationOffset(state.saturationOffset);
        }

        // Restore zoom and pan
        if (typeof state.paletteZoom === 'number') {
            canvasManager?.setZoomLevel(state.paletteZoom);
        }
        if (typeof state.paletteOffsetX === 'number' && typeof state.paletteOffsetY === 'number') {
            setPaletteOffset(state.paletteOffsetX, state.paletteOffsetY);
        }

        // Restore UI scale
        if (typeof state.uiScalePercent === 'number') {
            applyUiScale(state.uiScalePercent);
        }

        // Restore popout state
        if (state.popout) {
            restorePopoutState(state.popout);
        }

        // Restore color picker state
        if (state.colorPicker) {
            restoreColorPickerState(state.colorPicker);
        }

        setStateLoadedSuccessfully(true);
        updateUIControls();

    } catch (error) {
        console.error('Error loading state:', error);
    }
}

function resetState() {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
        localStorage.removeItem(localStorageKey);
        location.reload();
    }
}

// Update UI controls to match state
function updateUIControls() {
    // Update interpolation controls
    const interpolationToggle = document.getElementById('interpolation-toggle');
    if (interpolationToggle) interpolationToggle.checked = isInterpolationEnabled;

    const stepsSlider = document.getElementById('interpolation-steps-slider');
    const stepsNumber = document.getElementById('interpolation-steps-number');
    if (stepsSlider) stepsSlider.value = interpolationSteps;
    if (stepsNumber) stepsNumber.value = interpolationSteps;

    // Update saturation controls
    const satSlider = document.getElementById('saturation-offset-slider');
    const satNumber = document.getElementById('saturation-offset-number');
    if (satSlider) satSlider.value = saturationOffset;
    if (satNumber) satNumber.value = saturationOffset;

    // Update zoom controls
    const zoomSlider = document.getElementById('zoom-slider');
    const zoomNumber = document.getElementById('zoom-number');
    if (zoomSlider) zoomSlider.value = scale;
    if (zoomNumber) zoomNumber.value = scale.toFixed(1);

    // Update UI scale
    const uiScaleNumber = document.getElementById('ui-scale-number');
    if (uiScaleNumber) {
        const currentScale = parseInt(uiScaleNumber.value, 10) || 100;
        applyUiScale(currentScale);
    }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for use in other modules if needed
export {
    initializeApp,
    saveState,
    loadState,
    resetState
};
