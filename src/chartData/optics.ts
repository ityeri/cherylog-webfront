import type {ChannelData, ChartData, GuildData, TrackElement, UserData, VoiceStateData} from "@/chartData/types.ts";
import type {Lens, Traversal} from "@/optics.ts";

export function chartDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<ChartData<A>, ChartData<B>, GuildData<A>, GuildData<B>>
{
    return {
        getAll(s: ChartData<A>): GuildData<A>[] {
            return Object.values(s)
        },
        editAll(
            s: ChartData<A>,
            f: (a: GuildData<A>) => GuildData<B>
        ): ChartData<B> {
            return Object.fromEntries(
                this.getAll(s)
                    .map(f)
                    .map((b) => [b.id, b])
            )
        }
    }
}

export function guildDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<GuildData<A>, GuildData<B>, ChannelData<A>, ChannelData<B>>
{
    return {
        getAll(s: GuildData<A>): ChannelData<A>[] {
            return Object.values(s.channels)
        },
        editAll(
            s: GuildData<A>,
            f: (a: ChannelData<A>) => ChannelData<B>
        ): GuildData<B> {
            return {
                id: s.id,
                name: s.name,
                icon: s.icon,
                channels: Object.fromEntries(
                    this.getAll(s)
                        .map(f)
                        .map((b) => [b.id, b])
                )
            }
        }
    }
}

export function channelDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<ChannelData<A>, ChannelData<B>, UserData<A>, UserData<B>>
{
    return {
        getAll(s: ChannelData<A>): UserData<A>[] {
            return Object.values(s.users)
        },
        editAll(
            s: ChannelData<A>,
            f: (a: UserData<A>) => UserData<B>
        ): ChannelData<B> {
            return {
                id: s.id,
                name: s.name,
                enabled: s.enabled,
                users: Object.fromEntries(
                    this.getAll(s)
                        .map(f)
                        .map(b => [b.id, b])
                )
            }
        }
    }
}

// it`s not abstracted enough maybe; minko's createLens!
export function userDataLens<A extends TrackElement, B extends TrackElement>():
    Lens<UserData<A>, UserData<B>, VoiceStateData<A>, VoiceStateData<B>>
{
    return {
        get(s: UserData<A>): VoiceStateData<A> { return s.voiceStateData },
        set(s: UserData<A>, b: VoiceStateData<B>): UserData<B> {
            return {
                id: s.id,
                name: s.name,
                profileImage: s.profileImage,
                enabled: s.enabled,

                deaf: s.deaf,
                mute: s.mute,
                selfDeaf: s.selfDeaf,
                selfMute: s.selfMute,

                voiceStateData: b
            }
        }
    }
}

export function voiceStateDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<VoiceStateData<A>, VoiceStateData<B>, A, B>
{
    return {
        getAll(s: VoiceStateData<A>): A[] {
            return [s.deaf, s.mute, s.selfDeaf, s.selfMute].flat()
        },
        editAll(s: VoiceStateData<A>, f: (a: A) => B): VoiceStateData<B> {
            return {
                disconnection: s.disconnection.map(f),
                deaf: s.deaf.map(f),
                mute: s.mute.map(f),
                selfDeaf: s.selfDeaf.map(f),
                selfMute: s.selfMute.map(f)
            }
        }
    }
}