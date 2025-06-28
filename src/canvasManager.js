// --- Canvas Interaction Management ---

import { CONSTANTS } from './config.js';
import { getEventCoords } from './domUtils.js';

export class CanvasInteractionManager {
    constructor(canvasViewport, paletteContainer) {
        this.canvasViewport = canvasViewport;
        this.paletteContainer = paletteContainer;

        // Pan state
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;

        // Position and scale
        this.offsetX = 50; // Initial offset matches CSS
        this.offsetY = 50;
        this.scale = 1.0;

        // Pointer tracking
        this.pointerHasMoved = false;
        this.pointerDownPos = { x: 0, y: 0 };

        // Touch handling
        this.touchEventHandled = false;

        // Zoom debouncing
        this.zoomTimeout = null;

        this.init();
    }

    init() {
        this.addEventListeners();
        this.updateTransform();
    }

    // Load state from saved data
    loadState(stateData) {
        if (!stateData) return false;

        let positionLoaded = false;

        if (typeof stateData.paletteOffsetX === 'number') {
            this.offsetX = stateData.paletteOffsetX;
            positionLoaded = true;
        }

        if (typeof stateData.paletteOffsetY === 'number') {
            this.offsetY = stateData.paletteOffsetY;
            positionLoaded = true;
        }

        if (typeof stateData.scale === 'number') {
            this.scale = Math.max(CONSTANTS.MIN_SCALE, Math.min(CONSTANTS.MAX_SCALE, stateData.scale));
            positionLoaded = true;
        }

        if (positionLoaded) {
            this.updateTransform();
        }

        return positionLoaded;
    }

    addEventListeners() {
        // Mouse events
        this.canvasViewport.addEventListener('mousedown', (e) => this.handlePointerDown(e));
        this.canvasViewport.addEventListener('mousemove', (e) => this.handlePointerMove(e));
        this.canvasViewport.addEventListener('mouseup', (e) => this.handlePointerUp(e));
        this.canvasViewport.addEventListener('mouseleave', (e) => this.handlePointerLeave(e));

        // Touch events
        this.canvasViewport.addEventListener('touchstart', (e) => this.handlePointerDown(e), { passive: false });
        this.canvasViewport.addEventListener('touchmove', (e) => this.handlePointerMove(e), { passive: false });
        this.canvasViewport.addEventListener('touchend', (e) => this.handlePointerUp(e));
        this.canvasViewport.addEventListener('touchcancel', (e) => this.handlePointerLeave(e));
    }

    handlePointerDown(event) {
        // Don't pan if clicking on interactive elements
        const targetIsSwatch = event.target.classList.contains('cell-content') &&
                              event.target.classList.contains('swatch');

        if (event.target.closest('#popout-editor') ||
            event.target.closest('#color-picker-modal') ||
            (CONSTANTS.IS_TOUCH_DEVICE && targetIsSwatch)) {
            return;
        }

        this.isPanning = true;
        const coords = getEventCoords(event);
        this.startX = coords.x;
        this.startY = coords.y;

        // Store pointer down position and reset move flag
        this.pointerDownPos = { x: coords.x, y: coords.y };
        this.pointerHasMoved = false;

        this.canvasViewport.classList.add('grabbing');
        event.preventDefault();
    }

    handlePointerMove(event) {
        if (!this.isPanning) return;

        event.preventDefault();
        const coords = getEventCoords(event);
        this.currentX = coords.x;
        this.currentY = coords.y;

        // Check if pointer has moved beyond threshold
        if (!this.pointerHasMoved) {
            const dxAbs = Math.abs(this.currentX - this.pointerDownPos.x);
            const dyAbs = Math.abs(this.currentY - this.pointerDownPos.y);
            if (dxAbs > CONSTANTS.DRAG_THRESHOLD || dyAbs > CONSTANTS.DRAG_THRESHOLD) {
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

    handlePointerUp(event) {
        if (this.isPanning) {
            this.isPanning = false;
            this.canvasViewport.classList.remove('grabbing');

            // Reset pointerHasMoved after potential handlers might check it
            setTimeout(() => {
                this.pointerHasMoved = false;
            }, 50);
        }

        // Reset touch flags
        this.touchEventHandled = false;
    }

    handlePointerLeave(event) {
        if (this.isPanning) {
            this.isPanning = false;
            this.canvasViewport.classList.remove('grabbing');
            setTimeout(() => {
                this.pointerHasMoved = false;
            }, 50);
        }
        this.touchEventHandled = false;
    }

    setZoomLevel(zoomPercent) {
        const newScale = Math.max(CONSTANTS.MIN_SCALE,
                                 Math.min(CONSTANTS.MAX_SCALE, zoomPercent / 100));

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

    updateTransform() {
        if (this.paletteContainer) {
            this.paletteContainer.style.transform =
                `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`;
        }
    }

    centerContent(targetScale = 1.0) {
        if (!this.canvasViewport || !this.paletteContainer) {
            console.warn("Cannot center: missing viewport or container references");
            return false;
        }

        const viewportRect = this.canvasViewport.getBoundingClientRect();
        const containerRect = this.paletteContainer.getBoundingClientRect();

        // Reset transform to get actual content size
        this.paletteContainer.style.transform = 'none';
        const contentRect = this.paletteContainer.getBoundingClientRect();

        // Calculate center position
        const centerX = (viewportRect.width - contentRect.width * targetScale) / 2;
        const centerY = (viewportRect.height - contentRect.height * targetScale) / 2;

        // Update state
        this.offsetX = centerX;
        this.offsetY = centerY;
        this.scale = targetScale;

        // Apply transform
        this.updateTransform();

        console.log(`Content centered at scale ${targetScale}`);
        return true;
    }

    didPointerMove() {
        return this.pointerHasMoved;
    }

    getEventCoords(event) {
        return getEventCoords(event);
    }
}
