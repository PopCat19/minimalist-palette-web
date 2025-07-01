export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export declare function isValidHex(str: string): boolean;
export declare function hexToRgb(hex: string): RGB | null;
export declare function componentToHex(c: number): string;
export declare function rgbToHex(rgb: RGB): string;
export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function interpolateHexColor(hex1: string, hex2: string, factor: number): string;
export declare function rgbToHsl(rgb: RGB): HSL;
export declare function rgbToHsl(r: number, g: number, b: number): HSL;
export declare function hslToRgb(hsl: HSL): RGB;
export declare function hslToRgb(h: number, s: number, l: number): RGB;
export declare function hexToHsl(hex: string): HSL | null;
export declare function hslToHex(hsl: HSL): string;
export declare function hslToHex(h: number, s: number, l: number): string;
export declare function adjustSaturation(hexColor: string, offset: number): string;
export declare function rgbToHslRaw(r: number, g: number, b: number): {
    h: number;
    s: number;
    l: number;
};
export declare function hslToRgbRaw(h: number, s: number, l: number): {
    r: number;
    g: number;
    b: number;
};
export declare function parseXValue(xStr: string): number | null;
export declare function interpolateRgb(rgb1: RGB, rgb2: RGB, factor: number): RGB;
export declare function getTextColor(hexBgColor: string): string;
export declare function getHueDifference(hue1: number, hue2: number): number;
//# sourceMappingURL=colorUtils.d.ts.map