import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import trendsReducer from './slices/trendsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    trends: trendsReducer
  }
});