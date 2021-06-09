import { ConditionCheckType } from "./ConditionCheckType";

export class QuestCondition {
    checkPlayerHasBuffs: boolean;
    requiredBuffNames: string[];

    checkPlayerHasStatValues: boolean;
    requiredStatValues: { statName: string, statValue: string | number, checkType: ConditionCheckType }[];

    checkPawnRelationshipsWithPlayer: boolean;
    requiredPawnRelationshipsWithPlayer: { pawnId: number, relationshipProperty: string, propertyValue: string | number, checkType: ConditionCheckType }[];

    checkPlayerRelationshipWithPawn: boolean;
    requiredPlayerRelationshipsWithPawns: { pawnId: number, relationshipProperty: string, propertyValue: string | number, checkType: ConditionCheckType }[];

    checkPlayerActiveQuests: boolean;
    requirePlayerActiveQuestNames: string[];

    checkPlayerCompletedQuests: boolean;
    requiredCompletedQuestNames: string[];

    checkPlayerFailedQuests: boolean;
    requiredFailedQuestNames: string[];
}