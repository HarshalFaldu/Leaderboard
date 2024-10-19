import { Document, Schema } from 'mongoose';
import { generateUid } from '../helpers/utils.helper';
import {dbConnection} from '../helpers/mongoose.helper'
import { IPlayer } from './players.model';

// Define the interface for Player
export interface IScores extends Document {
    playerId: string;
    score: number;
    id: string;
    player: IPlayer;
}

// Create the schema for Player
const ScoresSchema: Schema = new Schema({
    playerId: { type: String, required: true },
    score: { type: Number, required: true },
    id: { type: String, default: generateUid, unique: true },
});

ScoresSchema.index({score: -1})

ScoresSchema.virtual('player', {ref: 'players', foreignField: 'id', localField: 'playerId', justOne: true})

// Create the model from the schema
export const Scores = dbConnection.model<IScores>('scores', ScoresSchema);
