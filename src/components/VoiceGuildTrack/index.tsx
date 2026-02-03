import VoiceChannelTrack, {type VoiceUserData} from "@/components/VoiceChannelTrack";
import GuildIcon from "@/components/GuildIcon";
import {motion} from "framer-motion";
import * as React from "react";
import type {Viewport} from "@/Viewport.ts";

export type VoiceChannelData = {
    name: string
    enabled: boolean
    users: VoiceUserData[]
}

type VoiceGuildParms = {
    name: string
    guildIcon: string
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
    viewport: Viewport
    channels: VoiceChannelData[]
}

export default function VoiceGuildTrack({name, guildIcon, opened, onDoubleClick, viewport, channels}: VoiceGuildParms) {
    return <div className="grid grid-cols-subgrid col-span-2 gap-y-1">
        <div
            className="
            grid grid-cols-subgrid col-span-2
            rounded-md p-2 select-none
            hover:bg-background-hover
            transition-colors duration-200
            "
            onDoubleClick={onDoubleClick}
        >
            <div className="flex flex-col gap-y-1">
                <div className="w-10 m-0.5 aspect-square">
                    <GuildIcon imagePath={guildIcon}/>
                </div>
                <p className="font-semibold">{name}</p>
            </div>
            <div></div>
        </div>

        <motion.div
            className={`
            grid grid-cols-subgrid col-span-2 pl-3
            overflow-hidden
            `}
            initial={false}
            animate={
            opened ?
                {height: "auto", opacity: 1, visibility: "visible"} :
                {height: 0, opacity: 0, visibility: "invisible"}
            }
            transition={{duration: 0.2, ease: "easeOut"}}
        >
            {
                channels.map((voiceChannelData) => {
                    return <VoiceChannelTrack
                        name={voiceChannelData.name}
                        enabled={voiceChannelData.enabled}
                        opened={true}
                        onDoubleClick={() => {}}
                        viewport={viewport}
                        users={voiceChannelData.users}
                    />
                })
            }
        </motion.div>
    </div>
}