"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient"; 

export interface Fish {
  id: string;
  common_name: string;
  scientific_name: string;
  family: string;
  country: string;
  biology: string;
  distribution: string;
  image_url: string | null;
}

interface FishState {
  items: Fish[];     
  species: Fish[];   
  loading: boolean;
  error: string | null;
  search: string;
  country: string;
  family: string;
}

const initialState: FishState = {
  items: [],
  species: [],
  loading: false,
  error: null,
  search: "",
  country: "",
  family: "",
};


export const fetchFish = createAsyncThunk(
  "fish/fetchFish",
  async (_, { getState }) => {
    const state = getState() as { fish: FishState };
    const { search, country, family } = state.fish;

    let query = supabase
      .from("fish_species")
      .select(
        "id, common_name, scientific_name, family, country, biology, distribution, image_url"
      );

    if (search) query = query.ilike("common_name", `%${search}%`);
    if (country) query = query.eq("country", country);
    if (family) query = query.eq("family", family);

    const { data, error } = await query;
    if (error) throw error;
    return data as Fish[];
  }
);


export const fetchSpeciesByFamily = createAsyncThunk(
  "fish/fetchSpeciesByFamily",
  async (familyNameParam: string) => {
    const familyName = decodeURIComponent(familyNameParam);
    console.log("🔍 Fetching species for family:", familyName);

    const { data, error } = await supabase
      .from("fish_species")
      .select(
        "id, common_name, scientific_name, family, country, biology, distribution, image_url"
      )
      .ilike("family", familyName); 

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    console.log("Supabase data:", data);
    return data as Fish[];
  }
);

const fishSlice = createSlice({
  name: "fish",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setFamily: (state, action: PayloadAction<string>) => {
      state.family = action.payload;
    },
    clearFish: (state) => {
      state.items = [];
      state.species = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFish.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFish.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch fish";
      })

      // fetchSpeciesByFamily
      .addCase(fetchSpeciesByFamily.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpeciesByFamily.fulfilled, (state, action) => {
        state.loading = false;
        state.species = action.payload; 
      })
      .addCase(fetchSpeciesByFamily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch species by family";
      });
  },
});

export const { setSearch, setCountry, setFamily, clearFish } = fishSlice.actions;
export default fishSlice.reducer;
