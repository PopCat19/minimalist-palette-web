export declare function initPopoutEditor(): void;
export declare function openPopoutEditor(): void;
export declare function closePopoutEditor(): void;
export declare function showPopoutStatus(message: string, isError?: boolean): void;
interface PopoutState {
    left: string;
    top: string;
    width: string;
    height: string;
}
export declare function getPopoutState(): PopoutState | null;
export declare function restorePopoutState(state: PopoutState | null): void;
export declare function isPopoutDragging(): boolean;
export declare function isPopoutResizing(): boolean;
export {};
//# sourceMappingURL=popoutEditor.d.ts.map