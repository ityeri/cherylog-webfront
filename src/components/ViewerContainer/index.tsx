import VoiceUserTrack from "@/components/VoiceUserTrack";
import TestImage from "@/assets/test.png";
import { useEffect, useRef, useState } from "react";
import type { UserTrackDataTime, Viewport, ViewportState } from "@/lib/types";
import { processTimeToPixelAndPrune } from "@/lib/projection";
import { dragViewport, pxToAbsoluteTime, zoomViewport } from "@/lib/transform";
import { viewportSecondsPerPixel } from "@/lib/viewport";
import { useMousePosition } from "@/hooks/useMousePosition";

const sampleData: UserTrackDataTime = {
    disconnection: [{ at: 1.1, duration: 0.5 }],
    deaf: [{ at: 1, duration: 1 }],
    mute: [{ at: 2, duration: 1 }],
    selfDeaf: [{ at: 0, duration: 3 }],
    selfMute: []
}

export default function ViewerContainer() {
    const [viewportState, setViewportState] = useState<ViewportState>({
        startTime: 0,
        endTime: 4,
    });

    const { getMousePosition } = useMousePosition();
    const chartRef = useRef<HTMLDivElement>(null);

    const [chartWidthPx, setChartWidthPx] = useState<number>(1860);

    const viewport: Viewport = {
        chartWidthPx,
        state: viewportState,
    }

    const projectedData = processTimeToPixelAndPrune(viewport, sampleData);

    function chartRelativeMousePosX() {
        const mousePosition = getMousePosition();
        const chartLeft = chartRef.current?.getBoundingClientRect().left || 0;
        return mousePosition ? mousePosition.x - chartLeft : 0;
    }

    useEffect(() => {
        window.addEventListener("mousemove", (event) => {
            event.preventDefault();

            const timeX = viewportSecondsPerPixel(viewport) * event.movementX;

            if (event.buttons === 1) {
                setViewportState(dragViewport(timeX));
            }
        })

        window.addEventListener("wheel", (event) => {
            event.preventDefault();

            const chartMouseX = chartRelativeMousePosX();
            const centerTime = pxToAbsoluteTime(chartMouseX, viewport);

            const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

            setViewportState(zoomViewport(zoomFactor, centerTime));

            console.log("wheel event", zoomFactor, centerTime);
        }, { passive: false });
    }, []);

    return <div
        className="
        relative
        size-full
        grid grid-cols-[200px_1fr]
        gap-y-5
        "
    >
        <div className="grid grid-cols-subgrid col-span-2 h-7" ref={chartRef}>
            <VoiceUserTrack
                name="minko" profileImage={TestImage}
                data={projectedData}
            />
        </div>

        <div className="h-0 grid grid-cols-subgrid col-span-2">
            <div
                className="
                flex justify-end
                bg-background-primary
                "
            >
                <div className="absolute bottom-0 h-full">
                    <div className="w-px h-full bg-text-disabled" />
                </div>
            </div>
            <div>
                <div className="absolute bottom-0 w-full h-full">
                    {/*
                    <TransformWrapper
                        minScale={0.01}
                        limitToBounds={false}
                        onTransformed={handleTransform}
                    >
                        <TransformComponent
                            wrapperStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                            children={<div />}
                        />
                    </TransformWrapper>*/}
                </div>
            </div>
        </div>
    </div>
}
