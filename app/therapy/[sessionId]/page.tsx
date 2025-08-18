"use client"

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import {
    Send,
    Bot,
    User,
    Loader2,
    Sparkles,
  } from "lucide-react";

import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const glowAnimation = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
};


export default function TherapyPage() {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatPaused] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative max-w-7xl
        mx-auto px-3">
            <div className="flex h-[calc(100vh-4rem)] mt-20 gap-6">
                <div className="flex-1 flex flex-col
                overflow-hidden bg-white dark:bg-background
                rounded-lg border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10
                        text-primary flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-semibold">
                                AI Therapist
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {messages.length} messages
                            </p>
                        </div>
                    </div>

                    {messages.length === 0 ? (
                        <div className="flex-1 flex
                        items-center justify-center p-4">
                            <div className="max-w-2xl w-full
                            space-y-8">
                                <div className="text-center
                                space-y-4">
                                    <div className="relative inline-flex
                                    flex-col items-center">
                                        <motion.div className="absolute
                                            inset-0 bg-primary/20
                                            blur-2xl rounded-full"
                                            initial="initial"
                                            animate="animate"
                                            variants={glowAnimation as any}
                                        />
                                        <div className="relative
                                        flex items-center gap-2
                                        text-2xl font-semibold">
                                            <div className="relative">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                            <motion.div
                                                className="absolute inset-0 text-primary"
                                                initial="initial"
                                                animate="animate"
                                                variants={glowAnimation as any}
                                            >
                                                <Sparkles className="w-6 h-6" />
                                            </motion.div>
                                            </div>
                                            <span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                                                AI Therapist
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground mt-2">
                                            How can I assist you today?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto
                        scroll-smooth">
                            <div className="max-w-3xl mx-auto">
                                <AnimatePresence initial={false}>
                                    { /* messages */}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};