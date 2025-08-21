import { Request, Response } from "express"
import { serve } from "inngest/express";
import { inngest } from "./inngest"
import { logger } from "./utils/logger"
import { functions as inngestFunctions } from "./inngest/functions"
import { connectDB } from "./utils/db"
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


dotenv.config();

const express = require('express');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

const PORT = 3001

app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions: inngestFunctions }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/auth", authRoutes)


const startServer = async () => {
    try {
        await connectDB()
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            logger.info(`server is running on port ${PORT}`);
            logger.info(
                `Inngest endpoint available at http://localhost:${PORT}/api/inngest`
            );
        })
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });