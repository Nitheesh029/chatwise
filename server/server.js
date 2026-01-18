import app from "./app.js";
import connectToDatabase from "./configs/db.config.js";
import { DB_URI, PORT } from "./configs/env.config.js";

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running in http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
