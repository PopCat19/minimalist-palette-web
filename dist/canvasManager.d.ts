interface PointerPosition {
    x: number;
    y: number;
}
interface StateData {
    paletteOffsetX?: number;
    paletteOffsetY?: number;
    scale?: number;
}
export declare class CanvasInteractionManager {
    private canvasViewport;
    private paletteContainer;
    private isPanning;
    private startX;
    private startY;
    private currentX;
    private currentY;
    private offsetX;
    private offsetY;
    private scale;
    private pointerHasMoved;
    private pointerDownPos;
    constructor(canvasViewport: HTMLElement, paletteContainer: HTMLElement);
    private init;
    loadState(stateData: StateData): boolean;
    private addEventListeners;
    private handlePointerDown;
    private handlePointerMove;
    private handlePointerUp;
    private handlePointerLeave;
    setZoomLevel(zoomPercent: number): void;
    private updateTransform;
    centerContent(targetScale?: number): boolean;
    didPointerMove(): boolean;
    getEventCoords(event: MouseEvent | TouchEvent): PointerPosition;
}
export {};
//# sourceMappingURL=canvasManager.d.ts.map