import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootStateType } from "../redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;

export default { useAppDispatch, useTypedSelector };
