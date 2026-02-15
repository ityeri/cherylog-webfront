import type {ChannelChartData, ChartData, GuildChartData, TrackElement, UserChartData, VoiceStateData} from "@/chartData/types.ts";
import type {Lens, Traversal} from "@/optics.ts";

export function chartDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<ChartData<A>, ChartData<B>, GuildChartData<A>, GuildChartData<B>>
{
    return {
        getAll(s: ChartData<A>): GuildChartData<A>[] {
            return Object.values(s)
        },
        editAll(
            s: ChartData<A>,
            f: (a: GuildChartData<A>) => GuildChartData<B>
        ): ChartData<B> {
            return Object.fromEntries(
                this.getAll(s)
                    .map(f)
                    .map((b) => [b.guild.id, b])
            )
        }
    }
}

export function guildDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<GuildChartData<A>, GuildChartData<B>, ChannelChartData<A>, ChannelChartData<B>>
{
    return {
        getAll(s: GuildChartData<A>): ChannelChartData<A>[] {
            return Object.values(s.channels)
        },
        editAll(
            s: GuildChartData<A>,
            f: (a: ChannelChartData<A>) => ChannelChartData<B>
        ): GuildChartData<B> {
            return {
                ...s,
                channels: Object.fromEntries(
                    this.getAll(s)
                        .map(f)
                        .map((b) => [b.channel.id, b])
                )
            }
        }
    }
}

export function channelDataTraversal<A extends TrackElement, B extends TrackElement>():
    Traversal<ChannelChartData<A>, ChannelChartData<B>, UserChartData<A>, UserChartData<B>>
{
    return {
        getAll(s: ChannelChartData<A>): UserChartData<A>[] {
            return Object.values(s.users)
        },
        editAll(
            s: ChannelChartData<A>,
            f: (a: UserChartData<A>) => UserChartData<B>
        ): ChannelChartData<B> {
            return {
                ...s,
                users: Object.fromEntries(
                    this.getAll(s)
                        .map(f)
                        .map(b => [b.user.id, b])
                )
            }
        }
    }
}

// it`s not abstracted enough maybe; minko's createLens!
export function userDataLens<A extends TrackElement, B extends TrackElement>():
    Lens<UserChartData<A>, UserChartData<B>, VoiceStateData<A>, VoiceStateData<B>>
{
    return {
        get(s: UserChartData<A>): VoiceStateData<A> { return s.voiceStateData },
        set(s: UserChartData<A>, b: VoiceStateData<B>): UserChartData<B> {
            return {
                ...s,
                user: {
                    id: s.user.id,
                    name: s.user.name,
                    profileImage: s.user.profileImage,
                },

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