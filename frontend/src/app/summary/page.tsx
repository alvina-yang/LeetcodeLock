"use client";

import React, { useEffect, useState } from "react";
import { Carousel, Card } from "../components/ui/apple-cards-carousel";
import { Button } from "../components/ui/moving-boarder";
import { useRouter } from "next/navigation";
import { useAnalysis } from "../context/AnalysisContext";

export default function SummaryPage() {
    const router = useRouter();
    const { analysis, setAnalysis, leetcodeData, setLeetcodeData } = useAnalysis();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch summary analysis
                const response = await fetch("http://localhost:5000/get_analysis", {
                    method: "GET",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch analysis");
                }

                const data = await response.json();
                console.log("Fetched Analysis Data:", data); // Debug the fetched data

                // Check if data has an "analysis" key and set it to the context
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

                // Fetch Leetcode data
                const leetcodeResponse = await fetch("http://localhost:5000/get_query_results", {
                    method: "GET",
                });

                if (!leetcodeResponse.ok) {
                    const errorData = await leetcodeResponse.json();
                    throw new Error(errorData.error || "Failed to fetch Leetcode data");
                }

                const leetcodeResults = await leetcodeResponse.json();
                console.log("Fetched Leetcode Data:", leetcodeResults); // Debug the fetched data

                setLeetcodeData(leetcodeResults);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data. Please try again.");
            }
        };

        fetchData();
    }, [setAnalysis, setLeetcodeData]);

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
                <div className="flex items-center justify-center">
                    <Button
                        className="px-6 py-3 text-lg font-bold bg-zinc-950 text-white rounded-lg shadow-lg "
                        onClick={() => router.push("/roadmap")}
                    >
                        View your Map :D
                    </Button>
                </div>
            </div>
        </div>
    );
}
