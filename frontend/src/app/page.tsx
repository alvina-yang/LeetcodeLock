"use client";
import React from "react";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import Image from "next/image";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
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
        <Image
          src={`/image.png`} 
          alt="hero"
          height={822}
          width={1600}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
        <div className="flex justify-center mt-10">
          <button
            className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
            onClick={() => {
              // Redirect to sign-up or login
              window.location.href = "/signup";
            }}
          >
            Sign Up or Login
          </button>
        </div>
      </ContainerScroll>
    </div>
  );
}
