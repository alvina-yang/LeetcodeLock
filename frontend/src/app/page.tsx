"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "./components/ui/moving-boarder";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";

export default function HeroScrollDemo() {
  const router = useRouter(); 

  const content = [
    {
      title: "Personalized experience",
      description:
        "Take a personalized onboarding questionnaire designed to assess your problem-solving skills. By analyzing your responses to three tailored Leetcode inspired questions, our AI-powered platform evaluates your ability to tackle challenges and adapt to complex problems. Get insights into your strengths and areas for growth, helping you progress faster.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Insightful analysis",
      description:
        "Your results reveal a clear picture of your problem-solving strengths and areas where growth is possible. By analyzing your responses, we provide personalized insights into your technical abilities, helping you identify where you excel and where additional focus can enhance your skills. Leverage this feedback to target specific areas and advance your problem-solving capabilities.",
      content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
          <Image
            src="/linear.webp"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Blueprint for success",
      description:
        "Stay on track with a clear, personalized path designed to enhance problem-solving skills and ensure efficient improvement. With each curated Leetcode problem perfectly matched to your skill level, progress feels seamless and natural. Focus on the right challenges, build confidence, and watch technical skills grow, all while effortlessly advancing toward more complex problems.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
          Version control
        </div>
      ),
    },
  ];


  return (
    <div className="flex flex-col overflow-hidden bg-black min-h-screen">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
             (the better way to study for technicals) <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 mb-5 leading-none">
                Leetcode Lock
              </span>
            </h1>
          </>
        }
      >
        <div className="relative h-full w-full">
          <Image
            src={`/image.png`} 
            alt="hero"
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
      </ContainerScroll>

      {/* <div className="h-10"></div>  */}

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
