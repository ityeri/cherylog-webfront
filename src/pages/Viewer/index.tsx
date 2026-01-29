import TestImage from "@/assets/test.png"
import VoiceUserTrack from "@/components/VoiceUserTrack";
import * as React from "react";
import {useState} from "react";
import VoiceChannel from "@/components/VoiceChannel";

function ViewerPage() {
    const [opened, setOpened] = useState(false)
    const handleDoubleClick = (event: React.MouseEvent) => {
        setOpened(!opened) // TODO animate + actual track + wasans + ? + asdfasdfasdfasdf + goooooooooooooooooooo
    }

    return <div className="m-1 bg-background-primary">
        <div className="h-7">
            <VoiceChannel name="allen.sh" enabled={true}/>
        </div>
        <div
            className="
            relative
            grid grid-cols-[200px_1fr] grid-rows-[0px]
            gap-x-0.5
            overflow-x-scroll overflow-y-hidden
            "
        >
            <div className="grid grid-cols-subgrid col-span-2">
                <div
                    className="
                    sticky left-0
                    flex justify-end
                    bg-background-primary
                    "
                >
                    <div className="w-0 h-[100vh]">
                        <div className="w-0.5 h-full bg-text-disabled"/>
                    </div>
                </div>
                <div/>
            </div>
            <VoiceUserTrack name="minko" profileImage={TestImage} opened={opened} onDoubleClick={handleDoubleClick}/>
            <VoiceUserTrack name="minko" profileImage={TestImage} opened={opened} onDoubleClick={handleDoubleClick}/>
            <VoiceUserTrack name="minko" profileImage={TestImage} opened={opened} onDoubleClick={handleDoubleClick}/>
        </div>
    </div>
}

export default ViewerPage