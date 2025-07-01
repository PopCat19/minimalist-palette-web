// Color Picker Module
// Handles the color picker modal functionality for editing palette colors
import { isValidHex, hexToHsl, hslToHex } from "./colorUtils.js";
import { getEventCoords, copyToClipboard } from "./domUtils.js";
import { sourceGridData, currentGridData, selectedCells, pickerTargetRow, pickerTargetCol, isPickerUpdating, setPickerTargetRow, setPickerTargetCol, setIsPickerUpdating, clearSelection, } from "./state.js";
import { renderPalette } from "./rendering.js";
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
// const multiSelectHueTolerance: number = 2; // Unused but kept for future functionality
// Initialize color picker
export function initColorPicker() {
    // Get DOM elements
    colorPickerModal = document.getElementById("color-picker-modal");
    colorPickerCloseButton = document.getElementById("color-picker-close-button");
    colorPickerPreview = document.getElementById("color-picker-preview");
    pickerHueSlider = document.getElementById("picker-hue-slider");
    pickerHueNumber = document.getElementById("picker-hue-number");
    pickerSatSlider = document.getElementById("picker-sat-slider");
    pickerSatNumber = document.getElementById("picker-sat-number");
    pickerLumSlider = document.getElementById("picker-lum-slider");
    pickerLumNumber = document.getElementById("picker-lum-number");
    pickerHexInput = document.getElementById("picker-hex-input");
    pickerCopyHexButton = document.getElementById("picker-copy-hex-button");
    pickerCancelButton = document.getElementById("picker-cancel-button");
    pickerApplyButton = document.getElementById("picker-apply-button");
    colorPickerHeader =
        colorPickerModal?.querySelector(".color-picker-header") || null;
    colorPickerResizeHandle = document.getElementById("color-picker-resize-handle");
    if (!colorPickerModal)
        return;
    // Setup event listeners
    setupColorPickerEventListeners();
}
// Setup all color picker event listeners
function setupColorPickerEventListeners() {
    // Close button
    if (colorPickerCloseButton) {
        colorPickerCloseButton.addEventListener("click", closeColorPicker);
    }
    // Cancel button
    if (pickerCancelButton) {
        pickerCancelButton.addEventListener("click", closeColorPicker);
    }
    // Apply button
    if (pickerApplyButton) {
        pickerApplyButton.addEventListener("click", applyColorChanges);
    }
    // Copy hex button
    if (pickerCopyHexButton && pickerHexInput) {
        pickerCopyHexButton.addEventListener("click", () => {
            const hexValue = pickerHexInput.value;
            copyToClipboard(hexValue).then(() => {
                const originalText = pickerCopyHexButton.textContent;
                pickerCopyHexButton.textContent = "Copied!";
                setTimeout(() => {
                    pickerCopyHexButton.textContent = originalText;
                }, 1500);
            });
        });
    }
    // HSL sliders
    if (pickerHueSlider && pickerHueNumber) {
        pickerHueSlider.addEventListener("input", (e) => {
            const target = e.target;
            pickerHueNumber.value = target.value;
            updatePickerFromHsl();
        });
        pickerHueNumber.addEventListener("input", (e) => {
            const target = e.target;
            pickerHueSlider.value = target.value;
            updatePickerFromHsl();
        });
    }
    if (pickerSatSlider && pickerSatNumber) {
        pickerSatSlider.addEventListener("input", (e) => {
            const target = e.target;
            pickerSatNumber.value = target.value;
            updatePickerFromHsl();
        });
        pickerSatNumber.addEventListener("input", (e) => {
            const target = e.target;
            pickerSatSlider.value = target.value;
            updatePickerFromHsl();
        });
    }
    if (pickerLumSlider && pickerLumNumber) {
        pickerLumSlider.addEventListener("input", (e) => {
            const target = e.target;
            pickerLumNumber.value = target.value;
            updatePickerFromHsl();
        });
        pickerLumNumber.addEventListener("input", (e) => {
            const target = e.target;
            pickerLumSlider.value = target.value;
            updatePickerFromHsl();
        });
    }
    // Hex input
    if (pickerHexInput) {
        pickerHexInput.addEventListener("input", updatePickerFromHex);
    }
    // Drag functionality
    if (colorPickerHeader) {
        colorPickerHeader.addEventListener("mousedown", startColorPickerDrag);
        colorPickerHeader.addEventListener("touchstart", startColorPickerDrag, {
            passive: false,
        });
    }
    // Resize functionality
    if (colorPickerResizeHandle) {
        colorPickerResizeHandle.addEventListener("mousedown", startColorPickerResize);
        colorPickerResizeHandle.addEventListener("touchstart", startColorPickerResize, { passive: false });
    }
}
// Open color picker
export function openColorPicker(rowIndex, cellIndex, event = null) {
    // Check if source data exists for the coordinates
    if (rowIndex >= sourceGridData.length ||
        cellIndex >= sourceGridData[rowIndex].length) {
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
    if (!pickerHueSlider ||
        !pickerHueNumber ||
        !pickerSatSlider ||
        !pickerSatNumber ||
        !pickerLumSlider ||
        !pickerLumNumber ||
        !pickerHexInput) {
        console.error("Color picker elements not initialized");
        return;
    }
    setIsPickerUpdating(true);
    pickerHueSlider.value = hsl.h.toString();
    pickerHueNumber.value = hsl.h.toString();
    pickerSatSlider.value = hsl.s.toString();
    pickerSatNumber.value = hsl.s.toString();
    pickerLumSlider.value = hsl.l.toString();
    pickerLumNumber.value = hsl.l.toString();
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
        }
        else {
            // No constraints for dissimilar selection
            pickerSatSlider.disabled = false;
            pickerSatNumber.disabled = false;
            pickerLumSlider.disabled = false;
            pickerLumNumber.disabled = false;
            pickerHexInput.disabled = false;
        }
    }
    else {
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
    if (colorPickerModal) {
        colorPickerModal.classList.add("visible");
    }
}
// Close color picker
export function closeColorPicker() {
    if (colorPickerModal) {
        colorPickerModal.classList.remove("visible");
    }
    clearSelection();
    setPickerTargetRow(-1);
    setPickerTargetCol(-1);
    setIsPickerUpdating(false);
}
// Update picker preview
function updatePickerPreview(hexColor) {
    if (colorPickerPreview) {
        colorPickerPreview.style.backgroundColor = hexColor;
    }
}
// Update picker from HSL values
function updatePickerFromHsl() {
    if (isPickerUpdating ||
        !pickerHueSlider ||
        !pickerSatSlider ||
        !pickerLumSlider ||
        !pickerHexInput)
        return;
    const h = parseInt(pickerHueSlider.value);
    const s = parseInt(pickerSatSlider.value);
    const l = parseInt(pickerLumSlider.value);
    const hsl = { h, s, l };
    const hexColor = hslToHex(hsl);
    if (hexColor) {
        setIsPickerUpdating(true);
        pickerHexInput.value = hexColor.toUpperCase();
        updatePickerPreview(hexColor);
        setIsPickerUpdating(false);
    }
}
// Update picker from hex value
function updatePickerFromHex() {
    if (isPickerUpdating || !pickerHexInput)
        return;
    const hexValue = pickerHexInput.value;
    if (!isValidHex(hexValue))
        return;
    const hsl = hexToHsl(hexValue);
    if (!hsl ||
        !pickerHueSlider ||
        !pickerHueNumber ||
        !pickerSatSlider ||
        !pickerSatNumber ||
        !pickerLumSlider ||
        !pickerLumNumber)
        return;
    setIsPickerUpdating(true);
    pickerHueSlider.value = hsl.h.toString();
    pickerHueNumber.value = hsl.h.toString();
    pickerSatSlider.value = hsl.s.toString();
    pickerSatNumber.value = hsl.s.toString();
    pickerLumSlider.value = hsl.l.toString();
    pickerLumNumber.value = hsl.l.toString();
    updatePickerPreview(hexValue);
    setIsPickerUpdating(false);
}
// Apply color changes
function applyColorChanges() {
    if (!pickerHexInput)
        return;
    const newHex = pickerHexInput.value;
    if (!isValidHex(newHex)) {
        console.error("Invalid hex color:", newHex);
        return;
    }
    if (selectedCells.length > 1) {
        applyMultiSelectChanges(newHex);
    }
    else {
        // Single cell update
        if (pickerTargetRow >= 0 && pickerTargetCol >= 0) {
            sourceGridData[pickerTargetRow][pickerTargetCol] = newHex;
            renderPalette(currentGridData);
        }
    }
    closeColorPicker();
}
// Apply multi-select changes
function applyMultiSelectChanges(newHex) {
    const newHsl = hexToHsl(newHex);
    if (!newHsl)
        return;
    const isSimilarSelection = checkSimilarSelection();
    selectedCells.forEach((coord) => {
        if (coord.row < sourceGridData.length &&
            coord.col < sourceGridData[coord.row].length) {
            if (isSimilarSelection) {
                // Only change hue for similar selections
                const oldHex = sourceGridData[coord.row][coord.col];
                const oldHsl = hexToHsl(oldHex);
                if (oldHsl) {
                    const updatedHsl = { h: newHsl.h, s: oldHsl.s, l: oldHsl.l };
                    const updatedHex = hslToHex(updatedHsl);
                    if (updatedHex) {
                        sourceGridData[coord.row][coord.col] = updatedHex;
                    }
                }
            }
            else {
                // Replace entire color for dissimilar selections
                sourceGridData[coord.row][coord.col] = newHex;
            }
        }
    });
    renderPalette(currentGridData);
}
// Check if selection contains similar colors
function checkSimilarSelection() {
    if (selectedCells.length <= 1)
        return false;
    const firstCoord = selectedCells[0];
    if (firstCoord.row >= sourceGridData.length ||
        firstCoord.col >= sourceGridData[firstCoord.row].length) {
        return false;
    }
    const firstHex = sourceGridData[firstCoord.row][firstCoord.col];
    const firstHsl = hexToHsl(firstHex);
    if (!firstHsl)
        return false;
    return selectedCells.every((coord) => {
        if (coord.row >= sourceGridData.length ||
            coord.col >= sourceGridData[coord.row].length) {
            return false;
        }
        const hex = sourceGridData[coord.row][coord.col];
        const hsl = hexToHsl(hex);
        if (!hsl)
            return false;
        const sDiff = Math.abs(hsl.s - firstHsl.s);
        const lDiff = Math.abs(hsl.l - firstHsl.l);
        return sDiff <= multiSelectTolerance || lDiff <= multiSelectTolerance;
    });
}
// Position color picker
function positionColorPicker(event) {
    if (!colorPickerModal)
        return;
    if (event) {
        const coords = getEventCoords(event);
        const rect = colorPickerModal.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let x = coords.x + 10;
        let y = coords.y + 10;
        // Ensure modal stays within viewport
        if (x + rect.width > viewportWidth) {
            x = coords.x - rect.width - 10;
        }
        if (y + rect.height > viewportHeight) {
            y = coords.y - rect.height - 10;
        }
        colorPickerModal.style.left = `${Math.max(0, x)}px`;
        colorPickerModal.style.top = `${Math.max(0, y)}px`;
    }
    else {
        // Center on screen
        colorPickerModal.style.left = "50%";
        colorPickerModal.style.top = "50%";
        colorPickerModal.style.transform = "translate(-50%, -50%)";
    }
}
// Start color picker drag
function startColorPickerDrag(event) {
    if (!colorPickerModal)
        return;
    isDraggingColorPicker = true;
    const coords = getEventCoords(event);
    const rect = colorPickerModal.getBoundingClientRect();
    pickerStartX = coords.x;
    pickerStartY = coords.y;
    pickerInitialX = rect.left;
    pickerInitialY = rect.top;
    // Add global listeners
    document.addEventListener("mousemove", dragColorPicker);
    document.addEventListener("mouseup", stopColorPickerDrag);
    document.addEventListener("touchmove", dragColorPicker, { passive: false });
    document.addEventListener("touchend", stopColorPickerDrag);
    event.preventDefault();
}
// Drag color picker
function dragColorPicker(event) {
    if (!isDraggingColorPicker || !colorPickerModal)
        return;
    const coords = getEventCoords(event);
    const deltaX = coords.x - pickerStartX;
    const deltaY = coords.y - pickerStartY;
    const newX = pickerInitialX + deltaX;
    const newY = pickerInitialY + deltaY;
    colorPickerModal.style.left = `${newX}px`;
    colorPickerModal.style.top = `${newY}px`;
    colorPickerModal.style.transform = "none";
    event.preventDefault();
}
// Stop color picker drag
function stopColorPickerDrag() {
    isDraggingColorPicker = false;
    // Remove global listeners
    document.removeEventListener("mousemove", dragColorPicker);
    document.removeEventListener("mouseup", stopColorPickerDrag);
    document.removeEventListener("touchmove", dragColorPicker);
    document.removeEventListener("touchend", stopColorPickerDrag);
}
// Start color picker resize
function startColorPickerResize(event) {
    if (!colorPickerModal)
        return;
    isResizingColorPicker = true;
    const coords = getEventCoords(event);
    const rect = colorPickerModal.getBoundingClientRect();
    cpResizeStartX = coords.x;
    cpResizeStartY = coords.y;
    cpResizeInitialWidth = rect.width;
    cpResizeInitialHeight = rect.height;
    // Add global listeners
    document.addEventListener("mousemove", resizeColorPicker);
    document.addEventListener("mouseup", stopColorPickerResize);
    document.addEventListener("touchmove", resizeColorPicker, { passive: false });
    document.addEventListener("touchend", stopColorPickerResize);
    event.preventDefault();
}
// Resize color picker
function resizeColorPicker(event) {
    if (!isResizingColorPicker || !colorPickerModal)
        return;
    const coords = getEventCoords(event);
    const deltaX = coords.x - cpResizeStartX;
    const deltaY = coords.y - cpResizeStartY;
    const newWidth = Math.max(300, cpResizeInitialWidth + deltaX);
    const newHeight = Math.max(200, cpResizeInitialHeight + deltaY);
    colorPickerModal.style.width = `${newWidth}px`;
    colorPickerModal.style.height = `${newHeight}px`;
    event.preventDefault();
}
// Stop color picker resize
function stopColorPickerResize() {
    isResizingColorPicker = false;
    // Remove global listeners
    document.removeEventListener("mousemove", resizeColorPicker);
    document.removeEventListener("mouseup", stopColorPickerResize);
    document.removeEventListener("touchmove", resizeColorPicker);
    document.removeEventListener("touchend", stopColorPickerResize);
}
// Get color picker state (unused but kept for future functionality)
// function getColorPickerState(): { x: number; y: number; width: number; height: number } | null {
//     if (!colorPickerModal) return null;
//     const rect = colorPickerModal.getBoundingClientRect();
//     return {
//         x: rect.left,
//         y: rect.top,
//         width: rect.width,
//         height: rect.height
//     };
// }
// Restore color picker state (unused but kept for future functionality)
// function restoreColorPickerState(state: { x: number; y: number; width: number; height: number }): void {
//     if (!colorPickerModal || !state) return;
//     colorPickerModal.style.left = `${state.x}px`;
//     colorPickerModal.style.top = `${state.y}px`;
//     colorPickerModal.style.width = `${state.width}px`;
//     colorPickerModal.style.height = `${state.height}px`;
// }
// Check if color picker is dragging (unused but kept for future functionality)
// function isColorPickerDragging(): boolean {
//     return isDraggingColorPicker;
// }
// Check if color picker is resizing (unused but kept for future functionality)
// function isColorPickerResizing(): boolean {
//     return isResizingColorPicker;
// }
//# sourceMappingURL=colorPicker.js.map