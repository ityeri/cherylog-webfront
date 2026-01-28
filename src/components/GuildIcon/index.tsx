import GuildIconMask from "@/assets/guild-icon.svg"

type GuildIconParms = {
    imagePath: string
}

export default function GuildIcon({imagePath}: GuildIconParms) {
    return <svg width="100%" height="100%">
        <defs>
            <mask
                id="mask1"
                maskUnits="userSpaceOnUse"
                style={{maskType: "luminance"}}
            >
                <image
                    href={GuildIconMask}
                    width="100%"
                    height="100%"
                />
            </mask>
        </defs>

        <image
            href={imagePath}
            mask="url(#mask1)"
            width="100%"
            height="100%"
        />
    </svg>
}