import { Scores } from '../models'
import { EVENTS_TO_SEND } from '../socket';

interface IUpdateScore {
    playerId: string;
    score: number;
}

export async function listLeaderboard({ socket }: { socket: any }) {
    try {
        const leaderboard = await Scores.find({}).populate([{ path: 'player' }]).sort({ score: -1 }).limit(100).lean()
        socket.emit(EVENTS_TO_SEND.LEADERBOARD, { leaderboard })
    } catch (error) {
        socket.emit(EVENTS_TO_SEND.ERROR, { message: 'Internal server error' })
        console.log("error in listLeaderboard", error)
    }
}

export async function updateScore({ socket, data }: { socket: any, data: IUpdateScore }) {
    try {
        const { playerId, score } = data;
        const updatedScore = score;
        await Scores.findOneAndUpdate({ playerId }, { $inc: { score: updatedScore } }, { upsert: true })
        await listLeaderboard({ socket })
        socket.emit(EVENTS_TO_SEND.SCORE_UPDATED, { success: true })
    } catch (error) {
        socket.emit(EVENTS_TO_SEND.ERROR, { message: 'Internal server error' })
        console.log("error in listLeaderboard", error)
    }
}
