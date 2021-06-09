import { Logger } from "../helpers/Logger";
import { Inventory } from "./Inventory";
import { Pawn } from "./Pawn";
import { Quest } from "./Quest";

export class Player extends Pawn {
    constructor(firstName: string, surname: string) {
        super(-1, firstName, surname);
        this.inventory = new Inventory();
    }

    activeQuests: Quest[] = [];
    completedQuests: Quest[] = [];
    failedQuests: Quest[] = [];
    inventory: Inventory;

    checkForPlayerPassedQuests()
    {
        Logger.logDebug(this.activeQuests);
        for (const quest of this.activeQuests) {
            if (quest.questPassed)
            {
                Logger.logInfo(`Player has passed quest: ${quest.name}`)
                this.activeQuests.splice(this.activeQuests.indexOf(quest), 1);
                this.completedQuests.push(quest);
            }
            else
            {
                if(this.checkCurrentQuestStageComplete(quest))
                {
                    quest.nextStageOrPassQuest();
                }
            }
        }
    }

    private checkCurrentQuestStageComplete(q: Quest) : boolean
    {
        let result = true;
        if (q.stages.indexOf[q.currentStage] > -1)
        {
            const currentStage = q.stages[q.currentStage];
            
            if (currentStage.completionCondition.checkPlayerHasBuffs)
            {
                result = result && currentStage.completionCondition.requiredBuffNames.some(x => this.hasBuff(x))
            }
        }
        else
        {
            console.error(`checkCurrentStageComplete failed, stage ${q.currentStage} does not exist`)
        }

        return result;
    }

    private hasBuff(buffName: string) : boolean
    {
        return this.buffs.indexOf[buffName] > -1;
    }
}