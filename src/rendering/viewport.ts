import type {Pixel, Time} from "@/types.ts";
import * as C from "./camera.ts";

export type Viewport = {
    camera: C.Camera
    center: number // ratio
    viewportWidth: Pixel
}

export function project(viewport: Viewport) {
    const cameraProject = C.project(viewport.camera)
    return (time: Time): Pixel =>
        cameraProject(time) * viewport.viewportWidth / 2 + (viewport.viewportWidth * viewport.center)
}
export function projectScale(viewport: Viewport) {
    const cameraProjectScale = C.projectScale(viewport.camera)
    return (duration: Time): Pixel => cameraProjectScale(duration) * viewport.viewportWidth / 2
}

export function unproject(viewport: Viewport) {
    const cameraUnproject = C.unproject(viewport.camera)
    return (pixel: Pixel): Time =>
        cameraUnproject((pixel - (viewport.viewportWidth * viewport.center)) / (viewport.viewportWidth / 2))
}
export function unprojectScale(viewport: Viewport) {
    const cameraUnprojectScale = C.unprojectScale(viewport.camera)
    return (pixel: Pixel): Time =>
        cameraUnprojectScale(pixel / (viewport.viewportWidth / 2))
}