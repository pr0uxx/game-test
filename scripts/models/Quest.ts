import { QuestStage } from "./QuestStage";

export class Quest {
    name: string;
    currentStage: number;
    stages: QuestStage[];
    questGiverId: number;
    questFailed: boolean;
    questPassed: boolean;

    /**moves the quest to the next stage and returns the stage number.
    *if no next stage exists, sets quest to complete and returns -1
    */
    nextStageOrPassQuest() : number
    {
        const next = this.currentStage + 1;
        if(this.stages.indexOf[next] > -1)
        {
            this.currentStage = next;
            return this.currentStage;
        }
        else
        {
            this.currentStage = -1;
            this.questPassed = true;
            return -1;
        }
    }
}