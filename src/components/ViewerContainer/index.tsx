import VoiceUserTrack from "@/components/VoiceUserTrack";
import TestImage from "@/assets/test.png";
import {useState} from "react";
import {type ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import VoiceChannelTrack from "@/components/VoiceChannelTrack";
import {testData} from "@/textData.ts";
import VoiceGuildTrack from "@/components/VoiceGuildTrack";
import * as React from "react";

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
        w-full
        h-auto
        grid grid-cols-[200px_1fr]
        gap-y-5
        "
    >


        <div className="grid grid-cols-subgrid col-span-2">
            <VoiceGuildTrack
                name="밍코와 친구들"
                guildIcon={TestImage}
                opened={true}
                onDoubleClick={() => {}}
                viewport={viewport}
                channels={testData}
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
            <div style={{ '--viewport-width': '100%' } as React.CSSProperties}>
                <div className="absolute bottom-0 w-(--viewport-width) h-full">
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