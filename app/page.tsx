"use client";
import { useState, useEffect } from "react"
import { Ripple } from "@/components/magicui/ripple";
import { motion } from "framer-motion"
import { Waves, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button";

import Image from "next/image";

export default function Home() {
  const emotions = [
    { value: 0, label: "😔 Down", color: "from-blue-500/50" },
    { value: 25, label: "😊 Content", color: "from-green-500/50" },
    { value: 50, label: "😌 Peaceful", color: "from-purple-500/50" },
    { value: 75, label: "🤗 Happy", color: "from-yellow-500/50" },
    { value: 100, label: "✨ Excited", color: "from-pink-500/50" },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const currentEmotion = emotions.find((em) => Math.abs(emotion - em.value)
  < 15) || emotions[2];

  

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[90vh]
      mt-20 flex flex-col items-center
      justify-center py-12 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all duration-700 ease-in-out
            bg-gradient-to-r ${currentEmotion.color} to-transparent opacity-60`}
          />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl bottom-0 right-0 animate-pulse delay-700" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
        </div>
        <Ripple className="opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative space-y-8 text-center"
        >
          {/* Enhanced badge with subtle animation */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <Waves className="w-4 h-4 animate-wave text-primary" />
            <span className="relative text-foreground/90 dark:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-primary/30 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
              Your AI Agent Mental Health Companion
            </span>
          </div>

          {/* Enhanced main heading with smoother gradient */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-plus-jakarta tracking-tight">
            <span className="inline-block bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent [text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] hover:to-primary transition-all duration-300">
              Find Peace
            </span>
            <br />
            <span className="inline-block mt-2 bg-gradient-to-b from-foreground to-foreground/90 bg-clip-text text-transparent">
              of Mind
            </span>
          </h1>

          <p className="max-w-[600px] mx-auto
          text-base md:text-lg text-muted-foreground leading-relaxed tracking wide">
            Experience a new way of emotional support. Our AI companion is here to listen, understand, and guide you through life's journey.
          </p>

          {/* emotion slider */}
          <motion.div 
            className="w-full max-w-[600px] mx-auto space-y-6 py-8"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: mounted ? 1 : 0, y: mounted ? 0 : 20}}
            transition ={{delay: 0.2, duration: 0.7}}
            >
              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground/80 font-medium">
                  Whatever you're feeling, we're here to listen
                </p>
                <div className="flex justify-between items-center px-2">
                  {emotions.map((em) => (
                    <div
                      key={em.value}
                      className={`transition-all duration-500 ease-out cursor-pointer hover:scale-105 ${
                        Math.abs(emotion - em.value) < 15
                          ? "opacity-100 scale-110 transform-gpu"
                          : "opacity-50 scale-100"
                      }`}
                      onClick={() => setEmotion(em.value)}
                    >
                      <div className="text-2xl transform-gpu">
                        {em.label.split(" ")[0]}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">
                        {em.label.split(" ")[1]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* slider */} 
              <div className="relative px-2">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-2xl -z-10 transition-all duration-500`}
                />
                <Slider
                  value={[emotion]}
                  onValueChange={(value) => setEmotion
                  (value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="py-4"
                  />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Slide to express how you're feeling today
                </p>
              </div>
          </motion.div>

          <Button
            size="lg"
            onClick={() => setShowDialog(true)}
            className="relative group h-12 px-8 rounded-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:to-primary shadow-lg shadow-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/30"
            >
            <span className="relative z-10 font-medium flex items-center gap-2">
              Begin Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 bg-pos-0 group-hover:bg-pos-100" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
