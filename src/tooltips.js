// --- Tooltip Functionality ---

import { isValidHex, hexToHsl, hexToRgb } from './colorUtils.js';
import { copyToClipboard, showCopiedFeedback } from './domUtils.js';
import {
    isShiftHeld,
    isMouseOverTooltip,
    allowTooltipInteraction,
    currentTooltipTargetCell,
    setMouseOverTooltip,
    setAllowTooltipInteraction,
    setCurrentTooltipTargetCell
} from './state.js';

// Update and show palette tooltip
export function updateAndShowPaletteTooltip(hexColor, event, cellElement) {
    const paletteTooltip = document.getElementById('palette-tooltip');
    const tooltipHexValue = document.querySelector('#palette-tooltip #tooltip-hex span');
    const tooltipHslValue = document.querySelector('#palette-tooltip #tooltip-hsl span');
    const tooltipRgbValue = document.querySelector('#palette-tooltip #tooltip-rgb span');

    if (!paletteTooltip || !isValidHex(hexColor) || !tooltipHexValue || !tooltipHslValue || !tooltipRgbValue) {
        hidePaletteTooltip();
        return;
    }

    setCurrentTooltipTargetCell(cellElement);

    const hsl = hexToHsl(hexColor);
    const rgb = hexToRgb(hexColor);

    tooltipHexValue.textContent = hexColor.toUpperCase();
    if (hsl) {
        tooltipHslValue.textContent = `H:${hsl.h}° S:${hsl.s}% L:${hsl.l}%`;
    } else {
        tooltipHslValue.textContent = 'N/A';
    }
    if (rgb) {
        tooltipRgbValue.textContent = `R:${rgb.r} G:${rgb.g} B:${rgb.b}`;
    } else {
        tooltipRgbValue.textContent = 'N/A';
    }

    const offsetX = 15;
    const offsetY = 15;
    let newLeft = event.clientX + offsetX;
    let newTop = event.clientY + offsetY;

    paletteTooltip.style.display = 'block';

    if (newLeft + paletteTooltip.offsetWidth > window.innerWidth) {
        newLeft = event.clientX - paletteTooltip.offsetWidth - offsetX;
    }
    if (newTop + paletteTooltip.offsetHeight > window.innerHeight) {
        newTop = event.clientY - paletteTooltip.offsetHeight - offsetY;
    }

    newLeft = Math.max(0, newLeft);
    newTop = Math.max(0, newTop);

    paletteTooltip.style.left = `${newLeft}px`;
    paletteTooltip.style.top = `${newTop}px`;

    if (isShiftHeld) {
        paletteTooltip.classList.add('palette-tooltip--interactive');
        setAllowTooltipInteraction(true);
    } else {
        paletteTooltip.classList.remove('palette-tooltip--interactive');
        setAllowTooltipInteraction(false);
    }

    requestAnimationFrame(() => {
        paletteTooltip.style.opacity = '1';
    });
}

// Hide palette tooltip
export function hidePaletteTooltip() {
    const paletteTooltip = document.getElementById('palette-tooltip');

    if (paletteTooltip) {
        // If shift is held and mouse is over tooltip, don't hide
        if (isShiftHeld && isMouseOverTooltip && allowTooltipInteraction) {
            return;
        }
        paletteTooltip.style.opacity = '0';
        paletteTooltip.classList.remove('palette-tooltip--interactive');
        setAllowTooltipInteraction(false);
        setCurrentTooltipTargetCell(null);
        setTimeout(() => {
            if (paletteTooltip.style.opacity === '0') {
                paletteTooltip.style.display = 'none';
            }
        }, 150);
    }
}

// Handle tooltip copy functionality
export function handleTooltipCopy(event) {
    const tooltipHexValue = document.querySelector('#palette-tooltip #tooltip-hex span');
    const tooltipHslValue = document.querySelector('#palette-tooltip #tooltip-hsl span');
    const tooltipRgbValue = document.querySelector('#palette-tooltip #tooltip-rgb span');

    const span = event.target;
    let textToCopy = null;

    if (span === tooltipHexValue) {
        textToCopy = span.textContent; // Full HEX including #
    } else if (span === tooltipHslValue) {
        textToCopy = span.textContent; // Full HSL string
    } else if (span === tooltipRgbValue) {
        const rgbFullText = span.textContent; // "R:X G:Y B:Z"
        const rgbMatch = rgbFullText.match(/R:(\d{1,3})\s*G:(\d{1,3})\s*B:(\d{1,3})/);
        if (rgbMatch) {
            textToCopy = `${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]}`; // "X,Y,Z"
        } else {
            console.warn("Could not parse RGB from tooltip:", rgbFullText);
            return;
        }
    } else {
        console.warn("Unknown tooltip span clicked for copy:", span);
        return;
    }

    if (textToCopy && currentTooltipTargetCell) {
        copyToClipboard(textToCopy).then(() => {
            showCopiedFeedback(currentTooltipTargetCell);
            const originalText = span.textContent;
            span.textContent = 'Copied!';
            setTimeout(() => { span.textContent = originalText; }, 1000);
        }).catch(err => {
            console.error("Tooltip copy failed:", err);
            alert("Failed to copy.");
        });

        setTimeout(() => {
            hidePaletteTooltip();
        }, 1100);
    }
}

// Setup tooltip event listeners
export function setupTooltipEventListeners() {
    const tooltipHexValue = document.querySelector('#palette-tooltip #tooltip-hex span');
    const tooltipHslValue = document.querySelector('#palette-tooltip #tooltip-hsl span');
    const tooltipRgbValue = document.querySelector('#palette-tooltip #tooltip-rgb span');
    const paletteTooltip = document.getElementById('palette-tooltip');

    if (tooltipHexValue && tooltipHslValue && tooltipRgbValue) {
        [tooltipHexValue, tooltipHslValue, tooltipRgbValue].forEach(span => {
            span.addEventListener('click', handleTooltipCopy);
            span.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    handleTooltipCopy(event);
                }
            });
        });
    }

    // Tooltip mouse enter/leave handlers
    if (paletteTooltip) {
        paletteTooltip.addEventListener('mouseenter', () => {
            setMouseOverTooltip(true);
        });

        paletteTooltip.addEventListener('mouseleave', () => {
            setMouseOverTooltip(false);
            // Hide tooltip when mouse leaves if not in interactive mode
            if (!allowTooltipInteraction) {
                hidePaletteTooltip();
            }
        });
    }
}

// Handle hotkey copying from tooltip
export function handleTooltipHotkeysCopy(event) {
    const tooltipHexValue = document.querySelector('#palette-tooltip #tooltip-hex span');
    const tooltipHslValue = document.querySelector('#palette-tooltip #tooltip-hsl span');
    const tooltipRgbValue = document.querySelector('#palette-tooltip #tooltip-rgb span');
    const paletteTooltip = document.getElementById('palette-tooltip');

    const activeElement = document.activeElement;
    const isTyping = activeElement &&
                     (activeElement.tagName === 'INPUT' ||
                      activeElement.tagName === 'TEXTAREA' ||
                      activeElement.isContentEditable);

    // Check if tooltip is visible over a cell AND not typing in an input
    if (!isTyping && currentTooltipTargetCell && paletteTooltip && paletteTooltip.style.display === 'block') {
        let textToCopy = null;
        let copyTypeForLog = "";

        if (event.key === '1' || event.key === '2' || event.key === '3') {
            event.preventDefault();

            switch (event.key) {
                case '1': // HEX
                    textToCopy = tooltipHexValue.textContent;
                    copyTypeForLog = "HEX";
                    break;
                case '2': // HSL
                    textToCopy = tooltipHslValue.textContent;
                    copyTypeForLog = "HSL";
                    break;
                case '3': // RGB
                    const rgbFullText = tooltipRgbValue.textContent;
                    const rgbMatch = rgbFullText.match(/R:(\d{1,3})\s*G:(\d{1,3})\s*B:(\d{1,3})/);
                    if (rgbMatch) {
                        textToCopy = `${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]}`;
                        copyTypeForLog = "RGB";
                    } else {
                        console.warn("Could not parse RGB from tooltip for hotkey copy:", rgbFullText);
                    }
                    break;
            }

            if (textToCopy) {
                const cellDiv = currentTooltipTargetCell;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopiedFeedback(cellDiv);
                    console.log(`${copyTypeForLog} value copied via hotkey: ${textToCopy}`);
                }).catch(err => {
                    console.error(`Hotkey copy for ${copyTypeForLog} failed: `, err);
                    alert("Failed to copy.");
                });
            }
        }
    }
}
