// --- Canvas Interaction Management ---

import { CONSTANTS } from "./config.js";
import { getEventCoords } from "./domUtils.js";

interface PointerPosition {
  x: number;
  y: number;
}

interface StateData {
  paletteOffsetX?: number;
  paletteOffsetY?: number;
  scale?: number;
}

export class CanvasInteractionManager {
  private canvasViewport: HTMLElement;
  private paletteContainer: HTMLElement;

  // Pan state
  private isPanning: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;

  // Position and scale
  private offsetX: number = 50; // Initial offset matches CSS
  private offsetY: number = 50;
  private scale: number = 1.0;

  // Pointer tracking
  private pointerHasMoved: boolean = false;
  private pointerDownPos: PointerPosition = { x: 0, y: 0 };

  // Touch handling (unused but kept for future functionality)
  // private touchEventHandled: boolean = false;

  // Zoom debouncing (unused but kept for future functionality)
  // private zoomTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(canvasViewport: HTMLElement, paletteContainer: HTMLElement) {
    this.canvasViewport = canvasViewport;
    this.paletteContainer = paletteContainer;

    this.init();
  }

  private init(): void {
    this.addEventListeners();
    this.updateTransform();
  }

  // Load state from saved data
  loadState(stateData: StateData): boolean {
    if (!stateData) return false;

    let positionLoaded = false;

    if (typeof stateData.paletteOffsetX === "number") {
      this.offsetX = stateData.paletteOffsetX;
      positionLoaded = true;
    }

    if (typeof stateData.paletteOffsetY === "number") {
      this.offsetY = stateData.paletteOffsetY;
      positionLoaded = true;
    }

    if (typeof stateData.scale === "number") {
      this.scale = Math.max(
        CONSTANTS.MIN_SCALE,
        Math.min(CONSTANTS.MAX_SCALE, stateData.scale),
      );
      positionLoaded = true;
    }

    if (positionLoaded) {
      this.updateTransform();
    }

    return positionLoaded;
  }

  private addEventListeners(): void {
    // Mouse events
    this.canvasViewport.addEventListener("mousedown", (e) =>
      this.handlePointerDown(e),
    );
    this.canvasViewport.addEventListener("mousemove", (e) =>
      this.handlePointerMove(e),
    );
    this.canvasViewport.addEventListener("mouseup", (e) =>
      this.handlePointerUp(e),
    );
    this.canvasViewport.addEventListener("mouseleave", (e) =>
      this.handlePointerLeave(e),
    );

    // Touch events
    this.canvasViewport.addEventListener(
      "touchstart",
      (e) => this.handlePointerDown(e),
      { passive: false },
    );
    this.canvasViewport.addEventListener(
      "touchmove",
      (e) => this.handlePointerMove(e),
      { passive: false },
    );
    this.canvasViewport.addEventListener("touchend", (e) =>
      this.handlePointerUp(e),
    );
    this.canvasViewport.addEventListener("touchcancel", (e) =>
      this.handlePointerLeave(e),
    );
  }

  private handlePointerDown(event: MouseEvent | TouchEvent): void {
    // Don't pan if clicking on interactive elements
    const target = event.target as HTMLElement;
    const targetIsSwatch =
      target.classList.contains("cell-content") &&
      target.classList.contains("swatch");

    if (
      target.closest("#popout-editor") ||
      target.closest("#color-picker-modal") ||
      (CONSTANTS.IS_TOUCH_DEVICE && targetIsSwatch)
    ) {
      return;
    }

    this.isPanning = true;
    const coords = getEventCoords(event);
    this.startX = coords.x;
    this.startY = coords.y;

    // Store pointer down position and reset move flag
    this.pointerDownPos = { x: coords.x, y: coords.y };
    this.pointerHasMoved = false;

    this.canvasViewport.classList.add("grabbing");
    event.preventDefault();
  }

  private handlePointerMove(event: MouseEvent | TouchEvent): void {
    if (!this.isPanning) return;

    event.preventDefault();
    const coords = getEventCoords(event);
    this.currentX = coords.x;
    this.currentY = coords.y;

    // Check if pointer has moved beyond threshold
    if (!this.pointerHasMoved) {
      const dxAbs = Math.abs(this.currentX - this.pointerDownPos.x);
      const dyAbs = Math.abs(this.currentY - this.pointerDownPos.y);
      if (
        dxAbs > CONSTANTS.DRAG_THRESHOLD ||
        dyAbs > CONSTANTS.DRAG_THRESHOLD
      ) {
        this.pointerHasMoved = true;
      }
    }

    const dx = this.currentX - this.startX;
    const dy = this.currentY - this.startY;

    this.offsetX += dx;
    this.offsetY += dy;

    this.updateTransform();

    // Update start for next move delta
    this.startX = this.currentX;
    this.startY = this.currentY;
  }

  private handlePointerUp(_event: MouseEvent | TouchEvent): void {
    if (this.isPanning) {
      this.isPanning = false;
      this.canvasViewport.classList.remove("grabbing");

      // Reset pointerHasMoved after potential handlers might check it
      setTimeout(() => {
        this.pointerHasMoved = false;
      }, 50);
    }

    // Reset touch flags
    // this.touchEventHandled = false;
  }

  private handlePointerLeave(_event: MouseEvent | TouchEvent): void {
    if (this.isPanning) {
      this.isPanning = false;
      this.canvasViewport.classList.remove("grabbing");
      setTimeout(() => {
        this.pointerHasMoved = false;
      }, 50);
    }
    // this.touchEventHandled = false;
  }

  setZoomLevel(zoomPercent: number): void {
    const newScale = Math.max(
      CONSTANTS.MIN_SCALE,
      Math.min(CONSTANTS.MAX_SCALE, zoomPercent / 100),
    );

    // If scale didn't change, do nothing
    if (newScale === this.scale) return;

    // Get viewport center as focal point
    const rect = this.canvasViewport.getBoundingClientRect();
    const focalX = rect.width / 2;
    const focalY = rect.height / 2;

    // Calculate the point on the palette container under the focal point before zoom
    const pointX = (focalX - this.offsetX) / this.scale;
    const pointY = (focalY - this.offsetY) / this.scale;

    // Update scale
    this.scale = newScale;

    // Calculate the new offset to keep the point under the focal point stationary
    this.offsetX = focalX - pointX * this.scale;
    this.offsetY = focalY - pointY * this.scale;

    // Apply new transform
    this.updateTransform();
  }

  private updateTransform(): void {
    if (this.paletteContainer) {
      this.paletteContainer.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
    }
  }

  centerContent(targetScale: number = 1.0): boolean {
    if (!this.canvasViewport || !this.paletteContainer) {
      console.warn("Cannot center: missing viewport or container references");
      return false;
    }

    const viewportRect = this.canvasViewport.getBoundingClientRect();

    // Reset transform to get actual content size
    this.paletteContainer.style.transform = "none";
    const contentRect = this.paletteContainer.getBoundingClientRect();

    // Calculate center position
    const centerX = (viewportRect.width - contentRect.width * targetScale) / 2;
    const centerY =
      (viewportRect.height - contentRect.height * targetScale) / 2;

    // Update state
    this.offsetX = centerX;
    this.offsetY = centerY;
    this.scale = targetScale;

    // Apply transform
    this.updateTransform();

    console.log(`Content centered at scale ${targetScale}`);
    return true;
  }

  didPointerMove(): boolean {
    return this.pointerHasMoved;
  }

  getEventCoords(event: MouseEvent | TouchEvent): PointerPosition {
    return getEventCoords(event);
  }
}
