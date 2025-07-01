export interface DOMElements {
    canvasViewport: HTMLElement | null;
    paletteContainer: HTMLElement | null;
    paletteGrid: HTMLElement | null;
    configToggleButton: HTMLButtonElement | null;
    configModal: HTMLElement | null;
    closeModalButton: HTMLButtonElement | null;
    editPaletteButton: HTMLButtonElement | null;
    paletteEditorSection: HTMLElement | null;
    paletteInput: HTMLTextAreaElement | null;
    updateButton: HTMLButtonElement | null;
    exportPngButton: HTMLButtonElement | null;
    exportScaleInput: HTMLInputElement | null;
    interpolationToggle: HTMLInputElement | null;
    interpolationStepsGroup: HTMLElement | null;
    stepsSlider: HTMLInputElement | null;
    stepsNumber: HTMLInputElement | null;
    saturationOffsetSlider: HTMLInputElement | null;
    saturationOffsetNumber: HTMLInputElement | null;
    zoomSlider: HTMLInputElement | null;
    zoomNumber: HTMLInputElement | null;
    uiScaleNumber: HTMLInputElement | null;
    generateXValueInput: HTMLInputElement | null;
    generateRef1ValueInput: HTMLInputElement | null;
    generateRef2ValueInput: HTMLInputElement | null;
    generateXButton: HTMLButtonElement | null;
    popoutEditor: HTMLElement | null;
    popoutHeader: HTMLElement | null;
    popoutCloseButton: HTMLButtonElement | null;
    popoutPaletteInput: HTMLTextAreaElement | null;
    popoutUpdateButton: HTMLButtonElement | null;
    popoutResizeHandle: HTMLElement | null;
    popoutStatusMessage: HTMLElement | null;
    saveStateButton: HTMLButtonElement | null;
    resetStateButton: HTMLButtonElement | null;
    exportPaletteButton: HTMLButtonElement | null;
    importPaletteButton: HTMLButtonElement | null;
    importPaletteFileInput: HTMLInputElement | null;
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
    colorPickToggleButton: HTMLButtonElement | null;
    colorPickerHeader: HTMLElement | null;
    colorPickerResizeHandle: HTMLElement | null;
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
export declare function getDOMElements(): DOMElements;
export declare function getEventCoords(event: MouseEvent | TouchEvent): EventCoordinates;
export declare function applyUiScale(scalePercent: number): number;
export declare function copyToClipboard(text: string, element?: HTMLElement): Promise<void>;
export declare function showCopiedFeedback(element: HTMLElement): void;
export declare function convertToSimpleFormat(gridData: string[][]): string;
export declare function parseSimpleFormat(textData: string): string[][];
export declare function setupFocusTrap(modal: HTMLElement, focusableElementsSelector: string): FocusTrapElements;
export declare function handleFocusTrapKeydown(event: KeyboardEvent, firstFocusableElement: HTMLElement | null, lastFocusableElement: HTMLElement | null, modal: HTMLElement): void;
export declare function snapPosition(position: Position, snapThreshold: number, snapGap: number, containerSize: Size): Position;
export declare function getComputedStyleValue(element: HTMLElement, property: string): string;
export declare function triggerDownload(data: string, filename: string, mimeType?: string): void;
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
export declare function getElementBounds(element: HTMLElement): ElementBounds;
//# sourceMappingURL=domUtils.d.ts.map