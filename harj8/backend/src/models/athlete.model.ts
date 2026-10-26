import { pool } from "../config/db";

export type Athlete = {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  dateOfBirth: Date;
  weight: number;
  imageUrl?: string;
  sport: string;
  achievements?: string[];
};

export const AthleteModel = {
  // Fetch all athletes from the database
  async getAll(): Promise<Athlete[]> {
    return pool.query(
      "SELECT id, firstName, nickname, lastName, dateOfBirth, weight, imageUrl, sport, achievements FROM athletes",
    );
  },

  // Fetch a single athlete by ID from the database / undefined if not found
  async getById(id: number): Promise<Athlete | undefined> {
    const rows: Athlete[] = await pool.query(
      "SELECT id, firstName, nickname, lastName, dateOfBirth, weight, imageUrl, sport, achievements FROM athletes WHERE id = ?",
      [id],
    );
    return rows[0];
  },

  // Add a new athlete to the database
  async add(athlete: Athlete): Promise<void> {
    await pool.query(
      "INSERT INTO athletes (firstName, nickname, lastName, dateOfBirth, weight, imageUrl, sport, achievements) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        athlete.firstName,
        athlete.nickname,
        athlete.lastName,
        athlete.dateOfBirth,
        athlete.weight,
        athlete.imageUrl,
        athlete.sport,
        JSON.stringify(athlete.achievements || []),
      ],
    );
  },

  // Update an existing athlete in the database
  async update(id: number, athlete: Athlete): Promise<void> {
    await pool.query(
      "UPDATE athletes SET firstName = ?, nickname = ?, lastName = ?, dateOfBirth = ?, weight = ?, imageUrl = ?, sport = ?, achievements = ? WHERE id = ?",
      [
        athlete.firstName,
        athlete.nickname,
        athlete.lastName,
        athlete.dateOfBirth,
        athlete.weight,
        athlete.imageUrl,
        athlete.sport,
        JSON.stringify(athlete.achievements || []),
        id,
      ],
    );
  },

  // Delete an athlete from the database
  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM athletes WHERE id = ?", [id]);
  },
};
