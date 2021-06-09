import { Logger } from "../helpers/Logger";
import { NumberHelper } from "../helpers/NumberHelper";
import { CameraController } from "./CameraController";
import { Game } from "./Game";
import { GameGrid } from "./GameGrid";
import { Player } from "./Player";
import { SpecialPawn } from "./SpecialPawn";

export class Engine {
    //onTick: Function[] = [];
    static curentTickElement = document.getElementById('current-tick');
    static fpsElement = document.getElementById('fps');
    static pauseButton = document.getElementById('toggle-pause-button');
    static gameArea = document.getElementById('game-area');
    static game = Game;


    constructor() {
        Engine.Init();
    }

    static Init()
    {
        // CameraController.dragElement(Engine.gameArea);
        globalThis.engine = Engine;
        Engine.game.currentLevel = Engine.game.levels[0];
        if (!(globalThis as any).gameState) {
            Logger.logInfo("building game state");
            globalThis.gameState = {
                tick: 0,
                isTicking: true,
                time: null,
                level: {

                }
            } as { tick: number, isTicking: boolean, time: number }
        }

        if (Engine.pauseButton) {
            Engine.pauseButton.addEventListener('click', Engine.toggleGamePause);
        }

        GameGrid.InitGrid();
    }

    static startGame(): void {
        window.requestAnimationFrame(this.tick);
    }

    protected static tick(): void {
        const engine = globalThis.engine;
        const gameState = globalThis.gameState;
        const now = Date.now();
        const fps = 1000 / (now - gameState.time);
        gameState.time = Date.now();
        gameState.tick++;

        engine.curentTickElement.innerHTML = `${gameState.tick}`;
        if (gameState.isTicking) {
            if (gameState.tick % 100 === 0) {
                Logger.logDebug(gameState.tick);
                engine.runQuestsChecks();
                engine.runSpecialPawnChecks();

                engine.fpsElement.innerHTML = `${fps}`;
                GameGrid.testLayer.draw();
                Logger.logDebug(GameGrid.testLayer);
            }

 
            window.requestAnimationFrame(engine.tick);
        }
    }

    protected static runQuestsChecks(): void {
        if (this.gameExists()) {
            const player = globalThis.engine.game.player as Player
            if (player) {
                player.checkForPlayerPassedQuests();
            }
            else {
                console.error('unable to find human player attached to game')
            }
        }
    }

    protected static runSpecialPawnChecks(): void {
        if (this.gameExists() && this.currentLevelIsLoaded()) {
            const pawns = globalThis.engine.game.currentLevel?.specialPawns;

            //roll a random pawn
            const pawn = pawns[NumberHelper.getRandomInt(0, pawns.length)] as SpecialPawn;

            if (pawn)
            {
                //roll if pawn actually appears
                if (pawn.chanceToAppearPerCheck > NumberHelper.getRandomInt(0, 100))
                {
                    if (pawn.questsToGive?.length > 0)
                    {
                        for (const quest of pawn.questsToGive) {
                            if (pawn.giveQuestToPlayer(quest, globalThis.engine.game.player))
                            {
                                break;
                            }
                        }
                    }
                }
            }
            else
            {
                console.error('unable to find pawn');
            }
        }
        else {
            console.error('unable to find game');
        }
    }

    private static gameExists(): boolean {
        if (!globalThis.engine.game) {
            console.error('unable to find game');
            return false;
        }

        return true
    }

    private static currentLevelIsLoaded() : boolean {
        if (!globalThis.engine.game.currentLevel)
        {
            console.error('current level is unloaded');
            return false;
        }
        return true;
    }

    static toggleGamePause() {
        globalThis.gameState.isTicking = !globalThis.gameState.isTicking;
        if (globalThis.gameState.isTicking) {
            window.requestAnimationFrame(globalThis.engine.tick);
        }
    }
}