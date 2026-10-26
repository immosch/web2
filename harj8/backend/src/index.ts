import cors from "cors";
import express from "express";
import { config } from "./config/db";
import routes from "./routes";
import athleteRoutes from "./routes/athlete.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/api", routes);
app.use("/api/athletes", athleteRoutes);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
