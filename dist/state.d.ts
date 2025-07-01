import { GridData } from "./default-palette.js";
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
export declare let sourceGridData: GridData;
export declare let currentGridData: GridData;
export declare let isInterpolationEnabled: boolean;
export declare let interpolationSteps: number;
export declare let saturationOffset: number;
export declare let isPanning: boolean;
export declare let startX: number, startY: number, currentX: number, currentY: number;
export declare let paletteOffsetX: number;
export declare let paletteOffsetY: number;
export declare let scale: number;
export declare let zoomTimeout: ReturnType<typeof setTimeout> | null;
export declare let pointerHasMoved: boolean;
export declare let pointerDownPos: Position;
export declare let touchEventHandled: boolean;
export declare let pickerTargetRow: number;
export declare let pickerTargetCol: number;
export declare let isPickerUpdating: boolean;
export declare let isDraggingColorPicker: boolean;
export declare let pickerStartX: number, pickerStartY: number, pickerInitialX: number, pickerInitialY: number;
export declare let isResizingColorPicker: boolean;
export declare let cpResizeStartX: number, cpResizeStartY: number, cpResizeInitialWidth: number, cpResizeInitialHeight: number;
export declare let isColorPickingMode: boolean;
export declare let selectedCells: CellPosition[];
export declare let selectionAnchor: CellPosition | null;
export declare let isAwaitingRangeEndTap: boolean;
export declare let isDraggingPopout: boolean;
export declare let popoutStartX: number, popoutStartY: number, popoutInitialX: number, popoutInitialY: number;
export declare let isResizingPopout: boolean;
export declare let resizeStartX: number, resizeStartY: number, resizeInitialWidth: number, resizeInitialHeight: number;
export declare let statusTimeout: ReturnType<typeof setTimeout> | null;
export declare let isShiftHeld: boolean;
export declare let isMouseOverTooltip: boolean;
export declare let allowTooltipInteraction: boolean;
export declare let currentTooltipTargetCell: CellPosition | null;
export declare let currentUiScale: number;
export declare let firstFocusableElement: HTMLElement | null;
export declare let lastFocusableElement: HTMLElement | null;
export declare let stateLoadedSuccessfully: boolean;
export declare function setCurrentGridData(data: GridData): void;
export declare function setInterpolationEnabled(enabled: boolean): void;
export declare function setInterpolationSteps(steps: number): void;
export declare function setSaturationOffset(offset: number): void;
export declare function setPanning(panning: boolean): void;
export declare function setPanCoords(coords: PanCoordinates): void;
export declare function setPaletteOffset(x: number, y: number): void;
export declare function setScale(newScale: number): void;
export declare function setZoomTimeout(timeout: ReturnType<typeof setTimeout> | null): void;
export declare function setPointerState(moved: boolean, pos?: Position): void;
export declare function setTouchEventHandled(handled: boolean): void;
export declare function setColorPickerState(state: ColorPickerState): void;
export declare function setPickerTargetRow(row: number): void;
export declare function setPickerTargetCol(col: number): void;
export declare function setIsPickerUpdating(updating: boolean): void;
export declare function setColorPickerDragState(state: DragState): void;
export declare function setColorPickerResizeState(state: ResizeState): void;
export declare function setColorPickingMode(mode: boolean): void;
export declare function setSelectedCells(cells: CellPosition[]): void;
export declare function setSelectionAnchor(anchor: CellPosition | null): void;
export declare function setAwaitingRangeEndTap(awaiting: boolean): void;
export declare function setPopoutDragState(state: DragState): void;
export declare function setPopoutResizeState(state: ResizeState): void;
export declare function setStatusTimeout(timeout: ReturnType<typeof setTimeout> | null): void;
export declare function setShiftHeld(held: boolean): void;
export declare function setMouseOverTooltip(over: boolean): void;
export declare function setAllowTooltipInteraction(allow: boolean): void;
export declare function setCurrentTooltipTargetCell(cell: CellPosition | null): void;
export declare function setCurrentUiScale(scale: number): void;
export declare function setFocusableElements(first: HTMLElement | null, last: HTMLElement | null): void;
export declare function setStateLoadedSuccessfully(loaded: boolean): void;
export declare function clearSelection(): void;
export declare function resetPanState(): void;
export declare function resetColorPickerState(): void;
export declare function resetPopoutState(): void;
export declare function resetTooltipState(): void;
export declare function setSourceGridData(data: GridData): void;
//# sourceMappingURL=state.d.ts.map