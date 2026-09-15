const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;
const fileName = "sanakirja.txt";

app.use(express.json());

// default endpoint
app.get("/", (req, res) => {
	res.send("dictionary API");
});

// GET both finnish and english translations of a word
// returns:
// 200: { "fin": "word_in_finnish", "eng": "word_in_english" }
// 400: { "error": "Missing word parameter" }
// 404: { "error": "Word not found" }
// 500: { "error": "Internal server error" }

app.get("/api/sanakirja/:word", (req, res) => {
	const word = req.params.word;

	// check if the word parameter is provided
	if (!word) {
		return res.status(400).json({ error: "Missing word parameter" });
	}

	// read the dictionary file and search for the word
	try {
		const data = fs.readFileSync(fileName, "utf8");
		const lines = data.split("\n");
		// iterate through each line to find the word
		for (const line of lines) {
			const parts = line.split(" ");

			// check if the current line contains the word
			if (parts[0] === word) {
				// return as a JSON response
				return res.json({ fin: parts[0], eng: parts[1] });
			}
		}
		// if the word was not found in the file, return a 404 error
		return res.status(404).json({ error: "Word not found" });
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
});

// POST a new finnish and english translation to the dictionary
// usage:
// POST /api/sanakirja
// body: { "fin": "word_in_finnish", "eng": "word_in_english" }

app.post("/api/sanakirja", (req, res) => {
	const { fin, eng } = req.body;

	// check if the required fields are provided
	if (!fin || !eng) {
		return res.status(400).json({ error: "Missing required fields" });
	}

	// add the new translation to the dictionary file as a new line
	try {
		const newLine = `${fin} ${eng}\n`;

		fs.appendFileSync(fileName, newLine);

		return res.status(201).json({ fin, eng });
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
