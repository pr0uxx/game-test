import { Logger } from "../helpers/Logger";
import { Pawn } from "./Pawn";
import { Player } from "./Player";
import { Quest } from "./Quest";

export class SpecialPawn extends Pawn {
    isQuestGiver: boolean;
    questsToGive: Quest[];

    giveQuestToPlayer(quest: Quest, player: Player) : boolean
    {
        Logger.logInfo(`${this.forename} ${this.surname} is giving a quest to player`);
        if (quest)
        {
            player.activeQuests.push(quest);
            this.questsToGive.splice(this.questsToGive.indexOf(quest), 1);
            return true
        }
        else{
            console.error("Quest to give not found");
        }

        return false;
    }
}