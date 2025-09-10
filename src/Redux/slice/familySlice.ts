import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

export interface Family {
  family: string;
}

interface FamilyState {
  list: Family[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


const initialState: FamilyState = {
  list: [],
  status: "idle",
  error: null,
};


export const fetchFamilies = createAsyncThunk(
  "families/fetchFamilies",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("fish_species") 
      .select("family")     
      .order("family", { ascending: true });

    if (error) {
      return rejectWithValue(error.message);
    }

    // Remove duplicates in JS
    const uniqueFamilies: Family[] = Array.from(
      new Set(data.map((item) => item.family))
    ).map((family) => ({ family }));

    return uniqueFamilies;
  }
);

const familySlice = createSlice({
  name: "families",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchFamilies.fulfilled,
        (state, action: PayloadAction<Family[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || "Unknown error";
      });
  },
});

export default familySlice.reducer;
