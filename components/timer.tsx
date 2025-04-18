"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ChevronDown, ChevronRight, Pause, Play } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useFocusingTask, useSortedTasks } from "@/stores/hooks";
import { SelectIcon } from "@radix-ui/react-select";
import { focusTask } from "@/stores/slices/task";
import { Todo } from "@/types/custom";

export default function Timer({ active }: { active: boolean }) {
	const timer = 25 * 60;
	const [value, setValue] = useState(timer);
	const [running, setRunning] = useState(false);
	const percentage = ((timer - value) / timer) * 100;
	const tasks = useSortedTasks();
	const focusingTask = useFocusingTask();

	useEffect(() => {
		if (value === 0 || !running) return;

		const timeout = setTimeout(() => {
			setValue((p) => p - 1);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [running, value]);

	function formatTime(seconds: number) {
		const mins = Math.floor(seconds / 60); // 10 / 60 => rounds => 0
		const secs = seconds % 60; // 10 % 60 => 10
		const paddedMins = String(mins).padStart(2, "0"); // checks length and adds 0 to the left based on that
		const paddedSecs = String(secs).padStart(2, "0");
		return `${paddedMins}:${paddedSecs}`;
	}

	return (
		<Card
			data-active={active}
			className="h-[30rem] overflow-hidden w-[90vw] sm:w-lg mt-4 font-sans rounded-md py-0 pt-3 data-[active=true]:flex data-[active=false]:hidden justify-center items-center"
		>
			<div className="w-[80%] sm:h-1/2 sm:w-1/2 flex justify-center items-center relative">
				<CircularProgressbar
					value={percentage}
					// text={`${timeLeft}s`}
					// text={`${value}s`}
					styles={buildStyles({
						pathColor: "#4ade80",
						textColor: "#1f2937",
						trailColor: "#e5e7eb",
					})}
				/>

				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 justify-center items-center text-gray-700">
					<span className="text-2xl font-semibold text-gray-600">
						Focus
					</span>

					<p className="font-semibold text-5xl text-gray-600">
						{formatTime(value)}
					</p>

					<Select>
						<SelectTrigger
							size="sm"
							className="!p-0 !h-auto !gap-1 border-none shadow-none text-gray-500 text-sm hover:text-gray-900 cursor-pointer w-30"
						>
							<SelectValue placeholder="Select a task" />
						</SelectTrigger>
						<SelectContent className="overflow-ellipsis">
							<SelectGroup onSelect={(e) => alert(e.currentTarget.dataset.id)}>
							{tasks.map((t) => (
								<SelectItem data-id={t.id} role="button" onClick={() => alert(t.id)} key={t.id} value={String(t.id)}>
									{t.task}
								</SelectItem>
							))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex gap-6 mt-8">
				{running ? (
					<>
						<button
							onClick={() => setRunning(false)}
							className="p-4 border border-[#ddd] rounded-xl hover:bg-gray-50 cursor-pointer text-gray-500"
						>
							{/* Font Awesome Stop icon */}
							<svg
								width={20}
								height={20}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								fill="currentColor"
							>
								<path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
							</svg>
						</button>
						<button
							onClick={() => {
								setValue(timer);
								setRunning(false);
							}}
							className="p-4 border border-[#ddd] rounded-xl hover:bg-gray-50 cursor-pointer text-gray-500"
						>
							{/* Font Awesome Pause icon */}
							<svg
								width={20}
								height={20}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 320 512"
								fill="currentColor"
							>
								<path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
							</svg>
						</button>
					</>
				) : (
					<button
						onClick={() => {
							setRunning(true);
						}}
						className="p-4 border border-[#ddd] rounded-xl hover:bg-gray-50 cursor-pointer text-gray-500"
					>
						{/* Font Awesome Play icon */}
						<svg
							width={20}
							height={20}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 384 512"
							fill="currentColor"
						>
							<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
						</svg>
					</button>
				)}
			</div>
		</Card>
	);
}
