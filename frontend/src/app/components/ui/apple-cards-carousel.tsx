"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./use-outside-click";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type CardData = {
  title: string;
  category: string;
  content: React.ReactNode;
  percentage: number;
};

interface CardProps {
  card: CardData;
  index: number;
  layout?: boolean;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }

    const handleResize = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeftFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRightFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 200 : 250;
      const gap = isMobile() ? 6 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full bg-zinc-900">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-8 scroll-smooth [scrollbar-width:none] bg-zinc-950 text-white"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute left-0 z-[1000] h-full w-[5%] bg-gradient-to-r from-black"></div>
          <div className="absolute right-0 z-[1000] h-full w-[5%] bg-gradient-to-l from-black"></div>

          <div className="flex flex-row justify-start gap-6 px-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="rounded-3xl shadow-lg"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Arrow Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeftFunc}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-zinc-900" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRightFunc}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-zinc-900" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: CardProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose } = useContext(CarouselContext);

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

  // Prepare data for the doughnut chart
  const chartData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [card.percentage, 100 - card.percentage],
        backgroundColor: ["#4ade80", "#d1d5db"], // Adjust colors as needed
        hoverBackgroundColor: ["#4ade80", "#d1d5db"],
        borderWidth: 1,
      },
    ],
  };

  // Options for the doughnut chart
  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
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
              className="bg-black/80 fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-2xl mx-auto bg-zinc-950 h-fit z-[60] my-10 p-4 md:p-8 rounded-3xl font-sans relative text-white shadow-lg"
            >
              <button
                className="absolute top-4 right-4 h-8 w-8 bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-zinc-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-4xl font-semibold mt-4"
              >
                {card.title}
              </motion.p>
              {/* Include the doughnut chart in the modal */}
              <div className="py-6">
                <div className="flex flex-col items-center">
                  <div className="h-[10rem]">
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                  <p className="mt-4 text-xl font-bold">
                    {card.percentage}% Understanding
                  </p>
                </div>
                {card.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-zinc-950 outline outline-zinc-900 h-48 w-40 md:h-[30rem] md:w-80 overflow-hidden flex flex-col items-center justify-center relative z-10 text-white shadow-lg cursor-pointer"
      >
        <div className="relative z-40 p-4 flex flex-col items-center">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-center"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-lg md:text-xl font-semibold max-w-xs text-center font-sans mt-2"
          >
            {card.title}
          </motion.p>
          {/* Include the doughnut chart on the card */}
          <div className="mt-4 w-24 h-24">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <p className="mt-2 text-sm font-bold">
            {card.percentage}% Understanding
          </p>
        </div>
        {/* Optional Content Placeholder */}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-white text-sm text-center">Click to see details</p>
        </div>
      </motion.div>
    </>
  );
};
