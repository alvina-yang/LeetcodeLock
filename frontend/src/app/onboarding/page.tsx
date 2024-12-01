"use client";
import React, { useState } from "react";
import { CardStack } from "@/app/components/ui/card-stack";
import { Textarea } from "@/components/ui/textarea";
import { useAnalysis } from "@/app/context/AnalysisContext";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const { setAnalysis } = useAnalysis();

  // State to store answers
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Handler to update answers
  const handleAnswer = (id: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: answer,
    }));
  };

  // Handler for Finish button
  const handleFinish = async () => {
    // Prepare the JSON array
    const formattedAnswers = QUESTIONS.slice(0, -1).map((q) => ({
      question: q.question,
      answer: answers[q.id] || "",
    }));

    try {
      const response = await fetch("http://localhost:5000/submit_responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedAnswers),
      });

      if (!response.ok) {
        throw new Error("Failed to submit responses");
      }

      const analysis = await response.json();

      // Store the analysis in context
      setAnalysis(analysis);

      // Route to summary page
      router.push("/summary");
    } catch (error) {
      console.error("Error submitting responses:", error);
      // Optionally, display an error message to the user
      alert("There was an error submitting your responses. Please try again.");
    }
  };

  const QUESTIONS = [
    // Question 1: Two Sum
    {
      id: 0,
      question: "What is wrong with this implementation of Two Sum?",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 1: Two Sum</h2>
          <p className="mt-2">
            What is wrong with this implementation of Two Sum?
          </p>
          <pre className="mt-4 bg-zinc-800 text-white p-4 rounded-lg overflow-x-auto">
            {`function twoSum(nums, target) {
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
          if (nums[i] + nums[j] === target) {
            return [i, j];
          }
        }
      }
    }`}
          </pre>
          <Textarea
            placeholder="Your Answer"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[0] || ""}
            onChange={(e) => handleAnswer(0, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
    // Question 2: Detecting a Cycle
    {
      id: 1,
      question: "How would you detect a cycle in a singly linked list?",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 2: Linked Lists</h2>
          <p className="mt-2">
            How would you detect a cycle in a singly linked list?
          </p>
          <Textarea
            placeholder="Explain your approach"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[1] || ""}
            onChange={(e) => handleAnswer(1, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
    // Question 3: Dynamic Programming
    {
      id: 2,
      question: "Solve this dynamic programming problem: Find the maximum sum of a contiguous subarray.",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 3: Dynamic Programming</h2>
          <p className="mt-2">
            Solve this dynamic programming problem: Find the maximum sum of a
            contiguous subarray.
          </p>
          <code className="block mt-4 p-4 bg-zinc-800 text-white rounded-lg overflow-x-auto">
            {`Example Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]`}
          </code>
          <Textarea
            placeholder="Your Answer"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[2] || ""}
            onChange={(e) => handleAnswer(2, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
    // Question 4: Graphs - Dijkstra's Algorithm
    {
      id: 3,
      question: "Explain how Dijkstra's Algorithm works.",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 4: Graphs</h2>
          <p className="mt-2">
            Explain how Dijkstra&apos;s Algorithm works.
          </p>
          <Textarea
            placeholder="Your explanation"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[3] || ""}
            onChange={(e) => handleAnswer(3, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
    // Question 5: Binary Trees - Multiple Choice
    {
      id: 4,
      question: "Which of the following traversals visits nodes in the order left, root, right?",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 5: Binary Trees</h2>
          <p className="mt-2">
            Which of the following traversals visits nodes in the order left, root, right?
          </p>
          <div className="mt-4 space-y-2">
            <label className="block">
              <input
                type="radio"
                name="binary_tree_traversal"
                value="Preorder"
                className="mr-2"
                checked={answers[4] === "Preorder"}
                onChange={(e) => handleAnswer(4, e.target.value)}
              />
              Preorder
            </label>
            <label className="block">
              <input
                type="radio"
                name="binary_tree_traversal"
                value="Inorder"
                className="mr-2"
                checked={answers[4] === "Inorder"}
                onChange={(e) => handleAnswer(4, e.target.value)}
              />
              Inorder
            </label>
            <label className="block">
              <input
                type="radio"
                name="binary_tree_traversal"
                value="Postorder"
                className="mr-2"
                checked={answers[4] === "Postorder"}
                onChange={(e) => handleAnswer(4, e.target.value)}
              />
              Postorder
            </label>
          </div>
        </div>
      ),
    },
    // Question 6: Sliding Window
    {
      id: 5,
      question: "Describe how you would solve the maximum sum subarray of size k using the sliding window technique.",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 6: Sliding Window</h2>
          <p className="mt-2">
            Describe how you would solve the maximum sum subarray of size k using the sliding window technique.
          </p>
          <Textarea
            placeholder="Explain your solution"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[5] || ""}
            onChange={(e) => handleAnswer(5, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
    // Question 7: Heaps
    {
      id: 6,
      question: "How would you implement a min-heap using a binary tree?",
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 7: Heaps</h2>
          <p className="mt-2">
            How would you implement a min-heap using a binary tree?
          </p>
          <Textarea
            placeholder="Explain your implementation"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
            value={answers[6] || ""}
            onChange={(e) => handleAnswer(6, e.target.value)}
          ></Textarea>
        </div>
      ),
    },
   
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <CardStack
        items={QUESTIONS}
        handleAnswer={handleAnswer}
        handleFinish={handleFinish}
      />
    </div>
  );
}
