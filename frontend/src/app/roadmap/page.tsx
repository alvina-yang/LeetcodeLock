"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/roadmap-cards";
import { useRouter } from "next/navigation";

export function AppleCardsCarouselDemo() {
  const [data, setData] = useState<any[]>([]);

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

  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-black">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
        Practise Problem Roadmap
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

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
