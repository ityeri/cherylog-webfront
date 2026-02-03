import VoiceUserTrack from "@/components/VoiceUserTrack";
import TestImage from "@/assets/test.png";
import {useState} from "react";
import {type ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

export default function ViewerContainer() {
    const [viewport, setViewport] = useState({
        xShiftPx: 0,
        zoom: 1.0,
        pxPerSecond: 100
    })

    type TransformHandler = (ref: ReactZoomPanPinchRef, state: {
        scale: number;
        positionX: number;
        positionY: number;
    }) => void

    const handleTransform: TransformHandler = (
        _ref, {scale, positionX}
    ) => {
        setViewport({
            xShiftPx: positionX,
            zoom: scale,
            pxPerSecond: viewport.pxPerSecond
        })
    }

    return <div
        className="
        relative
        size-full
        grid grid-cols-[200px_1fr]
        gap-y-5
        "
    >
        <div className="grid grid-cols-subgrid col-span-2 h-7">
            <VoiceUserTrack
                name="minko" profileImage={TestImage}
                viewport={viewport}
                data={{
                    disconnection: [{at: 1.1, duration: 0.5}],
                    deaf: [{at: 1, duration: 1}],
                    mute: [{at: 2, duration: 1}],
                    selfDeaf: [{at: 0, duration: 3}],
                    selfMute: []
                }}
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
                    <div className="w-px h-full bg-text-disabled"/>
                </div>
            </div>
            <div>
                <div className="absolute bottom-0 w-full h-full">
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
                            children={<div/>}
                        />
                    </TransformWrapper>
                </div>
            </div>
        </div>
    </div>
}