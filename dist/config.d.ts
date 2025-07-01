export interface ZoomSettings {
    MIN_SCALE: number;
    MAX_SCALE: number;
    SCALE_STEP: number;
    ZOOM_DEBOUNCE_DELAY: number;
}
export interface InteractionSettings {
    DRAG_THRESHOLD: number;
    MULTI_SELECT_TOLERANCE: number;
    MULTI_SELECT_HUE_TOLERANCE: number;
}
export interface TouchSettings {
    IS_TOUCH_DEVICE: boolean;
}
export interface UISettings {
    SNAP_THRESHOLD: number;
    SNAP_GAP: number;
}
export interface StorageSettings {
    LOCAL_STORAGE_KEY: string;
}
export interface SelectorSettings {
    FOCUSABLE_MODAL_ELEMENTS_SELECTOR: string;
}
export interface Constants extends ZoomSettings, InteractionSettings, TouchSettings, UISettings, StorageSettings, SelectorSettings {
}
export interface InitialOffsets {
    PALETTE_OFFSET_X: number;
    PALETTE_OFFSET_Y: number;
}
export declare const CONSTANTS: Constants;
export declare const INITIAL_OFFSETS: InitialOffsets;
//# sourceMappingURL=config.d.ts.map