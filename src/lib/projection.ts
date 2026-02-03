import type { TrackPixelData, TrackTimeData, UserTrackDataPixel, UserTrackDataTime, Viewport } from "./types";
import { viewportPixelPerSecond } from "./viewport";

function mapAllObjectItems<K extends string, T, R>(obj: Record<K, T>, f: (value: T) => R): Record<K, R> {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, f(value as T)]
        )
    ) as Record<K, R>;
}

export function processTimeToPixelAndPrune(viewport: Viewport, trackDataTime: UserTrackDataTime): UserTrackDataPixel {
    const trackDataPixel = timeSpaceToPixelSpace(viewport, trackDataTime);
    return pruneUserTrackDataPixel(viewport, trackDataPixel);
}

function pruneUserTrackDataPixel(viewport: Viewport, trackDataPixel: UserTrackDataPixel): UserTrackDataPixel {
    return mapAllObjectItems(trackDataPixel, (trackPixelDataArray) => pruneAndClipTrackPixelData(viewport, trackPixelDataArray))
}

function timeSpaceToPixelSpace(viewport: Viewport, trackDataTime: UserTrackDataTime): UserTrackDataPixel {
    return mapAllObjectItems(trackDataTime, (trackTimeDataArray) => trackTimeDataArray.map(trackTimeData => trackTimeToTrackPixel(viewport, trackTimeData)))
}

function trackTimeToTrackPixel(viewport: Viewport, trackTimeData: TrackTimeData): TrackPixelData {
    const { startTime } = viewport.state;

    const pxPerSecond = viewportPixelPerSecond(viewport);

    const leftPx = (trackTimeData.at - startTime) * pxPerSecond;
    const widthPx = trackTimeData.duration * pxPerSecond;

    return {
        leftPx,
        widthPx
    }
}

function pruneAndClipTrackPixelData(viewport: Viewport, trackPixelData: TrackPixelData[]): TrackPixelData[] {
    const { chartWidthPx } = viewport;
    return trackPixelData
        .map(data => {
            const rightPx = data.leftPx + data.widthPx;
            if (rightPx < 0 || data.leftPx > chartWidthPx) {
                return null; // Completely outside the viewport
            }

            const clippedLeftPx = Math.max(0, data.leftPx);
            const clippedRightPx = Math.min(chartWidthPx, rightPx);
            const clippedWidthPx = clippedRightPx - clippedLeftPx;

            return {
                leftPx: clippedLeftPx,
                widthPx: clippedWidthPx
            }
        })
        .filter((data): data is TrackPixelData => data !== null);
}
