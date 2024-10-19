import mongoose, { ConnectOptions } from 'mongoose';
import { MONGODB_URL } from '../appConfig';

const options: ConnectOptions = {};

const mongooseObj = new mongoose.Mongoose();
mongooseObj.set('debug', false);

export const dbConnection = mongooseObj.createConnection(MONGODB_URL as string, options);

dbConnection.on('open', () => console.log(`Primary database connected. ${MONGODB_URL}`));
dbConnection.on('error', (e) => console.log(`Primary database error. ${e}`));
