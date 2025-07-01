// Popout Editor Module
// Handles the draggable/resizable popout palette editor functionality
import { parseSimpleFormat, convertToSimpleFormat } from "./domUtils.js";
import { getEventCoords } from "./domUtils.js";
import { sourceGridData, currentGridData, setSourceGridData } from "./state.js";
import { renderPalette } from "./rendering.js";
// DOM Elements
let popoutEditor;
let popoutHeader;
let popoutCloseButton;
let popoutPaletteInput;
let popoutUpdateButton;
let popoutResizeHandle;
let popoutStatusMessage;
// Dragging State
let isDraggingPopout = false;
let popoutStartX, popoutStartY, popoutInitialX, popoutInitialY;
// Resizing State
let isResizingPopout = false;
let resizeStartX, resizeStartY, resizeInitialWidth, resizeInitialHeight;
// Snap-to-edge constants
const SNAP_THRESHOLD = 20;
const SNAP_GAP = 16;
// Status message timeout
let statusTimeout = null;
// Initialize popout editor
export function initPopoutEditor() {
    // Get DOM elements
    popoutEditor = document.getElementById("popout-editor");
    popoutHeader = popoutEditor?.querySelector(".popout-header") || null;
    popoutCloseButton = document.getElementById("popout-close-button");
    popoutPaletteInput = document.getElementById("popout-palette-input");
    popoutUpdateButton = document.getElementById("popout-update-button");
    popoutResizeHandle = document.getElementById("popout-resize-handle");
    popoutStatusMessage = document.getElementById("popout-status-message");
    if (!popoutEditor)
        return;
    // Setup event listeners
    setupPopoutEventListeners();
}
// Setup all popout-related event listeners
function setupPopoutEventListeners() {
    // Close button
    if (popoutCloseButton) {
        popoutCloseButton.addEventListener("click", closePopoutEditor);
    }
    // Update button
    if (popoutUpdateButton) {
        popoutUpdateButton.addEventListener("click", handlePopoutUpdate);
    }
    // Drag listeners
    if (popoutHeader) {
        popoutHeader.addEventListener("mousedown", startPopoutDrag);
        popoutHeader.addEventListener("touchstart", startPopoutDrag, {
            passive: false,
        });
    }
    // Resize listeners
    if (popoutResizeHandle) {
        popoutResizeHandle.addEventListener("mousedown", startPopoutResize);
        popoutResizeHandle.addEventListener("touchstart", startPopoutResize, {
            passive: false,
        });
    }
}
// Open the popout editor
export function openPopoutEditor() {
    if (!popoutEditor || !popoutPaletteInput)
        return;
    popoutPaletteInput.value = convertToSimpleFormat(sourceGridData);
    popoutEditor.style.display = "flex";
    // Center the popout initially if no saved position
    const canvasViewport = document.getElementById("canvas-viewport");
    if (canvasViewport && !popoutEditor.style.left) {
        const viewportWidth = canvasViewport.clientWidth;
        const viewportHeight = canvasViewport.clientHeight;
        popoutEditor.style.left = `${(viewportWidth - popoutEditor.offsetWidth) / 2}px`;
        popoutEditor.style.top = `${(viewportHeight - popoutEditor.offsetHeight) / 3}px`;
    }
    popoutPaletteInput.focus();
    popoutPaletteInput.select();
}
// Close the popout editor
export function closePopoutEditor() {
    if (popoutEditor) {
        popoutEditor.style.display = "none";
    }
}
// Handle popout update button click
function handlePopoutUpdate() {
    if (!popoutPaletteInput || !popoutUpdateButton)
        return;
    const textData = popoutPaletteInput.value;
    const originalButtonText = popoutUpdateButton.textContent;
    let updateSuccess = false;
    try {
        const newDataParsed = parseSimpleFormat(textData);
        if (!Array.isArray(newDataParsed) ||
            newDataParsed.length === 0 ||
            !Array.isArray(newDataParsed[0])) {
            throw new Error("Invalid palette format");
        }
        setSourceGridData(newDataParsed);
        renderPalette(currentGridData);
        updateSuccess = true;
    }
    catch (error) {
        console.error("Error parsing or processing text input:", error);
        updateSuccess = false;
    }
    // Show feedback on button
    if (updateSuccess) {
        popoutUpdateButton.textContent = "Updated!";
        setTimeout(() => {
            if (popoutUpdateButton) {
                popoutUpdateButton.textContent = originalButtonText;
            }
        }, 1500);
    }
    else {
        popoutUpdateButton.textContent = "Error";
        setTimeout(() => {
            if (popoutUpdateButton) {
                popoutUpdateButton.textContent = originalButtonText;
            }
        }, 2000);
    }
}
// Show status message in popout
export function showPopoutStatus(message, isError = false) {
    if (!popoutStatusMessage)
        return;
    if (statusTimeout) {
        clearTimeout(statusTimeout);
    }
    popoutStatusMessage.textContent = message;
    popoutStatusMessage.classList.remove("success", "error", "visible");
    requestAnimationFrame(() => {
        if (popoutStatusMessage) {
            popoutStatusMessage.classList.add(isError ? "error" : "success");
            popoutStatusMessage.classList.add("visible");
            statusTimeout = setTimeout(() => {
                if (popoutStatusMessage) {
                    popoutStatusMessage.classList.remove("visible");
                }
            }, 3000);
        }
    });
}
// Drag functionality
function startPopoutDrag(event) {
    // Prevent drag if target is a button
    const target = event.target;
    if (target.closest("button"))
        return;
    // Prevent drag if resizing is active
    if (isResizingPopout)
        return;
    if (!popoutEditor || !popoutHeader)
        return;
    isDraggingPopout = true;
    popoutInitialX = popoutEditor.offsetLeft;
    popoutInitialY = popoutEditor.offsetTop;
    const coords = getEventCoords(event);
    popoutStartX = coords.x;
    popoutStartY = coords.y;
    // Add document-level listeners
    document.addEventListener("mousemove", dragPopout);
    document.addEventListener("mouseup", stopPopoutDrag);
    document.addEventListener("touchmove", dragPopout, { passive: false });
    document.addEventListener("touchend", stopPopoutDrag);
    popoutHeader.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    if (event.type === "touchstart") {
        event.preventDefault();
    }
}
function dragPopout(event) {
    if (!isDraggingPopout || !popoutEditor)
        return;
    const coords = getEventCoords(event);
    const dx = coords.x - popoutStartX;
    const dy = coords.y - popoutStartY;
    let potentialLeft = popoutInitialX + dx;
    let potentialTop = popoutInitialY + dy;
    // Get dimensions
    const canvasViewport = document.getElementById("canvas-viewport");
    if (!canvasViewport)
        return;
    const editorWidth = popoutEditor.offsetWidth;
    const editorHeight = popoutEditor.offsetHeight;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;
    // Apply snap-to-edge logic
    if (potentialLeft < SNAP_THRESHOLD) {
        potentialLeft = SNAP_GAP;
    }
    else if (potentialLeft + editorWidth > viewportWidth - SNAP_THRESHOLD) {
        potentialLeft = viewportWidth - editorWidth - SNAP_GAP;
    }
    if (potentialTop < SNAP_THRESHOLD) {
        potentialTop = SNAP_GAP;
    }
    else if (potentialTop + editorHeight > viewportHeight - SNAP_THRESHOLD) {
        potentialTop = viewportHeight - editorHeight - SNAP_GAP;
    }
    // Constrain to viewport
    potentialLeft = Math.max(0, Math.min(potentialLeft, viewportWidth - editorWidth));
    potentialTop = Math.max(0, Math.min(potentialTop, viewportHeight - editorHeight));
    popoutEditor.style.left = `${potentialLeft}px`;
    popoutEditor.style.top = `${potentialTop}px`;
    if (event.type === "touchmove") {
        event.preventDefault();
    }
}
function stopPopoutDrag() {
    if (isDraggingPopout) {
        isDraggingPopout = false;
        document.removeEventListener("mousemove", dragPopout);
        document.removeEventListener("mouseup", stopPopoutDrag);
        document.removeEventListener("touchmove", dragPopout);
        document.removeEventListener("touchend", stopPopoutDrag);
        if (popoutHeader) {
            popoutHeader.style.cursor = "move";
        }
        document.body.style.userSelect = "";
    }
}
// Resize functionality
function startPopoutResize(event) {
    // Prevent resize if target is not the handle
    if (event.target !== popoutResizeHandle)
        return;
    // Prevent resize if dragging is active
    if (isDraggingPopout)
        return;
    if (!popoutEditor)
        return;
    isResizingPopout = true;
    const coords = getEventCoords(event);
    resizeStartX = coords.x;
    resizeStartY = coords.y;
    resizeInitialWidth = popoutEditor.offsetWidth;
    resizeInitialHeight = popoutEditor.offsetHeight;
    // Add document-level listeners
    document.addEventListener("mousemove", resizePopout);
    document.addEventListener("mouseup", stopPopoutResize);
    document.addEventListener("touchmove", resizePopout, { passive: false });
    document.addEventListener("touchend", stopPopoutResize);
    document.body.style.cursor = "nwse-resize";
    document.body.style.userSelect = "none";
    if (event.type === "touchstart") {
        event.preventDefault();
    }
}
function resizePopout(event) {
    if (!isResizingPopout || !popoutEditor)
        return;
    const coords = getEventCoords(event);
    const dx = coords.x - resizeStartX;
    const dy = coords.y - resizeStartY;
    // Get constraints
    const canvasViewport = document.getElementById("canvas-viewport");
    if (!canvasViewport)
        return;
    const minWidth = parseInt(getComputedStyle(popoutEditor).minWidth, 10) || 150;
    const minHeight = parseInt(getComputedStyle(popoutEditor).minHeight, 10) || 100;
    const currentLeft = popoutEditor.offsetLeft;
    const currentTop = popoutEditor.offsetTop;
    const viewportWidth = canvasViewport.clientWidth;
    const viewportHeight = canvasViewport.clientHeight;
    // Calculate new dimensions
    let newWidth = resizeInitialWidth + dx;
    let newHeight = resizeInitialHeight + dy;
    // Apply constraints
    newWidth = Math.max(minWidth, newWidth);
    newHeight = Math.max(minHeight, newHeight);
    // Prevent resizing beyond viewport bounds
    const maxWidth = viewportWidth - currentLeft;
    const maxHeight = viewportHeight - currentTop;
    newWidth = Math.min(newWidth, maxWidth);
    newHeight = Math.min(newHeight, maxHeight);
    // Apply snap-to-edge for resize
    if (currentLeft + newWidth > viewportWidth - SNAP_THRESHOLD) {
        newWidth = viewportWidth - currentLeft - SNAP_GAP;
    }
    if (currentTop + newHeight > viewportHeight - SNAP_THRESHOLD) {
        newHeight = viewportHeight - currentTop - SNAP_GAP;
    }
    popoutEditor.style.width = `${newWidth}px`;
    popoutEditor.style.height = `${newHeight}px`;
    if (event.type === "touchmove") {
        event.preventDefault();
    }
}
function stopPopoutResize() {
    if (isResizingPopout) {
        isResizingPopout = false;
        document.removeEventListener("mousemove", resizePopout);
        document.removeEventListener("mouseup", stopPopoutResize);
        document.removeEventListener("touchmove", resizePopout);
        document.removeEventListener("touchend", stopPopoutResize);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
    }
}
// Get popout state for saving
export function getPopoutState() {
    if (!popoutEditor)
        return null;
    return {
        left: popoutEditor.style.left || "",
        top: popoutEditor.style.top || "",
        width: popoutEditor.style.width || "",
        height: popoutEditor.style.height || "",
    };
}
// Restore popout state
export function restorePopoutState(state) {
    if (!popoutEditor || !state)
        return;
    if (state.left)
        popoutEditor.style.left = state.left;
    if (state.top)
        popoutEditor.style.top = state.top;
    if (state.width)
        popoutEditor.style.width = state.width;
    if (state.height)
        popoutEditor.style.height = state.height;
}
// Check if dragging is active (for preventing other interactions)
export function isPopoutDragging() {
    return isDraggingPopout;
}
// Check if resizing is active (for preventing other interactions)
export function isPopoutResizing() {
    return isResizingPopout;
}
//# sourceMappingURL=popoutEditor.js.map