import express from "express";

const router = express.Router();

import boatActions from "./modules/boat/boatActions";
import gameActions from "./modules/game/gameActions";
import tileActions from "./modules/tile/tileActions";

router.get("/api/boats", boatActions.browse);
router.post("/api/games", gameActions.add);
router.get("/api/tiles", tileActions.browse);

router.put("/api/boats/:id", tileActions.validate, boatActions.edit);

export default router;
