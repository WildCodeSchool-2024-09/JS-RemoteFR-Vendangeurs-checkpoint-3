import type { RequestHandler } from "express";

import client from "../../../database/client";
import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { coord_x, coord_y } = req.body;
  try {
    // Mettez à jour le bateau dans la base de données
    await client.query(
      "UPDATE boats SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id],
    );
    res.sendStatus(204); // Renvoie un statut 204 si la mise à jour a réussi
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la mise à jour du bateau.",
    });
  }
};

export default {
  browse,
  edit,
};
