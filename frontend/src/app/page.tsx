"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "./components/ui/moving-boarder";

export default function HeroScrollDemo() {
  const router = useRouter(); // Initialize useRouter

  return (
    <div className="flex flex-col overflow-hidden bg-black min-h-screen">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Leetcode Lock <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                (the better way to study for technicals)
              </span>
            </h1>
          </>
        }
      >
        <div className="relative h-full w-full">
          <Image
            src={`/image.png`} // Ensure the path is correct and the image exists in the public folder
            alt="hero"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
      </ContainerScroll>
      <div className="flex justify-center items-center mb-5">
        <Button
          className="px-6 py-3 text-lg font-bold bg-zinc-950 text-white rounded-lg shadow-lg "
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
