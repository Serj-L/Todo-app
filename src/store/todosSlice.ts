import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getTodosFromDb, saveTodosToDb } from '../api/firebase';

import { ITodosSlice, ITodoListFirebase, ITodoItem } from '../types/types';

const initialState = {
  todoList: [],
  updateDb: false,
  isLoading: false,
  isError: false,
} as ITodosSlice;

export const saveTodosToDbThunk = createAsyncThunk(
  'user/saveTodosToDbThunk',
  async (todoList: ITodoListFirebase, { rejectWithValue }) => {
    try {
      const response = await saveTodosToDb(todoList);

      return response;
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

export const getTodosFromDbThunk = createAsyncThunk(
  'user/getTodosFromDbThunk',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getTodosFromDb(userId);

      return response;
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodoItem>) {

      state.todoList.push(action.payload);
      state.updateDb = true;
    },
    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      state.todoList = state.todoList.filter(item => item.id !== action.payload.id);
      state.updateDb = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTodosToDbThunk.pending, (state) => {
      state.isLoading = true;
      if (state.isError) state.isError = false;
    });
    builder.addCase(saveTodosToDbThunk.fulfilled, (state) => {
      console.log('Todo list was update');
      state.isLoading = false;
      if (state.updateDb) state.updateDb = false;
    });
    builder.addCase(saveTodosToDbThunk.rejected, (state, action) => {
      console.log(`Ошибка: ${action.payload}`);
      state.isLoading = false;
      state.isError = true;
      if (state.updateDb) state.updateDb = false;
    });
    builder.addCase(getTodosFromDbThunk.pending, (state) => {
      state.isLoading = true;
      if (state.isError) state.isError = false;
    });
    builder.addCase(getTodosFromDbThunk.fulfilled, (state, action) => {
      const payload = action.payload as ITodosSlice;

      if (payload) state.todoList = payload.todoList;
      state.isLoading = false;
    });
    builder.addCase(getTodosFromDbThunk.rejected, (state, action) => {
      console.log(`Ошибка: ${action.payload}`);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
