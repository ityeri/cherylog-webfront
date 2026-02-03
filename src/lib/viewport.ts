import type { Viewport, ViewportState } from "./types";

export function viewportPixelPerSecond(viewport: Viewport): number {
    const { chartWidthPx, state: { startTime, endTime } } = viewport;
    const totalTime = endTime - startTime;
    return chartWidthPx / totalTime;
}

export function viewportSecondsPerPixel(viewport: Viewport): number {
    const pxPerSecond = viewportPixelPerSecond(viewport);
    return 1 / pxPerSecond;
}

export function applyTransformation(viewport: Viewport, f: (state: ViewportState) => ViewportState): number {
    const newState = f(viewport.state);
    const pxPerSecond = viewportPixelPerSecond({
        ...viewport,
        state: newState
    });
    return pxPerSecond;
}
