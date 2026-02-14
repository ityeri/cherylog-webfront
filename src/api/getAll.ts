import type {VoiceEvent} from "./types.ts";
import client from "./client.ts";
import {mapVoiceEvent, type VoiceEventRaw} from "@/api/rawTypes.ts";

export default async function getAll(): Promise<VoiceEvent[]> {
    const { data } = await client.get<VoiceEventRaw[]>('/all')
    return data.map(mapVoiceEvent)
}