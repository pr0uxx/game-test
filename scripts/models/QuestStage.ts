import { QuestCondition } from "./QuestCondition";
import { QuestReward } from "./QuestReward";

export class QuestStage {
    description: string;
    startCondition: QuestCondition;
    completionCondition: QuestCondition;
    failureCondition: QuestCondition;
    completionReward: QuestReward;
    failureReward: QuestReward;
    completionText: string;
    failureText: string;
    stagePassed: boolean;
    stageFailed: boolean;
}