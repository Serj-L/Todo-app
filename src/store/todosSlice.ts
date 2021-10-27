import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { getTodosFromDb, saveTodosToDb, getTodosSortOrderFromDb, setTodosSortOrderToDb } from '../api/firebase';

import { ITodosSlice, ITodoListSetToDb, ITodoItem, ITodosSortOrderSetToDb, ITodosGetFromDb, ITodosSortOrderGetFromDb, TodosSortOrder } from '../types/types';

const initialState = {
  todoList: [],
  updateDb: false,
  isLoading: false,
  isError: false,
  todosErrMsg: '',
  sortOrder: TodosSortOrder.ALL,
} as ITodosSlice;

export const saveTodosToDbThunk = createAsyncThunk(
  'todos/saveTodosToDbThunk',
  async (todoList: ITodoListSetToDb, { rejectWithValue }) => {
    try {
      await saveTodosToDb(todoList);
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

export const getTodosFromDbThunk = createAsyncThunk(
  'todos/getTodosFromDbThunk',
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
  'todos/setTodosSortOrderToDbThunk',
  async (sortOrder: ITodosSortOrderSetToDb, { rejectWithValue }) => {
    try {
      await setTodosSortOrderToDb(sortOrder);
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

export const getTodosSortOrderDbThunk = createAsyncThunk(
  'todos/getTodosSortOrderDbThunk',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getTodosSortOrderFromDb(userId);

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
    toggleTodoComplete(state, action: PayloadAction<{ id: string }>) {
      state.todoList = state.todoList.map(item => {
        return item.id === action.payload.id ? { ...item, isCompleted: !item.isCompleted } : item;
      });
      state.updateDb = true;
    },
    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      state.todoList = state.todoList.filter(item => item.id !== action.payload.id);
      state.updateDb = true;
    },
    deleteCompletedTodo(state) {
      state.todoList = state.todoList.filter(item => item.isCompleted === true);
      state.updateDb = true;
    },
    setTodosSortOrder(state, action: PayloadAction<string>) {
      state.sortOrder = (action.payload);
    },
    setTodosErrMsg(state, action: PayloadAction<string>) {
      state.todosErrMsg = (action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveTodosToDbThunk.pending, (state) => {
      state.isLoading = true;

      if (state.isError) {
        state.isError = false;
        state.todosErrMsg = '';
      }
    });
    builder.addCase(saveTodosToDbThunk.fulfilled, (state) => {
      state.isLoading = false;

      if (state.updateDb) {
        state.updateDb = false;
      }
    });
    builder.addCase(saveTodosToDbThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.todosErrMsg = `Error uploading Todos to cloud store: ${action.payload}`;

      if (state.updateDb) {
        state.updateDb = false;
      }
    });
    builder.addCase(getTodosFromDbThunk.pending, (state) => {
      state.isLoading = true;

      if (state.isError) {
        state.isError = false;
        state.todosErrMsg = '';
      }
    });
    builder.addCase(getTodosFromDbThunk.fulfilled, (state, action) => {
      const todosFromDb = action.payload as ITodosGetFromDb;

      state.todoList = todosFromDb ? todosFromDb.todoList : [];
      state.isLoading = false;
    });
    builder.addCase(getTodosFromDbThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.todosErrMsg = `Error loading Todos from cloud store: ${action.payload}`;
    });
    builder.addCase(getTodosSortOrderDbThunk.pending, (state) => {
      if (state.isError) {
        state.isError = false;
        state.todosErrMsg = '';
      }
    });
    builder.addCase(getTodosSortOrderDbThunk.fulfilled, (state, action) => {
      const todosFromDb = action.payload as ITodosSortOrderGetFromDb;

      if (state.sortOrder !== todosFromDb.todosSortOrder) {
        state.sortOrder = todosFromDb.todosSortOrder;
      }
    });
    builder.addCase(getTodosSortOrderDbThunk.rejected, (state, action) => {
      state.isError = true;
      state.todosErrMsg = `Error loading sort order from cloud store: ${action.payload}`;
    });
    builder.addCase(setTodosSortOrderToDbThunk.pending, (state) => {
      if (state.isError) {
        state.isError = false;
        state.todosErrMsg = '';
      }
    });
    builder.addCase(setTodosSortOrderToDbThunk.fulfilled, (state) => {
      console.log('Todos sort order was update');
    });
    builder.addCase(setTodosSortOrderToDbThunk.rejected, (state, action) => {
      state.isError = true;
      state.todosErrMsg = `Error uploading sort order to cloud store: ${action.payload}`;
    });
  },
});

export const { addTodo, deleteTodo, deleteCompletedTodo, toggleTodoComplete, setTodosSortOrder, setTodosErrMsg } = todosSlice.actions;
export default todosSlice.reducer;
