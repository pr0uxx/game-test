import { Engine } from "./Engine";

export class UserInterface {
	curentTickElement: HTMLElement;
	fpsElement: HTMLElement;
	pauseButton: HTMLElement;
	gameUi: HTMLElement;
	loader: HTMLElement;
	body: HTMLElement;
	wipeMapButton: HTMLElement;
	debugConsole: HTMLElement;
	hideConsoleButton: HTMLElement;

	private _showDevConsole: boolean;

	get showDevConsole() {
		return this._showDevConsole;
	}

	set showDevConsole(value: boolean) {
		if (value === true) {
			this.debugConsole.classList.remove('d-none');
		}
		if (value === false) {
			this.debugConsole.classList.add('d-none');
		}
		this._showDevConsole = value;
	}

	constructor() {
		this.curentTickElement = document.getElementById('current-tick');
		this.fpsElement = document.getElementById('fps');
		this.pauseButton = document.getElementById('toggle-pause-button');
		this.gameUi = document.getElementById('game-ui');
		this.loader = document.getElementById('loader');
		this.body = document.querySelector('body');
		this.wipeMapButton = document.getElementById('wipe-map-data-button');
		this.debugConsole = document.getElementById('debug-console');
		this.hideConsoleButton = document.getElementById('hide-dev-console-button');

		this.initEventListeners();
		this.initConsoleCommands();
	}

	initEventListeners() {
		this.pauseButton.addEventListener('click', Engine.toggleGamePause);
		this.wipeMapButton.addEventListener('click', () => Engine.wipeMapData())
		this.hideConsoleButton.addEventListener('click', () => this.showDevConsole = false)
	}

	initConsoleCommands() {
		globalThis.showDevConsole = () => {
			this.showDevConsole = true;
		}
		globalThis.hideDevConsole = () => {
			this.showDevConsole = false;
		}
	}

	showLoader() {
		this.loader.classList.remove('d-none');
	}

	hideLoader() {
		this.loader.classList.add('d-none');
	}

	updateCurrentTick(tick: number) {
		this.curentTickElement.innerHTML = `${tick}`;
	}

	updateFps(fps: number) {
		this.fpsElement.innerHTML = `${Math.round(fps)}`;
	}
}