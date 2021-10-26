import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';
import todos from './todosSlice';

export const store = configureStore({
  reducer: {
    user,
    todos,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
