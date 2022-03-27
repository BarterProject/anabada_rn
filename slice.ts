import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLogin, postSignup } from './api';

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
    userState:{
      accessToken:string
    }
}

export type stateProps= {
  name: string,
  initialsState: initialStateProps
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
      accountNumber: '',
    },
    userState: {
      accessToken: '',
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
          addressDetail,
        },
      },
    }),
    setAccountNumber: (state, { payload: { accountNumber } }) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        accountNumber,
      },
    }),
    setAccessToken: (state, { payload: accessToken }) => ({
      ...state,
      userState: {
        ...state.userState,
        accessToken,
      },

    }),
  },
});

export const {
  setIdForSigningUp,
  setPasswordForSigingUp,
  setPhoneAuthChecked,
  setAddressinfo,
  setAccountNumber,
  setAccessToken,
} = actions;

export function requestSignUp() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();
    try {
      const accessToken = await postSignup({ email, password });

      // saveItem('accessToken', accessToken);

      dispatch(setAccessToken(accessToken));
    } catch (error) {
      dispatch(setAccessToken(''));
    }
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();
    try {
      const accessToken = await postLogin({ email, password });

      // saveItem('accessToken', accessToken);

      dispatch(setAccessToken(accessToken));
    } catch (error) {
      dispatch(setAccessToken(''));
    }
  };
}

export default reducer;
