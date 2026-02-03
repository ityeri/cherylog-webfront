import VoiceUser from "@/components/VoiceUser";
import type {Viewport} from "@/Viewport.ts";

type TrackElementData = {
    at: number
    duration: number
}

export type VoiceUserTrackData = {
    disconnection: TrackElementData[]
    deaf: TrackElementData[]
    mute: TrackElementData[]
    selfDeaf: TrackElementData[]
    selfMute: TrackElementData[]
}

type VoiceUserTrackParms = {
    name: string
    profileImage: string

    viewport: Viewport
    data: VoiceUserTrackData
}

export default function VoiceUserTrack({name, profileImage, viewport, data}: VoiceUserTrackParms) {
    return <div
        className="
        grid grid-cols-subgrid col-span-2
        py-1 rounded-md
        overflow-hidden
        hover:bg-background-hover
        transition-colors
        duration-200
        "
    >
        {/* VoiceUser is flex so, overflow-hidden is needed */}
        <div className="overflow-hidden p-px px-2">
            <VoiceUser
                name={name} profileImage={profileImage} enabled={false}
                deaf={true} mute={false} selfDeaf={true} selfMute={false}
            />
        </div>
        <div>
            <div className="relative size-full">
                <div className=" size-full flex flex-col gap-1 overflow-clip">
                    <div className="flex-1 relative">
                        {
                            data.selfDeaf.map(value => { // TODO value -> any other name?
                                return <div
                                    className="absolute inset-y-0 bg-text-disabled rounded-full"
                                    style={{
                                        left: `${value.at * viewport.pxPerSecond * viewport.zoom + viewport.xShiftPx}px`,
                                        width: `${value.duration * viewport.pxPerSecond * viewport.zoom}%`,
                                    }}
                                />
                            })
                        }
                        {
                            data.deaf.map(value => {
                                return <div
                                    className="absolute inset-y-0 bg-red-500 rounded-full"
                                    style={{
                                        left: `${value.at * viewport.pxPerSecond * viewport.zoom + viewport.xShiftPx}px`,
                                        width: `${value.duration * viewport.pxPerSecond * viewport.zoom}%`,
                                    }}
                                />
                            })
                        }
                    </div>
                    <div className="flex-1 relative">
                        {
                            data.selfMute.map(value => {
                                return <div
                                    className="absolute inset-y-0 bg-text-disabled rounded-full"
                                    style={{
                                        left: `${value.at * viewport.pxPerSecond * viewport.zoom + viewport.xShiftPx}px`,
                                        width: `${value.duration * viewport.pxPerSecond * viewport.zoom}%`,
                                    }}
                                />
                            })
                        }
                        {
                            data.mute.map(value => {
                                return <div
                                    className="absolute inset-y-0 bg-red-500 rounded-full"
                                    style={{
                                        left: `${value.at * viewport.pxPerSecond * viewport.zoom + viewport.xShiftPx}px`,
                                        width: `${value.duration * viewport.pxPerSecond * viewport.zoom}%`,
                                    }}
                                />
                            })
                        }
                    </div>
                </div>

                <div className="absolute size-full left-0 top-0 overflow-clip">
                    {
                        data.disconnection.map(value => {
                            return <div
                                className="absolute inset-y-0 bg-black opacity-50"
                                style={{
                                    left: `${value.at * viewport.pxPerSecond * viewport.zoom + viewport.xShiftPx}px`,
                                    width: `${value.duration * viewport.pxPerSecond * viewport.zoom}%`,
                                }}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}