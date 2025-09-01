import express, {Router} from "express";
import { 
    sendMessage,
    getAllChatSessions,
    getChatHistory,
    createChatSession,
    getSessionHistory} from "../controllers/chat";
    

import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.use(auth);

router.post("/sessions", createChatSession);
router.get("/sessions/:sessionId", getSessionHistory);
router.post("/sessions/:sessionId/messages", sendMessage);
router.get("/sessions/:sessionId/history", getChatHistory);
router.get("/sessions", getAllChatSessions); // GET /chat/sessions

export default router;