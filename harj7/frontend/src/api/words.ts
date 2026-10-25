import type { Word } from "../pages/AddWord";

const SERVER_URL = "http://localhost:3000";

export async function addWord({ fin, eng }: Word) {
  try {
    const response = await fetch(`${SERVER_URL}/api/sanakirja`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fin, eng }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add word: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to add word:", error);
    throw error;
  }
}

export async function searchWord(query: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/sanakirja/${query}`);

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Failed to search word: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to search word:", error);
    throw error;
  }
}
