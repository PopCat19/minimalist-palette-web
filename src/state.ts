// --- Application State Management ---

import { INITIAL_OFFSETS } from "./config.js";
import { getDefaultPaletteCopy, GridData } from "./default-palette.js";

// Type definitions for state management
export interface Position {
  x: number;
  y: number;
}

export interface PanCoordinates {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface ColorPickerState {
  targetRow?: number;
  targetCol?: number;
  isUpdating?: boolean;
}

export interface DragState {
  isDragging: boolean;
  startX?: number;
  startY?: number;
  initialX?: number;
  initialY?: number;
}

export interface ResizeState {
  isResizing: boolean;
  startX?: number;
  startY?: number;
  initialWidth?: number;
  initialHeight?: number;
}

export interface CellPosition {
  row: number;
  col: number;
}

// Initialize sourceGridData from default palette
export let sourceGridData: GridData = getDefaultPaletteCopy();

// --- Core State Variables ---
export let currentGridData: GridData = [
  ...sourceGridData.map((row) => [...row]),
];
export let isInterpolationEnabled: boolean = false;
export let interpolationSteps: number = 1;
export let saturationOffset: number = 0;

// --- Panning State ---
export let isPanning: boolean = false;
export let startX: number, startY: number, currentX: number, currentY: number;
export let paletteOffsetX: number = INITIAL_OFFSETS.PALETTE_OFFSET_X;
export let paletteOffsetY: number = INITIAL_OFFSETS.PALETTE_OFFSET_Y;

// --- Zoom State ---
export let scale: number = 1;
export let zoomTimeout: ReturnType<typeof setTimeout> | null;

// --- Click vs Drag State ---
export let pointerHasMoved: boolean = false;
export let pointerDownPos: Position = { x: 0, y: 0 };

// --- Touch Event State ---
export let touchEventHandled: boolean = false;

// --- Color Picker State ---
export let pickerTargetRow: number = -1;
export let pickerTargetCol: number = -1;
export let isPickerUpdating: boolean = false;

// --- Color Picker Drag/Resize State ---
export let isDraggingColorPicker: boolean = false;
export let pickerStartX: number,
  pickerStartY: number,
  pickerInitialX: number,
  pickerInitialY: number;
export let isResizingColorPicker: boolean = false;
export let cpResizeStartX: number,
  cpResizeStartY: number,
  cpResizeInitialWidth: number,
  cpResizeInitialHeight: number;

// --- Color Picking Mode State ---
export let isColorPickingMode: boolean = false;

// --- Multi-select State ---
export let selectedCells: CellPosition[] = [];
export let selectionAnchor: CellPosition | null = null;
export let isAwaitingRangeEndTap: boolean = false;

// --- Popout Editor State ---
export let isDraggingPopout: boolean = false;
export let popoutStartX: number,
  popoutStartY: number,
  popoutInitialX: number,
  popoutInitialY: number;
export let isResizingPopout: boolean = false;
export let resizeStartX: number,
  resizeStartY: number,
  resizeInitialWidth: number,
  resizeInitialHeight: number;
export let statusTimeout: ReturnType<typeof setTimeout> | null;

// --- Global UI State ---
export let isShiftHeld: boolean = false;
export let isMouseOverTooltip: boolean = false;
export let allowTooltipInteraction: boolean = false;
export let currentTooltipTargetCell: CellPosition | null = null;
export let currentUiScale: number = 100;

// --- Modal State ---
export let firstFocusableElement: HTMLElement | null = null;
export let lastFocusableElement: HTMLElement | null = null;

// --- State Loading Flag ---
export let stateLoadedSuccessfully: boolean = false;

// --- State Setters ---
export function setCurrentGridData(data: GridData): void {
  currentGridData = data;
}

export function setInterpolationEnabled(enabled: boolean): void {
  isInterpolationEnabled = enabled;
}

export function setInterpolationSteps(steps: number): void {
  interpolationSteps = steps;
}

export function setSaturationOffset(offset: number): void {
  saturationOffset = offset;
}

export function setPanning(panning: boolean): void {
  isPanning = panning;
}

export function setPanCoords(coords: PanCoordinates): void {
  startX = coords.startX;
  startY = coords.startY;
  currentX = coords.currentX;
  currentY = coords.currentY;
}

export function setPaletteOffset(x: number, y: number): void {
  paletteOffsetX = x;
  paletteOffsetY = y;
}

export function setScale(newScale: number): void {
  scale = newScale;
}

export function setZoomTimeout(
  timeout: ReturnType<typeof setTimeout> | null,
): void {
  zoomTimeout = timeout;
}

export function setPointerState(moved: boolean, pos?: Position): void {
  pointerHasMoved = moved;
  if (pos) pointerDownPos = pos;
}

export function setTouchEventHandled(handled: boolean): void {
  touchEventHandled = handled;
}

export function setColorPickerState(state: ColorPickerState): void {
  if (state.targetRow !== undefined) pickerTargetRow = state.targetRow;
  if (state.targetCol !== undefined) pickerTargetCol = state.targetCol;
  if (state.isUpdating !== undefined) isPickerUpdating = state.isUpdating;
}

export function setPickerTargetRow(row: number): void {
  pickerTargetRow = row;
}

export function setPickerTargetCol(col: number): void {
  pickerTargetCol = col;
}

export function setIsPickerUpdating(updating: boolean): void {
  isPickerUpdating = updating;
}

export function setColorPickerDragState(state: DragState): void {
  isDraggingColorPicker = state.isDragging;
  if (state.startX !== undefined) pickerStartX = state.startX;
  if (state.startY !== undefined) pickerStartY = state.startY;
  if (state.initialX !== undefined) pickerInitialX = state.initialX;
  if (state.initialY !== undefined) pickerInitialY = state.initialY;
}

export function setColorPickerResizeState(state: ResizeState): void {
  isResizingColorPicker = state.isResizing;
  if (state.startX !== undefined) cpResizeStartX = state.startX;
  if (state.startY !== undefined) cpResizeStartY = state.startY;
  if (state.initialWidth !== undefined)
    cpResizeInitialWidth = state.initialWidth;
  if (state.initialHeight !== undefined)
    cpResizeInitialHeight = state.initialHeight;
}

export function setColorPickingMode(mode: boolean): void {
  isColorPickingMode = mode;
}

export function setSelectedCells(cells: CellPosition[]): void {
  selectedCells = cells;
}

export function setSelectionAnchor(anchor: CellPosition | null): void {
  selectionAnchor = anchor;
}

export function setAwaitingRangeEndTap(awaiting: boolean): void {
  isAwaitingRangeEndTap = awaiting;
}

export function setPopoutDragState(state: DragState): void {
  isDraggingPopout = state.isDragging;
  if (state.startX !== undefined) popoutStartX = state.startX;
  if (state.startY !== undefined) popoutStartY = state.startY;
  if (state.initialX !== undefined) popoutInitialX = state.initialX;
  if (state.initialY !== undefined) popoutInitialY = state.initialY;
}

export function setPopoutResizeState(state: ResizeState): void {
  isResizingPopout = state.isResizing;
  if (state.startX !== undefined) resizeStartX = state.startX;
  if (state.startY !== undefined) resizeStartY = state.startY;
  if (state.initialWidth !== undefined) resizeInitialWidth = state.initialWidth;
  if (state.initialHeight !== undefined)
    resizeInitialHeight = state.initialHeight;
}

export function setStatusTimeout(
  timeout: ReturnType<typeof setTimeout> | null,
): void {
  statusTimeout = timeout;
}

export function setShiftHeld(held: boolean): void {
  isShiftHeld = held;
}

export function setMouseOverTooltip(over: boolean): void {
  isMouseOverTooltip = over;
}

export function setAllowTooltipInteraction(allow: boolean): void {
  allowTooltipInteraction = allow;
}

export function setCurrentTooltipTargetCell(cell: CellPosition | null): void {
  currentTooltipTargetCell = cell;
}

export function setCurrentUiScale(scale: number): void {
  currentUiScale = scale;
}

export function setFocusableElements(
  first: HTMLElement | null,
  last: HTMLElement | null,
): void {
  firstFocusableElement = first;
  lastFocusableElement = last;
}

export function setStateLoadedSuccessfully(loaded: boolean): void {
  stateLoadedSuccessfully = loaded;
}

// --- Utility Functions ---
export function clearSelection(): void {
  selectedCells = [];
  selectionAnchor = null;
  isAwaitingRangeEndTap = false;
}

export function resetPanState(): void {
  isPanning = false;
  pointerHasMoved = false;
  touchEventHandled = false;
  isAwaitingRangeEndTap = false;
}

export function resetColorPickerState(): void {
  pickerTargetRow = -1;
  pickerTargetCol = -1;
  isPickerUpdating = false;
  isDraggingColorPicker = false;
  isResizingColorPicker = false;
}

export function resetPopoutState(): void {
  isDraggingPopout = false;
  isResizingPopout = false;
}

export function resetTooltipState(): void {
  isShiftHeld = false;
  isMouseOverTooltip = false;
  allowTooltipInteraction = false;
  currentTooltipTargetCell = null;
}

// Set source grid data
export function setSourceGridData(data: GridData): void {
  sourceGridData = data;
}
