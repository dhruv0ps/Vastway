
declare module "color-thief-browser" {
    export default class ColorThief {
      getColor(img: HTMLImageElement, quality?: number): [number, number, number];
      getPalette(img: HTMLImageElement, colorCount?: number, quality?: number): [number, number, number][];
    }
  }
  