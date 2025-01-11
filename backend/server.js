// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

// Swagger Docs
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggerConfig.js";

// Load environment variables
dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("DIRNAME:", __dirname);

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Serve the built React app
const reactBuildPath = path.join("/build");
app.use(express.static(reactBuildPath));

// Swagger API docs Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/auth", authRoutes);

// Catch-all to serve React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(reactBuildPath, "index.html"));
});

// Set the port
const PORT = process.env.PORT || 3000;
const SSL_PORT = process.env.SSL_PORT || 3443;

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Check if SSL certificates exist
const keyPath = process.env.SSL_KEY || "ssl/key.pem";
const certPath = process.env.SSL_CERT || "ssl/cert.pem";

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(sslOptions, app).listen(SSL_PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${SSL_PORT}`);
  });
} else {
  console.warn("SSL certificates not found. HTTPS server not started.");
}
