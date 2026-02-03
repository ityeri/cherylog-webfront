import DeafIcon from "@/assets/voice-state-icon/deaf.svg"
import MuteIcon from "@/assets/voice-state-icon/mute.svg"
import SelfDeafIcon from "@/assets/voice-state-icon/self-deaf.svg"
import SelfMuteIcon from "@/assets/voice-state-icon/self-mute.svg"

type VoiceUserParms = {
    name: string
    profileImage: string
    enabled: boolean
    deaf: boolean
    mute: boolean
    selfDeaf: boolean
    selfMute: boolean
}

export default function VoiceUser(
    {name, profileImage, enabled, deaf, mute, selfDeaf, selfMute}: VoiceUserParms
) {
    return <div
        className="
        size-full
        flex justify-between items-center
        rounded-md
        "
    >
        <div className="h-full flex items-center gap-2">
            <div className="relative flex h-full aspect-square rounded-full overflow-clip">
                <img className="size-full" src={profileImage} alt={name}/>
                <div className={`absolute inset-0 size-full bg-black ${enabled ? "hidden" : "opacity-50"}`}/>
            </div>
            <p className={`${enabled ? "text-text-primary" : "text-text-disabled"}`}>{name}</p>
        </div>

        <div className="flex h-8/10 gap-1">
            <img src={DeafIcon} alt="서버 헤드셋 음소거" className={`h-full aspect-square ${deaf ? "" : "hidden"}`}/>
            <img src={MuteIcon} alt="서버 마이크 음소거" className={`h-full aspect-square ${mute ? "" : "hidden"}`}/>
            <img src={SelfDeafIcon} alt="헤드셋 음소거" className={`h-full aspect-square ${selfDeaf ? "" : "hidden"}`}/>
            <img src={SelfMuteIcon} alt="마이크 음소거" className={`h-full aspect-square ${selfMute ? "" : "hidden"}`}/>
        </div>
    </div>
}