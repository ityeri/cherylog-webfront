import type {Traversal} from "@/optics.ts";
import type {ChannelEventData, EventData, GuildEventData, UserEventData} from "./types.ts";
import type {ChannelChartData, ChartData, GuildChartData, TimeTrackElement, UserChartData} from "@/chartData/types.ts";

export const eventDataTraversal: Traversal<
    EventData, ChartData<TimeTrackElement>, GuildEventData, GuildChartData<TimeTrackElement>
> = {
    getAll(s: EventData): GuildEventData[] {
        return Object.values(s)
    },
    editAll(
        s: EventData, f: (a: GuildEventData) => GuildChartData<TimeTrackElement>
    ): ChartData<TimeTrackElement> {
        return Object.fromEntries(
            this.getAll(s)
                .map(f)
                .map((b) => [b.guild.id, b])
        )
    }
}

export const guildDataTraversal: Traversal<
    GuildEventData, GuildChartData<TimeTrackElement>, ChannelEventData, ChannelChartData<TimeTrackElement>
> = {
    getAll(s: GuildEventData): ChannelEventData[] {
        return Object.values(s.channels)
    },
    editAll(s: GuildEventData, f: (a: ChannelEventData) => ChannelChartData<TimeTrackElement>): GuildChartData<TimeTrackElement> {
        return {
            guild: s.guild,
            channels: Object.fromEntries(
                this.getAll(s)
                    .map(f)
                    .map(b => [b.channel.id, b])
            )
        }
    }
}

export const channelDataTraversal: Traversal<
    ChannelEventData, ChannelChartData<TimeTrackElement>, UserEventData, UserChartData<TimeTrackElement>
> = {
    getAll(s: ChannelEventData): UserEventData[] {
        return Object.values(s.users)
    },
    editAll(s: ChannelEventData, f: (a: UserEventData) => UserChartData<TimeTrackElement>): ChannelChartData<TimeTrackElement> {
        return {
            channel: s.channel,
            // TODO it maybe can solving with
            //  ChartEventData -> Traversal -> ChannelChartData (enabled is not included) -> Lens -> ChannelChartData
            enabled: true,
            users: Object.fromEntries(
                this.getAll(s)
                    .map(f)
                    .map(b => [b.user.id, b])
            )
        }
    }
}

// TODO depth is not enough