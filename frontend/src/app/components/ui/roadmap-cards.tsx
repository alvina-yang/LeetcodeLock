// src/app/roadmap/page.tsx

"use client";

import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import { useAnalysis } from "@/app/context/AnalysisContext";
import { button } from "../components/ui/moving-boarder";
import { useRouter } from "next/navigation"; // Ensure you're using Next.js 13+

<<<<<<< HEAD
export default function RoadmapPage() {
  const { leetcodeData, setSelectedProblem } = useAnalysis();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();
=======
type Card = {
  title: string;
  category: string;
  content: React.ReactNode;
};
>>>>>>> eb75d05b80c2d3138879c4ece3e70fa47c9c800d

  if (!leetcodeData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-950 text-white p-6 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Loading Roadmap...</h1>
          <p>Fetching your LeetCode problem roadmap. Please wait.</p>
        </div>
      </div>
<<<<<<< HEAD
=======
    </CarouselContext.Provider>
  );
};


export const Card = ({
    card,
    index,
    layout = false,
  }: {
    card: Card;
    index: number;
    layout?: boolean;
  }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose, currentIndex } = useContext(CarouselContext);
  
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          handleClose();
        }
      }
  
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);
  
    useOutsideClick(containerRef, () => handleClose());
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      onCardClose(index);
    };
  
    return (
      <>
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 h-screen z-50 overflow-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black backdrop-blur-lg h-full w-full fixed inset-0"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={containerRef}
                layoutId={layout ? `card-${card.title}` : undefined}
                className="max-w-5xl mx-auto bg-zinc-900 dark:bg-zinc-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
              >
                <button
                  className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-zinc-900 rounded-full flex items-center justify-center"
                  onClick={handleClose}
                >
                  <IconX className="h-6 w-6 text-white" />
                </button>
                <motion.p
                  layoutId={layout ? `category-${card.title}` : undefined}
                  className="text-base font-medium text-zinc-600 dark:text-white"
                >
                  {card.category}
                </motion.p>
                <motion.p
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="text-2xl md:text-5xl font-semibold text-white mt-4 dark:text-white"
                >
                  {card.title}
                </motion.p>
                <div className="py-10">{card.content}</div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <motion.button
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={handleOpen}
          className="rounded-3xl bg-gray-300 dark:bg-neutral-800 h-10 w-56 md:h-[10rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
          style={{ backgroundColor: "#3498db" }} // Solid background color
        >
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
          <div className="relative z-40 p-8">
            <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-sm md:text-base font-medium font-sans text-left"
              >
              {card.category}
            </motion.p>
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-xl md:text-2xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
              >
              {card.title}
            </motion.p>
          </div>
        </motion.button>
      </>
>>>>>>> eb75d05b80c2d3138879c4ece3e70fa47c9c800d
    );
  }

  if (leetcodeData.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-950 text-white p-6 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">No Roadmap Found</h1>
          <p>Your analysis did not yield any topics. Please complete the quiz to generate a roadmap.</p>
        </div>
      </div>
    );
  }

  const toggleExpand = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleProblemClick = (problem: LeetcodeProblem) => {
    const selected = {
      title: problem.problem_name,
      text: problem.problem_text,
      difficulty: problem.problem_difficulty,
    };
    setSelectedProblem(selected);
    router.push("/ide"); 
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-start p-6 relative">
      <div className="w-full max-w-3xl py-10 relative">
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
                  className="bg-zinc-950 shadow-xl border border-white/[0.1] text-white rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{category.category}</h3>
                    <span className="text-lg">
                      {activeIndex === index ? "▲" : "▼"}
                    </span>
                  </div>

                  {activeIndex === index && (
                    <div className="mt-4">
                      <ul className="list-disc list-inside space-y-5">
                        {category.problems.map((problem, pIndex) => (
                          <li
                            key={pIndex}
                            className="flex justify-between items-center cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the card's toggle
                              handleProblemClick(problem);
                            }}
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
