// --- DOM Manipulation Utilities ---

// Type definitions for DOM elements
export interface DOMElements {
  // Palette display elements
  canvasViewport: HTMLElement | null;
  paletteContainer: HTMLElement | null;
  paletteGrid: HTMLElement | null;

  // Config Modal elements
  configToggleButton: HTMLButtonElement | null;
  configModal: HTMLElement | null;
  closeModalButton: HTMLButtonElement | null;
  editPaletteButton: HTMLButtonElement | null;
  paletteEditorSection: HTMLElement | null;
  paletteInput: HTMLTextAreaElement | null;
  updateButton: HTMLButtonElement | null;
  exportPngButton: HTMLButtonElement | null;
  exportScaleInput: HTMLInputElement | null;

  // Adjustment controls
  interpolationToggle: HTMLInputElement | null;
  interpolationStepsGroup: HTMLElement | null;
  stepsSlider: HTMLInputElement | null;
  stepsNumber: HTMLInputElement | null;
  saturationOffsetSlider: HTMLInputElement | null;
  saturationOffsetNumber: HTMLInputElement | null;

  // Zoom controls
  zoomSlider: HTMLInputElement | null;
  zoomNumber: HTMLInputElement | null;

  // UI Scale controls
  uiScaleNumber: HTMLInputElement | null;

  // Generate X Row elements
  generateXValueInput: HTMLInputElement | null;
  generateRef1ValueInput: HTMLInputElement | null;
  generateRef2ValueInput: HTMLInputElement | null;
  generateXButton: HTMLButtonElement | null;

  // Popout Editor elements
  popoutEditor: HTMLElement | null;
  popoutHeader: HTMLElement | null;
  popoutCloseButton: HTMLButtonElement | null;
  popoutPaletteInput: HTMLTextAreaElement | null;
  popoutUpdateButton: HTMLButtonElement | null;
  popoutResizeHandle: HTMLElement | null;
  popoutStatusMessage: HTMLElement | null;

  // State management buttons
  saveStateButton: HTMLButtonElement | null;
  resetStateButton: HTMLButtonElement | null;

  // Palette import/export elements
  exportPaletteButton: HTMLButtonElement | null;
  importPaletteButton: HTMLButtonElement | null;
  importPaletteFileInput: HTMLInputElement | null;

  // Color Picker Modal elements
  colorPickerModal: HTMLElement | null;
  colorPickerCloseButton: HTMLButtonElement | null;
  colorPickerPreview: HTMLElement | null;
  pickerHueSlider: HTMLInputElement | null;
  pickerHueNumber: HTMLInputElement | null;
  pickerSatSlider: HTMLInputElement | null;
  pickerSatNumber: HTMLInputElement | null;
  pickerLumSlider: HTMLInputElement | null;
  pickerLumNumber: HTMLInputElement | null;
  pickerHexInput: HTMLInputElement | null;
  pickerCopyHexButton: HTMLButtonElement | null;
  pickerCancelButton: HTMLButtonElement | null;
  pickerApplyButton: HTMLButtonElement | null;

  // Color pick toggle button
  colorPickToggleButton: HTMLButtonElement | null;
  colorPickerHeader: HTMLElement | null;
  colorPickerResizeHandle: HTMLElement | null;

  // Tooltip elements
  paletteTooltip: HTMLElement | null;
  tooltipHexValue: HTMLElement | null;
  tooltipHslValue: HTMLElement | null;
  tooltipRgbValue: HTMLElement | null;
}

export interface EventCoordinates {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface ElementBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export interface FocusTrapElements {
  firstFocusableElement: HTMLElement | null;
  lastFocusableElement: HTMLElement | null;
}

// Get DOM element references
export function getDOMElements(): DOMElements {
  return {
    // Palette display elements
    canvasViewport: document.getElementById("canvas-viewport"),
    paletteContainer: document.getElementById("palette-container"),
    paletteGrid: document.getElementById("palette-grid"),

    // Config Modal elements
    configToggleButton: document.getElementById(
      "config-toggle-button",
    ) as HTMLButtonElement | null,
    configModal: document.getElementById("config-modal"),
    closeModalButton: document.querySelector(
      "#config-modal .modal-close-button",
    ) as HTMLButtonElement | null,
    editPaletteButton: document.getElementById(
      "edit-palette-button",
    ) as HTMLButtonElement | null,
    paletteEditorSection: document.getElementById("palette-editor-section"),
    paletteInput: document.getElementById(
      "palette-input",
    ) as HTMLTextAreaElement | null,
    updateButton: document.getElementById(
      "update-button",
    ) as HTMLButtonElement | null,
    exportPngButton: document.getElementById(
      "export-png-button",
    ) as HTMLButtonElement | null,
    exportScaleInput: document.getElementById(
      "export-scale-input",
    ) as HTMLInputElement | null,

    // Adjustment controls
    interpolationToggle: document.getElementById(
      "interpolation-toggle",
    ) as HTMLInputElement | null,
    interpolationStepsGroup: document.getElementById(
      "interpolation-steps-group",
    ),
    stepsSlider: document.getElementById(
      "interpolation-steps-slider",
    ) as HTMLInputElement | null,
    stepsNumber: document.getElementById(
      "interpolation-steps-number",
    ) as HTMLInputElement | null,
    saturationOffsetSlider: document.getElementById(
      "saturation-offset-slider",
    ) as HTMLInputElement | null,
    saturationOffsetNumber: document.getElementById(
      "saturation-offset-number",
    ) as HTMLInputElement | null,

    // Zoom controls
    zoomSlider: document.getElementById(
      "zoom-slider",
    ) as HTMLInputElement | null,
    zoomNumber: document.getElementById(
      "zoom-number",
    ) as HTMLInputElement | null,

    // UI Scale controls
    uiScaleNumber: document.getElementById(
      "ui-scale-number",
    ) as HTMLInputElement | null,

    // Generate X Row elements
    generateXValueInput: document.getElementById(
      "generate-x-value",
    ) as HTMLInputElement | null,
    generateRef1ValueInput: document.getElementById(
      "generate-ref1-value",
    ) as HTMLInputElement | null,
    generateRef2ValueInput: document.getElementById(
      "generate-ref2-value",
    ) as HTMLInputElement | null,
    generateXButton: document.getElementById(
      "generate-x-button",
    ) as HTMLButtonElement | null,

    // Popout Editor elements
    popoutEditor: document.getElementById("popout-editor"),
    popoutHeader: document.querySelector("#popout-editor .popout-header"),
    popoutCloseButton: document.getElementById(
      "popout-close-button",
    ) as HTMLButtonElement | null,
    popoutPaletteInput: document.getElementById(
      "popout-palette-input",
    ) as HTMLTextAreaElement | null,
    popoutUpdateButton: document.getElementById(
      "popout-update-button",
    ) as HTMLButtonElement | null,
    popoutResizeHandle: document.getElementById("popout-resize-handle"),
    popoutStatusMessage: document.getElementById("popout-status-message"),

    // State management buttons
    saveStateButton: document.getElementById(
      "save-state-button",
    ) as HTMLButtonElement | null,
    resetStateButton: document.getElementById(
      "reset-state-button",
    ) as HTMLButtonElement | null,

    // Palette import/export elements
    exportPaletteButton: document.getElementById(
      "export-palette-button",
    ) as HTMLButtonElement | null,
    importPaletteButton: document.getElementById(
      "import-palette-button",
    ) as HTMLButtonElement | null,
    importPaletteFileInput: document.getElementById(
      "import-palette-file-input",
    ) as HTMLInputElement | null,

    // Color Picker Modal elements
    colorPickerModal: document.getElementById("color-picker-modal"),
    colorPickerCloseButton: document.getElementById(
      "color-picker-close-button",
    ) as HTMLButtonElement | null,
    colorPickerPreview: document.getElementById("color-picker-preview"),
    pickerHueSlider: document.getElementById(
      "picker-hue-slider",
    ) as HTMLInputElement | null,
    pickerHueNumber: document.getElementById(
      "picker-hue-number",
    ) as HTMLInputElement | null,
    pickerSatSlider: document.getElementById(
      "picker-sat-slider",
    ) as HTMLInputElement | null,
    pickerSatNumber: document.getElementById(
      "picker-sat-number",
    ) as HTMLInputElement | null,
    pickerLumSlider: document.getElementById(
      "picker-lum-slider",
    ) as HTMLInputElement | null,
    pickerLumNumber: document.getElementById(
      "picker-lum-number",
    ) as HTMLInputElement | null,
    pickerHexInput: document.getElementById(
      "picker-hex-input",
    ) as HTMLInputElement | null,
    pickerCopyHexButton: document.getElementById(
      "picker-copy-hex-button",
    ) as HTMLButtonElement | null,
    pickerCancelButton: document.getElementById(
      "picker-cancel-button",
    ) as HTMLButtonElement | null,
    pickerApplyButton: document.getElementById(
      "picker-apply-button",
    ) as HTMLButtonElement | null,

    // Color pick toggle button
    colorPickToggleButton: document.getElementById(
      "color-pick-toggle-button",
    ) as HTMLButtonElement | null,
    colorPickerHeader: document.querySelector(
      "#color-picker-modal .color-picker-header",
    ),
    colorPickerResizeHandle: document.getElementById(
      "color-picker-resize-handle",
    ),

    // Tooltip elements
    paletteTooltip: document.getElementById("palette-tooltip"),
    tooltipHexValue: document.querySelector(
      "#palette-tooltip #tooltip-hex span",
    ),
    tooltipHslValue: document.querySelector(
      "#palette-tooltip #tooltip-hsl span",
    ),
    tooltipRgbValue: document.querySelector(
      "#palette-tooltip #tooltip-rgb span",
    ),
  };
}

// Get event coordinates (mouse or touch)
export function getEventCoords(
  event: MouseEvent | TouchEvent,
): EventCoordinates {
  if (event.type.startsWith("touch")) {
    const touchEvent = event as TouchEvent;
    const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  const mouseEvent = event as MouseEvent;
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
}

// Apply UI scale to the document
export function applyUiScale(scalePercent: number): number {
  const clampedScale = Math.max(50, Math.min(200, scalePercent));
  const scaleFactor = clampedScale / 100;

  // Apply CSS custom property for UI scaling
  document.documentElement.style.setProperty(
    "--ui-scale",
    scaleFactor.toString(),
  );

  return clampedScale;
}

// Clipboard functionality
export async function copyToClipboard(
  text: string,
  element?: HTMLElement,
): Promise<void> {
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
      } else if (element) {
        const originalText = element.textContent;
        element.textContent = "Copied!";
        setTimeout(() => {
          element.textContent = originalText;
        }, 1000);
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      alert(
        "Failed to copy. Your browser might not support this feature or require specific permissions.",
      );
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    if (element && element.classList.contains("cell-content")) {
      showCopiedFeedback(element);
    } else if (element) {
      const originalText = element.textContent;
      element.textContent = "Copied!";
      setTimeout(() => {
        element.textContent = originalText;
      }, 1000);
    }
  } catch (err) {
    console.error("Failed to copy text: ", err);
    alert("Failed to copy.");
  }
}

// Show copied feedback on element
export function showCopiedFeedback(element: HTMLElement): void {
  element.classList.add("copied");
  setTimeout(() => element.classList.remove("copied"), 1000);
}

// Convert grid data to simple text format
export function convertToSimpleFormat(gridData: string[][]): string {
  return gridData.map((row) => row.join(" ")).join("\n");
}

// Parse simple text format to grid data
export function parseSimpleFormat(textData: string): string[][] {
  const lines = textData.trim().split("\n");
  return lines.map((line) => {
    return line
      .trim()
      .split(" ")
      .filter((cell) => cell !== "");
  });
}

// Focus management for modals
export function setupFocusTrap(
  modal: HTMLElement,
  focusableElementsSelector: string,
): FocusTrapElements {
  const focusableElements = modal.querySelectorAll(
    focusableElementsSelector,
  ) as NodeListOf<HTMLElement>;
  if (focusableElements.length > 0) {
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    // Focus the first element after a frame to ensure it's visible
    requestAnimationFrame(() => {
      firstFocusableElement.focus();
    });

    return { firstFocusableElement, lastFocusableElement };
  }
  return { firstFocusableElement: null, lastFocusableElement: null };
}

// Handle focus trap keyboard navigation
export function handleFocusTrapKeydown(
  event: KeyboardEvent,
  firstFocusableElement: HTMLElement | null,
  lastFocusableElement: HTMLElement | null,
  modal: HTMLElement,
): void {
  if (event.key === "Tab") {
    if (!firstFocusableElement) return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement?.focus();
        event.preventDefault();
      }
    } else {
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
export function snapPosition(
  position: Position,
  snapThreshold: number,
  snapGap: number,
  containerSize: Size,
): Position {
  const { x, y } = position;
  const { width, height } = containerSize;

  let snappedX = x;
  let snappedY = y;

  // Snap to edges
  if (Math.abs(x) < snapThreshold) snappedX = snapGap;
  if (Math.abs(x - (width - snapGap)) < snapThreshold)
    snappedX = width - snapGap;
  if (Math.abs(y) < snapThreshold) snappedY = snapGap;
  if (Math.abs(y - (height - snapGap)) < snapThreshold)
    snappedY = height - snapGap;

  return { x: snappedX, y: snappedY };
}

// Get computed style value
export function getComputedStyleValue(
  element: HTMLElement,
  property: string,
): string {
  return getComputedStyle(element).getPropertyValue(property);
}

// Create and trigger download
export function triggerDownload(
  data: string,
  filename: string,
  mimeType: string = "text/plain",
): void {
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
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get element bounds relative to viewport
export function getElementBounds(element: HTMLElement): ElementBounds {
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
