import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Exécuter la requête SELECT pour récupérer tous les bateaux
    const [rows] = await databaseClient.query<Rows>(
      "select * from boat order by coord_y, coord_x",
    );
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;

    if (id == null || coord_x == null || coord_y == null) {
      throw new Error("Missing required fields for update");
    }

    const sql = `
      UPDATE boat
      SET coord_x = ?, coord_y = ?
      WHERE id = ?
    `;

    const [result] = await databaseClient.query<Result>(sql, [
      coord_x,
      coord_y,
      id,
    ]);

    return result.affectedRows; // Nombre de lignes affectées
  }
}

export default new BoatRepository();
