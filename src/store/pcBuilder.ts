import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ICategory, IProduct } from "@/commonInterfaces/interface";

// Define a type for the slice state
interface PcBuilderState {
  pc: {
    "CPU / Processor": IProduct | null;
    Motherboard: IProduct | null;
    RAM: IProduct | null;
    "Power Supply Unit": IProduct | null;
    "Storage Device": IProduct | null;
    Monitor: IProduct | null;
  };
}

// Define the initial state using that type
const initialState: PcBuilderState = {
  pc: {
    "CPU / Processor": null,
    Motherboard: null,
    RAM: null,
    "Power Supply Unit": null,
    "Storage Device": null,
    Monitor: null,
  },
};

export const PcBuilderSlice = createSlice({
  name: "PcBuilder",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setComponent: (
      state,
      action: PayloadAction<{
        product: IProduct;
        category: ICategory | undefined;
      }>
    ) => {
      const newState = {
        pc: {
          ...state.pc,
          [action.payload?.category?.name as string]: action.payload.product,
        },
      };
      console.log("slice", newState);
      return newState;
      // state.pc[action.payload.Category] = action.payload;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      return {
        pc: {
          ...state.pc,
          [action.payload]: null,
        },
      };
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const { setComponent, removeComponent, resetState } =
  PcBuilderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default PcBuilderSlice.reducer;
