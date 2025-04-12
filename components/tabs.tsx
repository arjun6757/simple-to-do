"use client";

import { useState } from "react";

export default function Tabs() {
  const [tab, setTab] = useState("Timer");

  const tabs: { [key: string]: number } = {
    Timer: 0,
    Tasks: 1,
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative text-gray-700 dark:text-gray-300 flex gap-2 bg-white dark:bg-neutral-950 p-1.5 rounded-md border border-[#ddd] dark:border-[#333] shadow-sm text-sm z-10 font-sans"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setTab("Timer");
        }}
        className={`transition-colors ${tab === "Timer" ? "text-gray-800" : "text-gray-600 dark:hover:text-gray-300/50 hover:text-gray-700/50"} p-1 w-1/2 flex justify-center items-center flex-grow rounded-md cursor-pointer select-none`}
      >
        Timer
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setTab("Tasks");
        }}
        className={`transition-colors ${tab === "Tasks" ? "text-gray-800" : "text-gray-600 dark:hover:text-gray-300/50 hover:text-gray-700/50"} p-1 w-1/2 flex justify-center items-center flex-grow rounded-md cursor-pointer select-none`}
      >
        Tasks
      </button>

      <div
        style={{
          left: `calc(${tabs[tab]} * 1/2 * 100% + 4px)`,
        }}
        className={`transition-[left] duration-300 absolute top-1 bottom-1 w-[calc(1/2*100%-8px)] rounded-md bg-[#f0f0f0] -z-10`}
      ></div>
    </div>
  );
}
