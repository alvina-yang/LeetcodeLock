"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [points, setPoints] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const router = useRouter();

  // Start a 30-minute session
  const startSession = () => {
    setTimer(30 * 60); // 30 minutes in seconds
    setIsSessionActive(true);
  };

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSessionActive && timer !== null) {
      interval = setInterval(() => {
        setTimer((prev) => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timer === 0 && interval) {
      clearInterval(interval);
      setIsSessionActive(false);
      setPoints((prev) => prev + 1); // Add a point when the session ends
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard", // Navigate to the dashboard page
      icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // Adjust for full screen
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "User Avatar",
                href: "/profile",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Dashboard Section */}
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-4">
            Welcome to the Dashboard
          </h1>
          <div className="flex flex-col gap-4">
            {/* Timer Section */}
            <div className="bg-zinc-800 p-4 rounded-lg text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">30-Minute Session</h2>
                {isSessionActive && timer !== null ? (
                  <p className="text-green-400">Time Remaining: {formatTime(timer)}</p>
                ) : (
                  <p className="text-gray-400">Session not started</p>
                )}
              </div>
              <button
                onClick={startSession}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                disabled={isSessionActive}
              >
                {isSessionActive ? "Session Active" : "Start Session"}
              </button>
            </div>

            {/* Total Points Section */}
            <div className="bg-zinc-800 p-4 rounded-lg text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Total Points</h2>
                <p className="text-green-400">{points}</p>
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Logo and LogoIcon Components
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
