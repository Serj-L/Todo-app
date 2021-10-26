import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getTodosFromDb, saveTodosToDb, setTodosSortOrderToDb } from '../api/firebase';

import { ITodosSlice, ITodoListSetToDb, ITodoItem, ITodosSortOrderSetToDb, ITodosGetFromDb, TodosSortOrder } from '../types/types';

const initialState = {
  todoList: [],
  updateDb: false,
  isLoading: false,
  isError: false,
  sortOrder: TodosSortOrder.ALL,
} as ITodosSlice;

export const saveTodosToDbThunk = createAsyncThunk(
  'user/saveTodosToDbThunk',
  async (todoList: ITodoListSetToDb, { rejectWithValue }) => {
    try {
      await saveTodosToDb(todoList);
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

export const setTodosSortOrderToDbThunk = createAsyncThunk(
  'user/setTodosSortOrderToDbThunk',
  async (sortOrder: ITodosSortOrderSetToDb, { rejectWithValue }) => {
    try {
      await setTodosSortOrderToDb(sortOrder);
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
    setTodoSortOrder(state, action: PayloadAction<string>) {
      state.sortOrder = (action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTodosToDbThunk.pending, (state) => {
      state.isLoading = true;
      if (state.isError) {
        state.isError = false;
      }
    });
    builder.addCase(saveTodosToDbThunk.fulfilled, (state) => {
      console.log('Todo list was update');
      state.isLoading = false;
      if (state.updateDb) {
        state.updateDb = false;
      }
    });
    builder.addCase(saveTodosToDbThunk.rejected, (state, action) => {
      console.log(`Ошибка: ${action.payload}`);
      state.isLoading = false;
      state.isError = true;
      if (state.updateDb) {
        state.updateDb = false;
      }
    });
    builder.addCase(getTodosFromDbThunk.pending, (state) => {
      state.isLoading = true;
      if (state.isError) {
        state.isError = false;
      }
    });
    builder.addCase(getTodosFromDbThunk.fulfilled, (state, action) => {
      const todosFromDb = action.payload as ITodosGetFromDb;

      if (todosFromDb) {
        state.todoList = todosFromDb.todos;

        if (state.sortOrder !== todosFromDb.todosSortOrder) {
          state.sortOrder = todosFromDb.todosSortOrder;
        }
      }
      state.isLoading = false;
    });
    builder.addCase(getTodosFromDbThunk.rejected, (state, action) => {
      console.log(`Ошибка: ${action.payload}`);
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(setTodosSortOrderToDbThunk.fulfilled, (state) => {
      console.log('Todos sort order was update');
    });
    builder.addCase(saveTodosToDbThunk.rejected, (state, action) => {
      console.log(`Error updating sort order: ${action.payload}`);
    });
  },
});

export const { addTodo, deleteTodo, setTodoSortOrder } = todosSlice.actions;
export default todosSlice.reducer;
