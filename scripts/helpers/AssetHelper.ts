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
    constructor(x: number, y: number, layer: Konva.Layer | Konva.Group, imagePath: string, gif: boolean = false) {
        const i = new Image();
        if (gif) {
           Logger.logWarning("gif is not implemented");
        }
        i.src = imagePath;
        var p = new Promise(res => {
            i.onload = () => {
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
            fillPatternOffsetY: 0,
            name: `${x}${y}`
        });
    }

    static tileTypes: ((x: number, y: number, layer: Layer | Konva.Group) => {})[] = [
        FloorTile.dirt,
        FloorTile.flowers,
        //FloorTile.water,
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

    private static doTile(index, xOffset: number, yOffest: number, x: number, y: number, layer: Layer | Konva.Group) : FloorTile {
        let r: FloorTile;
        r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        r.fillPatternOffsetX(xOffset);
        r.fillPatternOffsetY(yOffest);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }

    private static dirt(x: number, y: number, layer: Layer | Konva.Group): FloorTile{
        return FloorTile.doTile(0, 0, 0, x, y, layer);
    }

    private static flowers(x: number, y: number, layer: Layer | Konva.Group): FloorTile{
        return FloorTile.doTile(1,100, 0, x, y, layer);
    }

    public static water(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(2,200, 0, x, y, layer);
    }

    private static daisies(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(3,300, 0, x, y, layer);
    }

    private static grass(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(4,400, 0, x, y, layer);
    }

    private static soil(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(5,500, 0, x, y, layer);
    }

    private static brick(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(6,600, 0, x, y, layer);;
    }

    private static hexagonTiles(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(7,700, 0, x, y, layer);
    }

    private static wood(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(8,800, 0, x, y, layer);
    }

    private static road(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(9,900, 0, x, y, layer);
    }

    private static dirtLight(x: number, y: number, layer: Layer | Konva.Group): FloorTile {
        return FloorTile.doTile(10,0, 100, x, y, layer);
    }

    private static DefaulFloorTile(x: number, y: number, layer: Layer | Konva.Group) : FloorTile {
        const r = new FloorTile(x, y, layer, AssetHelper.floorMapPath);
        const scale = 0.5
        r.fillPatternScale({ x: scale, y: scale });
        return r;
    }
}