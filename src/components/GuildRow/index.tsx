import ChannelRow from "@/components/ChannelRow";
import GuildIcon from "@/components/GuildIcon";
import {motion} from "framer-motion";
import * as React from "react";
import {useState} from "react";
import type {_Viewport} from "@/_Viewport.ts";
import type {ChannelData} from "@/chartDataTypes.ts";

type GuildRowParms = {
    name: string
    guildIcon: string
    opened: boolean
    onDoubleClick: (event: React.MouseEvent) => void
    viewport: _Viewport
    channels: Record<string, ChannelData>
}

export default function GuildRow({name, guildIcon, opened, onDoubleClick, viewport, channels}: GuildRowParms) {
    const [channelStates, setChannelStates] = useState(
        Object.fromEntries(Object.keys(channels).map(c => [c, true]))
    )

    const handleDoubleClick = (channelId: string) => {
        setChannelStates(statesOld => Object.assign({}, statesOld, {[channelId]: !statesOld[channelId]}))
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
            {
                Object.keys(channels)
                    .map((channelId) => {
                        const channelData = channels[channelId]

                        return <ChannelRow
                            name={channelData.name}
                            enabled={channelData.enabled}
                            opened={channelStates[channelId]}
                            onDoubleClick={() => handleDoubleClick(channelId)}
                            viewport={viewport}
                            users={channelData.users}
                        />
                })
            }
        </motion.div>
    </div>
}