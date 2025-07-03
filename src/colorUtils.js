// --- Color Conversion and Manipulation Utilities ---

// Validation function for hex colors
export function isValidHex(str) {
    return (
        typeof str === "string" &&
        str.startsWith("#") &&
        (str.length === 4 || str.length === 7) &&
        /^#[0-9A-Fa-f]+$/.test(str)
    );
}

// Convert hex to RGB
export function hexToRgb(hex) {
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

// Convert RGB component to hex
export function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

// Convert RGB to hex
export function rgbToHex(r, g, b) {
    if (typeof r === "object" && r !== null) {
        // Handle object input {r, g, b}
        return "#" + componentToHex(r.r) + componentToHex(r.g) + componentToHex(r.b);
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Interpolate between two hex colors
export function interpolateHexColor(hex1, hex2, factor) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    if (!rgb1 || !rgb2) return hex1; // Return first color if conversion fails

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

    return rgbToHex(r, g, b);
}

// Convert RGB to HSL
export function rgbToHsl(r, g, b) {
    if (typeof r === "object" && r !== null) {
        // Handle object input {r, g, b}
        ({ r, g, b } = r);
    }
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to RGB
export function hslToRgb(h, s, l) {
    if (typeof h === "object" && h !== null) {
        // Handle object input {h, s, l}
        ({ h, s, l } = h);
    }
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

// Convert hex to HSL
export function hexToHsl(hex) {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHsl(rgb) : null;
}

// Convert HSL to hex
export function hslToHex(h, s, l) {
    const rgb = hslToRgb(h, s, l);
    return rgbToHex(rgb);
}

// Adjust saturation of a hex color
export function adjustSaturation(hexColor, offset) {
    if (!isValidHex(hexColor) || offset === 0) return hexColor;

    const hsl = hexToHsl(hexColor);
    if (!hsl) return hexColor;

    // Apply offset and clamp to [0, 100]
    hsl.s = Math.max(0, Math.min(100, hsl.s + offset));

    return hslToHex(hsl.h, hsl.s, hsl.l);
}

// Raw RGB to HSL conversion (returns values in 0-1 range)
export function rgbToHslRaw(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h, s, l };
}

// Raw HSL to RGB conversion (accepts values in 0-1 range)
export function hslToRgbRaw(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}

// Parse X value for interpolation
export function parseXValue(xStr) {
    if (typeof xStr !== "string") return null;
    const match = xStr.match(/^(\d+)x$/);
    return match ? parseInt(match[1], 10) : null;
}

// Interpolate RGB values
export function interpolateRgb(rgb1, rgb2, factor) {
    return {
        r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor),
        g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor),
        b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor),
    };
}

// Get appropriate text color (black or white) for given background color
export function getTextColor(hexBgColor) {
    if (!hexBgColor || typeof hexBgColor !== "string")
        return "#000000"; // Default to black
    const rgb = hexToRgb(hexBgColor);
    if (!rgb) return "#000000"; // Default to black on error
    // Calculate luminance (per WCAG)
    const lum = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    // Return pure white or black for maximum contrast
    return lum > 0.5 ? "#000000" : "#FFFFFF";
}

// Get difference between two hue values (in degrees)
export function getHueDifference(hue1, hue2) {
    const diff = Math.abs(hue1 - hue2);
    return Math.min(diff, 360 - diff);
}
