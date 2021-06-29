export class PlayerController {

	constructor() {
		window.addEventListener('keydown', (e) => this.keyDown(e));
		window.addEventListener('keyup', (e) => this.keyUp(e));
		this.pressingActions = {};
	}

	private pressingActions: { [key: string]: boolean } = {};

	private keyConfig = {
		up: [87, 38],
		down: [83, 40],
		left: [65, 37],
		right: [68, 39]
	}

	private keyDown(e: KeyboardEvent) {
		for (var i in this.keyConfig) {
			const values = this.keyConfig[i] as number[];
			if (values) {
				if (values.some(x => x === e.keyCode)) {
					this.pressingActions[i] = true;
				}
			}
		}
	}

	private keyUp(e: KeyboardEvent) {
		for (var i in this.keyConfig) {
			const values = this.keyConfig[i] as number[];
			if (values) {
				if (values.some(x => x === e.keyCode)) {
					this.pressingActions[i] = false;
				}
			}
		}
	}

	isAnyActionPressed() {
		for (var i in this.pressingActions) {
			if (this.pressingActions[i] === true) {
				return true;
			}
		}

		return false;
	}

	isActionPressed(actionName: string) {
		return this.pressingActions[actionName];
	}
}