import VoiceChannelTrack from "@/components/VoiceChannelTrack";
import GuildIcon from "@/components/GuildIcon";
import { motion } from "framer-motion";
import {useState} from "react";
import * as React from "react";
import VoiceUserTrack from "@/components/VoiceUserTrack";
import TestImage from "@/assets/test.png";

type VoiceGuildParms = {
    name: string
    guildIcon: string
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
}

export default function VoiceGuildTrack({name, guildIcon, opened, onDoubleClick}: VoiceGuildParms) {
    const [childOpened, setChildOpen] = useState(false)

    const handleDoubleClick = (event: React.MouseEvent) => {
        setChildOpen(!childOpened)
    }

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
            <VoiceChannelTrack name="allen.sh" enabled={true} opened={childOpened} onDoubleClick={handleDoubleClick}/>
            <VoiceChannelTrack name="allen.sh" enabled={true} opened={childOpened} onDoubleClick={handleDoubleClick}/>
        </motion.div>
    </div>
}