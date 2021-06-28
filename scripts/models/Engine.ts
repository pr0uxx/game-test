import { Logger } from "../helpers/Logger";
import { NumberHelper } from "../helpers/NumberHelper";
import { Game } from "./Game";
import { GameGrid } from "./GameGrid";
import { GameState } from "./GameState";
import { Player } from "./Player";
import { SpecialPawn } from "./SpecialPawn";

export class Engine {
    //onTick: Function[] = [];
    static curentTickElement = document.getElementById('current-tick');
    static fpsElement = document.getElementById('fps');
    static pauseButton = document.getElementById('toggle-pause-button');
    static gameArea = document.getElementById('game-area');
    static loader = document.getElementById('loader');
    static game: Game;
    static _isLoading: boolean = true;

    static set isLoading(value: boolean) {
        Engine._isLoading = value;

        if (value === true) {
            Engine.loader.classList.remove('d-none');
        }

        if (value === false) {
            Engine.loader.classList.add('d-none');
        }
    }

    static get isLoading() {
        return Engine._isLoading;
    }


    constructor() {
        Engine.Init();
    }

    static Init()
    {
        Engine.isLoading = true;
        //Engine.loader.classList.remove('d-none');
        Engine.gameArea.classList.add('opacity-0');
        // CameraController.dragElement(Engine.gameArea);
        Game.currentLevel = Game.levels[0];
        Logger.logInfo("building game state");
        GameState.tick = 0;
        GameState.isTicking = true;
        GameState.time = null;
        GameState.level = null;

        if (Engine.pauseButton) {
            Engine.pauseButton.addEventListener('click', Engine.toggleGamePause);
        }

        GameGrid.InitGrid().then(() => {
            console.log('init grid done');
            Engine.isLoading = false;
            //Engine.loader.classList.add('d-none');
            Engine.gameArea.classList.remove('d-none');
            console.log(GameGrid.mapChunks);
        });
    }

    static startGame(): void {
        window.requestAnimationFrame(this.tick);
    }

    protected static tick(): void {
        if (Engine.isLoading) {
            window.requestAnimationFrame(Engine.tick);
            return;
        }          
        const now = Date.now();
        const fps = 1000 / (now - GameState.time);
        GameState.time = Date.now();
        GameState.tick++;

        Engine.curentTickElement.innerHTML = `${GameState.tick}`;
        if (GameState.isTicking) {
            if (GameState.tick % 100 === 0) {
                Engine.runQuestsChecks();
                Engine.runSpecialPawnChecks();

                /*GameGrid.testLayer.draw();*/
                /*GameGrid.testLayer.batchDraw();*/
                const test = GameGrid.mapChunks[0][0].children.find(x => x.name() == "00");
                test.absolutePosition({ x: 10, y: 10 });
                console.log('test result:');
                console.log(test);
            }
            if (GameState.tick % 10 === 0) {
                Engine.fpsElement.innerHTML = `${Math.round(fps)}`;
            }
            
            window.requestAnimationFrame(Engine.tick);
        }
    }

    protected static runQuestsChecks(): void {
        if (this.gameExists()) {
            const player = Game.player as Player
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
            const pawns = Game.currentLevel?.specialPawns;

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
                            if (pawn.giveQuestToPlayer(quest, Game.player))
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
        if (!Game) {
            console.error('unable to find game');
            return false;
        }

        return true
    }

    private static currentLevelIsLoaded() : boolean {
        if (!Game.currentLevel)
        {
            console.error('current level is unloaded');
            return false;
        }
        return true;
    }

    static toggleGamePause() {
        GameState.isTicking = !GameState.isTicking;
        if (GameState.isTicking) {
            window.requestAnimationFrame(Engine.tick);
        }
    }
}