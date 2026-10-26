import type { Athlete } from "../utils/types";

const backendUrl = "http://localhost:3000";
const baseUrl = `${backendUrl}/api/athletes`;

// remove id and convert dateOfBirth to string for inputs
export type AthleteInput = Omit<Athlete, "id" | "dateOfBirth"> & {
  dateOfBirth: string;
};

// db may return achievements as a JSON string
function normalize(data: Athlete): Athlete {
  let achievements: unknown = data.achievements;
  if (typeof achievements === "string") {
    try {
      achievements = JSON.parse(achievements);
    } catch {
      achievements = [];
    }
  }
  return {
    ...data,
    achievements: Array.isArray(achievements) ? achievements : [],
  };
}

async function request(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Request failed");
  }
  return response.json();
}

export async function getAthletes(): Promise<Athlete[]> {
  const data: Athlete[] = await request(baseUrl);
  return data.map(normalize);
}

export async function getAthlete(id: number): Promise<Athlete> {
  return normalize(await request(`${baseUrl}/${id}`));
}

export async function createAthlete(athlete: AthleteInput) {
  return request(baseUrl, { method: "POST", body: JSON.stringify(athlete) });
}

export async function updateAthlete(id: number, athlete: AthleteInput) {
  return request(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(athlete),
  });
}

export async function deleteAthlete(id: number) {
  return request(`${baseUrl}/${id}`, { method: "DELETE" });
}
