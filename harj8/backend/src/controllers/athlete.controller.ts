import { Request, Response } from "express";
import { AthleteModel } from "../models/athlete.model";

export const getAllAthletes = async (_req: Request, res: Response) => {
  try {
    res.status(200).json(await AthleteModel.getAll());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAthlete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!isFinite(id))
      return res.status(400).json({ error: "Invalid id parameter" });

    const found = await AthleteModel.getById(id);

    if (!found) return res.status(404).json({ error: "Athlete not found" });
    res.status(200).json(found);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addAthlete = async (req: Request, res: Response) => {
  try {
    const athlete = req.body;

    if (
      !athlete.firstName ||
      !athlete.lastName ||
      !athlete.dateOfBirth ||
      !athlete.weight ||
      !athlete.sport
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    athlete.dateOfBirth = new Date(athlete.dateOfBirth);

    await AthleteModel.add(athlete);
    res.status(201).json({ message: "Athlete added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAthlete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!isFinite(id))
      return res.status(400).json({ error: "Invalid id parameter" });

    const athlete = req.body;

    if (
      !athlete.firstName ||
      !athlete.lastName ||
      !athlete.dateOfBirth ||
      !athlete.weight ||
      !athlete.sport
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    athlete.dateOfBirth = new Date(athlete.dateOfBirth);

    await AthleteModel.update(id, athlete);
    res.status(200).json({ message: "Athlete updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAthlete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!isFinite(id))
      return res.status(400).json({ error: "Invalid id parameter" });

    await AthleteModel.delete(id);
    res.status(200).json({ message: "Athlete deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
