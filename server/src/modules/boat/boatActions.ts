import type { RequestHandler } from "express";
import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const boats = await boatRepository.readAll();
    res.json(boats);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10); // Utilisation de Number.parseInt
    const { coord_x, coord_y } = req.body;

    if (Number.isNaN(id) || coord_x == null || coord_y == null) {
      // Utilisation de Number.isNaN
      res.status(400).send("Invalid input");
      return;
    }

    const affectedRows = await boatRepository.update({ id, coord_x, coord_y });

    res.sendStatus(204); // Mise à jour réussie
    return;
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
