import type { RequestHandler } from "express";
import DatabaseClient from "../../../database/client";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const [rows] = await DatabaseClient.query("SELECT * FROM tile");
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
