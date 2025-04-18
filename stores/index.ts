import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./slices/task"


export const store = configureStore({
	reducer: {
		task: taskReducer
	}
})

export type RootState = ReturnType<typeof store.getState>;	// this gives the full types of the entire Redux state tree