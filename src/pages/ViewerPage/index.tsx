import ViewerContainer from "@/components/ViewerContainer";
import getAll from "@/api/getAll.ts";
import {useQuery} from "@tanstack/react-query";
import type {ChartData, TimeTrackElement, UserChartData} from "@/chartData/types.ts";
import TestImage from "@/assets/test.png"
import {type VoiceEvent, type VoiceEventType, voiceEventTypes} from "@/api/types.ts";
import {composeTraversal, type Traversal} from "@/optics.ts";
import type {ChannelEventData, EventData, GuildEventData, UserEventData} from "@/eventSourcing/types.ts";
import {channelDataTraversal, eventDataTraversal, guildDataTraversal} from "@/eventSourcing/optics.ts";
import {useEffect, useState} from "react";
import * as timers from "node:timers";

export default function ViewerPage() {
    // TODO
    // api code jung-ri
    // data converting and display test data conversion!!!!!!!!!!!!!!!!!!!!!!!!!!!!! it can make using optics?
    // how to live data display?
    // how to yun-dong with outside components?

    const {data, isLoading} = useQuery({
        queryKey: ["voiceEvents"],
        queryFn: getAll,
        select: (voiceEvents) => {
            const eventData: EventData = {}
            const currentTime = Date.now() / 1000

            const getGuild = (
                eventData: Record<string, GuildEventData>, guildId: string
            ) => {
                let guildEventData = eventData[guildId]

                if (guildEventData === undefined) {
                    guildEventData = {
                        guild: {
                            id: guildEventData,
                            name: guildEventData,
                            icon: TestImage
                        },
                        channels: {}
                    }
                    eventData[guildId] = guildEventData
                }

                return guildEventData
            }

            const getChannel = (
                guildEventData: GuildEventData, channelId: string
            ) => {
                let channelEventData = guildEventData.channels[channelId]

                if (channelEventData === undefined) {
                    channelEventData = {
                        channel: {
                            id: channelId,
                            name: channelId
                        },
                        users: {}
                    }
                    guildEventData.channels[channelId] = channelEventData
                }

                return channelEventData
            }

            const getUser = (
                channelEventData: ChannelEventData, userId: string
            ) => {
                let userEventData = channelEventData.users[userId]

                if (userEventData === undefined) {
                    userEventData = {
                        user: {
                            id: userId,
                            name: userId,
                            profileImage: TestImage
                        },

                        connectEvents: [],
                        deafEvents: [],
                        muteEvents: [],
                        selfDeafEvents: [],
                        selfMuteEvents: []
                    }
                    channelEventData.users[userId] = userEventData
                }

                return userEventData
            }

            const includedEventTypes: VoiceEventType[] = [
                voiceEventTypes.CHANNEL_CHANGE,
                voiceEventTypes.DEAF,
                voiceEventTypes.MUTE,
                voiceEventTypes.SELF_DEAF,
                voiceEventTypes.SELF_MUTE,
            ];

            voiceEvents.forEach((voiceEvent) => {
                if (includedEventTypes.includes(voiceEvent.eventType)) {
                    const affectedChannels: string[] = []

                    if (voiceEvent.beforeChannelId !== null) affectedChannels.push(voiceEvent.beforeChannelId)
                    if (voiceEvent.afterChannelId !== null) affectedChannels.push(voiceEvent.afterChannelId)

                    affectedChannels.forEach((channelId) => {
                        const userEventData =  getUser(
                            getChannel(
                                getGuild(eventData, voiceEvent.guildId),
                                channelId
                            ),
                            voiceEvent.userId
                        )

                        if (voiceEvent.eventType == voiceEventTypes.CHANNEL_CHANGE) {
                            userEventData.connectEvents.push(voiceEvent)
                        } else if (voiceEvent.eventType === voiceEventTypes.DEAF) {
                            userEventData.deafEvents.push(voiceEvent)
                        } else if (voiceEvent.eventType === voiceEventTypes.MUTE) {
                            userEventData.muteEvents.push(voiceEvent)
                        } else if (voiceEvent.eventType === voiceEventTypes.SELF_DEAF) {
                            userEventData.selfDeafEvents.push(voiceEvent)
                        } else if (voiceEvent.eventType === voiceEventTypes.SELF_MUTE) {
                            userEventData.selfMuteEvents.push(voiceEvent)
                        }
                    })
                }
            })

            // TODO depth is not enough
            const userEventDataTraversal: Traversal<
                EventData, ChartData<TimeTrackElement>, UserEventData, UserChartData<TimeTrackElement>
            > = composeTraversal(
                eventDataTraversal,
                composeTraversal(
                    guildDataTraversal,
                    channelDataTraversal
                )
            )

            const toTrackData = (
                events: VoiceEvent[],
                getEnable: (event: VoiceEvent) => boolean,
                endTime: number
            ) => {
                let currentIndex = 0
                let lastEnabledEvent: VoiceEvent | null = null

                const tracks: TimeTrackElement[] = []

                while (currentIndex < events.length) {
                    while (true) {
                        if (getEnable(events[currentIndex])) {
                            lastEnabledEvent = events[currentIndex]
                            currentIndex += 1
                            break
                        }
                        currentIndex += 1
                    }

                    while (true) {
                        if (events.length <= currentIndex) {
                            tracks.push({
                                at: lastEnabledEvent.at,
                                duration: endTime - lastEnabledEvent.at
                            })
                            break
                        }
                        else if (!getEnable(events[currentIndex])) {
                            const disabledEvent = events[currentIndex]
                            tracks.push({
                                at: lastEnabledEvent.at,
                                duration: disabledEvent.at - lastEnabledEvent.at
                            })

                            currentIndex += 1
                            break
                        }
                        currentIndex += 1
                    }
                }

                return tracks
            }

            // TODO why output chartData's key is undefined?
            const chartData = userEventDataTraversal.editAll(
                eventData, (userEventData: UserEventData) => {
                    return {
                        user: userEventData.user,

                        enabled: true, // TODO

                        deaf: false,
                        mute: false,
                        selfDeaf: false,
                        selfMute: false,

                        voiceStateData: {
                            disconnection: [],
                            deaf: toTrackData(userEventData.deafEvents, (event) => event.deaf, currentTime),
                            mute: toTrackData(userEventData.deafEvents, (event) => event.mute, currentTime),
                            selfDeaf: toTrackData(userEventData.deafEvents, (event) => event.selfDeaf, currentTime),
                            selfMute: toTrackData(userEventData.deafEvents, (event) => event.selfMute, currentTime)
                        }
                    }
                }
            )

            console.log("converted: ", chartData)

            return chartData
        }
    })

    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoading) {
                setCurrentTime(Date.now() / 1000)
                console.log("reloaded!: ", Date.now() / 1000)
            }
        }, 0)

        return () => {
            clearTimeout(timer)
        }
    }, [isLoading]);

    return <div className="p-2 h-auto">
        {
            isLoading ?
                <a>wait...</a> :
                <ViewerContainer chartData={data as ChartData<TimeTrackElement>} initialCameraPosition={currentTime}/>
        }
    </div>
}