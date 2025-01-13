import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";
const browse: RequestHandler = async (req, res, next) => {
  // Fetch all tiles from the database
  const tiles = await tileRepository.readAll();

  // Respond with the tiles in JSON format
  res.json(tiles);
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
