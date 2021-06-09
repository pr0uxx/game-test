import { Player } from "./Player";

export class PlayerStatBuff {
    statName: string;
    buffValue: string | number;

    apply(player: Player) {
        const existing = player.stats.find(x => x.name === this.statName);

        if (existing) {
            switch (typeof this.buffValue) {
                case "string":
                    existing.value = this.buffValue;
                    break;
                case "number":
                    (existing.value as number) += this.buffValue;
                    break;
            }
        }
        else {
            player.stats.push(new PawnStat(this.statName, this.buffValue))
            switch (typeof this.buffValue) {
                case "string":
                    existing
                    existing.value = this.buffValue;
                    break;
                case "number":
                    (existing.value as number) += this.buffValue;
                    break;
            }
        }
    }
}