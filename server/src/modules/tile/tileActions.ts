import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Récupérer toutes les tuiles depuis le repository
    const tiles = await tileRepository.readAll();
    // Envoyer les tuiles sous forme de réponse JSON
    res.status(200).json(tiles);
  } catch (error) {
    // Passer l'erreur au middleware de gestion des erreurs
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // Code pour la validation (sera complété dans une autre étape)
};

export default {
  browse,
  validate,
};
