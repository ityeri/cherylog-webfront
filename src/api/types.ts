export const voiceEventTypes = {
    CHANNEL_CHANGE: "CHANNEL_CHANGE",

    DEAF: "DEAF",
    MUTE: "MUTE",
    SELF_DEAF: "SELF_DEAF",
    SELF_MUTE: "SELF_MUTE",

    STAGE_MUTE: "STAGE_MUTE",

    STREAM: "STREAM",
    VIDEO: "VIDEO",

    AFK: "AFK"
} as const

export type VoiceEventType = typeof voiceEventTypes[keyof typeof voiceEventTypes]

export type VoiceEvent = {
    eventType: VoiceEventType,
    userId: string,
    guildId: string,
    at: number,

    beforeChannelId: string | null,
    afterChannelId: string | null,

    deaf: boolean,
    mute: boolean,
    selfDeaf: boolean,
    selfMute: boolean,

    stageMute: boolean,

    stream: boolean,
    video: boolean,
    afk: boolean
}