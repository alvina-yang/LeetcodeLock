"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Card = {
  id: number;
  content: React.ReactNode;
};

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    router.push("/summary");
  };

  return (
    <div className="relative h-[50rem] w-[50rem] md:h-[50rem] md:w-[50rem]">
      {items.map((card, index) => {
        const relativeIndex = index - currentIndex;

        // Only render cards within the visible stack (current and next 2)
        if (relativeIndex < 0 || relativeIndex > 2) {
          return null;
        }

        return (
          <motion.div
            key={card.id}
            className="absolute bg-black h-[45rem] w-[50rem] md:h-[45rem] md:w-[50rem] rounded-3xl p-6 shadow-xl border border-white/[0.1] shadow-white/[0.05] flex flex-col justify-between overflow-hidden"
            style={{
              transformOrigin: "top center",
            }}
            initial={{
              top: relativeIndex * -CARD_OFFSET,
              scale: 1 - relativeIndex * SCALE_FACTOR,
              zIndex: items.length - index,
              opacity: 0,
            }}
            animate={{
              top: relativeIndex * -CARD_OFFSET,
              scale: 1 - relativeIndex * SCALE_FACTOR,
              zIndex: items.length - index,
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-normaltext-neutral-200 overflow-y-auto flex-grow">
              {card.content}
            </div>
            {relativeIndex === 0 && currentIndex < items.length - 1 && (
              <div className="flex justify-end mt-4">
                <button
                  className="px-6 py-3 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
            {relativeIndex === 0 && currentIndex === items.length - 1 && (
              <div className="flex justify-end mt-4">
                <button
                  className="px-6 py-3 text-sm font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  onClick={handleFinish}
                >
                  Finish
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};