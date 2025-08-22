import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger";
import { inngest } from "../inngest";
import { User } from "@/models/User";

import { Types } from "mongoose";
import { ChatSession } from "../models/chat";

export const createChatSession = async ( req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userId = new Types.ObjectId(req.user.id);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const sessionId = uuidv4();
        const session = new ChatSession({
            sessionId,
            userId,
            startTime: new Date(),
            status: 'active',
            messages: [],
        });

        await session.save();
        res.status(201).json({
            message: "Chat session created successfully",
            sessionId: session.sessionId,
        });
    } catch (error) {

    }
}