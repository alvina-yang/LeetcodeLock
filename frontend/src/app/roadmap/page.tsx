"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/roadmap-cards";

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
      <div key={index} className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <h4 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {problem.problem_name}
        </h4>
        <p className="text-neutral-600 dark:text-neutral-400">{problem.problem_difficulty}</p>
      </div>
    ));
  };

export default AppleCardsCarouselDemo;
