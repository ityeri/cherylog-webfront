import * as React from "react";
import {useState} from "react";
import {type ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import GuildRow from "@/components/GuildRow";
import type {ChartData} from "@/types.ts";

type ViewerContainerParms = {
    chartData: ChartData
}

export default function ViewerContainer({chartData}: ViewerContainerParms) {
    const [viewport, setViewport] = useState({
        xShiftPx: 0,
        zoom: 1.0,
        pxPerSecond: 100
    })

    type TransformHandler = (ref: ReactZoomPanPinchRef, state: {
        scale: number
        positionX: number
        positionY: number
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

    const [guildStates, setGuildStates] = useState(
        (Object.keys(chartData) as unknown as number[])
            .map(
                (guildId) => [guildId, true]
            ) as unknown as Record<number, boolean>
    )

    const handleDoubleClick = (guildId :number) => {
        setGuildStates(
            Object.fromEntries(
                (Object.keys(chartData) as unknown as number[])
                    .map((checkingGuildId) => {
                        if (checkingGuildId == guildId) {
                            return [checkingGuildId, !guildStates[checkingGuildId]]
                        } else {
                            return [checkingGuildId, guildStates[checkingGuildId]]
                        }
                    })
            )
        )
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
            {
                (Object.keys(chartData) as unknown as number[])
                    .map((guildId) => {
                        const guildData = chartData[guildId]

                        return <GuildRow
                            name={guildData.name}
                            guildIcon={guildData.icon}
                            opened={guildStates[guildId]}
                            onDoubleClick={() => handleDoubleClick(guildId)}
                            viewport={viewport}
                            channels={guildData.channels}
                        />
                    })
            }
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