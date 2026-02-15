import type {Pixel, Time} from "@/types.ts";
import type {ChannelMeta, GuildMeta, UserMeta} from "@/discord/types.ts";

export type ChartData<T extends TrackElement> = Record<string, GuildChartData<T>>

export type GuildChartData<T extends TrackElement> = {
    guild: GuildMeta
    channels: Record<string, ChannelChartData<T>>
}

export type ChannelChartData<T extends TrackElement> = {
    channel: ChannelMeta
    enabled: boolean
    users: Record<string, UserChartData<T>>
}

export type UserChartData<T extends TrackElement> = {
    user: UserMeta

    enabled: boolean

    deaf: boolean
    mute: boolean
    selfDeaf: boolean
    selfMute: boolean

    voiceStateData: VoiceStateData<T>
}

export type VoiceStateData<T extends TrackElement> = {
    disconnection: T[]
    deaf: T[]
    mute: T[]
    selfDeaf: T[]
    selfMute: T[]
}

// TODO
export interface TrackElement {}

export type TimeTrackElement = TrackElement & {
    at: Time
    duration: Time
}

export type RenderingTrackElement = TrackElement & {
    leftPx: Pixel
    width: Pixel
}