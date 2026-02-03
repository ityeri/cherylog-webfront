import TestImage from "@/assets/test.png"
import VoiceUserTrack from "@/components/VoiceUserTrack";
import VoiceChannelTrack from "@/components/VoiceChannelTrack";
import {useState} from "react";
import * as React from "react";
import VoiceGuildTrack from "@/components/VoiceGuildTrack";
import type {Viewport} from "@/Viewport.ts";
import ViewerContainer from "@/components/ViewerContainer";

export default function ViewerPage() {
    const viewport: Viewport = {
        xShiftPx: 1.0,
        zoom: 0.1,
        centerX: 0.5
    }

    return <div className="m-2 bg-background-primary size-auto">
        <ViewerContainer/>
    </div>
}