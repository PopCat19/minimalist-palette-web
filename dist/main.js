// --- Main Application Entry Point ---
import { INITIAL_OFFSETS } from "./config.js";
import { sourceGridData, currentGridData, isInterpolationEnabled, interpolationSteps, saturationOffset, isColorPickingMode, currentUiScale, setCurrentGridData, setInterpolationEnabled, setInterpolationSteps, setSaturationOffset, setColorPickingMode, setCurrentUiScale, setStateLoadedSuccessfully, setShiftHeld, clearSelection, } from "./state.js";
import { getDOMElements, applyUiScale, convertToSimpleFormat, parseSimpleFormat, } from "./domUtils.js";
import { renderPalette, updatePaletteView, clearSelectionVisuals, } from "./rendering.js";
import { setupTooltipEventListeners, handleTooltipHotkeysCopy, hidePaletteTooltip, } from "./tooltips.js";
import { CanvasInteractionManager } from "./canvasManager.js";
import { initColorPicker, closeColorPicker } from "./colorPicker.js";
import { initPopoutEditor, openPopoutEditor } from "./popoutEditor.js";
import { initImportExport } from "./importExport.js";
// DOM elements
let elements = {};
let canvasManager = null;
// Initialize the application
export function initializeApp() {
    console.log("Initializing Minimalist Palette Application...");
    // Get DOM element references
    elements = getDOMElements();
    if (!elements.canvasViewport ||
        !elements.paletteContainer ||
        !elements.paletteGrid) {
        console.error("Required DOM elements not found. Cannot initialize app.");
        return;
    }
    // Initialize canvas manager
    canvasManager = new CanvasInteractionManager(elements.canvasViewport, elements.paletteContainer);
    // Load state from localStorage
    loadState();
    // Setup event listeners
    setupEventListeners();
    // Setup tooltip functionality
    setupTooltipEventListeners();
    // Initialize new modules
    initColorPicker();
    initPopoutEditor();
    initImportExport();
    // Initial render
    updatePaletteView();
    // Apply initial UI scale
    applyUiScale(currentUiScale);
    // Update UI controls to match loaded state
    updateUIControls();
    console.log("App initialized successfully.");
}
// Setup all event listeners
function setupEventListeners() {
    setupConfigModalListeners();
    setupControlListeners();
    setupPaletteEditorListeners();
    setupStateManagementListeners();
    setupKeyboardListeners();
    setupCanvasListeners();
}
// Setup config modal event listeners
function setupConfigModalListeners() {
    elements.configToggleButton?.addEventListener("click", () => {
        if (elements.configModal?.classList.contains("visible")) {
            closeConfigModal();
        }
        else {
            openConfigModal();
        }
    });
    elements.closeModalButton?.addEventListener("click", closeConfigModal);
    elements.configModal?.addEventListener("click", (event) => {
        if (event.target === elements.configModal) {
            closeConfigModal();
        }
    });
}
// Palette editor listeners
function setupPaletteEditorListeners() {
    elements.editPaletteButton?.addEventListener("click", () => {
        openPopoutEditor();
    });
    elements.popoutCloseButton?.addEventListener("click", () => {
        if (elements.popoutEditor) {
            elements.popoutEditor.style.display = "none";
        }
    });
    elements.popoutUpdateButton?.addEventListener("click", () => {
        try {
            const textData = elements.popoutPaletteInput?.value;
            if (!textData) {
                throw new Error("No palette data provided");
            }
            const newGridData = parseSimpleFormat(textData);
            if (newGridData.length === 0) {
                throw new Error("Empty palette data");
            }
            // Update source data and re-render
            sourceGridData.length = 0;
            sourceGridData.push(...newGridData);
            setCurrentGridData([...sourceGridData.map((row) => [...row])]);
            updatePaletteView();
            showPopoutStatus("Palette updated successfully!", false);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Error updating palette:", error);
            showPopoutStatus("Error updating palette: " + errorMessage, true);
        }
    });
}
// Setup control event listeners
function setupControlListeners() {
    // Interpolation controls
    elements.interpolationToggle?.addEventListener("change", (event) => {
        const target = event.target;
        setInterpolationEnabled(target.checked);
        updatePaletteView();
    });
    elements.stepsSlider?.addEventListener("input", (event) => {
        const target = event.target;
        const steps = parseInt(target.value, 10);
        setInterpolationSteps(steps);
        if (elements.stepsNumber) {
            elements.stepsNumber.value = steps.toString();
        }
        if (isInterpolationEnabled) {
            updatePaletteView();
        }
    });
    elements.stepsNumber?.addEventListener("input", (event) => {
        const target = event.target;
        let value = parseInt(target.value, 10);
        const min = parseInt(target.min, 10);
        const max = parseInt(target.max, 10);
        if (isNaN(value))
            value = min;
        else if (value < min)
            value = min;
        else if (value > max)
            value = max;
        target.value = value.toString();
        setInterpolationSteps(value);
        if (elements.stepsSlider) {
            elements.stepsSlider.value = value.toString();
        }
        if (isInterpolationEnabled) {
            updatePaletteView();
        }
    });
    // Saturation controls
    elements.saturationOffsetSlider?.addEventListener("input", (event) => {
        const target = event.target;
        const offset = parseInt(target.value, 10);
        setSaturationOffset(offset);
        if (elements.saturationOffsetNumber) {
            elements.saturationOffsetNumber.value = offset.toString();
        }
        renderPalette(currentGridData);
    });
    elements.saturationOffsetNumber?.addEventListener("input", (event) => {
        const target = event.target;
        let value = parseInt(target.value, 10);
        const min = parseInt(target.min, 10);
        const max = parseInt(target.max, 10);
        if (isNaN(value))
            value = 0;
        else if (value < min)
            value = min;
        else if (value > max)
            value = max;
        target.value = value.toString();
        setSaturationOffset(value);
        if (elements.saturationOffsetSlider) {
            elements.saturationOffsetSlider.value = value.toString();
        }
        renderPalette(currentGridData);
    });
    // Zoom controls
    elements.zoomSlider?.addEventListener("input", (event) => {
        const target = event.target;
        const zoomValue = parseInt(target.value, 10);
        if (elements.zoomNumber) {
            elements.zoomNumber.value = zoomValue.toString();
        }
        if (canvasManager) {
            canvasManager.setZoomLevel(zoomValue);
        }
    });
    elements.zoomNumber?.addEventListener("change", (event) => {
        const target = event.target;
        let value = parseInt(target.value, 10);
        const min = elements.zoomSlider
            ? parseInt(elements.zoomSlider.min, 10)
            : 25;
        const max = elements.zoomSlider
            ? parseInt(elements.zoomSlider.max, 10)
            : 500;
        if (isNaN(value))
            value = 100;
        value = Math.max(min, Math.min(max, value));
        target.value = value.toString();
        if (elements.zoomSlider) {
            elements.zoomSlider.value = value.toString();
        }
        if (canvasManager) {
            canvasManager.setZoomLevel(value);
        }
    });
    // UI Scale controls
    elements.uiScaleNumber?.addEventListener("change", (event) => {
        const target = event.target;
        let value = parseInt(target.value, 10);
        const min = parseInt(target.min, 10);
        const max = parseInt(target.max, 10);
        if (isNaN(value))
            value = 100;
        value = Math.max(min, Math.min(max, value));
        target.value = value.toString();
        setCurrentUiScale(value);
        applyUiScale(value);
    });
    // Color pick toggle
    elements.colorPickToggleButton?.addEventListener("click", () => {
        setColorPickingMode(!isColorPickingMode);
        elements.colorPickToggleButton?.classList.toggle("active", isColorPickingMode);
        if (!isColorPickingMode) {
            clearSelection();
            clearSelectionVisuals();
            // Close color picker if open
            if (elements.colorPickerModal?.classList.contains("visible")) {
                closeColorPicker();
            }
        }
    });
    // Export PNG
    elements.exportPngButton?.addEventListener("click", exportPNG);
}
// Setup state management listeners
function setupStateManagementListeners() {
    elements.saveStateButton?.addEventListener("click", saveState);
    elements.resetStateButton?.addEventListener("click", resetState);
    elements.exportPaletteButton?.addEventListener("click", exportPaletteData);
    elements.importPaletteButton?.addEventListener("click", () => {
        elements.importPaletteFileInput?.click();
    });
    elements.importPaletteFileInput?.addEventListener("change", handlePaletteImport);
}
// Setup keyboard listeners
function setupKeyboardListeners() {
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keyup", (event) => {
        if (event.key === "Shift") {
            setShiftHeld(false);
        }
    });
}
// Setup canvas listeners
function setupCanvasListeners() {
    // Canvas-specific listeners are handled by CanvasInteractionManager
    // This is a placeholder for any additional canvas-related setup
}
// Open config modal
function openConfigModal() {
    if (elements.configModal) {
        elements.configModal.classList.add("visible");
    }
    // Update UI controls when modal opens
    updateUIControls();
}
// Close config modal
function closeConfigModal() {
    if (elements.configModal) {
        elements.configModal.classList.remove("visible");
    }
}
// Handle global key down events
function handleGlobalKeyDown(event) {
    if (event.key === "Shift") {
        setShiftHeld(true);
    }
    // Handle tooltip copy hotkeys
    handleTooltipHotkeysCopy(event);
}
// Export PNG functionality
function exportPNG() {
    if (!elements.paletteGrid) {
        console.error("Palette grid not found for PNG export");
        return;
    }
    // Hide tooltips before export
    hidePaletteTooltip();
    // Create a temporary canvas for export
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Could not get canvas context for PNG export");
        return;
    }
    // Get the palette grid bounds
    const gridRect = elements.paletteGrid.getBoundingClientRect();
    canvas.width = gridRect.width;
    canvas.height = gridRect.height;
    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Export each cell
    const cells = elements.paletteGrid.querySelectorAll(".cell-content");
    cells.forEach((cell) => {
        const cellElement = cell;
        const cellRect = cellElement.getBoundingClientRect();
        const x = cellRect.left - gridRect.left;
        const y = cellRect.top - gridRect.top;
        // Draw cell background
        const bgColor = cellElement.style.backgroundColor || "#ffffff";
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, cellRect.width, cellRect.height);
        // Draw cell text if it's a swatch
        if (cellElement.classList.contains("swatch") && cellElement.textContent) {
            ctx.fillStyle = cellElement.style.color || "#000000";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(cellElement.textContent, x + cellRect.width / 2, y + cellRect.height / 2);
        }
    });
    // Download the image
    canvas.toBlob((blob) => {
        if (!blob) {
            console.error("Failed to create blob for PNG export");
            return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "palette.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, "image/png");
}
// Save state to localStorage
function saveState() {
    try {
        const state = {
            sourceGridData: sourceGridData,
            isInterpolationEnabled: isInterpolationEnabled,
            interpolationSteps: interpolationSteps,
            saturationOffset: saturationOffset,
            currentUiScale: currentUiScale,
            paletteOffsetX: canvasManager
                ? canvasManager.offsetX
                : INITIAL_OFFSETS.PALETTE_OFFSET_X,
            paletteOffsetY: canvasManager
                ? canvasManager.offsetY
                : INITIAL_OFFSETS.PALETTE_OFFSET_Y,
            scale: canvasManager ? canvasManager.scale : 1,
        };
        localStorage.setItem("minimalistPaletteState", JSON.stringify(state));
        console.log("State saved successfully");
        // Show feedback
        if (elements.saveStateButton) {
            const originalText = elements.saveStateButton.textContent;
            elements.saveStateButton.textContent = "Saved!";
            setTimeout(() => {
                if (elements.saveStateButton) {
                    elements.saveStateButton.textContent = originalText;
                }
            }, 1500);
        }
    }
    catch (error) {
        console.error("Error saving state:", error);
    }
}
// Load state from localStorage
function loadState() {
    try {
        const savedState = localStorage.getItem("minimalistPaletteState");
        if (!savedState) {
            setStateLoadedSuccessfully(false);
            return;
        }
        const state = JSON.parse(savedState);
        // Load grid data
        if (state.sourceGridData && Array.isArray(state.sourceGridData)) {
            sourceGridData.length = 0;
            sourceGridData.push(...state.sourceGridData);
            setCurrentGridData([...sourceGridData.map((row) => [...row])]);
        }
        // Load settings
        if (typeof state.isInterpolationEnabled === "boolean") {
            setInterpolationEnabled(state.isInterpolationEnabled);
        }
        if (typeof state.interpolationSteps === "number") {
            setInterpolationSteps(state.interpolationSteps);
        }
        if (typeof state.saturationOffset === "number") {
            setSaturationOffset(state.saturationOffset);
        }
        if (typeof state.currentUiScale === "number") {
            setCurrentUiScale(state.currentUiScale);
        }
        // Load canvas manager state
        if (canvasManager) {
            canvasManager.loadState(state);
        }
        setStateLoadedSuccessfully(true);
        console.log("State loaded successfully");
    }
    catch (error) {
        console.error("Error loading state:", error);
        setStateLoadedSuccessfully(false);
    }
}
// Reset state to defaults
function resetState() {
    localStorage.removeItem("minimalistPaletteState");
    location.reload();
}
// Update UI controls to match current state
function updateUIControls() {
    if (elements.interpolationToggle) {
        elements.interpolationToggle.checked = isInterpolationEnabled;
    }
    if (elements.stepsSlider) {
        elements.stepsSlider.value = interpolationSteps.toString();
    }
    if (elements.stepsNumber) {
        elements.stepsNumber.value = interpolationSteps.toString();
    }
    if (elements.saturationOffsetSlider) {
        elements.saturationOffsetSlider.value = saturationOffset.toString();
    }
    if (elements.saturationOffsetNumber) {
        elements.saturationOffsetNumber.value = saturationOffset.toString();
    }
    if (elements.uiScaleNumber) {
        elements.uiScaleNumber.value = currentUiScale.toString();
    }
}
// Show popout status message
function showPopoutStatus(message, isError = false) {
    // This function is called by other modules but implementation is in popoutEditor
    // We import it dynamically to avoid circular dependencies
    import("./popoutEditor.js")
        .then((module) => {
        module.showPopoutStatus(message, isError);
    })
        .catch(console.error);
}
// Export palette data
function exportPaletteData() {
    try {
        const paletteText = convertToSimpleFormat(sourceGridData);
        const blob = new Blob([paletteText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "palette.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("Palette exported successfully");
    }
    catch (error) {
        console.error("Error exporting palette:", error);
    }
}
// Handle palette import
function handlePaletteImport(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = e.target?.result;
            if (!content) {
                throw new Error("No file content");
            }
            const newGridData = parseSimpleFormat(content);
            if (newGridData.length === 0) {
                throw new Error("Empty or invalid palette data");
            }
            // Update grid data
            sourceGridData.length = 0;
            sourceGridData.push(...newGridData);
            setCurrentGridData([...sourceGridData.map((row) => [...row])]);
            updatePaletteView();
            console.log("Palette imported successfully");
            showPopoutStatus("Palette imported successfully!", false);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Error importing palette:", error);
            showPopoutStatus("Error importing palette: " + errorMessage, true);
        }
    };
    reader.onerror = () => {
        console.error("Error reading file");
        showPopoutStatus("Error reading file", true);
    };
    reader.readAsText(file);
}
// Initialize the application when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeApp);
}
else {
    initializeApp();
}
//# sourceMappingURL=main.js.map