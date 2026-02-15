import {type VoiceEvent, type VoiceEventType} from "./types.ts";

export type VoiceEventRaw = {
    "event_type": string,
    "user_id": number,
    "guild_id": number,
    "at": number,

    "before_channel_id": number,
    "after_channel_id": number,

    "deaf": boolean,
    "mute": boolean,
    "self_deaf": boolean,
    "self_mute": boolean,

    "stage_mute": boolean,

    "stream": boolean,
    "video": boolean,
    "afk": boolean
}

export function mapVoiceEvent(raw: VoiceEventRaw): VoiceEvent {
    return {
        eventType: raw["event_type"] as VoiceEventType,
        userId: raw["user_id"].toString(),
        guildId: raw["guild_id"].toString(),
        at: raw["at"],

        beforeChannelId:
            raw["before_channel_id"] ?  raw["before_channel_id"].toString() : null,
        afterChannelId:
            raw["after_channel_id"] ? raw["after_channel_id"].toString() : null,

        deaf: raw["deaf"],
        mute: raw["mute"],
        selfDeaf: raw["self_deaf"],
        selfMute: raw["self_mute"],

        stageMute: raw["stage_mute"],

        stream: raw["stream"],
        video: raw["video"],
        afk: raw["afk"]
    }
}