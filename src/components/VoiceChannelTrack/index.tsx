import VoiceChannel from "@/components/VoiceChannel";
import VoiceUserTrack, {type VoiceUserTrackData} from "@/components/VoiceUserTrack";

import * as React from "react";
import type {Viewport} from "@/Viewport.ts";

export type VoiceUserData = {
    name: string
    profileImage: string
    trackData: VoiceUserTrackData
}

type VoiceChannelTrackParms = {
    name: string
    enabled: boolean
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
    viewport: Viewport
    users: VoiceUserData[]
}

export default function VoiceChannelTrack(
    {name, enabled, opened, onDoubleClick, viewport, users}: VoiceChannelTrackParms
) {
    const childWrapperClass = `
    grid grid-cols-subgrid col-span-2 
    ${opened ? "h-7" : "h-0 opacity-0 invisible"} 
    transition-all duration-200 ease-out
    `

    return <div className="grid grid-cols-subgrid col-span-2 gap-y-1">
        <div
            className="
            grid grid-cols-subgrid col-span-2
            h-7 rounded-md py-1.5 pl-2 select-none
            hover:bg-background-hover
            transition-colors duration-200
            "
            onDoubleClick={onDoubleClick}
        >
            {/* VoiceUser is flex so, overflow-hidden is needed */}
            <div className="overflow-hidden">
                <VoiceChannel name={name} enabled={enabled}/>
            </div>
            <div>
                {/* nottodo */}
            </div>
        </div>
        <div
            className={`
            grid grid-cols-subgrid col-span-2 pl-2
            `}
        >
            {
                users.map((userData) => {
                    return <div className={childWrapperClass}>
                        <VoiceUserTrack
                            name={userData.name}
                            profileImage={userData.profileImage}
                            viewport={viewport}
                            data={userData.trackData}
                        />
                    </div>
                })
            }
        </div>
    </div>

}