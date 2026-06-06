import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateFilter: "all",
  categoryFilter: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },

    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },

    resetFilters: (state) => {
      state.dateFilter = "all";
      state.categoryFilter = "all";
    },
  },
});

export const {
  setDateFilter,
  setCategoryFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;