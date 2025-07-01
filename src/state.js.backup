// --- Application State Management ---

import { CONSTANTS, INITIAL_OFFSETS } from "./config.js";
import { getDefaultPaletteCopy } from "./default-palette.js";

// Initialize sourceGridData from default palette
export let sourceGridData = getDefaultPaletteCopy();

// --- Core State Variables ---
export let currentGridData = [...sourceGridData.map((row) => [...row])];
export let isInterpolationEnabled = false;
export let interpolationSteps = 1;
export let saturationOffset = 0;

// --- Panning State ---
export let isPanning = false;
export let startX, startY, currentX, currentY;
export let paletteOffsetX = INITIAL_OFFSETS.PALETTE_OFFSET_X;
export let paletteOffsetY = INITIAL_OFFSETS.PALETTE_OFFSET_Y;

// --- Zoom State ---
export let scale = 1;
export let zoomTimeout;

// --- Click vs Drag State ---
export let pointerHasMoved = false;
export let pointerDownPos = { x: 0, y: 0 };

// --- Touch Event State ---
export let touchEventHandled = false;

// --- Color Picker State ---
export let pickerTargetRow = -1;
export let pickerTargetCol = -1;
export let isPickerUpdating = false;

// --- Color Picker Drag/Resize State ---
export let isDraggingColorPicker = false;
export let pickerStartX, pickerStartY, pickerInitialX, pickerInitialY;
export let isResizingColorPicker = false;
export let cpResizeStartX,
  cpResizeStartY,
  cpResizeInitialWidth,
  cpResizeInitialHeight;

// --- Color Picking Mode State ---
export let isColorPickingMode = false;

// --- Multi-select State ---
export let selectedCells = [];
export let selectionAnchor = null;
export let isAwaitingRangeEndTap = false;

// --- Popout Editor State ---
export let isDraggingPopout = false;
export let popoutStartX, popoutStartY, popoutInitialX, popoutInitialY;
export let isResizingPopout = false;
export let resizeStartX, resizeStartY, resizeInitialWidth, resizeInitialHeight;
export let statusTimeout;

// --- Global UI State ---
export let isShiftHeld = false;
export let isMouseOverTooltip = false;
export let allowTooltipInteraction = false;
export let currentTooltipTargetCell = null;
export let currentUiScale = 100;

// --- Modal State ---
export let firstFocusableElement = null;
export let lastFocusableElement = null;

// --- State Loading Flag ---
export let stateLoadedSuccessfully = false;

// --- State Setters ---
export function setCurrentGridData(data) {
  currentGridData = data;
}

export function setInterpolationEnabled(enabled) {
  isInterpolationEnabled = enabled;
}

export function setInterpolationSteps(steps) {
  interpolationSteps = steps;
}

export function setSaturationOffset(offset) {
  saturationOffset = offset;
}

export function setPanning(panning) {
  isPanning = panning;
}

export function setPanCoords(coords) {
  startX = coords.startX;
  startY = coords.startY;
  currentX = coords.currentX;
  currentY = coords.currentY;
}

export function setPaletteOffset(x, y) {
  paletteOffsetX = x;
  paletteOffsetY = y;
}

export function setScale(newScale) {
  scale = newScale;
}

export function setZoomTimeout(timeout) {
  zoomTimeout = timeout;
}

export function setPointerState(moved, pos) {
  pointerHasMoved = moved;
  if (pos) pointerDownPos = pos;
}

export function setTouchEventHandled(handled) {
  touchEventHandled = handled;
}

export function setColorPickerState(state) {
  if (state.targetRow !== undefined) pickerTargetRow = state.targetRow;
  if (state.targetCol !== undefined) pickerTargetCol = state.targetCol;
  if (state.isUpdating !== undefined) isPickerUpdating = state.isUpdating;
}

export function setPickerTargetRow(row) {
  pickerTargetRow = row;
}

export function setPickerTargetCol(col) {
  pickerTargetCol = col;
}

export function setIsPickerUpdating(updating) {
  isPickerUpdating = updating;
}

export function setColorPickerDragState(state) {
  isDraggingColorPicker = state.isDragging;
  if (state.startX !== undefined) pickerStartX = state.startX;
  if (state.startY !== undefined) pickerStartY = state.startY;
  if (state.initialX !== undefined) pickerInitialX = state.initialX;
  if (state.initialY !== undefined) pickerInitialY = state.initialY;
}

export function setColorPickerResizeState(state) {
  isResizingColorPicker = state.isResizing;
  if (state.startX !== undefined) cpResizeStartX = state.startX;
  if (state.startY !== undefined) cpResizeStartY = state.startY;
  if (state.initialWidth !== undefined)
    cpResizeInitialWidth = state.initialWidth;
  if (state.initialHeight !== undefined)
    cpResizeInitialHeight = state.initialHeight;
}

export function setColorPickingMode(mode) {
  isColorPickingMode = mode;
}

export function setSelectedCells(cells) {
  selectedCells = cells;
}

export function setSelectionAnchor(anchor) {
  selectionAnchor = anchor;
}

export function setAwaitingRangeEndTap(awaiting) {
  isAwaitingRangeEndTap = awaiting;
}

export function setPopoutDragState(state) {
  isDraggingPopout = state.isDragging;
  if (state.startX !== undefined) popoutStartX = state.startX;
  if (state.startY !== undefined) popoutStartY = state.startY;
  if (state.initialX !== undefined) popoutInitialX = state.initialX;
  if (state.initialY !== undefined) popoutInitialY = state.initialY;
}

export function setPopoutResizeState(state) {
  isResizingPopout = state.isResizing;
  if (state.startX !== undefined) resizeStartX = state.startX;
  if (state.startY !== undefined) resizeStartY = state.startY;
  if (state.initialWidth !== undefined) resizeInitialWidth = state.initialWidth;
  if (state.initialHeight !== undefined)
    resizeInitialHeight = state.initialHeight;
}

export function setStatusTimeout(timeout) {
  statusTimeout = timeout;
}

export function setShiftHeld(held) {
  isShiftHeld = held;
}

export function setMouseOverTooltip(over) {
  isMouseOverTooltip = over;
}

export function setAllowTooltipInteraction(allow) {
  allowTooltipInteraction = allow;
}

export function setCurrentTooltipTargetCell(cell) {
  currentTooltipTargetCell = cell;
}

export function setCurrentUiScale(scale) {
  currentUiScale = scale;
}

export function setFocusableElements(first, last) {
  firstFocusableElement = first;
  lastFocusableElement = last;
}

export function setStateLoadedSuccessfully(loaded) {
  stateLoadedSuccessfully = loaded;
}

// --- Utility Functions ---
export function clearSelection() {
  selectedCells = [];
  selectionAnchor = null;
  isAwaitingRangeEndTap = false;
}

export function resetPanState() {
  isPanning = false;
  pointerHasMoved = false;
  touchEventHandled = false;
  isAwaitingRangeEndTap = false;
}

export function resetColorPickerState() {
  pickerTargetRow = -1;
  pickerTargetCol = -1;
  isPickerUpdating = false;
  isDraggingColorPicker = false;
  isResizingColorPicker = false;
}

export function resetPopoutState() {
  isDraggingPopout = false;
  isResizingPopout = false;
}

export function resetTooltipState() {
  isShiftHeld = false;
  isMouseOverTooltip = false;
  allowTooltipInteraction = false;
  currentTooltipTargetCell = null;
}

// Set source grid data
export function setSourceGridData(data) {
  sourceGridData = data;
}
