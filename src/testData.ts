import TestImage from "@/assets/test.png";
import type {ChannelData, ChartData, GuildData, UserData} from "@/types.ts";

function createUserData(id: number): UserData {
    return {
        id: id,
        name: "밍코",
        profileImage: TestImage,
        enabled: true,

        deaf: true,
        mute: true,
        selfDeaf: true,
        selfMute: true,

        voiceStateData: {
            disconnection: [{at: 1.1, duration: 0.5}],
            deaf: [{at: 1, duration: 1}],
            mute: [{at: 2, duration: 1}],
            selfDeaf: [{at: 0, duration: 3}],
            selfMute: []
        }
    }
}

function createChannelData(id: number): ChannelData {
    return {
        id: id,
        name: "allen.sh",
        enabled: true,
        users: {
            0: createUserData(0),
            1: createUserData(1),
            2: createUserData(2),
            3: createUserData(3),
        }
    }
}

function createGuildData(id: number): GuildData {
    return {
        id: id,
        name: "밍코와 친구들",
        icon: TestImage,
        channels: {
            0: createChannelData(0),
            1: createChannelData(1),
            2: createChannelData(2),
            3: createChannelData(3)
        }
    }
}

export const testChartData: ChartData = {
    0: createGuildData(0),
    1: createGuildData(1),
    2: createGuildData(2),
    3: createGuildData(3)
}