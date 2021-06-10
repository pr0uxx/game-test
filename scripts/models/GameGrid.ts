// import * from "Konva"
import { makeRectangle } from "fractal-noise";
import Konva from "konva";
import { makeNoise2D } from "open-simplex-noise";
import { AssetHelper, FloorTile } from "../helpers/AssetHelper";
import { Logger } from "../helpers/Logger";
import { Engine } from "./Engine";

export class GameGrid {
    static gridSquarePx = 50;
    static stage: Konva.Stage;
    static layers: Konva.Layer[];
    static testLayer: Konva.Layer;

    static InitGrid() {
        const h = Engine.gameArea.clientHeight, 
        w = Engine.gameArea.clientWidth;
        const ele = document.createElement('div');
        ele.style.height = ele.style.width = `${GameGrid.gridSquarePx}px`;

        const noise2d = makeNoise2D(Date.now());
        const noiseFunc = (x: number, y: number) => Math.floor(Math.abs(noise2d(x, y) * (FloorTile.tileTypes.length)));

        const rect = makeRectangle(w / GameGrid.gridSquarePx, h / GameGrid.gridSquarePx, noiseFunc, { frequency: 0.06, octaves: 1 });

        GameGrid.testLayer = new Konva.Layer();
        for (let x = 0; x < h; x+=GameGrid.gridSquarePx) {
            for (let y = 0; y < w; y += GameGrid.gridSquarePx) {
                const noise = rect[x / GameGrid.gridSquarePx][y / GameGrid.gridSquarePx];
                FloorTile.tileTypes[noise](x, y, GameGrid.testLayer);
            }
        }
        Logger.logDebug(`Asset Promises: ${AssetHelper.loadPromises.length}`)
        Promise.all(AssetHelper.loadPromises).then(() =>{
            const stage = new Konva.Stage({
                container: Engine.gameArea.id,
                width: Engine.gameArea.clientWidth,
                height: Engine.gameArea.clientHeight
            });

            stage.add(GameGrid.testLayer);
    
            // testLayer.draw();
        });

        
    }
}