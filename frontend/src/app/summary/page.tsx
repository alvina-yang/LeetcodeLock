"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";

export default function SummaryPage() {
  const [analysis, setAnalysis] = useState<
    { name: string; description: string; percentage: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_analysis", {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch analysis");
        }

        const data = await response.json();
        console.log("Fetched Data:", data); // Debug the fetched data

        // Check if data has an "analysis" key and set it to the state
        if (data.analysis && Array.isArray(data.analysis)) {
          const formattedData = data.analysis.map((item: any) => ({
            name: item.category,
            description: item.description,
            percentage: item.percentage, // Include the percentage
          }));
          setAnalysis(formattedData);
        } else {
          throw new Error("Invalid data format received from backend.");
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Failed to fetch analysis. Please try again.");
      }
    };

    fetchAnalysis();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!Array.isArray(analysis) || analysis.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Fetching your analysis. Please wait.</p>
        </div>
      </div>
    );
  }

  const cards = analysis.map((item, index) => (
    <Card
      key={index}
      card={{
        title: item.name,
        category: "",
        percentage: item.percentage, // Pass the percentage to the card
        content: (
          <div className="p-4 text-white">
            <p className="text-base md:text-xl">{item.description}</p>
          </div>
        ),
      }}
      index={index}
    />
  ));

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full h-full py-20">
        <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-200 font-sans">
          Your Quiz Summary
        </h2>
        <Carousel items={cards} />
      </div>
    </div>
  );
}
