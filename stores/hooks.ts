import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, store } from ".";
import { selectSortedTasks } from "./selector";

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSortedTasks = () => useSelector(selectSortedTasks);
export const useFocusingTask = () => useAppSelector(state=> state.task.focusingTask);