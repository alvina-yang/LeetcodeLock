// src/app/roadmap/page.tsx

"use client";
<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/roadmap-cards";
import { useRouter } from "next/navigation";
>>>>>>> eb75d05b80c2d3138879c4ece3e70fa47c9c800d

import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useAnalysis } from "../context/AnalysisContext";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

<<<<<<< HEAD
export default function RoadmapPage() {
  const { leetcodeData, setSelectedQuestion } = useAnalysis();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter(); // Initialize router
=======
  useEffect(() => {
    // Fetch the JSON data from the public folder
    fetch('/leetcodeproblems.json')
      .then((response) => response.json())
      .then((jsonData) => {
        // Dynamically add category to each item in the JSON data
        const updatedData = jsonData.map((item: any, index: number) => ({
          title: item.category,
          content: formatContent(item.problems),
          category: `Problem set #${index + 1}`,
        }));
        console.log("Updated Data:", updatedData);
        setData(updatedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
>>>>>>> eb75d05b80c2d3138879c4ece3e70fa47c9c800d

  if (!leetcodeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-950 shadow-xl border border-white/[0.1] shadow-white/[0.05] text-white p-6 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Loading Roadmap...</h1>
          <p>Fetching your LeetCode problem roadmap. Please wait.</p>
        </div>
      </div>
    );
  }

  if (leetcodeData.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-950 shadow-xl border border-white/[0.1] shadow-white/[0.05] text-white p-6 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">No Roadmap Found</h1>
          <p>
            Your analysis did not yield any topics. Please complete the quiz to generate a
            roadmap.
          </p>
        </div>
      </div>
    );
  }

  const toggleExpand = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleQuestionClick = (problem: any) => {
    setSelectedQuestion(problem);
    router.push("/ide"); // Navigate to the IDE page
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-start p-6 relative">
      <div className="w-full max-w-3xl py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Your LeetCode Problem Roadmap
        </h2>

        <ArcherContainer strokeColor="white" strokeWidth={2}>
          <div className="space-y-16">
            {leetcodeData.map((category, index) => (
              <ArcherElement
                key={index}
                id={`category-${index}`}
                relations={
                  index < leetcodeData.length - 1
                    ? [
                        {
                          targetId: `category-${index + 1}`,
                          targetAnchor: "top",
                          sourceAnchor: "bottom",
                        },
                      ]
                    : []
                }
              >
                <div
                  className="bg-zinc-950 shadow-xl border border-white/[0.1] shadow-white/[0.05] text-white rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{category.category}</h3>
                    <span className="text-lg">{activeIndex === index ? "▲" : "▼"}</span>
                  </div>

                  {activeIndex === index && (
                    <div className="mt-4">
                      <ul className="list-disc list-inside space-y-5">
                        {category.problems.map((problem, pIndex) => (
                          <li
                            key={pIndex}
                            className="flex justify-between items-center cursor-pointer hover:text-blue-400"
                            onClick={() => handleQuestionClick(problem)} // Handle click
                          >
                            <span className="text-md">{problem.problem_name}</span>
                            <span
                              className={`font-semibold text-md ${
                                problem.problem_difficulty === "Easy"
                                  ? "text-green-400"
                                  : problem.problem_difficulty === "Medium"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                              }`}
                            >
                              {problem.problem_difficulty}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </ArcherElement>
            ))}
          </div>
        </ArcherContainer>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

const formatContent = (problems: any[]) => {
    return problems.map((problem, index) => (
      <div key={index} className="bg-zinc-800 p-8 rounded-3xl mb-4 relative">
        <h4 className="font-semibold text-white">{problem.problem_name}</h4>
        <p className="text-neutral-600 dark:text-neutral-400">
          Difficulty: {problem.problem_difficulty}
        </p>
        {/* Next Button */}
        <button
          className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-lg"
          onClick={() => console.log(`Next clicked for problem: ${problem.problem_name}`)}
        >
          Next
        </button>
      </div>
    ));
  };

export default AppleCardsCarouselDemo;
>>>>>>> eb75d05b80c2d3138879c4ece3e70fa47c9c800d
