import { InventoryItem } from "./InventoryItem"
import { PlayerStatBuff } from "./PlayerStatBuff"

export class QuestReward {
    pawnRelationshipBuffs: { pawnId: number, relationshipProperty: string, buffValue: number | string }
    playerStatBuffs: PlayerStatBuff[]
    itemRewards: InventoryItem[]
}