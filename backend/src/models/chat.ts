import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChatMessage {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    metadata?: {
        technique: string;
        goal: string;
        progress: any[];
    };
}

export interface IChatSession extends Document {
    sessionId: string;
    userId: Types.ObjectId;
    startTime: Date;
    status: "active" | "ended";
    messages: IChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const chatMessageSchema = new Schema<IChatMessage>({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        technique: String,
        goal: String,
        progress: [Schema.Types.Mixed],
    },
});

const chatSessionSchema = new Schema<IChatSession>(
    {
        sessionId: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        startTime: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["active", "ended"],
            default: "active",
        },
        messages: [chatMessageSchema],
    },
    {
        timestamps: true,
    }
);

export const ChatSession = mongoose.model<IChatSession>(
    "ChatSession",
    chatSessionSchema
);