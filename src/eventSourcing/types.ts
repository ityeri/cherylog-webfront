import type {ChannelMeta, GuildMeta, UserMeta} from "@/discord/types.ts";
import type {VoiceEvent} from "@/api/types.ts";

export type EventData = Record<string, GuildEventData>

export type GuildEventData = {
    guild: GuildMeta
    channels: Record<string, ChannelEventData>
}

export type ChannelEventData = {
    channel: ChannelMeta
    users: Record<string, UserEventData>
}

export type UserEventData = {
    user: UserMeta

    connectEvents: VoiceEvent[]
    deafEvents: VoiceEvent[]
    muteEvents: VoiceEvent[]
    selfDeafEvents: VoiceEvent[]
    selfMuteEvents: VoiceEvent[]
}