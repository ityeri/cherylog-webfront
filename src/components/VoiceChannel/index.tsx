import EnabledIcon from "@/assets/voice-channel-enabled.svg"
import DisabledIcon from "@/assets/voice-channel-disabled.svg"

type VoiceChannelParms = {
    name: string
    enabled: boolean
}

export default function VoiceChannel({name, enabled}: VoiceChannelParms) {
    return <div
        className="
        size-full flex items-center gap-2.5
        "
    >
        <img src={enabled ? EnabledIcon : DisabledIcon} alt="TODO" className="h-full aspect-square"/>
        <p className={enabled ? "text-text-primary" : "text-text-disabled"}>{name}</p>
    </div>
}