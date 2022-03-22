import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type stateProps= {
  name: string,
  initialsState: initialStateProps
}

export type initialStateProps ={
    signUpField: {
      id: string,
      password: string,
      isPhoneAuthChecked: boolean,
      addressinfo: {
        zonecode: string,
        address: string,
        addressDetail: string,
      },
    },
}

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    signUpField: {
      id: '',
      password: '',
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
    setIdForSigningUp: (state, { payload: id }: PayloadAction<string>) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        id,
      },
    }),
    setPasswordForSigingUp: (state, { payload: password }: PayloadAction<string>) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        password,
      },
    }),
    setPhoneAuthChecked: (state) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        isPhoneAuthChecked: true,
      },
    }),
    setAddressinfo: (state, { payload: { zonecode, address } }) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        addressinfo: {
          ...state.signUpField.addressinfo,
          zonecode,
          address,
        },
      },
    }),
  },
});

export const {
  setTest,
  setIdForSigningUp,
  setPasswordForSigingUp,
  setPhoneAuthChecked,
  setAddressinfo,
} = actions;

export default reducer;
