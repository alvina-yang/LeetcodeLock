"use client";

import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody } from "../components/ui/sidebar";
import { IconClock, IconAward, IconGauge } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SidebarDemo() {
  const [open, setOpen] = useState(false); // Sidebar open state
  const [isSessionActive, setIsSessionActive] = useState(false); // Timer active
  const [timeLeft, setTimeLeft] = useState(1800); 
  const [totalPoints, setTotalPoints] = useState(0); 

  // Load points from localStorage
  useEffect(() => {
    const storedPoints = localStorage.getItem("totalPoints");
    if (storedPoints) {
      setTotalPoints(parseInt(storedPoints, 10));
    }
  }, []);

  // Save points to localStorage
  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints.toString());
  }, [totalPoints]);

  // Timer countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSessionActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isSessionActive && timeLeft === 0) {
      setIsSessionActive(false);
      setTotalPoints((prev) => prev + 1); // Increment points
      alert("Session Complete! You've earned 1 point.");
    }
    return () => clearInterval(timer);
  }, [isSessionActive, timeLeft]);

  // Timer control functions
  const handleStartSession = () => {
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimeLeft(1800); // Reset to 30 minutes
    }
  };

  const handleResetSession = () => {
    setIsSessionActive(false);
    setTimeLeft(1800); // Reset timer
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="flex flex-col items-center justify-center h-full gap-6 bg-zinc-900">
        {/* Timer Section */}
        <div className="flex items-center gap-2">
          <IconClock className="text-slate-200 h-5 w-5 flex-shrink-0" />
          {open && (
            <div className="flex flex-col">
              <button
                onClick={isSessionActive ? handleResetSession : handleStartSession}
                className={cn(
                  "text-slate-200 hover:text-blue-500 px-2 py-1 rounded transition-all",
                  isSessionActive ? "hover:text-red-500" : ""
                )}
              >
                {isSessionActive ? formatTime(timeLeft) : "Start 30-Minute Session"}
              </button>
            </div>
          )}
        </div>

        {/* Points Section */}
        <div className="flex items-center gap-2">
          <IconAward className="text-slate-200 h-5 w-5 flex-shrink-0" />
          {open && (
            <span className="text-slate-200">
              Points: <span className="text-amber-400">{totalPoints}</span>
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <IconGauge className="text-slate-200 h-5 w-5 flex-shrink-0" />
          {open && (
            <Link href="/dashboard" className="text-slate-200 hover:text-blue-500">
              Dashboard
            </Link>
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
