import "dotenv/config";
import mariadb from "mariadb";

export const config = {
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "athlete_db",
  },
};

export const pool = mariadb.createPool({
  ...config.db,
  connectionLimit: 5,
});
