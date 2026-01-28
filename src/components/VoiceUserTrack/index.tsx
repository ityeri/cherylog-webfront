import VoiceUser from "@/components/VoiceUser";
import VoiceStateTrack from "@/components/VoiceStateTrack";

import DeafIcon from "@/assets/voice-state-icon/deaf.svg"
import MuteIcon from "@/assets/voice-state-icon/mute.svg"
import SelfDeafIcon from "@/assets/voice-state-icon/self-deaf.svg"
import SelfMuteIcon from "@/assets/voice-state-icon/self-mute.svg"
import * as React from "react";

type VoiceUserTrackParms = {
    name: string
    profileImage: string
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
}

export default function VoiceUserTrack({name, profileImage, opened, onDoubleClick}: VoiceUserTrackParms) {
    return <div className="grid grid-cols-subgrid col-span-2 gap-y-1">
        <div className="grid grid-cols-subgrid col-span-2 h-7">
            <div className="track-info sticky left-0 h-full overflow-hidden select-none" onDoubleClick={onDoubleClick}>
                {/* VoiceUser is flex so, overflow-hidden is needed */}
                <VoiceUser
                    name={name} profileImage={profileImage} enabled={false}
                    deaf={false} mute={true} selfDeaf={false} selfMute={false}
                />
            </div>
            <div className="h-full">
                <div className={"size-full rounded-sm bg-amber-400"}></div>
            </div>
        </div>

        <div
            className={`
            grid grid-cols-subgrid col-span-2 grid-rows-4
            ${opened ? "h-24 gap-y-0.5" : "h-0 invisible"}
            transition-all duration-200 ease-out
            `}
        >
            <VoiceStateTrack icon={DeafIcon} alt="TODO"/>
            <VoiceStateTrack icon={MuteIcon} alt="TODO"/>
            <VoiceStateTrack icon={SelfDeafIcon} alt="TODO"/>
            <VoiceStateTrack icon={SelfMuteIcon} alt="TODO"/>
        </div>
    </div>
}