// TODO projection

import type {Lens} from "@/optics.ts";
import type {ChartData, Pixel, RenderingTrackElement, Time, TimeTrackElement} from "@/chartDataTypes.ts";
import type {Viewport} from "@/Viewport.ts";
import type {Camera} from "@/viewport.ts";

export const cameraLens = (camera: Camera): Lens<Time, Pixel, Time, Pixel> => {

}