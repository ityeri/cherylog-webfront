import DeafIcon from "@/assets/voice-state-icon/deaf.svg";
import MuteIcon from "@/assets/voice-state-icon/mute.svg";
import SelfDeafIcon from "@/assets/voice-state-icon/self-deaf.svg";
import SelfMuteIcon from "@/assets/voice-state-icon/self-mute.svg";
import type {RenderingTrackElement, VoiceStateData} from "@/chartData/types.ts";
import type {UserMeta} from "@/discord/types.ts";

type UserRowParms = {
    userMeta: UserMeta

    enabled: boolean

    deaf: boolean
    mute: boolean
    selfDeaf: boolean
    selfMute: boolean

    voiceStateData: VoiceStateData<RenderingTrackElement>
}

export default function UserRow(
    {
        userMeta,
        enabled,
        deaf, mute, selfDeaf, selfMute,
        voiceStateData
    }: UserRowParms
) {
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
            <div
            className="
        size-full
        flex justify-between items-center
        rounded-md
        "
        >
            <div className="h-full flex items-center gap-2">
                <div className="relative flex h-full aspect-square rounded-full overflow-clip">
                    <img className="size-full" src={userMeta.profileImage} alt={userMeta.name}/>
                    <div className={`absolute inset-0 size-full bg-black ${enabled ? "hidden" : "opacity-50"}`}/>
                </div>
                <p className={`${enabled ? "text-text-primary" : "text-text-disabled"}`}>{userMeta.name}</p>
            </div>

            <div className="flex h-8/10 gap-1">
                <img src={DeafIcon} alt="서버 헤드셋 음소거" className={`h-full aspect-square ${deaf ? "" : "hidden"}`}/>
                <img src={MuteIcon} alt="서버 마이크 음소거" className={`h-full aspect-square ${mute ? "" : "hidden"}`}/>
                <img src={SelfDeafIcon} alt="헤드셋 음소거" className={`h-full aspect-square ${selfDeaf ? "" : "hidden"}`}/>
                <img src={SelfMuteIcon} alt="마이크 음소거" className={`h-full aspect-square ${selfMute ? "" : "hidden"}`}/>
            </div>
        </div>
        </div>
        <div>
            <div className="relative size-full">
                <div className=" size-full flex flex-col gap-1 overflow-clip">
                    <div className="flex-1 relative">
                        {
                            voiceStateData.selfDeaf.map(trackElement => {
                                return <div
                                    className="absolute inset-y-0 bg-text-disabled rounded-full"
                                    style={{
                                        transform: `translateX(${trackElement.leftPx}px)`,
                                        width: `${trackElement.width}px`
                                    }}
                                />
                            })
                        }
                        {
                            voiceStateData.deaf.map(trackElement => {
                                return <div
                                    className="absolute inset-y-0 bg-red-500 rounded-full"
                                    style={{
                                        transform: `translateX(${trackElement.leftPx}px)`,
                                        width: `${trackElement.width}px`
                                    }}
                                />
                            })
                        }
                    </div>
                    <div className="flex-1 relative">
                        {
                            voiceStateData.selfMute.map(trackElement => {
                                return <div
                                    className="absolute inset-y-0 bg-text-disabled rounded-full"
                                    style={{
                                        transform: `translateX(${trackElement.leftPx}px)`,
                                        width: `${trackElement.width}px`
                                    }}
                                />
                            })
                        }
                        {
                            voiceStateData.mute.map(trackElement => {
                                return <div
                                    className="absolute inset-y-0 bg-red-500 rounded-full"
                                    style={{
                                        transform: `translateX(${trackElement.leftPx}px)`,
                                        width: `${trackElement.width}px`
                                    }}
                                />
                            })
                        }
                    </div>
                </div>

                <div className="absolute size-full left-0 top-0 overflow-clip">
                    {
                        voiceStateData.disconnection.map(trackElement => {
                            return <div
                                className="absolute inset-y-0 bg-black opacity-50"
                                style={{
                                    transform: `translateX(${trackElement.leftPx}px)`,
                                    width: `${trackElement.width}px`
                                }}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}