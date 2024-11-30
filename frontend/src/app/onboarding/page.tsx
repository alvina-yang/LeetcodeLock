"use client";
import React from "react";
import { CardStack } from "@/app/components/ui/card-stack";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingPage() {
  const QUESTIONS = [
    {
      id: 0,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 1: Two Sum</h2>
          <p className="mt-2">
            What is wrong with this implementation of Two Sum?
          </p>
          <pre className="mt-4 bg-neutral-800 text-white p-4 rounded-lg overflow-x-auto">
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
          ></Textarea>
        </div>
      ),
    },
    {
      id: 1,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 2: Linked Lists</h2>
          <p className="mt-2">
            How would you detect a cycle in a singly linked list?
          </p>
          <Textarea
            placeholder="Explain your approach"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
          ></Textarea>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 3: Dynamic Programming</h2>
          <p className="mt-2">
            Solve this dynamic programming problem: Find the maximum sum of a
            contiguous subarray.
          </p>
          <code className="block mt-4 p-4 bg-neutral-800 text-white rounded-lg overflow-x-auto">
{`Example Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]`}
          </code>
          <Textarea
            placeholder="Your Answer"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
          ></Textarea>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 4: Graphs</h2>
          <p className="mt-2">
            Implement Dijkstra's algorithm to find the shortest path in a graph.
          </p>
          <Textarea
            placeholder="Your implementation"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
          ></Textarea>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <CardStack items={QUESTIONS} />
    </div>
  );
}
