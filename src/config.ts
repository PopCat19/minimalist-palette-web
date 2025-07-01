// --- Configuration and Constants ---

// Type definitions for configuration
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

export interface Constants
  extends ZoomSettings,
    InteractionSettings,
    TouchSettings,
    UISettings,
    StorageSettings,
    SelectorSettings {}

export interface InitialOffsets {
  PALETTE_OFFSET_X: number;
  PALETTE_OFFSET_Y: number;
}

// Application constants
export const CONSTANTS: Constants = {
  // Zoom settings
  MIN_SCALE: 0.1,
  MAX_SCALE: 5,
  SCALE_STEP: 0.1,
  ZOOM_DEBOUNCE_DELAY: 10,

  // Interaction settings
  DRAG_THRESHOLD: 5,
  MULTI_SELECT_TOLERANCE: 2,
  MULTI_SELECT_HUE_TOLERANCE: 2,

  // Touch settings
  IS_TOUCH_DEVICE: "ontouchstart" in window || navigator.maxTouchPoints > 0,

  // UI settings
  SNAP_THRESHOLD: 20,
  SNAP_GAP: 20,

  // Storage
  LOCAL_STORAGE_KEY: "minimalistPaletteAppState",

  // Selectors
  FOCUSABLE_MODAL_ELEMENTS_SELECTOR:
    'button, [href], input:not([type="range"]), select, textarea, [tabindex]:not([tabindex="-1"])',
} as const;

// Initial offset values
export const INITIAL_OFFSETS: InitialOffsets = {
  PALETTE_OFFSET_X: 50,
  PALETTE_OFFSET_Y: 50,
} as const;
