'use client';

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { useRouter } from "next/navigation";
  
import { Brain, Trophy, Heart, Activity, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { AnxietyGames } from "@/components/games/anxiety-games";
import { useSession } from "@/lib/contexts/session-context";

interface DailyStats {
    moodScore: number | null;
    completionRate: number;
    mindfulnessCount: number;
    totalActivities: number;
    lastUpdated: Date;
  }

export default function DashboardPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showMoodModal, setShowMoodModal] = useState(false);
    const { user } = useSession();
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [dailyStats, setDailyStats] = useState<DailyStats>({
        moodScore: null,
        completionRate: 100,
        mindfulnessCount: 0,
        totalActivities: 0,
        lastUpdated: new Date(),
      });

    const wellnessStats = [
        {
          title: "Mood Score",
          value: dailyStats.moodScore ? `${dailyStats.moodScore}%` : "No data",
          icon: Brain,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
          description: "Today's average mood",
        },
        {
          title: "Completion Rate",
          value: "100%",
          icon: Trophy,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          description: "Perfect completion rate",
        },
        {
          title: "Therapy Sessions",
          value: `${dailyStats.mindfulnessCount} sessions`,
          icon: Heart,
          color: "text-rose-500",
          bgColor: "bg-rose-500/10",
          description: "Total sessions completed",
        },
        {
          title: "Total Activities",
          value: dailyStats.totalActivities.toString(),
          icon: Activity,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          description: "Planned for today",
        },
      ];

    const router = useRouter();

    const handleStartTherapy = () => {
        router.push("/therapy/new");
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <Container className="pt-20 pb-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">
                        Welcome Back, {user?.name || ""}!
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {currentTime.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1
                    md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <Card className="border-primary/10 relative overflow-hidden-group">
                            <div className="absolute inset-0
                            bg-gradient-to-br from-primary/5
                            via-primary/10 to-transparent" />
                            <CardContent className="p-6 relative">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full
                                        bg-primary/10 flex items-center
                                        justify-center">
                                            <Sparkles className="w-5 h-5
                                            text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                Quick Actions
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                               Start your wellness journey
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <Button
                                        variant="default"
                                        className={cn(
                                            "w-full justify-between items-center p-6 h-auto group/button",
                                            "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                                            "transition-all duration-200 group-hover:translate-y-[-2px]"
                                        )}
                                        onClick={handleStartTherapy}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                <MessageSquare className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="text-left">
                                                <div className="font-semibold text-white">
                                                    Start Therapy
                                                </div>
                                                <div className="text-xs text-white/80">
                                                    Begin a new session
                                                </div>
                                                </div>
                                            </div>
                                            <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                                                <ArrowRight className="w-5 h-5 text-white" />
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/10">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Today's Overview</CardTitle>
                                    <CardDescription>
                                        Your metrics for{" "}
                                        {format(new Date(), "MMMM d, yyyy")}
                                    </CardDescription>
                                </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    {wellnessStats.map((stat) => (
                                        <div
                                        key={stat.title}
                                        className={cn(
                                            "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                                            stat.bgColor
                                        )}
                                        >
                                        <div className="flex items-center gap-2">
                                            <stat.icon className={cn("w-5 h-5", stat.color)} />
                                            <p className="text-sm font-medium">{stat.title}</p>
                                        </div>
                                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {stat.description}
                                        </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            <AnxietyGames />
                        </div>
                    </div>
                </div>
            </Container>

            { /* mood tracking modal */ }
            <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            How are you feeling?
                        </DialogTitle>
                        <DialogDescription>
                            Move the slider to track your current mood
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}