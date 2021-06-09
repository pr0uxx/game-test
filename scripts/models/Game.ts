import { InventoryItem } from "./InventoryItem";
import { Level } from "./Level";
import { Player } from "./Player";

export class Game {
    static player: Player;
    static currentLevel: Level;
    static levels: Level[];

    static givePlayer(item: InventoryItem) {
        const existing = this.player.inventory.items.find(x => x.name === item.name);

        if (existing) {
            existing.name += item.count;
        }
        else {
            this.player.inventory.items.push(item);
        }
    }
}