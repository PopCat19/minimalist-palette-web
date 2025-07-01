// Import/Export Module
// Handles palette data import/export functionality

import { convertToSimpleFormat, parseSimpleFormat } from "./domUtils.js";
import { sourceGridData, currentGridData, setSourceGridData } from "./state.js";
import { GridData } from "./default-palette.js";

// Type declarations for external modules
declare function renderPalette(gridData: GridData): void;

// DOM Elements
let exportPaletteButton: HTMLButtonElement | null;
let importPaletteButton: HTMLButtonElement | null;
let importPaletteFileInput: HTMLInputElement | null;
let exportPngButton: HTMLButtonElement | null;
let exportScaleInput: HTMLInputElement | null;
let popoutEditor: HTMLElement | null;
let popoutPaletteInput: HTMLTextAreaElement | null;

// html2canvas type declaration
declare global {
  interface Window {
    html2canvas?: (
      element: HTMLElement,
      options?: any,
    ) => Promise<HTMLCanvasElement>;
  }
}

// Initialize import/export functionality
export function initImportExport(): void {
  // Get DOM elements
  exportPaletteButton = document.getElementById(
    "export-palette-button",
  ) as HTMLButtonElement | null;
  importPaletteButton = document.getElementById(
    "import-palette-button",
  ) as HTMLButtonElement | null;
  importPaletteFileInput = document.getElementById(
    "import-palette-file-input",
  ) as HTMLInputElement | null;
  exportPngButton = document.getElementById(
    "export-png-button",
  ) as HTMLButtonElement | null;
  exportScaleInput = document.getElementById(
    "export-scale-input",
  ) as HTMLInputElement | null;
  popoutEditor = document.getElementById("popout-editor");
  popoutPaletteInput = document.getElementById(
    "popout-palette-input",
  ) as HTMLTextAreaElement | null;

  // Setup event listeners
  setupImportExportEventListeners();
}

// Setup event listeners
function setupImportExportEventListeners(): void {
  // Export palette button
  if (exportPaletteButton) {
    exportPaletteButton.addEventListener("click", exportPaletteData);
  }

  // Import palette button
  if (importPaletteButton) {
    importPaletteButton.addEventListener("click", () => {
      importPaletteFileInput?.click();
    });
  }

  // File input change
  if (importPaletteFileInput) {
    importPaletteFileInput.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        handlePaletteImport(file);
        target.value = ""; // Reset input for re-selection
      }
    });
  }

  // Export PNG button
  if (exportPngButton) {
    exportPngButton.addEventListener("click", exportPNG);
  }
}

// Export palette data as text file
export function exportPaletteData(): void {
  if (!exportPaletteButton) return;

  const originalButtonText =
    exportPaletteButton.textContent || "Export Palette";
  let exportSuccess = false;

  try {
    const paletteText = convertToSimpleFormat(sourceGridData);
    const blob = new Blob([paletteText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "minimalist-palette.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(url);

    console.log("Palette data exported.");
    exportSuccess = true;
  } catch (error) {
    console.error("Error exporting palette data:", error);
    exportSuccess = false;
  }

  // Provide visual feedback
  if (exportSuccess) {
    exportPaletteButton.textContent = "Exported!";
    exportPaletteButton.classList.remove("error");
    exportPaletteButton.classList.add("success");
    setTimeout(() => {
      if (exportPaletteButton) {
        exportPaletteButton.textContent = originalButtonText;
        exportPaletteButton.classList.remove("success");
      }
    }, 1500);
  } else {
    exportPaletteButton.textContent = "Failed to Export";
    exportPaletteButton.classList.remove("success");
    exportPaletteButton.classList.add("error");
    setTimeout(() => {
      if (exportPaletteButton) {
        exportPaletteButton.textContent = originalButtonText;
        exportPaletteButton.classList.remove("error");
      }
    }, 2000);
  }
}

// Import palette from file
export function handlePaletteImport(file: File): void {
  if (!importPaletteButton) return;

  const originalButtonText =
    importPaletteButton.textContent || "Import Palette";
  let importSuccess = false;

  if (!file || !file.type.match("text.*")) {
    console.warn("No text file selected or file type not supported.");
    importPaletteButton.textContent = "Invalid File";
    importPaletteButton.classList.add("error");
    setTimeout(() => {
      if (importPaletteButton) {
        importPaletteButton.textContent = originalButtonText;
        importPaletteButton.classList.remove("error");
      }
    }, 2000);
    return;
  }

  const reader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    try {
      const textData = event.target?.result as string;
      const newDataParsed = parseSimpleFormat(textData);

      if (
        !Array.isArray(newDataParsed) ||
        newDataParsed.length === 0 ||
        !Array.isArray(newDataParsed[0])
      ) {
        throw new Error("Imported data is not a valid grid. Check format.");
      }

      // Basic validation
      const firstRow = newDataParsed[0];
      const lastRow = newDataParsed[newDataParsed.length - 1];

      if (
        firstRow[0] !== lastRow[0] ||
        firstRow[firstRow.length - 1] !== lastRow[lastRow.length - 1]
      ) {
        console.warn(
          "Imported data format warning: First/last cells of first row may not be labels.",
        );
      }

      // Update data
      setSourceGridData(newDataParsed);
      renderPalette(currentGridData);

      console.log("Palette data imported from file:", file.name);
      importSuccess = true;

      // Update popout editor if open
      if (
        popoutEditor &&
        popoutEditor.style.display === "flex" &&
        popoutPaletteInput
      ) {
        popoutPaletteInput.value = convertToSimpleFormat(sourceGridData);
      }
    } catch (error) {
      console.error("Error parsing or processing imported file:", error);
      importSuccess = false;
    }

    // Provide visual feedback
    if (importSuccess && importPaletteButton) {
      importPaletteButton.textContent = "Imported!";
      importPaletteButton.classList.remove("error");
      importPaletteButton.classList.add("success");
      setTimeout(() => {
        if (importPaletteButton) {
          importPaletteButton.textContent = originalButtonText;
          importPaletteButton.classList.remove("success");
        }
      }, 1500);
    } else if (importPaletteButton) {
      importPaletteButton.textContent = "Import Failed";
      importPaletteButton.classList.remove("success");
      importPaletteButton.classList.add("error");
      setTimeout(() => {
        if (importPaletteButton) {
          importPaletteButton.textContent = originalButtonText;
          importPaletteButton.classList.remove("error");
        }
      }, 2000);
    }
  };

  reader.onerror = (event: ProgressEvent<FileReader>) => {
    console.error("File reading error:", event.target?.error);
    importSuccess = false;

    if (importPaletteButton) {
      importPaletteButton.textContent = "Read Error";
      importPaletteButton.classList.remove("success");
      importPaletteButton.classList.add("error");
      setTimeout(() => {
        if (importPaletteButton) {
          importPaletteButton.textContent = originalButtonText;
          importPaletteButton.classList.remove("error");
        }
      }, 2000);
    }
  };

  reader.readAsText(file);
}

// Export palette as PNG
export function exportPNG(): void {
  // Get html2canvas if available
  if (typeof window.html2canvas === "undefined") {
    console.error("html2canvas library not loaded");
    alert("PNG export requires html2canvas library");
    return;
  }

  // Read scale from input
  let exportScale = parseFloat(exportScaleInput?.value || "2") || 2;
  exportScale = Math.max(1, Math.min(10, exportScale));

  if (exportScaleInput) {
    exportScaleInput.value = exportScale.toString();
  }

  console.log(`Exporting PNG with scale: ${exportScale}x`);

  // Disable button temporarily
  if (exportPngButton) {
    exportPngButton.disabled = true;
    exportPngButton.textContent = "Exporting...";
  }
  if (exportScaleInput) {
    exportScaleInput.disabled = true;
  }

  // Get palette grid element
  const paletteGrid = document.getElementById("palette-grid");
  if (!paletteGrid) {
    console.error("Palette grid element not found");
    resetExportButton();
    return;
  }

  // Get background color
  const paletteContainer = document.getElementById("palette-container");
  const computedStyle = window.getComputedStyle(
    paletteContainer || paletteGrid,
  );
  const tableBgColor = computedStyle.backgroundColor || "#ffffff";

  // Slight delay to allow UI to settle
  setTimeout(() => {
    window.html2canvas!(paletteGrid, {
      backgroundColor: tableBgColor,
      useCORS: true,
      logging: false,
      scale: exportScale,
    })
      .then((canvas: HTMLCanvasElement) => {
        // Convert to blob and download
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = "minimalist-palette.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
            console.log("PNG exported successfully.");
          }
        }, "image/png");
      })
      .catch((err: Error) => {
        console.error("Error exporting PNG:", err);
        alert("Error exporting palette as PNG. See console for details.");
      })
      .finally(() => {
        resetExportButton();
      });
  }, 100);
}

// Reset export button state
function resetExportButton(): void {
  if (exportPngButton) {
    exportPngButton.disabled = false;
    exportPngButton.textContent = "Export as PNG";
  }
  if (exportScaleInput) {
    exportScaleInput.disabled = false;
  }
}
