export type TrackElementData = {
    at: number
    duration: number
}

export type VoiceStateData = {
    disconnection: TrackElementData[]
    deaf: TrackElementData[]
    mute: TrackElementData[]
    selfDeaf: TrackElementData[]
    selfMute: TrackElementData[]
}

export type UserData = {
    id: number
    name: string
    profileImage: string
    enabled: boolean

    deaf: boolean
    mute: boolean
    selfDeaf: boolean
    selfMute: boolean

    voiceStateData: VoiceStateData
}

export type ChannelData = {
    id: number
    name: string
    enabled: boolean
    users: Record<number, UserData>
}

export type GuildData = {
    id: number
    name: string
    icon: string
    channels: Record<number, ChannelData>
}

export type ChartData = Record<number, GuildData>

function compose<A, B, C>(f: (v: B) => C, g: (v: A) => B): (v: A) => C {
    return v => f(g(v))
}