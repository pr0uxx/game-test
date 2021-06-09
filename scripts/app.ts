import { Engine } from "./models/Engine";
import { Game } from "./models/Game";
import { Level } from "./models/Level";
import { Pawn } from "./models/Pawn";
import { Player } from "./models/Player";
import { PlayerStatBuff } from "./models/PlayerStatBuff";
import { Quest } from "./models/Quest";
import { QuestCondition } from "./models/QuestCondition";
import { QuestReward } from "./models/QuestReward";
import { QuestStage } from "./models/QuestStage";
import { SpecialPawn } from "./models/SpecialPawn";

Game.player = new Player("Test", "Player");

const generatePawns = () => {
    const r = [];
    for (let i = 0; i < 50; i++) {
        const p = new Pawn(i);
        p.credits = 100;
        p.creditsPerSecond = 0.2;
        r.push(p);
    }

    return r;
}

const specialPawn = new SpecialPawn(1001, "Abigail");
specialPawn.credits = 0;
specialPawn.healthPoints = 60;
specialPawn.isQuestGiver = true;
specialPawn.chanceToAppearPerCheck = 101;

const testQuest = new Quest()
testQuest.name = "Test Quest",
    testQuest.questGiverId = 1001;

const testBuff = {
    statName: "Test Stat",
    buffValue: 1000
} as PlayerStatBuff

const stage1 = {
    startCondition: {
        checkPlayerHasBuffs: true,
        requiredBuffNames: ["Test Start Quest Buff Trigger"]
    } as QuestCondition,
    description: "This is a test quest",
    failureText: "Test failure text",

    completionReward: {
        playerStatBuffs: [
            {
                buffValue: 150,
                statName: "Test Start Quest Buff Trigger"
            } as PlayerStatBuff,
            {
                buffValue: 150,
                statName: "Test End Quest Buff Reward"
            } as PlayerStatBuff
        ]
    } as QuestReward,
    completionCondition: {
        checkPlayerHasBuffs: true,
        requiredBuffNames: ["Test End Quest Buff Trigger"]
    },
    completionText: "Test completion text"

} as QuestStage

testQuest.stages = [
    stage1
]

specialPawn.questsToGive = [
    testQuest
]

const l1 = {
    name: "The hotdog stand",
    pawns: generatePawns(),
    specialPawns: [
        specialPawn
    ]
} as Level

Game.levels = [
    l1
]

Engine.Init();
Engine.startGame();
