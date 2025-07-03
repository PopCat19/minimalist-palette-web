// --- Main Application Entry Point ---

import { CONSTANTS, INITIAL_OFFSETS } from "./config.js";
import {
  sourceGridData,
  currentGridData,
  isInterpolationEnabled,
  interpolationSteps,
  saturationOffset,
  isColorPickingMode,
  selectedCells,
  selectionAnchor,
  currentUiScale,
  stateLoadedSuccessfully,
  setCurrentGridData,
  setInterpolationEnabled,
  setInterpolationSteps,
  setSaturationOffset,
  setColorPickingMode,
  setCurrentUiScale,
  setStateLoadedSuccessfully,
  setShiftHeld,
  clearSelection,
} from "./state.js";
import {
  getDOMElements,
  applyUiScale,
  convertToSimpleFormat,
  parseSimpleFormat,
} from "./domUtils.js";
import { isValidHex } from "./colorUtils.js";
import {
  renderPalette,
  updatePaletteView,
  clearSelectionVisuals,
} from "./rendering.js";
import {
  setupTooltipEventListeners,
  handleTooltipHotkeysCopy,
  hidePaletteTooltip,
} from "./tooltips.js";
import {
  startPan,
  panMove,
  endPan,
  setupSwatchEventListeners,
} from "./interactions.js";
import { CanvasInteractionManager } from "./canvasManager.js";
import {
  initColorPicker,
  openColorPicker,
  closeColorPicker,
} from "./colorPicker.js";
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

  if (
    !elements.canvasViewport ||
    !elements.paletteContainer ||
    !elements.paletteGrid
  ) {
    console.error("Required DOM elements not found. Cannot initialize app.");
    return;
  }

  // Initialize canvas manager
  canvasManager = new CanvasInteractionManager(
    elements.canvasViewport,
    elements.paletteContainer,
  );

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
  elements.configToggleButton.addEventListener("click", () => {
    if (elements.configModal.classList.contains("visible")) {
      closeConfigModal();
    } else {
      openConfigModal();
    }
  });

  elements.closeModalButton.addEventListener("click", closeConfigModal);

  elements.configModal.addEventListener("click", (event) => {
    if (event.target === elements.configModal) {
      closeConfigModal();
    }
  });

  // Palette editor listeners
  function setupPaletteEditorListeners() {
    elements.editPaletteButton?.addEventListener("click", () => {
      openPopoutEditor();
    });

  elements.popoutCloseButton.addEventListener("click", () => {
    elements.popoutEditor.style.display = "none";
  });
}

// Setup control event listeners
function setupControlListeners() {
  // Interpolation controls
  elements.interpolationToggle.addEventListener("change", (event) => {
    setInterpolationEnabled(event.target.checked);
    updatePaletteView();
  });

  elements.stepsSlider.addEventListener("input", (event) => {
    const steps = parseInt(event.target.value, 10);
    setInterpolationSteps(steps);
    elements.stepsNumber.value = steps;
    if (isInterpolationEnabled) {
      updatePaletteView();
    }
  });

  elements.stepsNumber.addEventListener("input", (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(elements.stepsNumber.min, 10);
    const max = parseInt(elements.stepsNumber.max, 10);
    if (isNaN(value)) value = min;
    else if (value < min) value = min;
    else if (value > max) value = max;

    elements.stepsNumber.value = value;
    setInterpolationSteps(value);
    elements.stepsSlider.value = value;
    if (isInterpolationEnabled) {
      updatePaletteView();
    }
  });

  // Saturation controls
  elements.saturationOffsetSlider.addEventListener("input", (event) => {
    const offset = parseInt(event.target.value, 10);
    setSaturationOffset(offset);
    elements.saturationOffsetNumber.value = offset;
    renderPalette(currentGridData);
  });

  elements.saturationOffsetNumber.addEventListener("input", (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(elements.saturationOffsetNumber.min, 10);
    const max = parseInt(elements.saturationOffsetNumber.max, 10);
    if (isNaN(value)) value = 0;
    else if (value < min) value = min;
    else if (value > max) value = max;

    elements.saturationOffsetNumber.value = value;
    setSaturationOffset(value);
    elements.saturationOffsetSlider.value = value;
    renderPalette(currentGridData);
  });

  // Zoom controls
  elements.zoomSlider.addEventListener("input", (event) => {
    const zoomValue = parseInt(event.target.value, 10);
    elements.zoomNumber.value = zoomValue;
    if (canvasManager) {
      canvasManager.setZoomLevel(zoomValue);
    }
  });

  elements.zoomNumber.addEventListener("change", (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(elements.zoomSlider.min, 10);
    const max = parseInt(elements.zoomSlider.max, 10);
    if (isNaN(value)) value = 100;
    value = Math.max(min, Math.min(max, value));

    elements.zoomNumber.value = value;
    elements.zoomSlider.value = value;
    if (canvasManager) {
      canvasManager.setZoomLevel(value);
    }
  });

  // UI Scale controls
  elements.uiScaleNumber.addEventListener("change", (event) => {
    let value = parseInt(event.target.value, 10);
    const min = parseInt(elements.uiScaleNumber.min, 10);
    const max = parseInt(elements.uiScaleNumber.max, 10);
    if (isNaN(value)) value = 100;
    value = Math.max(min, Math.min(max, value));

    elements.uiScaleNumber.value = value;
    setCurrentUiScale(value);
    applyUiScale(value);
  });

  // Color pick toggle
  elements.colorPickToggleButton.addEventListener("click", () => {
    setColorPickingMode(!isColorPickingMode);
    elements.colorPickToggleButton.classList.toggle(
      "active",
      isColorPickingMode,
    );

    if (!isColorPickingMode) {
      clearSelection();
      clearSelectionVisuals();
      // Close color picker if open
      if (elements.colorPickerModal.classList.contains("visible")) {
        closeColorPicker();
      }
    }
  });

  // Export PNG
  elements.exportPngButton.addEventListener("click", exportPNG);
}

// Setup palette editor listeners
function setupPaletteEditorListeners() {
  elements.popoutUpdateButton.addEventListener("click", () => {
    try {
      const textData = elements.popoutPaletteInput.value;
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
    } catch (error) {
      console.error("Error updating palette:", error);
      showPopoutStatus("Error updating palette: " + error.message, true);
    }
  });
}

// Setup state management listeners
function setupStateManagementListeners() {
  elements.saveStateButton.addEventListener("click", saveState);
  elements.resetStateButton.addEventListener("click", resetState);
  elements.exportPaletteButton.addEventListener("click", exportPaletteData);
  elements.importPaletteButton.addEventListener("click", () => {
    elements.importPaletteFileInput.click();
  });
  elements.importPaletteFileInput.addEventListener(
    "change",
    handlePaletteImport,
  );
}

// Setup keyboard event listeners
function setupKeyboardListeners() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
      setShiftHeld(true);
      // Make tooltip interactive if visible
      const paletteTooltip = elements.paletteTooltip;
      if (paletteTooltip && paletteTooltip.style.display === "block") {
        paletteTooltip.classList.add("palette-tooltip--interactive");
      }
    }

    // Handle tooltip hotkeys
    handleTooltipHotkeysCopy(event);

    // Handle modal keyboard navigation
    if (elements.configModal.classList.contains("visible")) {
      handleGlobalKeyDown(event);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
      setShiftHeld(false);
      hidePaletteTooltip();
    }
  });
}

// Setup canvas interaction listeners
function setupCanvasListeners() {
  // The canvas manager handles its own event listeners
  // This is where we could add additional canvas-specific logic if needed
}

// Modal management functions
function openConfigModal() {
  elements.configModal.classList.add("visible");
  elements.configModal.classList.remove("editor-visible");
  elements.configToggleButton.classList.add("active");

  const focusableElements = elements.configModal.querySelectorAll(
    CONSTANTS.FOCUSABLE_MODAL_ELEMENTS_SELECTOR,
  );
  if (focusableElements.length > 0) {
    requestAnimationFrame(() => {
      focusableElements[0].focus();
    });
  }

  document.addEventListener("keydown", handleGlobalKeyDown);
}

function closeConfigModal() {
  elements.configModal.classList.remove("visible");
  elements.configToggleButton.classList.remove("active");
  document.removeEventListener("keydown", handleGlobalKeyDown);
  elements.configToggleButton.focus();
}

function handleGlobalKeyDown(event) {
  if (!elements.configModal.classList.contains("visible")) return;

  if (event.key === "Escape") {
    closeConfigModal();
    return;
  }

  // Focus trap logic would go here
}

// Color picker placeholder functions
function closeColorPicker() {
  elements.colorPickerModal.classList.remove("visible");
}

// Export PNG functionality
function exportPNG() {
  let exportScale = parseFloat(elements.exportScaleInput.value) || 2;
  exportScale = Math.max(1, Math.min(10, exportScale));
  elements.exportScaleInput.value = exportScale;

  console.log(`Exporting PNG with scale: ${exportScale}x`);

  elements.exportPngButton.disabled = true;
  elements.exportPngButton.textContent = "Exporting...";
  elements.exportScaleInput.disabled = true;

  setTimeout(() => {
    // Import html2canvas dynamically if available
    if (typeof html2canvas !== "undefined") {
      const tableBgColor = getComputedStyle(
        elements.paletteContainer,
      ).backgroundColor;

      html2canvas(elements.paletteGrid, {
        backgroundColor: tableBgColor,
        useCORS: true,
        logging: false,
        scale: exportScale,
      })
        .then((canvas) => {
          const pngUrl = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = "palette.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        })
        .catch((err) => {
          console.error("Error exporting PNG:", err);
          alert("Error exporting palette as PNG. See console for details.");
        })
        .finally(() => {
          elements.exportPngButton.disabled = false;
          elements.exportPngButton.textContent = "Export as PNG";
          elements.exportScaleInput.disabled = false;
        });
    } else {
      console.error("html2canvas library not found");
      alert("PNG export requires the html2canvas library to be loaded.");
      elements.exportPngButton.disabled = false;
      elements.exportPngButton.textContent = "Export as PNG";
      elements.exportScaleInput.disabled = false;
    }
  }, 150);
}

// State management functions
function saveState() {
  try {
    const state = {
      sourceGridData,
      isInterpolationEnabled,
      interpolationSteps,
      saturationOffset,
      uiScale: currentUiScale,
      paletteOffsetX: canvasManager
        ? canvasManager.offsetX
        : INITIAL_OFFSETS.PALETTE_OFFSET_X,
      paletteOffsetY: canvasManager
        ? canvasManager.offsetY
        : INITIAL_OFFSETS.PALETTE_OFFSET_Y,
      scale: canvasManager ? canvasManager.scale : 1,
    };

    localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, JSON.stringify(state));
    console.log("Application state saved.");

    // Show feedback
    elements.saveStateButton.textContent = "Saved!";
    setTimeout(() => {
      elements.saveStateButton.textContent = "Save State";
    }, 1500);
  } catch (error) {
    console.error("Error saving state:", error);
    alert("Failed to save state. Check console for details.");
  }
}

function loadState() {
  try {
    const savedState = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
    if (!savedState) {
      console.log("No saved state found.");
      setStateLoadedSuccessfully(false);
      return;
    }

    const state = JSON.parse(savedState);

    // Load non-canvas state
    if (Array.isArray(state.sourceGridData)) {
      sourceGridData.length = 0;
      sourceGridData.push(...state.sourceGridData);
    }

    if (typeof state.isInterpolationEnabled === "boolean") {
      setInterpolationEnabled(state.isInterpolationEnabled);
    }

    if (typeof state.interpolationSteps === "number") {
      setInterpolationSteps(state.interpolationSteps);
    }

    if (typeof state.saturationOffset === "number") {
      setSaturationOffset(state.saturationOffset);
    }

    if (typeof state.uiScale === "number") {
      setCurrentUiScale(state.uiScale);
    }

    // Load canvas state into manager if it exists
    let positionStateLoaded = false;
    if (canvasManager) {
      positionStateLoaded = canvasManager.loadState(state);
    }

    // Center content if no position was loaded
    if (!positionStateLoaded && canvasManager) {
      console.log("No saved position state found, centering palette.");
      canvasManager.centerContent(1.0);
    }

    setStateLoadedSuccessfully(true);
    console.log("Application state loaded successfully.");
  } catch (error) {
    console.error("Error loading state:", error);
    setStateLoadedSuccessfully(false);
  }
}

function resetState() {
  if (confirm("Reset all settings to defaults? This cannot be undone.")) {
    localStorage.removeItem(CONSTANTS.LOCAL_STORAGE_KEY);
    location.reload();
  }
}

// Utility functions
function updateUIControls() {
  elements.interpolationToggle.checked = isInterpolationEnabled;
  elements.stepsSlider.value = interpolationSteps;
  elements.stepsNumber.value = interpolationSteps;
  elements.saturationOffsetSlider.value = saturationOffset;
  elements.saturationOffsetNumber.value = saturationOffset;
  elements.uiScaleNumber.value = currentUiScale;

  if (canvasManager) {
    elements.zoomSlider.value = Math.round(canvasManager.scale * 100);
    elements.zoomNumber.value = Math.round(canvasManager.scale * 100);
  }
}

function showPopoutStatus(message, isError = false) {
  if (elements.popoutStatusMessage) {
    elements.popoutStatusMessage.textContent = message;
    elements.popoutStatusMessage.className = isError
      ? "status-error"
      : "status-success";
    elements.popoutStatusMessage.style.display = "block";

    setTimeout(() => {
      elements.popoutStatusMessage.style.display = "none";
    }, 3000);
  }
}

function exportPaletteData() {
  try {
    const data = convertToSimpleFormat(sourceGridData);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "palette.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error exporting palette:", error);
    alert("Failed to export palette data.");
  }
}

function handlePaletteImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const textData = e.target.result;
      const newGridData = parseSimpleFormat(textData);

      if (newGridData.length === 0) {
        throw new Error("Empty or invalid palette file");
      }

      sourceGridData.length = 0;
      sourceGridData.push(...newGridData);
      setCurrentGridData([...sourceGridData.map((row) => [...row])]);
      updatePaletteView();

      console.log("Palette imported successfully");
      alert("Palette imported successfully!");
    } catch (error) {
      console.error("Error importing palette:", error);
      alert("Failed to import palette: " + error.message);
    }
  };

  reader.onerror = () => {
    console.error("Error reading file");
    alert("Failed to read the selected file.");
  };

  reader.readAsText(file);
  event.target.value = ""; // Reset input
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}

// Export main functions for external access if needed
export { saveState, loadState, resetState };
