import type {Pixel, Time} from "@/types.ts";

export interface TrackElement {}

export type TimeTrackElement = TrackElement & {
    at: Time
    duration: Time
}

export type RenderingTrackElement = TrackElement & {
    leftPx: Pixel
    width: Pixel
}

export type VoiceStateData<T extends TrackElement> = {
    disconnection: T[]
    deaf: T[]
    mute: T[]
    selfDeaf: T[]
    selfMute: T[]
}

export type UserData<T extends TrackElement> = {
    id: string
    name: string
    profileImage: string
    enabled: boolean

    deaf: boolean
    mute: boolean
    selfDeaf: boolean
    selfMute: boolean

    voiceStateData: VoiceStateData<T>
}

export type ChannelData<T extends TrackElement> = {
    id: string
    name: string
    enabled: boolean
    users: Record<string, UserData<T>>
}

export type GuildData<T extends TrackElement> = {
    id: string
    name: string
    icon: string
    channels: Record<string, ChannelData<T>>
}

export type ChartData<T extends TrackElement> = Record<string, GuildData<T>>