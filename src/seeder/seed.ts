import { Players, Scores } from '../models'
import { faker } from '@faker-js/faker';

export async function seedPlayers() {
    const numPlayers = 200
    const players = Array.from({ length: numPlayers }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    }));

    await Players.insertMany(players)
    console.log(`${numPlayers} players created:`);
}

export async function seedScores() {
    const playerIds = await Players.distinct('id')

    await Promise.all(playerIds.map(async (playerId) => {
        const score = Math.floor(Math.random() * 100) + 1
        await Scores.updateOne({ playerId }, { $set: { score } }, { upsert: true })
    }))
    console.log(`${playerIds.length} player's scores updated:`);
}