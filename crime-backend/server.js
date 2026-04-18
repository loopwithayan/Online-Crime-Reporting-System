import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

// 1. Load env variables
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Simple CORS for Local Development
// This allows your React app (usually on port 5173) to talk to this server
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// 4. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 5. Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// 6. Basic Route for testing in Browser
app.get('/', (req, res) => {
    res.send("API is running locally...");
});

// 7. Error Handler (Must be after routes)
app.use(errorHandler);

// 8. Port Setup
const PORT = 5000;

// 9. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});