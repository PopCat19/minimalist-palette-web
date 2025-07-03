// --- Configuration and Constants ---

// Application constants
export const CONSTANTS = {
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
};

// Initial offset values
export const INITIAL_OFFSETS = {
  PALETTE_OFFSET_X: 50,
  PALETTE_OFFSET_Y: 50,
};
