export interface TrackElement {}

export type Time = number
export type Pixel = number

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
    id: number
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
    id: number
    name: string
    enabled: boolean
    users: Record<number, UserData<T>>
}

export type GuildData<T extends TrackElement> = {
    id: number
    name: string
    icon: string
    channels: Record<number, ChannelData<T>>
}

export type ChartData<T extends TrackElement> = Record<number, GuildData<T>>