// --- Mouse/Touch Interaction Handling ---

import { CONSTANTS } from "./config.js";

import {
  sourceGridData,
  isPanning,
  pointerHasMoved,
  pointerDownPos,
  touchEventHandled,
  isColorPickingMode,
  isInterpolationEnabled,
  selectedCells,
  selectionAnchor,
  isAwaitingRangeEndTap,
  paletteOffsetX,
  paletteOffsetY,
  scale,
  startX,
  startY,
  currentX,
  currentY,
  setPanning,
  setPanCoords,
  setPaletteOffset,
  setPointerState,
  setTouchEventHandled,
  setSelectedCells,
  setSelectionAnchor,
  setAwaitingRangeEndTap,
  clearSelection,
  CellPosition,
} from "./state.js";
import { isValidHex, hexToHsl, HSL } from "./colorUtils.js";
import { getEventCoords } from "./domUtils.js";
import { applySelectionStyles, clearSelectionVisuals } from "./rendering.js";
import { updateAndShowPaletteTooltip, hidePaletteTooltip } from "./tooltips.js";
import { copyToClipboard } from "./domUtils.js";
import { isMouseOverTooltip, allowTooltipInteraction } from "./state.js";

// Start panning operation
export function startPan(event: MouseEvent | TouchEvent): void {
  const canvasViewport = document.getElementById("canvas-viewport");
  if (!canvasViewport) return;

  // Don't pan if clicking on interactive elements within the viewport
  const target = event.target as HTMLElement;
  const targetIsSwatch =
    target.classList.contains("cell-content") &&
    target.classList.contains("swatch");
  if (
    target.closest("#popout-editor") ||
    target.closest("#color-picker-modal") ||
    (CONSTANTS.IS_TOUCH_DEVICE && isColorPickingMode && targetIsSwatch)
  ) {
    return;
  }

  setPanning(true);
  const coords = getEventCoords(event);
  setPanCoords({
    startX: coords.x,
    startY: coords.y,
    currentX: coords.x,
    currentY: coords.y,
  });

  // Store pointer down position and reset move flag
  setPointerState(false, { x: coords.x, y: coords.y });

  canvasViewport.classList.add("grabbing");
  event.preventDefault();
}

// Handle pan movement
export function panMove(event: MouseEvent | TouchEvent): void {
  if (!isPanning) return;

  event.preventDefault();
  const coords = getEventCoords(event);
  setPanCoords({
    startX: startX,
    startY: startY,
    currentX: coords.x,
    currentY: coords.y,
  });

  // Check if pointer has moved beyond threshold
  if (!pointerHasMoved) {
    const dxAbs = Math.abs(coords.x - pointerDownPos.x);
    const dyAbs = Math.abs(coords.y - pointerDownPos.y);
    if (dxAbs > CONSTANTS.DRAG_THRESHOLD || dyAbs > CONSTANTS.DRAG_THRESHOLD) {
      setPointerState(true);
    }
  }

  const dx = coords.x - startX;
  const dy = coords.y - startY;

  setPaletteOffset(paletteOffsetX + dx, paletteOffsetY + dy);
  updateTransform();

  // Update start for next move delta
  setPanCoords({ startX: coords.x, startY: coords.y, currentX, currentY });
}

// End panning operation
export function endPan(): void {
  const canvasViewport = document.getElementById("canvas-viewport");
  if (!canvasViewport) return;

  if (isPanning) {
    setPanning(false);
    canvasViewport.classList.remove("grabbing");

    // Reset pointerHasMoved after potential click/touchend handlers might have checked it
    setTimeout(() => {
      setPointerState(false);
    }, 50);
  }

  // Reset touch flags regardless
  setTouchEventHandled(false);
  setAwaitingRangeEndTap(false);
}

// Update transform for palette container
export function updateTransform(): void {
  const paletteContainer = document.getElementById("palette-container");
  if (!paletteContainer) return;
  paletteContainer.style.transform = `translate(${paletteOffsetX}px, ${paletteOffsetY}px) scale(${scale})`;
}

// Handle swatch selection logic
export function handleSwatchSelection(
  event: MouseEvent | TouchEvent,
  rowIndex: number,
  colIndex: number,
  clickedHsl: HSL,
): void {
  const isMultiSelectIntent =
    (event.type === "touchend" &&
      CONSTANTS.IS_TOUCH_DEVICE &&
      isColorPickingMode) ||
    (event.type === "click" &&
      !CONSTANTS.IS_TOUCH_DEVICE &&
      (event as MouseEvent).shiftKey &&
      !(event as MouseEvent).ctrlKey);

  const existingIndex = selectedCells.findIndex(
    (coord) => coord.row === rowIndex && coord.col === colIndex,
  );
  const paletteGrid = document.getElementById("palette-grid");
  const targetDiv = paletteGrid?.querySelector(
    `.cell-content[data-row-index="${rowIndex}"][data-cell-index="${colIndex}"]`,
  ) as HTMLElement;

  if (!targetDiv) return;

  if (isMultiSelectIntent) {
    if (existingIndex > -1) {
      // Already selected, deselect it
      const newSelectedCells = [...selectedCells];
      newSelectedCells.splice(existingIndex, 1);
      setSelectedCells(newSelectedCells);

      targetDiv.classList.remove("selected");
      targetDiv.style.boxShadow = "none";

      // If we just deselected the anchor, clear the anchor
      if (
        selectionAnchor &&
        selectionAnchor.row === rowIndex &&
        selectionAnchor.col === colIndex
      ) {
        setSelectionAnchor(null);
      }

      // If selection is empty, reset anchor
      if (selectedCells.length === 0) {
        setSelectionAnchor(null);
      }
    } else {
      // Not selected, try to add
      if (selectedCells.length === 0) {
        // First selection
        setSelectedCells([{ row: rowIndex, col: colIndex }]);
        applySelectionStyles({ row: rowIndex, col: colIndex });
      } else {
        // Check S/L similarity with the first selected cell
        const firstSelectedCoords = selectedCells[0];
        if (
          firstSelectedCoords.row >= sourceGridData.length ||
          firstSelectedCoords.col >=
            sourceGridData[firstSelectedCoords.row].length
        ) {
          console.warn(
            "First selected cell out of bounds during multi-select add. Clearing.",
          );
          clearSelection();
          setSelectedCells([{ row: rowIndex, col: colIndex }]);
          setSelectionAnchor({ row: rowIndex, col: colIndex });
          applySelectionStyles({ row: rowIndex, col: colIndex });
          return;
        }

        const firstSelectedHex =
          sourceGridData[firstSelectedCoords.row][firstSelectedCoords.col];
        const firstSelectedHsl = hexToHsl(firstSelectedHex);

        if (firstSelectedHsl) {
          const sDiff = Math.abs(clickedHsl.s - firstSelectedHsl.s);
          const lDiff = Math.abs(clickedHsl.l - firstSelectedHsl.l);

          if (
            sDiff <= CONSTANTS.MULTI_SELECT_TOLERANCE ||
            lDiff <= CONSTANTS.MULTI_SELECT_TOLERANCE
          ) {
            const newSelectedCells = [
              ...selectedCells,
              { row: rowIndex, col: colIndex },
            ];
            setSelectedCells(newSelectedCells);
            applySelectionStyles({ row: rowIndex, col: colIndex });
          } else {
            // Start new selection with this cell
            console.log(
              "New selection started: Dissimilar color added via Shift+Click/Tap.",
            );
            clearSelection();
            setSelectedCells([{ row: rowIndex, col: colIndex }]);
            setSelectionAnchor({ row: rowIndex, col: colIndex });
            applySelectionStyles({ row: rowIndex, col: colIndex });
          }
        } else {
          console.warn(
            "Could not get HSL for first selected cell during multi-select check.",
          );
          clearSelection();
          setSelectedCells([{ row: rowIndex, col: colIndex }]);
          setSelectionAnchor({ row: rowIndex, col: colIndex });
          applySelectionStyles({ row: rowIndex, col: colIndex });
        }
      }
    }
  } else {
    // Not a multi-select intent - standard single select
    console.warn("handleSwatchSelection called without multi-select intent.");
    clearSelection();
    setSelectedCells([{ row: rowIndex, col: colIndex }]);
    setSelectionAnchor({ row: rowIndex, col: colIndex });
    applySelectionStyles({ row: rowIndex, col: colIndex });
  }
}

// Setup swatch event listeners
export function setupSwatchEventListeners(
  cellContentDiv: HTMLElement,
  originalHexColor: string,
  _rowIndex: number,
  _cellIndex: number,
): void {
  // Tooltip listeners
  cellContentDiv.addEventListener("mouseenter", (event: MouseEvent) => {
    const hexForTooltip = cellContentDiv.dataset.sourceHex || originalHexColor;
    if (isValidHex(hexForTooltip)) {
      updateAndShowPaletteTooltip(hexForTooltip, event, cellContentDiv);
    }
  });

  cellContentDiv.addEventListener("mouseleave", () => {
    if (!allowTooltipInteraction && !isMouseOverTooltip) {
      hidePaletteTooltip();
    }
  });

  cellContentDiv.addEventListener("mousemove", (event: MouseEvent) => {
    const paletteTooltip = document.getElementById("palette-tooltip");
    if (paletteTooltip && paletteTooltip.style.display === "block") {
      if (
        (allowTooltipInteraction && !isMouseOverTooltip) ||
        !allowTooltipInteraction
      ) {
        const hexForTooltip =
          cellContentDiv.dataset.sourceHex || originalHexColor;
        if (isValidHex(hexForTooltip)) {
          updateAndShowPaletteTooltip(hexForTooltip, event, cellContentDiv);
        }
      }
    }
  });

  // Touch end listener for touch devices
  if (CONSTANTS.IS_TOUCH_DEVICE) {
    cellContentDiv.addEventListener(
      "touchend",
      (event: TouchEvent) => {
        if (pointerHasMoved) {
          setTouchEventHandled(false);
          return;
        }

        if (!isColorPickingMode || isInterpolationEnabled) {
          setTouchEventHandled(false);
          return;
        }

        const touchRowIndex = parseInt(cellContentDiv.dataset.rowIndex!, 10);
        const touchCellIndex = parseInt(cellContentDiv.dataset.cellIndex!, 10);

        // Validate coordinates
        if (
          touchRowIndex >= sourceGridData.length ||
          touchCellIndex >= sourceGridData[touchRowIndex].length ||
          !isValidHex(sourceGridData[touchRowIndex][touchCellIndex])
        ) {
          console.warn(
            "TouchEnd on invalid cell or outside source data bounds.",
          );
          clearSelection();
          return;
        }

        handleTouchRangeSelection(touchRowIndex, touchCellIndex, event);
        setTouchEventHandled(true);
        event.preventDefault();
        event.stopPropagation();
      },
      { passive: false },
    );
  }

  // Click listener for desktop
  cellContentDiv.addEventListener("click", (event: MouseEvent) => {
    if (touchEventHandled || pointerHasMoved) {
      setTouchEventHandled(false);
      return;
    }

    if (CONSTANTS.IS_TOUCH_DEVICE) return;

    const clickRowIndex = parseInt(cellContentDiv.dataset.rowIndex!, 10);
    const clickCellIndex = parseInt(cellContentDiv.dataset.cellIndex!, 10);

    if (
      clickRowIndex >= sourceGridData.length ||
      clickCellIndex >= sourceGridData[clickRowIndex].length
    ) {
      console.warn("Clicked cell outside source data bounds.");
      return;
    }

    const clickedSourceHex = sourceGridData[clickRowIndex][clickCellIndex];
    if (!isValidHex(clickedSourceHex)) {
      console.log(
        "Clicked on a non-swatch cell (label/invalid). Ignoring selection.",
      );
      return;
    }

    const clickedHsl = hexToHsl(clickedSourceHex);
    if (clickedHsl) {
      handleDesktopClick(
        event,
        clickRowIndex,
        clickCellIndex,
        clickedHsl,
        cellContentDiv,
      );
    }
    setTouchEventHandled(false);
  });

  // Hover effects
  cellContentDiv.addEventListener("mouseover", () => {
    if (!isColorPickingMode && !cellContentDiv.classList.contains("selected")) {
      const textColor = cellContentDiv.style.color;
      cellContentDiv.style.boxShadow = `inset 0 0 0 2px ${textColor}`;
    }
  });

  cellContentDiv.addEventListener("mouseout", () => {
    if (!cellContentDiv.classList.contains("selected")) {
      cellContentDiv.style.boxShadow = "none";
    }
  });
}

// Handle touch range selection
function handleTouchRangeSelection(
  touchRowIndex: number,
  touchCellIndex: number,
  event: TouchEvent,
): void {
  if (isAwaitingRangeEndTap) {
    // Second tap
    if (!selectionAnchor) {
      console.warn("Second tap detected, but no anchor set. Resetting.");
      setAwaitingRangeEndTap(false);
      setSelectionAnchor({ row: touchRowIndex, col: touchCellIndex });
      applySelectionStyles({ row: touchRowIndex, col: touchCellIndex });
    } else if (
      selectionAnchor.row === touchRowIndex &&
      selectionAnchor.col === touchCellIndex
    ) {
      // Tapped same cell again: confirm single selection
      console.log(
        "Range selection cancelled: Tapped anchor again. Confirming single select.",
      );
      setSelectedCells([selectionAnchor]);
      openColorPicker(selectionAnchor.row, selectionAnchor.col, event);
      setAwaitingRangeEndTap(false);
    } else {
      // Define range
      console.log("Range selection: Defining range.");
      selectRange(selectionAnchor, { row: touchRowIndex, col: touchCellIndex });
      if (selectedCells.length > 0) {
        openColorPicker(selectedCells[0].row, selectedCells[0].col, event);
      }
      setAwaitingRangeEndTap(false);
    }
  } else {
    // First tap
    console.log("Range selection: Setting anchor.");
    clearSelection();
    setSelectionAnchor({ row: touchRowIndex, col: touchCellIndex });
    applySelectionStyles({ row: touchRowIndex, col: touchCellIndex });
    setAwaitingRangeEndTap(true);
  }
}

// Handle desktop click events
function handleDesktopClick(
  event: MouseEvent,
  clickRowIndex: number,
  clickCellIndex: number,
  clickedHsl: HSL,
  cellContentDiv: HTMLElement,
): void {
  const isCtrlShiftClick = event.ctrlKey && event.shiftKey;
  const isShiftClick = event.shiftKey && !event.ctrlKey;
  const isSimpleClick = !event.shiftKey && !event.ctrlKey;

  if (isCtrlShiftClick && isColorPickingMode && !isInterpolationEnabled) {
    // Range selection
    console.log("Ctrl+Shift Click detected.");
    if (!selectionAnchor) {
      clearSelection();
      setSelectedCells([{ row: clickRowIndex, col: clickCellIndex }]);
      setSelectionAnchor({ row: clickRowIndex, col: clickCellIndex });
      applySelectionStyles({ row: clickRowIndex, col: clickCellIndex });
    } else {
      selectRange(selectionAnchor, { row: clickRowIndex, col: clickCellIndex });
    }

    if (selectedCells.length > 0) {
      openColorPicker(selectedCells[0].row, selectedCells[0].col, event);
    }
  } else if (isShiftClick && isColorPickingMode && !isInterpolationEnabled) {
    // Add/remove similar
    console.log("Shift Click detected.");
    if (!clickedHsl) {
      console.warn("Cannot Shift+Click: Invalid HSL.");
      return;
    }

    if (selectedCells.length === 0) {
      setSelectionAnchor({ row: clickRowIndex, col: clickCellIndex });
      console.log("Setting anchor with first Shift+Click.");
    }

    handleSwatchSelection(event, clickRowIndex, clickCellIndex, clickedHsl);

    if (selectedCells.length > 0) {
      openColorPicker(selectedCells[0].row, selectedCells[0].col, event);
    }
  } else if (isSimpleClick) {
    if (isColorPickingMode && !isInterpolationEnabled) {
      // Simple click in pick mode
      console.log("Simple Click in Pick Mode detected.");
      clearSelection();
      setSelectedCells([{ row: clickRowIndex, col: clickCellIndex }]);
      setSelectionAnchor({ row: clickRowIndex, col: clickCellIndex });
      applySelectionStyles({ row: clickRowIndex, col: clickCellIndex });
      openColorPicker(clickRowIndex, clickCellIndex, event);
    } else {
      // Simple click - copy hex
      console.log("Simple Click - Copy behavior.");
      const displayedHex = cellContentDiv.textContent;
      if (displayedHex) {
        copyToClipboard(displayedHex, cellContentDiv);
      }
      clearSelection();

      const colorPickerModal = document.getElementById("color-picker-modal");
      if (colorPickerModal && colorPickerModal.classList.contains("visible")) {
        closeColorPicker();
      }
    }
  }
}

// Select range of cells
function selectRange(anchor: CellPosition, target: CellPosition): void {
  const anchorRow = anchor.row;
  const anchorCol = anchor.col;
  const targetRow = target.row;
  const targetCol = target.col;

  const minRow = Math.min(anchorRow, targetRow);
  const maxRow = Math.max(anchorRow, targetRow);
  const minCol = Math.min(anchorCol, targetCol);
  const maxCol = Math.max(anchorCol, targetCol);

  // Clear previous visual selection
  clearSelectionVisuals();
  setSelectedCells([]);

  // Select cells within the rectangle
  const newSelectedCells: CellPosition[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      if (
        r < sourceGridData.length &&
        c < sourceGridData[r].length &&
        isValidHex(sourceGridData[r][c])
      ) {
        newSelectedCells.push({ row: r, col: c });
        applySelectionStyles({ row: r, col: c });
      }
    }
  }

  setSelectedCells(newSelectedCells);
  console.log(`Range selected: ${newSelectedCells.length} cells.`);
}

// Placeholder functions for color picker - these will be properly implemented later
function openColorPicker(
  row: number,
  col: number,
  _event: MouseEvent | TouchEvent,
): void {
  console.log(`Opening color picker for cell [${row}, ${col}]`);
  // TODO: Implement color picker opening logic
}

function closeColorPicker(): void {
  console.log("Closing color picker");
  const colorPickerModal = document.getElementById("color-picker-modal");
  if (colorPickerModal) {
    colorPickerModal.classList.remove("visible");
  }
}
