import { RootState } from ".";
import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredTasks = createSelector(
	(state: RootState) => state.task.tasks,
	(state: RootState) => state.task.filterType,
	(tasks, filterType) => {
		switch (filterType) {
			case "pending":
				// here it is fine as filter returns a new array so it will not mutate the original array
				return tasks.filter((t) => t.is_complete === false);
			case "completed":
				return tasks.filter((t) => t.is_complete === true);
			case "all":
			default:
				return tasks;
		}
	},
);

export const selectSortedTasks = createSelector(
	selectFilteredTasks, // two input selectors that will be passed to the result
	(state: RootState) => state.task.sortType, // function
	(selectFilteredTasks, sortType) => {
		// this one is result function that must return something
		switch (sortType) {
			case "asc":
				// taking shallow copy so that it doesn't mutate the original
				return [...selectFilteredTasks].sort((a, b) =>
					a.task!.toLowerCase().localeCompare(b.task!.toLowerCase()),
				);

			case "desc":
				return [...selectFilteredTasks].sort((a, b) =>
					b.task!.toLowerCase().localeCompare(a.task!.toLowerCase()),
				);

			case "date":
				return [...selectFilteredTasks].sort((a, b) =>
					a.inserted_at.localeCompare(b.inserted_at),
				);

			default:
				// no cases matched so return selectFilteredTasks
				return selectFilteredTasks;
		}
	},
);
