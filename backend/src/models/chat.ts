import mongoose, { Schema, Document, Types } from "mongoose";

// Define message type
export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    technique?: string;
    goal?: string;
    analysis?: string; // could be JSON/string depending on your AI response
    progress?: {
      emotionalState?: string;
      riskLevel?: string;
    };
  };
}

// Define session type
export interface IChatSession extends Document {
  sessionId: string;
  userId: Types.ObjectId;
  startTime: Date;
  status: "active" | "ended";
  messages: IChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Message schema
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
    technique: { type: String },
    goal: { type: String },
    analysis: { type: String }, // can switch to Mixed if you want full JSON
    progress: {
      emotionalState: { type: String },
      riskLevel: { type: String },
    },
  },
});

// Session schema
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

// Export model
export const ChatSession = mongoose.model<IChatSession>(
  "ChatSession",
  chatSessionSchema
);
