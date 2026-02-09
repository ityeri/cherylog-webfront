export type Camera = {
    at: number,
    zoom: number
}

export type Viewport = {
    camera: Camera,
    center: number,
    viewportWidth: number
}