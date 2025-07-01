import { HSL } from "./colorUtils.js";
export declare function startPan(event: MouseEvent | TouchEvent): void;
export declare function panMove(event: MouseEvent | TouchEvent): void;
export declare function endPan(): void;
export declare function updateTransform(): void;
export declare function handleSwatchSelection(event: MouseEvent | TouchEvent, rowIndex: number, colIndex: number, clickedHsl: HSL): void;
export declare function setupSwatchEventListeners(cellContentDiv: HTMLElement, originalHexColor: string, _rowIndex: number, _cellIndex: number): void;
//# sourceMappingURL=interactions.d.ts.map