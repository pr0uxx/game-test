import { Pawn } from "./Pawn";
import { Player } from "./Player";

export class PawnRelationshipBuff {
    pawnId: number;
    targetPawnId: number;
    relationshipProperty: string;
    buffValue: number | string;

    apply(pawns: Pawn[], player: Player = null) : void{
        const selectedPawn = this.getSelectedPawn(pawns, player);
        this.applyToSelected(selectedPawn);
    }

    private applyToSelected(pawn: Pawn) : void {
        const existing = pawn.relationships.find(x => x.relationshipWithId == this.targetPawnId);

        if (existing) {
            const prop = existing[this.relationshipProperty];

            switch (typeof (prop)) {
                case "string":
                    existing[this.relationshipProperty] = this.buffValue;
                    break;
                case "number":
                    existing[this.relationshipProperty] += this.buffValue;
                    break;
            }
        }
    }

    private getSelectedPawn(pawns: Pawn[], player: Player = null): Pawn {
        let selectedPawn: Pawn;
        if (this.pawnId === -1) {
            if (!player) {
                console.error("Unable to find player to apply pawn relationship buff");
            }
            else {
                selectedPawn = player;
            }
        }
        else {
            selectedPawn = pawns.find(x => x.id === this.pawnId);
        }

        return selectedPawn;
    }
}