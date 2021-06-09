import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { GameGrid } from "../models/GameGrid";
import { Logger } from "./Logger";
import { parseGIF, decompressFrames } from 'gifuct-js'

export class AssetHelper {
    static floorMapPath: string = "./assets/floor-tiles.jpg";
    static testGifPath: string = "./assets/test-gif.gif"

    static loadPromises: Promise<any>[] = [];

    static tiles: FloorTile[] = [

    ]

    InitAssets() {

    }
}

export class FloorTile extends Konva.Rect {
    constructor(x: number, y: number, layer: Konva.Layer, imagePath: string, gif: boolean = false) {
        const i = new Image();
        if (gif) {
           Logger.logWarning("gif is not implemented");
        }
        i.src = imagePath;
        var p = new Promise(res => {
            i.onload = () => {
                Logger.logInfo('image loaded');
                layer.add(this);
                res(null);
            }
        });
        AssetHelper.loadPromises.push(p);
        super({
            x: x,
            y: y,
            width: GameGrid.gridSquarePx,
            height: GameGrid.gridSquarePx,
            fillPatternImage: i,
            fillPatternOffsetX: 0,
            fillPatternOffsetY: 0
        });
    }

    static tileTypes: ((x: number, y: number, layer: Layer) => {})[] = [
        FloorTile.tarmac,
        FloorTile.tarmacRoad
        // FloorTile.hotLava,
        // FloorTile.grass,
        // FloorTile.soil
    ];

    private static tarmac(x: number, y: number, layer: Layer): FloorTile{
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.166666667
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static tarmacRoad(x: number, y: number, layer: Layer): FloorTile{
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.166666667
        r.fillPatternOffsetX(300);
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static sandStone(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(96);
        const scale = 1.55
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static hotLava(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(96);
        r.fillPatternOffsetY(32);
        const scale = 1.55
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static grass(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetY(32);
        const scale = 1.55
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static soil(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(32);
        r.fillPatternOffsetY(32);
        const scale = 1.55
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static testGif(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.testGifPath, true);
        const scale = 0.01
        // r.fillPatternScale({x: scale, y:scale});
        return r;
    }
}