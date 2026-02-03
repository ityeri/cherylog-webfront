import VoiceChannel from "@/components/VoiceChannel";
import VoiceUserTrack from "@/components/VoiceUserTrack";

import TestImage from "@/assets/test.png"
import * as React from "react";

type VoiceChannelTrackParms = {
    name: string
    enabled: boolean
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
}

export default function VoiceChannelTrack({name, enabled, opened, onDoubleClick}: VoiceChannelTrackParms) {
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
                {/* ?? */}
            </div>
        </div>
        <div
            className={`
            grid grid-cols-subgrid col-span-2 pl-2
            `}
        >
            <div className={childWrapperClass}>
                <VoiceUserTrack name="minko" profileImage={TestImage}/>
            </div>
            <div className={childWrapperClass}>
                <VoiceUserTrack name="minko" profileImage={TestImage}/>
            </div>
            <div className={childWrapperClass}>
                <VoiceUserTrack name="minko" profileImage={TestImage}/>
            </div>
            <div className={childWrapperClass}>
                <VoiceUserTrack name="minko" profileImage={TestImage}/>
            </div>
        </div>
    </div>

}