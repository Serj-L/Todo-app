import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { userAuth } from '../api/firebase';
import { IUserState, IUserLoginInput, IFirebaseLoginResponse, LocalStorageKeys } from '../types/types';

const initialState = {
  userId: localStorage.getItem(LocalStorageKeys.USERAUTHTOKEN) || '',
  isAuthing: false,
  authErrMsg: '',
} as IUserState;

export const userAuthThunk = createAsyncThunk(
  'user/userAuthThunk',
  async (data: IUserLoginInput, { rejectWithValue }) => {
    try {
      const response = await userAuth(data);

      return response;
    } catch(err: any) {
      return rejectWithValue(err.code);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<{userId: string}>) {
      state.userId = action.payload.userId;
    },
    setAuthErrMsg(state, action: PayloadAction<{authErrMsg: string}>) {
      state.authErrMsg = (action.payload.authErrMsg);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAuthThunk.pending, (state) => {
      state.isAuthing = true;

      if (state.authErrMsg) {
        state.authErrMsg = '';
      }
    });
    builder.addCase(userAuthThunk.fulfilled, (state, action) => {
      const payload = action.payload as IFirebaseLoginResponse;

      state.userId = payload.uid;
      localStorage.setItem(LocalStorageKeys.USERAUTHTOKEN, payload.uid);
      state.isAuthing = false;

      if (state.authErrMsg) {
        state.authErrMsg = '';
      }
    });
    builder.addCase(userAuthThunk.rejected, (state, action) => {
      state.userId = '';
      state.isAuthing = false;
      state.authErrMsg = `Error: ${action.payload}`;
    });
  },
});

export const { setUserId, setAuthErrMsg } = userSlice.actions;
export default userSlice.reducer;
