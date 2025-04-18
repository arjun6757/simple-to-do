import { Todo } from "@/types/custom";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
	tasks: Todo[];
	sortType: Sort;
	filterType: Filter;
	focusingTask?: Todo;
}

export type Sort = "asc" | "desc" | "date";
export type Filter = "all" | "pending" | "completed";

const initialState: TaskState = {
	tasks: [
		{
			id: 0,
			inserted_at: new Date().toISOString(),
			is_complete: false,
			task: "Let's make a good start 🦨",
			user_id: "-1",
		},
	],
	sortType: "date",
	filterType: "all",
	focusingTask: undefined,
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Todo>) => {
			state.tasks.push(action.payload);
		},

		updateTask: (state, action: PayloadAction<Todo>) => {
			const taskIndex = state.tasks.findIndex(
				(t) => t.id === action.payload.id,
			);

			if (taskIndex !== -1) {
				state.tasks[taskIndex] = action.payload;
			} // completely replace it
		},

		deleteTask: (state, action: PayloadAction<number>) => {
			// here action.payload is the id of task
			const taskIndex = state.tasks.findIndex(
				(t) => t.id === action.payload,
			);

			if (taskIndex !== -1) {
				state.tasks.splice(taskIndex, 1);
			}
		},

		focusTask: (state, action: PayloadAction<Todo>) => {
			state.focusingTask = action.payload
		},

		unfocusTask: (state, action: PayloadAction<Todo>) => {
			if(state.focusingTask?.id===action.payload.id) {
				state.focusingTask = undefined
			}
		},

		setSortType: (state, action: PayloadAction<Sort>) => {
			state.sortType = action.payload;
		},

		setFilterType: (state, action: PayloadAction<Filter>) => {
			state.filterType = action.payload;
		},
	},
});

export const { addTask, updateTask, deleteTask, setSortType, setFilterType, focusTask, unfocusTask } =
	taskSlice.actions;
export default taskSlice.reducer;
