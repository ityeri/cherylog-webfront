import {useEffect, useLayoutEffect, useRef, useState} from "react";
import GuildRow from "@/components/GuildRow";
import type {ChartData, RenderingTrackElement, TimeTrackElement} from "@/chartData/types.ts";
import type {Viewport} from "@/rendering/viewport.ts";
import * as V from "@/rendering/viewport.ts"
import {composeTraversal, lensToTraversal, type Traversal} from "@/optics.ts";
import {
    channelDataTraversal,
    chartDataTraversal,
    guildDataTraversal,
    userDataLens,
    voiceStateDataTraversal
} from "@/chartData/optics.ts";
import * as React from "react";

type ViewerContainerParms = {
    chartData: ChartData<TimeTrackElement>
}

export default function ViewerContainer({chartData}: ViewerContainerParms) { // TODO prevent default wheel (not in jsx space), smooth scroll
    const [goalZoom, setGoalZoom] = useState(0.3)
    const [viewport, setViewport] = useState<Viewport>(
        {
            camera: {
                at: 0.0,
                zoom: 0.3
            },
            center: 0.5,
            viewportWidth: 1
        }
    )

    const project = V.project(viewport)
    const projectScale = V.projectScale(viewport)
    const unproject = V.unproject(viewport)
    const unprojectScale = V.unprojectScale(viewport)

    const chartWrapperRef = useRef<HTMLDivElement>(null)
    const [chartViewportWidth, setChartViewportWidth] = useState(0)
    const chartSpaceRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            if (entry.contentRect.width !== chartViewportWidth) {
                setChartViewportWidth(entry.contentRect.width)
                setViewport(prevViewport => ({
                    ...prevViewport,
                    viewportWidth: entry.contentRect.width
                }))
            }
        })
        observer.observe(chartWrapperRef.current!)
        return () => observer.disconnect()
    })


    const mousePushRef = useRef(false)
    const lastMousePositionRef = useRef({x: 0, y: 0})

    const handleUp = () => {
        mousePushRef.current = false
    }

    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (mousePushRef.current) {
            const lastMousePosition = lastMousePositionRef.current
            const mouseDelta = {
                x: e.clientX - lastMousePosition.x,
                y: e.clientY - lastMousePosition.y
            }

            const deltaXTime = unprojectScale(mouseDelta.x)

            setViewport(prevViewport => ({
                ...prevViewport,
                camera: {
                    ...prevViewport.camera,
                    at: prevViewport.camera.at - deltaXTime
                }
            }))
        }

        lastMousePositionRef.current = {x: e.clientX, y: e.clientY}
    }

    const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        setGoalZoom(prevZoom => prevZoom * (1.002 ** -e.deltaY))
    }

    useEffect(() => {
        window.addEventListener("mouseup", handleUp)
        window.addEventListener("mousemove", handleMouseMove)
        chartSpaceRef.current!.addEventListener("wheel", handleWheel, {passive: false})

        return () => {
            window.removeEventListener("mouseup", handleUp)
            window.removeEventListener("mousemove", handleMouseMove)
            if (chartSpaceRef.current !== null) {
                chartSpaceRef.current.removeEventListener("wheel", handleWheel)
            }
        }
    })


    const zoomAnimationRequestRef = useRef<number | null>(null);
    const minDiff = 0.1;

    useEffect(() => {
        console.log("effect")

        if (zoomAnimationRequestRef.current) {
            cancelAnimationFrame(zoomAnimationRequestRef.current)
        }

        const animate = () => {
            console.log("animate")
            setViewport(prevViewport => {
                const diff = goalZoom - prevViewport.camera.zoom

                if (minDiff < Math.abs(diff)) {
                    const nextZoom = prevViewport.camera.zoom + (diff * 0.1)
                    return {
                        ...prevViewport,
                        camera: { ...prevViewport.camera, zoom: nextZoom }
                    }
                }
                else {
                    return {
                        ...prevViewport,
                        camera: { ...prevViewport.camera, zoom: goalZoom }
                    }
                }
            })

            // TODO
            // it won't capture each latest viewport of frame.
            // because of that, if gap between viewport and goalZoom is not big meaningfully, code is works well
            // sibal
            const diff = goalZoom - viewport.camera.zoom

            if (minDiff < Math.abs(diff)) {
                zoomAnimationRequestRef.current = requestAnimationFrame(animate)
            } else {
                console.log("stop")
                zoomAnimationRequestRef.current = null
            }
        }

        console.log("first start")
        zoomAnimationRequestRef.current = requestAnimationFrame(animate)

        return () => {
            if (zoomAnimationRequestRef.current) {
                cancelAnimationFrame(zoomAnimationRequestRef.current)
            }
        }
    }, [goalZoom])


    function projectTrackElement(trackElement: TimeTrackElement): RenderingTrackElement {
        return {
            leftPx: project(trackElement.at),
            width: projectScale(trackElement.duration)
        }
    }

    const trackElementTraversal:
        Traversal<
            ChartData<TimeTrackElement>, ChartData<RenderingTrackElement>,
            TimeTrackElement, RenderingTrackElement
        > = composeTraversal(
        chartDataTraversal<TimeTrackElement, RenderingTrackElement>(),
        composeTraversal(
            guildDataTraversal(),
            composeTraversal(
                channelDataTraversal(),
                composeTraversal(
                    lensToTraversal(userDataLens()),
                    voiceStateDataTraversal()
                )
            )
        )
    )

    const renderingChartData = trackElementTraversal.editAll(chartData, projectTrackElement)


    const [guildStates, setGuildStates] = useState(
        Object.fromEntries(
            Object.keys(chartData)
                .map((guildId) => [guildId, true])
        )
    )

    const handleDoubleClick = (guildId: string) => {
        setGuildStates(statesOld => Object.assign({}, statesOld, {[guildId]: !statesOld[guildId]}))
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
                Object.keys(renderingChartData)
                    .map((guildId) => {
                        const guildData = renderingChartData[guildId]

                        return <GuildRow
                            name={guildData.name}
                            guildIcon={guildData.icon}
                            opened={guildStates[guildId]}
                            onDoubleClick={() => handleDoubleClick(guildId)}
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
            <div ref={chartWrapperRef}>
                <div
                    className="absolute bottom-0 h-full select-none"
                    style={{
                        width: `${chartViewportWidth}px`
                    }}
                    ref={chartSpaceRef}
                    onMouseDown={() => {
                        mousePushRef.current = true
                    }}
                />
            </div>
        </div>
    </div>
}