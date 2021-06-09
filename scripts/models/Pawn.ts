import { NameGenerator } from "../helpers/NameGenerator";
import { Equipment } from "./Equipment";
import { Relationship } from "./Relationship";

export class Pawn {

    constructor(id: number, forename: string = null, surname: string = null) {
        this.id = id;
        let randomName;
        if (!(forename && surname)) {
            randomName = NameGenerator.generate();
        }
        this.forename = forename ?? randomName.firstName;
        this.surname = surname ?? randomName.surname;
        this.healthPoints = 100;
    }

    id: number;
    forename: string;
    surname: string;
    stats: PawnStat[]
    healthPoints: number;
    credits: number;
    equipment: Equipment[];
    creditsPerSecond: number;
    buffs: { [id: string]: { buffFunction: (pawn: Pawn) => {}, buffApplied: boolean } };
    relationships: Relationship[]
    chanceToAppearPerCheck: number;
}