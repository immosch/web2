import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import "dotenv/config";

import express from "express";
import mysql from "mysql2/promise";
import type { RowDataPacket } from "mysql2";
import { z } from "zod";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// mysql connection
const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME ?? "opinnaytetyot",
  waitForConnections: true,
  connectionLimit: 10,
});

// mcp server creation
function createServer() {
  const server = new McpServer({
    name: "opinnaytetyo-mcp",
    version: "1.0.0",
  });

  // Tool 1; get all steps
  server.registerTool(
    "get-steps",
    {
      title: "Hae opinnäytetyön kaikki vaiheet",
      description: "Hae opinnäytetyön kaikki vaiheet tietokannasta",
      inputSchema: {},
    },
    async () => {
      try {
        // fetch all steps from the database
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT * FROM vaiheet ORDER BY vaihe",
        );

        // map the rows to an array of step names
        const steps = rows.map((row) => String(row.vaihe));

        // return the steps as a text response
        return {
          content: [
            {
              type: "text",
              text:
                steps.length > 0 ? steps.join("\n") : "Vaiheita ei löytynyt",
            },
          ],
        };
      } catch (err) {
        console.error("Vaiheiden hakeminen epäonnistui", err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Vaiheiden hakeminen epäonnistui",
            },
          ],
        };
      }
    },
  );

  // Tool 2; get a single step
  server.registerTool(
    "get-single-step",
    {
      title: "Hae opinnäytetyön yksittäisen vaiheen selitys",
      description:
        "Hae opinnäytetyön yksittäisen vaiheen selitys tietokannasta",
      inputSchema: {
        step: z.string().min(1).describe("Selitettävän vaiheen nimi"),
      },
    },
    async ({ step }) => {
      // fetch the explanation for the specified step from the database
      try {
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT selitys FROM vaiheet WHERE vaihe LIKE ?",
          [`%${step}%`],
        );

        // extract the explanations from the rows and filter out empty values
        const data = rows
          .map((row) => row.selitys)
          .filter((desc) => desc != null && desc !== "")
          .map((desc) => String(desc));

        // return the explanations as a text response
        return {
          content: [
            {
              type: "text",
              text:
                data.length > 0
                  ? data.join("\n")
                  : `Vaiheelle "${step}" ei löytynyt selitystä`,
            },
          ],
        };
      } catch (err) {
        console.error("Vaiheen selityksen hakeminen epäonnistui", err);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Vaiheen selityksen hakeminen epäonnistui",
            },
          ],
        };
      }
    },
  );
  return server;
}

// post request for the MCP server
app.post("/", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  const server = createServer();

  // connect the server to the transport and handle the request
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("Error handling request", err);
  } finally {
    res.on("close", () => {
      transport.close();
      server.close();
    });
  }
});

app.listen(port, () => {
  console.log(`MCP server running on port ${port}`);
});
