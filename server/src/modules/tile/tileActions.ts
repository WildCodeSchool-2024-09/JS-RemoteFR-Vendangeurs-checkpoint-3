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
    const { coord_x, coord_y } = req.body;

    // Vérifie que les coordonnées existent
    if (coord_x == null || coord_y == null) {
      res.sendStatus(400);
      return;
    }

    // Recherche les tuiles avec les coordonnées données
    const tiles = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tiles.length > 0) {
      // Si les coordonnées existent, continuer
      next();
    } else {
      // Sinon, répondre avec une erreur 422
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
