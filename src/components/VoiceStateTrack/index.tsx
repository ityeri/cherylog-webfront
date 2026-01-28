type VoiceUserTrackParms = {
    icon: string
    alt: string
}

export default function VoiceStateTrack({icon, alt}: VoiceUserTrackParms) {
    return <div className="grid grid-cols-subgrid col-span-2">
        <div
            className="
            track-info
            sticky left-0
            flex h-full justify-end p-1 overflow-hidden px-4
            rounded-md
            "
        >
            <img src={icon} alt={alt}/>
        </div>
        <div>
            <div className="w-3000 h-full bg-violet-950 rounded-full"></div>
        </div>
    </div>
}