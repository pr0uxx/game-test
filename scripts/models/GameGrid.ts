// import * from "Konva"
import { makeRectangle } from "fractal-noise";
import Konva from "konva";
import { makeNoise2D } from "open-simplex-noise";
import { AssetHelper, FloorTile } from "../helpers/AssetHelper";
import { Engine } from "./Engine";

export class GameGrid {
	static gridSquarePx = 50;
	static stage: Konva.Stage;
	static layers: Konva.Layer[];
	static mapLayer: Konva.Layer;
	static playerLayer: Konva.Layer;
	static viewPortHeight: number;
	static viewPortWidth: number;
	static viewPortScrollX: number;
	static viewPortScrollY: number;
	static noiseMap: number[];
	static mapChunks: Konva.Group[][] = [];

	static InitGrid() {
		return new Promise<any>((resolve, reject) => {
			const h = Engine.gameArea.clientHeight,
				w = Engine.gameArea.clientWidth;
			const ele = document.createElement('div');
			ele.style.height = ele.style.width = `${GameGrid.gridSquarePx}px`;

			const noise2d = makeNoise2D(Date.now());
			const noiseFunc = (x: number, y: number) => Math.floor(Math.abs(noise2d(x, y) * (FloorTile.tileTypes.length)));

			GameGrid.viewPortHeight = window.innerHeight;
			GameGrid.viewPortWidth = window.innerWidth;
			GameGrid.noiseMap = makeRectangle(w / GameGrid.gridSquarePx, h / GameGrid.gridSquarePx, noiseFunc, { frequency: 0.06, octaves: 1 });
			GameGrid.mapLayer = new Konva.Layer();
			GameGrid.playerLayer = new Konva.Layer();

			FloorTile.water(10, 20, GameGrid.playerLayer);
			

			for (let x = 0; x < h; x += GameGrid.gridSquarePx) {
				for (let y = 0; y < w; y += GameGrid.gridSquarePx) {
					const noise = GameGrid.noiseMap[x / GameGrid.gridSquarePx][y / GameGrid.gridSquarePx];

					//get chunk if exists else create new
					const xIndex = Math.floor(x / 1000);
					const yIndex = Math.floor(y / 1000);

					let chunkArray = GameGrid.mapChunks[xIndex];
					let chunk = null;
					if (chunkArray) chunk = chunkArray[yIndex]


					if (!chunk) {
						chunk = new Konva.Group();
						if (!GameGrid.mapChunks[xIndex]) GameGrid.mapChunks[xIndex] = [];
						GameGrid.mapChunks[xIndex][yIndex] = chunk;
						GameGrid.mapLayer.add(chunk);
					}

					FloorTile.tileTypes[noise](x, y, chunk);
				}
			}
			//Logger.logDebug(`Asset Promises: ${AssetHelper.loadPromises.length}`)
			//Promise.all(AssetHelper.loadPromises).then(() =>{
			GameGrid.stage = new Konva.Stage({
				container: Engine.gameArea.id,
				width: Engine.gameArea.clientWidth,
				height: Engine.gameArea.clientHeight
			});

			/*GameGrid.stage['layers'][0] = GameGrid.testLayer;*/

			/*const flatChunks = [].concat.apply([], GameGrid.mapChunks) as Konva.Layer[];*/
			GameGrid.stage.add(GameGrid.mapLayer);
			GameGrid.stage.add(GameGrid.playerLayer);
			//for (let chunk of flatChunks) {
			//	GameGrid.stage.add(chunk);
			//	chunk.draw();
			//}

			Promise.all(AssetHelper.loadPromises).then(() => {
				console.log('asset helper promises resolved');
				resolve(null)
			}, () => reject())
		})

	}

	static DrawMap() {
		if (!GameGrid.noiseMap) return;

		GameGrid.GetViewPortDimensions();
		//GameGrid.stage.clear();
		const layer = new Konva.Layer();

		let xStart = Math.floor(GameGrid.viewPortScrollX / this.gridSquarePx);
		let yStart = Math.floor(GameGrid.viewPortScrollY / this.gridSquarePx);

		let xEnd = xStart + (GameGrid.viewPortWidth / this.gridSquarePx);
		let yEnd = yStart + (GameGrid.viewPortHeight / this.gridSquarePx);

		for (let x = xStart; x < xEnd; x++) {
			for (let y = yStart; y < yEnd; y++) {
				const noise = GameGrid.noiseMap[x][y];
				FloorTile.tileTypes[noise](x * GameGrid.gridSquarePx, y * GameGrid.gridSquarePx, layer);
			}
		}

		/*GameGrid.testLayer = layer;*/

		//GameGrid.stage.removeChildren();;

		//GameGrid.stage.add(GameGrid.testLayer);

		Promise.all(AssetHelper.loadPromises).then(() => {
			GameGrid.stage = new Konva.Stage({
				container: Engine.gameArea.id,
				width: Engine.gameArea.clientWidth,
				height: Engine.gameArea.clientHeight
			});

			//GameGrid.testLayer.draw();
		});
	}

	static GetViewPortDimensions(): void {
		GameGrid.viewPortHeight = window.innerHeight;
		GameGrid.viewPortWidth = window.innerWidth;
		GameGrid.viewPortScrollX = window.scrollX;
		GameGrid.viewPortScrollY = window.scrollY;
	}
}