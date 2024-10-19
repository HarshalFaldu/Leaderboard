import { Server } from 'http';
import * as socket from 'socket.io';
import { listLeaderboard, updateScore } from './controller/socket.controller'

interface IUpdateScore {
    playerId: string;
    score: number;
}

const EVENTS_TO_LISTEN = {
    CONNECTION: 'connection',
    LIST_LEADERBOARD: 'listLeaderboard',
    UPDATE_SCORE: 'updateScore'
}

export const EVENTS_TO_SEND = {
    LEADERBOARD: 'leaderbord',
    SCORE_UPDATED: 'scoreUpdated',
    ERROR: 'error'
}


export function initSocket(server: Server) {
    const io = new socket.Server(server, {
        path: '/api/socket.io',
        cookie: false,
        cors: { credentials: true, origin: true },
    });

    io.sockets.on(EVENTS_TO_LISTEN.CONNECTION, (socket: any) => {
        console.log('====>>> socket connected <<====>> ');

        socket.on(EVENTS_TO_LISTEN.LIST_LEADERBOARD, () => {
            listLeaderboard({ socket })
        })

        socket.on(EVENTS_TO_LISTEN.UPDATE_SCORE, ({ playerId, score }: IUpdateScore) => {
            updateScore({ data: { playerId, score }, socket })
        })
    });
}