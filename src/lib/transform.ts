import type { Viewport, ViewportState } from "./types"
import { viewportPixelPerSecond } from "./viewport"

export function pxToAbsoluteTime(px: number, viewport: Viewport): number {
    const pxPerSecond = viewportPixelPerSecond(viewport)

    const timeAtViewportStart = viewport.state.startTime
    const timeOffset = pxToTime(px, pxPerSecond)
    return timeAtViewportStart + timeOffset
}

export function timeToPx(time: number, pxPerSecond: number): number {
    return time * pxPerSecond
}

export function pxToTime(px: number, pxPerSecond: number): number {
    return px / pxPerSecond
}

export const dragViewport = (deltaTime: number) => (state: ViewportState): ViewportState => {
    return {
        startTime: state.startTime - deltaTime,
        endTime: state.endTime - deltaTime
    }
}

export const zoomViewport = (zoomFactor: number, focalTime: number) => (state: ViewportState): ViewportState => {
    const delta = focalTime * (zoomFactor - 1)

    const newStartTime = zoomFactor * state.startTime + delta
    const newEndTime = zoomFactor * state.endTime + delta

    return {
        startTime: newStartTime,
        endTime: newEndTime
    }
}
