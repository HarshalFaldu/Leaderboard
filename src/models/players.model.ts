import { Document, Schema } from 'mongoose';
import { generateUid } from '../helpers/utils.helper';
import {dbConnection} from '../helpers/mongoose.helper'

// Define the interface for Player
export interface IPlayer extends Document {
    firstName: string;
    lastName: string;
    id: string;
}

// Create the schema for Player
const PlayerSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    id: { type: String, default: generateUid, unique: true },
});

// Create the model from the schema
export const Players = dbConnection.model<IPlayer>('players', PlayerSchema);
