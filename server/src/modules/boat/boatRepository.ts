import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type BoatWithTile = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  tile_id: number | null;
  tile_type: string | null;
  has_treasure: boolean | null;
};

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Exécuter la requête SELECT pour récupérer tous les bateaux
    const [rows] = await databaseClient.query<Rows>(`
      SELECT
      boat.id AS id,
      boat.name AS name,
      boat.coord_x,
      boat.coord_y,
      tile.id AS tile_id,
      tile.type AS type,
      tile.has_treasure
      FROM boat
      LEFT JOIN tile
      ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y
      ORDER BY boat.id
    `);
    return rows as BoatWithTile[];
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
