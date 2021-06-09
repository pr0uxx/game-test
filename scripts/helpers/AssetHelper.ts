import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { GameGrid } from "../models/GameGrid";
import { Logger } from "./Logger";
import { parseGIF, decompressFrames } from 'gifuct-js'

export class AssetHelper {
    static floorMapPath: string = "./assets/floor-tiles.png";
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
        FloorTile.dirt,
        FloorTile.flowers,
        FloorTile.water,
        FloorTile.daisies,
        FloorTile.grass,
        FloorTile.soil,
        FloorTile.brick,
        FloorTile.hexagonTiles,
        FloorTile.wood,
        //FloorTile.road,
        FloorTile.dirtLight
        // FloorTile.hotLava,
        // FloorTile.grass,
        // FloorTile.soil
    ];

    private static dirt(x: number, y: number, layer: Layer): FloorTile{
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static flowers(x: number, y: number, layer: Layer): FloorTile{
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.5
        r.fillPatternOffsetX(100);
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static water(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(200);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static daisies(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(300);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static grass(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(400);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static soil(x: number, y: number, layer: Layer): FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(500);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static brick(x: number, y: number, layer: Layer): FloorTile {
        const r = FloorTile.DefaulFloorTile(x, y, layer);
        r.fillPatternOffsetX(600);
        return r;
    }

    private static hexagonTiles(x: number, y: number, layer: Layer): FloorTile {
        const r = FloorTile.DefaulFloorTile(x, y, layer);
        r.fillPatternOffsetX(700);
        return r;
    }

    private static wood(x: number, y: number, layer: Layer): FloorTile {
        const r = FloorTile.DefaulFloorTile(x, y, layer);
        r.fillPatternOffsetX(800);
        return r;
    }

    private static road(x: number, y: number, layer: Layer): FloorTile {
        const r = FloorTile.DefaulFloorTile(x, y, layer);
        r.fillPatternOffsetX(900);
        return r;
    }

    private static dirtLight(x: number, y: number, layer: Layer): FloorTile {
        const r = FloorTile.DefaulFloorTile(x, y, layer);
        r.fillPatternOffsetY(100);
        return r;
    }

    private static DefaulFloorTile(x: number, y: number, layer: Layer) : FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }
}