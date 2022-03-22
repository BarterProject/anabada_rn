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
      phoneNumber:string
      addressinfo: {
        zonecode: string,
        address: string,
        addressDetail: string,
      },
      accountNumber:string
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
      accountNumber:''
    },
  },
  reducers: {
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
    setAddressinfo: (state, { payload: { zonecode, address, addressDetail } }) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        addressinfo: {
          ...state.signUpField.addressinfo,
          zonecode,
          address,
          addressDetail
        },
      },
    }),
    setAccountNumber: (state, {payload:{accountNumber}})=>({
      ...state,
      signUpField:{
        ...state.signUpField,
        accountNumber
      }
    })
  },
});

export const {
  setIdForSigningUp,
  setPasswordForSigingUp,
  setPhoneAuthChecked,
  setAddressinfo,
  setAccountNumber
} = actions;

export default reducer;
