import { config } from "dotenv";

config();

export const { PORT, DB_URI, JWT_SECRET } = process.env;
