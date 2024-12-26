// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

// Swagger Docs
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Swagger API docs Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
