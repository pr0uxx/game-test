import { Pawn } from "./Pawn";
import { SpecialPawn } from "./SpecialPawn";

export class Level {
    order: number;
    name: string;
    specialPawns: SpecialPawn[];
    pawns: Pawn[]
}