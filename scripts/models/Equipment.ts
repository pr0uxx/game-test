import { Pawn } from "./Pawn";

export class Equipment {
    name: string;
    buffs: { [id: string]: (pawn: Pawn) => {} }
}