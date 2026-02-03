export type VoiceUserTrackClip = {
    start: number;
    end: number;
}

export type VoiceUserTrackData = {
    disconnection: VoiceUserTrackClip[];
    deaf: VoiceUserTrackClip[];
    mute: VoiceUserTrackClip[];
    selfDeaf: VoiceUserTrackClip[];
    selfMute: VoiceUserTrackClip[];
}

export type ViewportState = {
    startTime: number;
    endTime: number;
}

export type Viewport = {
    chartWidthPx: number;
    state: ViewportState;
}

export type TrackTimeData = {
    at: number
    duration: number
}

export type TrackPixelData = {
    leftPx: number
    widthPx: number
}

export type UserTrackDataTime = {
    disconnection: TrackTimeData[]
    deaf: TrackTimeData[]
    mute: TrackTimeData[]
    selfDeaf: TrackTimeData[]
    selfMute: TrackTimeData[]
}

export type UserTrackDataPixel = {
    disconnection: TrackPixelData[]
    deaf: TrackPixelData[]
    mute: TrackPixelData[]
    selfDeaf: TrackPixelData[]
    selfMute: TrackPixelData[]
}

