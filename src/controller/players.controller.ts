import { Request, Response } from "express";
import { Players } from "../models";

export async function getPlayers(_: Request, res: Response) {
    try {
        const players = await Players.find().select('-_id firstName lastName id')
        res.status(200).send({players})
    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
        console.log('Error in get players', error)
    }
}