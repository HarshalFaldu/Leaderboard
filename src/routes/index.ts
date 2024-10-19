import express from 'express';
import { getPlayers } from '../controller/players.controller';

export const router = express.Router();

router.get('/players', getPlayers)
