"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";

export default function SummaryPage() {
  const [analysis, setAnalysis] = useState<{ title: string; description: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch analysis from `/get_analysis`
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

        // Assuming 'data' is a dictionary like { "analysis": [...] }
        const formattedData = data.analysis.map((item: any) => ({
          title: item.category,
          description: item.description,
        }));

        setAnalysis(formattedData);
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

  if (analysis.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p>Fetching your analysis. Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-800 text-white p-8 rounded-xl shadow-xl max-w-6xl w-full overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Quiz Summary</h1>
        <HoverEffect
          items={analysis.map((item) => ({
            title: item.title,
            description: item.description,
          }))}
        />
      </div>
    </div>
  );
}
