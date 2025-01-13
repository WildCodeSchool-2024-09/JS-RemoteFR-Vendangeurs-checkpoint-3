import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // Fetch all tile from the database
  const tile = await tileRepository.readAll();

  // Respond with the tile in JSON format
  res.json(tile);
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
