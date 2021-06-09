// import * from "Konva"
import Konva from "konva";
import { AssetHelper, FloorTile } from "../helpers/AssetHelper";
import { Logger } from "../helpers/Logger";
import { NumberHelper } from "../helpers/NumberHelper";
import { Engine } from "./Engine";
import { Game } from "./Game";

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

        GameGrid.testLayer = new Konva.Layer();

        for (let x = 0; x < h; x+=GameGrid.gridSquarePx) {
            for (let y = 0; y < w; y+=GameGrid.gridSquarePx) {
                FloorTile.tileTypes[NumberHelper.getRandomInt(0,FloorTile.tileTypes.length)](x, y, GameGrid.testLayer)
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