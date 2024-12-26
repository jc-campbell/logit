import { createSlice } from '@reduxjs/toolkit';

const trendsSlice = createSlice({
  name: 'trends',
  initialState: {
    items: [],
    loading: false,
    error: null,
    suggestedUsers: []
  },
  reducers: {
    fetchTrendsStart: (state) => {
      state.loading = true;
    },
    fetchTrendsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    },
    fetchTrendsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    }
  }
});

export const {
  fetchTrendsStart,
  fetchTrendsSuccess,
  fetchTrendsFailure,
  setSuggestedUsers
} = trendsSlice.actions;
export default trendsSlice.reducer;