import type {Time} from "@/types.ts";

export type Camera = {
    at: number,
    zoom: number
}

export function project(camera: Camera) {
    return (time: Time): number => (time - camera.at) * camera.zoom
}
export function projectScale(camera: Camera) {
    return (duration: Time): number => duration * camera.zoom
}

export function unproject(camera: Camera) {
    return (n: number): Time => (n / camera.zoom) + camera.at
}
export function unprojectScale(camera: Camera) {
    return (s: number): Time => s / camera.zoom
}