import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coordX = Number(req.body.coordX);
    const coordY = Number(req.body.coordY);

    if (coordX >= 12 || coordX < 0 || coordY < 0 || coordY >= 6) {
      res.sendStatus(422);
    } else {
      const tiles = await tileRepository.readByCoordinates(coordX, coordY);

      if (tiles.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(tiles);
        next();
      }
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
