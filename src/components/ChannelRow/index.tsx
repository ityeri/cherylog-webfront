import UserRow from "@/components/UserRow";

import * as React from "react";
import EnabledIcon from "@/assets/voice-channel-enabled.svg";
import DisabledIcon from "@/assets/voice-channel-disabled.svg";
import type {RenderingTrackElement, UserData} from "@/chartData/types.ts";

type ChannelRowParms = {
    name: string
    enabled: boolean
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
    users: Record<number, UserData<RenderingTrackElement>>
}

export default function ChannelRow(
    {name, enabled, opened, onDoubleClick, users}: ChannelRowParms
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
                <div className=" size-full flex items-center gap-2.5">
                    <img src={enabled ? EnabledIcon : DisabledIcon} alt="TODO" className="h-full aspect-square"/>
                    <p className={enabled ? "text-text-primary" : "text-text-disabled"}>{name}</p>
                </div>
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
                Object.values(users).map((userData) => {
                    return <div className={childWrapperClass}>
                        <UserRow
                            name={userData.name}
                            profileImage={userData.profileImage}
                            enabled={userData.enabled}

                            deaf={userData.deaf}
                            mute={userData.mute}
                            selfDeaf={userData.selfDeaf}
                            selfMute={userData.selfMute}

                            voiceStateData={userData.voiceStateData}
                        />
                    </div>
                })
            }
        </div>
    </div>

}