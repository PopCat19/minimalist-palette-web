// --- DOM Manipulation Utilities ---
// Get DOM element references
export function getDOMElements() {
    return {
        // Palette display elements
        canvasViewport: document.getElementById("canvas-viewport"),
        paletteContainer: document.getElementById("palette-container"),
        paletteGrid: document.getElementById("palette-grid"),
        // Config Modal elements
        configToggleButton: document.getElementById("config-toggle-button"),
        configModal: document.getElementById("config-modal"),
        closeModalButton: document.querySelector("#config-modal .modal-close-button"),
        editPaletteButton: document.getElementById("edit-palette-button"),
        paletteEditorSection: document.getElementById("palette-editor-section"),
        paletteInput: document.getElementById("palette-input"),
        updateButton: document.getElementById("update-button"),
        exportPngButton: document.getElementById("export-png-button"),
        exportScaleInput: document.getElementById("export-scale-input"),
        // Adjustment controls
        interpolationToggle: document.getElementById("interpolation-toggle"),
        interpolationStepsGroup: document.getElementById("interpolation-steps-group"),
        stepsSlider: document.getElementById("interpolation-steps-slider"),
        stepsNumber: document.getElementById("interpolation-steps-number"),
        saturationOffsetSlider: document.getElementById("saturation-offset-slider"),
        saturationOffsetNumber: document.getElementById("saturation-offset-number"),
        // Zoom controls
        zoomSlider: document.getElementById("zoom-slider"),
        zoomNumber: document.getElementById("zoom-number"),
        // UI Scale controls
        uiScaleNumber: document.getElementById("ui-scale-number"),
        // Generate X Row elements
        generateXValueInput: document.getElementById("generate-x-value"),
        generateRef1ValueInput: document.getElementById("generate-ref1-value"),
        generateRef2ValueInput: document.getElementById("generate-ref2-value"),
        generateXButton: document.getElementById("generate-x-button"),
        // Popout Editor elements
        popoutEditor: document.getElementById("popout-editor"),
        popoutHeader: document.querySelector("#popout-editor .popout-header"),
        popoutCloseButton: document.getElementById("popout-close-button"),
        popoutPaletteInput: document.getElementById("popout-palette-input"),
        popoutUpdateButton: document.getElementById("popout-update-button"),
        popoutResizeHandle: document.getElementById("popout-resize-handle"),
        popoutStatusMessage: document.getElementById("popout-status-message"),
        // State management buttons
        saveStateButton: document.getElementById("save-state-button"),
        resetStateButton: document.getElementById("reset-state-button"),
        // Palette import/export elements
        exportPaletteButton: document.getElementById("export-palette-button"),
        importPaletteButton: document.getElementById("import-palette-button"),
        importPaletteFileInput: document.getElementById("import-palette-file-input"),
        // Color Picker Modal elements
        colorPickerModal: document.getElementById("color-picker-modal"),
        colorPickerCloseButton: document.getElementById("color-picker-close-button"),
        colorPickerPreview: document.getElementById("color-picker-preview"),
        pickerHueSlider: document.getElementById("picker-hue-slider"),
        pickerHueNumber: document.getElementById("picker-hue-number"),
        pickerSatSlider: document.getElementById("picker-sat-slider"),
        pickerSatNumber: document.getElementById("picker-sat-number"),
        pickerLumSlider: document.getElementById("picker-lum-slider"),
        pickerLumNumber: document.getElementById("picker-lum-number"),
        pickerHexInput: document.getElementById("picker-hex-input"),
        pickerCopyHexButton: document.getElementById("picker-copy-hex-button"),
        pickerCancelButton: document.getElementById("picker-cancel-button"),
        pickerApplyButton: document.getElementById("picker-apply-button"),
        // Color pick toggle button
        colorPickToggleButton: document.getElementById("color-pick-toggle-button"),
        colorPickerHeader: document.querySelector("#color-picker-modal .color-picker-header"),
        colorPickerResizeHandle: document.getElementById("color-picker-resize-handle"),
        // Tooltip elements
        paletteTooltip: document.getElementById("palette-tooltip"),
        tooltipHexValue: document.querySelector("#palette-tooltip #tooltip-hex span"),
        tooltipHslValue: document.querySelector("#palette-tooltip #tooltip-hsl span"),
        tooltipRgbValue: document.querySelector("#palette-tooltip #tooltip-rgb span"),
    };
}
// Get event coordinates (mouse or touch)
export function getEventCoords(event) {
    if (event.type.startsWith("touch")) {
        const touchEvent = event;
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
        return { x: touch.clientX, y: touch.clientY };
    }
    const mouseEvent = event;
    return { x: mouseEvent.clientX, y: mouseEvent.clientY };
}
// Apply UI scale to the document
export function applyUiScale(scalePercent) {
    const clampedScale = Math.max(50, Math.min(200, scalePercent));
    const scaleFactor = clampedScale / 100;
    // Apply CSS custom property for UI scaling
    document.documentElement.style.setProperty("--ui-scale", scaleFactor.toString());
    return clampedScale;
}
// Clipboard functionality
export async function copyToClipboard(text, element) {
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
            if (element && element.classList.contains("cell-content")) {
                showCopiedFeedback(element);
            }
            else if (element) {
                const originalText = element.textContent;
                element.textContent = "Copied!";
                setTimeout(() => {
                    element.textContent = originalText;
                }, 1000);
            }
        }
        catch (err) {
            console.error("Fallback copy failed: ", err);
            alert("Failed to copy. Your browser might not support this feature or require specific permissions.");
        }
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        if (element && element.classList.contains("cell-content")) {
            showCopiedFeedback(element);
        }
        else if (element) {
            const originalText = element.textContent;
            element.textContent = "Copied!";
            setTimeout(() => {
                element.textContent = originalText;
            }, 1000);
        }
    }
    catch (err) {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy.");
    }
}
// Show copied feedback on element
export function showCopiedFeedback(element) {
    element.classList.add("copied");
    setTimeout(() => element.classList.remove("copied"), 1000);
}
// Convert grid data to simple text format
export function convertToSimpleFormat(gridData) {
    return gridData.map((row) => row.join(" ")).join("\n");
}
// Parse simple text format to grid data
export function parseSimpleFormat(textData) {
    const lines = textData.trim().split("\n");
    return lines.map((line) => {
        return line
            .trim()
            .split(" ")
            .filter((cell) => cell !== "");
    });
}
// Focus management for modals
export function setupFocusTrap(modal, focusableElementsSelector) {
    const focusableElements = modal.querySelectorAll(focusableElementsSelector);
    if (focusableElements.length > 0) {
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        // Focus the first element after a frame to ensure it's visible
        requestAnimationFrame(() => {
            firstFocusableElement.focus();
        });
        return { firstFocusableElement, lastFocusableElement };
    }
    return { firstFocusableElement: null, lastFocusableElement: null };
}
// Handle focus trap keyboard navigation
export function handleFocusTrapKeydown(event, firstFocusableElement, lastFocusableElement, modal) {
    if (event.key === "Tab") {
        if (!firstFocusableElement)
            return;
        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement?.focus();
                event.preventDefault();
            }
        }
        else {
            // Tab
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                event.preventDefault();
            }
        }
        // If focus is outside the modal, bring it back
        if (!modal.contains(document.activeElement)) {
            firstFocusableElement.focus();
        }
    }
}
// Snap position to grid or edges
export function snapPosition(position, snapThreshold, snapGap, containerSize) {
    const { x, y } = position;
    const { width, height } = containerSize;
    let snappedX = x;
    let snappedY = y;
    // Snap to edges
    if (Math.abs(x) < snapThreshold)
        snappedX = snapGap;
    if (Math.abs(x - (width - snapGap)) < snapThreshold)
        snappedX = width - snapGap;
    if (Math.abs(y) < snapThreshold)
        snappedY = snapGap;
    if (Math.abs(y - (height - snapGap)) < snapThreshold)
        snappedY = height - snapGap;
    return { x: snappedX, y: snappedY };
}
// Get computed style value
export function getComputedStyleValue(element, property) {
    return getComputedStyle(element).getPropertyValue(property);
}
// Create and trigger download
export function triggerDownload(data, filename, mimeType = "text/plain") {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
}
// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
// Get element bounds relative to viewport
export function getElementBounds(element) {
    const rect = element.getBoundingClientRect();
    return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
    };
}
//# sourceMappingURL=domUtils.js.map