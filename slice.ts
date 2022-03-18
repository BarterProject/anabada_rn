import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'message',
  initialState: {
    signUp: {
      isPhoneAuthChecked: false,
      addressinfo: {
        zonecode: '',
        address: '',
        addressDetail: '',
      },

    },
  },
  reducers: {
    setTest: (state, { payload }: PayloadAction<string>) => ({
      ...state,
    }),
  },
});

export const {
  setTest,
} = actions;

export default reducer;
