import { Router } from "express";
import {
  getAllAthletes,
  getAthlete,
  addAthlete,
  updateAthlete,
  deleteAthlete,
} from "../controllers/athlete.controller";

const router = Router();

router.get("/", getAllAthletes);
router.get("/:id", getAthlete);
router.post("/", addAthlete);
router.put("/:id", updateAthlete);
router.delete("/:id", deleteAthlete);

export default router;
