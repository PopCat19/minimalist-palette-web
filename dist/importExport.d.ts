declare global {
    interface Window {
        html2canvas?: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
    }
}
export declare function initImportExport(): void;
export declare function exportPaletteData(): void;
export declare function handlePaletteImport(file: File): void;
export declare function exportPNG(): void;
//# sourceMappingURL=importExport.d.ts.map