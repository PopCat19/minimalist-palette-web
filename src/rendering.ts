// --- Palette Rendering Logic ---

import {
  sourceGridData,
  currentGridData,
  isInterpolationEnabled,
  interpolationSteps,
  saturationOffset,
  selectedCells,
  setCurrentGridData,
  CellPosition,
} from "./state.js";
import {
  isValidHex,
  hexToRgb,
  rgbToHex,
  adjustSaturation,
  getTextColor,
  parseXValue,
  interpolateRgb,
} from "./colorUtils.js";
import { GridData } from "./default-palette.js";

// Generate interpolated palette
export function generateInterpolatedPalette(
  sourceData: GridData,
  steps: number,
): GridData {
  if (!Array.isArray(sourceData) || sourceData.length === 0) {
    console.error("Invalid source data for interpolation");
    return sourceData;
  }

  const interpolatedData: GridData = [];

  sourceData.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) {
      interpolatedData.push(row);
      return;
    }

    // Add the original row
    interpolatedData.push([...row]);

    // Skip interpolation for last row or if steps is 0
    if (rowIndex === sourceData.length - 1 || steps === 0) return;

    const nextRow = sourceData[rowIndex + 1];
    if (!Array.isArray(nextRow)) return;

    // Generate interpolated rows
    for (let step = 1; step <= steps; step++) {
      const factor = step / (steps + 1);
      const interpolatedRow: string[] = [];

      row.forEach((cell, cellIndex) => {
        if (cellIndex >= nextRow.length) {
          interpolatedRow.push("-");
          return;
        }

        const nextCell = nextRow[cellIndex];

        // Handle X-value labels
        const currentX = parseXValue(cell);
        const nextX = parseXValue(nextCell);
        if (currentX !== null && nextX !== null) {
          const interpolatedX = Math.round(
            currentX + (nextX - currentX) * factor,
          );
          interpolatedRow.push(`${interpolatedX}x`);
          return;
        }

        // Handle hex colors
        if (isValidHex(cell) && isValidHex(nextCell)) {
          const currentRgb = hexToRgb(cell);
          const nextRgb = hexToRgb(nextCell);
          if (currentRgb && nextRgb) {
            const interpolatedRgb = interpolateRgb(currentRgb, nextRgb, factor);
            interpolatedRow.push(rgbToHex(interpolatedRgb));
            return;
          }
        }

        // For other cases (labels, invalid data), use placeholder
        interpolatedRow.push("-");
      });

      interpolatedData.push(interpolatedRow);
    }
  });

  return interpolatedData;
}

// Update the palette view based on interpolation state
export function updatePaletteView(): void {
  if (isInterpolationEnabled) {
    setCurrentGridData(
      generateInterpolatedPalette(sourceGridData, interpolationSteps),
    );
  } else {
    // Reset to a fresh copy of the source data
    setCurrentGridData(sourceGridData.map((row) => [...row]));
  }
  // Render the potentially interpolated grid
  renderPalette(currentGridData);
}

// Apply selection styles to a cell
export function applySelectionStyles(coords: CellPosition): void {
  const { row: rowIndex, col: cellIndex } = coords;
  const paletteGrid = document.getElementById("palette-grid");
  const cellDiv = paletteGrid?.querySelector(
    `.cell-content[data-row-index="${rowIndex}"][data-cell-index="${cellIndex}"]`,
  ) as HTMLElement;
  if (cellDiv) {
    cellDiv.classList.add("selected");
    cellDiv.style.boxShadow = `inset 0 0 0 3px var(--color-rose-pine-iris)`;
  }
}

// Clear selection visuals and state
export function clearSelectionVisuals(): void {
  const paletteGrid = document.getElementById("palette-grid");
  selectedCells.forEach((coord) => {
    const cellDiv = paletteGrid?.querySelector(
      `.cell-content[data-row-index="${coord.row}"][data-cell-index="${coord.col}"]`,
    ) as HTMLElement;
    if (cellDiv) {
      cellDiv.classList.remove("selected");
      cellDiv.style.boxShadow = "none";
    }
  });
}

// Main palette rendering function
export function renderPalette(gridData: GridData): void {
  const paletteGrid = document.getElementById("palette-grid");
  if (!paletteGrid) {
    console.error("Palette grid element not found");
    return;
  }

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
      const cellContentDiv = document.createElement("div");
      cellContentDiv.classList.add("cell-content");
      paletteGrid.appendChild(cellContentDiv);

      const isInterpolatedLabelPlaceholder = cellData === "-";
      // Add data attributes for easy access to coordinates
      cellContentDiv.dataset.rowIndex = rowIndex.toString();
      cellContentDiv.dataset.cellIndex = cellIndex.toString();

      if (isValidHex(cellData)) {
        renderSwatchCell(cellContentDiv, cellData, rowIndex, cellIndex);
      } else if (typeof cellData === "string") {
        renderLabelCell(
          cellContentDiv,
          cellData,
          isInterpolatedLabelPlaceholder,
          cellIndex,
          rowData,
          rowIndex,
          gridData,
        );
      } else {
        renderInvalidCell(cellContentDiv, cellData, rowIndex, cellIndex);
      }
    });
  });
}

// Render a swatch (color) cell
function renderSwatchCell(
  cellContentDiv: HTMLElement,
  cellData: string,
  rowIndex: number,
  cellIndex: number,
): void {
  const originalHexColor = cellData;
  // Apply saturation offset for display only
  const adjustedHexColor = adjustSaturation(originalHexColor, saturationOffset);
  const adjustedHexText = adjustedHexColor.substring(1).toUpperCase();
  const textColor = getTextColor(adjustedHexColor);

  cellContentDiv.style.backgroundColor = adjustedHexColor;
  cellContentDiv.textContent = adjustedHexText;
  cellContentDiv.style.color = textColor;
  cellContentDiv.classList.add("swatch");

  // Store original hex from source data if applicable
  if (
    rowIndex < sourceGridData.length &&
    cellIndex < sourceGridData[rowIndex].length
  ) {
    cellContentDiv.dataset.sourceHex = sourceGridData[rowIndex][cellIndex];
  } else {
    cellContentDiv.dataset.sourceHex = originalHexColor;
  }

  // Apply initial selected style if cell is in selectedCells
  if (
    selectedCells.some(
      (coord) => coord.row === rowIndex && coord.col === cellIndex,
    )
  ) {
    cellContentDiv.classList.add("selected");
    cellContentDiv.style.boxShadow = `inset 0 0 0 3px var(--color-rose-pine-iris)`;
  }

  // Setup event listeners for this swatch cell
  // Note: interactions.js will be loaded separately - this is handled by the main module loader
}

// Render a label cell
function renderLabelCell(
  cellContentDiv: HTMLElement,
  cellData: string,
  isInterpolatedLabelPlaceholder: boolean,
  cellIndex: number,
  rowData: string[],
  rowIndex: number,
  gridData: GridData,
): void {
  cellContentDiv.textContent = cellData;
  cellContentDiv.classList.add("label");

  if (isInterpolatedLabelPlaceholder) {
    cellContentDiv.classList.add("interpolated-label");
  } else {
    cellContentDiv.style.color = getTextColor("#2a2a2a");
    if (
      cellIndex === 0 ||
      cellIndex === rowData.length - 1 ||
      rowIndex === 0 ||
      rowIndex === gridData.length - 1
    ) {
      cellContentDiv.classList.add("legend-label");
    }
  }

  // Prevent labels from being selectable
  cellContentDiv.style.pointerEvents = "none";
}

// Render an invalid cell
function renderInvalidCell(
  cellContentDiv: HTMLElement,
  cellData: unknown,
  rowIndex: number,
  cellIndex: number,
): void {
  console.warn(
    `Invalid cell data type at row ${rowIndex}, cell ${cellIndex}:`,
    typeof cellData,
    cellData,
  );
  cellContentDiv.textContent = "?";
  cellContentDiv.style.backgroundColor = "#555";
  cellContentDiv.style.color = "var(--color-rose-pine-text)";
  cellContentDiv.classList.add("invalid");
  cellContentDiv.style.pointerEvents = "none";
}
