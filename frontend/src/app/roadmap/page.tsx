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
          content: item.problems,
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

const Content = () => {
  return (
    <>
      {[...new Array(5).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
          </div>
        );
      })}
    </>
  );
}

export default AppleCardsCarouselDemo;
