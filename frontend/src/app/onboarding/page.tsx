"use client";
import React from "react";
import { CardStack } from "@/app/components/ui/card-stack";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingPage() {
  const QUESTIONS = [
    // Question 1: Two Sum
    {
      id: 0,
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
          ></Textarea>
        </div>
      ),
    },
    // Question 2: Detecting a Cycle
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
    // Question 3: Dynamic Programming
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
    // Question 4: Graphs - Dijkstra's Algorithm
    {
      id: 3,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 4: Graphs</h2>
          <p className="mt-2">
            Explain how Dijkstra&apos;s Algorithm works
          </p>
          <Textarea
            placeholder="Your explaination"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
          ></Textarea>
        </div>
      ),
    },
    // Question 5: Sliding Window
    {
      id: 5,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 6: Sliding Window</h2>
          <p className="mt-2">
            Describe how you would solve the maximum sum subarray of size k
            using the sliding window technique.
          </p>
          <Textarea
            placeholder="Explain your solution"
            className="flex-grow mt-4 w-full p-2 border border-zinc-600 rounded-lg bg-zinc-900 text-white resize-none"
          ></Textarea>
        </div>
      ),
    },
    // Question 8: Heaps
    {
      id: 6,
      content: (
        <div className="text-white flex flex-col h-full">
          <h2 className="text-lg font-bold">Question 7: Heaps</h2>
          <p className="mt-2">
            How would you implement a min-heap using a binary tree?
          </p>
          <Textarea
            placeholder="Explain your implementation"
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
