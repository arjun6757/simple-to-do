"use client";

import { useState } from "react";
import Tabs from "./tabs";
import Timer from "./timer";
import Tasks from "./tasks";

export default function TabsWrapper() {
	const [tab, setTab] = useState("Timer");

	const tabs: { [key: string]: number } = {
		Timer: 0,
		Tasks: 1,
	};

	return (
		<div>
			<Tabs tab={tab} setTab={setTab} tabs={tabs} />
			<Timer active={tab==="Timer"} />
			<Tasks active={tab==="Tasks"} />
		</div>
	);
}
