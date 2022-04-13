import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postLogin, postSignup } from './api';

export type initialStateProps ={
    signInField:{
      id:string,
      password:string,
    },
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
      bankName:string|null,
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
    signInField: {
      id: '',
      password: '',
    },
    signUpField: {
      id: '',
      password: '',
      phoneNumber: '',
      isPhoneAuthChecked: false,
      addressinfo: {
        zonecode: '',
        address: '',
        addressDetail: '',
      },
      bankName: '국민',
      accountNumber: '',
    },
    userState: {
      accessToken: '',
    },

  },
  reducers: {
    setIdForSigningIn: (state, { payload: id }: PayloadAction<string>) => ({
      ...state,
      signInField: {
        ...state.signInField,
        id,
      },
    }),
    setPasswordForSigingIn: (state, { payload: password }: PayloadAction<string>) => ({
      ...state,
      signInField: {
        ...state.signInField,
        password,
      },
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
    setPhoneNumberForSigingUp: (state, { payload: phoneNumber }) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        phoneNumber,
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
    setBankName: (state, { payload: bankName }) => ({
      ...state,
      signUpField: {
        ...state.signUpField,
        bankName,
      },
    }),
    setAccountNumber: (state, { payload: accountNumber }) => ({
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
    deleteAccessToken: (state) => ({
      ...state,
      userState: {
        ...state.userState,
        accessToken: '',
      },
    }),
  },
});

export const {
  setIdForSigningIn,
  setPasswordForSigingIn,
  setIdForSigningUp,
  setPasswordForSigingUp,
  setPhoneNumberForSigingUp,
  setPhoneAuthChecked,
  setAddressinfo,
  setBankName,
  setAccountNumber,
  setAccessToken,
  deleteAccessToken,
} = actions;

export function requestSignUp() {
  return async (dispatch, getState) => {
    console.log('requestSignUp 진입');
    const {
      signUpField: {
        id, password, phoneNumber, addressinfo, accountNumber, bankName,
      },
    } = getState();
    console.log(id, password, phoneNumber, addressinfo, accountNumber, bankName);

    const { zonecode, address, addressDetail } = addressinfo;

    const userInfo = {
      email: id,
      password,
      phone: phoneNumber,
      address: `${zonecode}/${address}/${addressDetail}`,
      bankAccount: accountNumber,
      bankKind: bankName,
    };

    try {
      const data = await postSignup(userInfo);
      const { message, jwt } = data;

      console.log('data', data);
      if (message !== undefined) {
        console.log(message);
      } else {
        console.log('postSignup에서 확인된 jwt', jwt);
        dispatch(setAccessToken(jwt));
      }
    } catch (error) {
      dispatch(setAccessToken(''));
    }
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const { signInField: { id, password } } = getState();

    try {
      console.log(id, password);
      const data = await postLogin({ id, password });
      console.log(data);
      const { message, jwt } = data;
      if (message !== undefined) {
        console.log(message);
      } else {
        dispatch(setAccessToken(jwt));
      }
    } catch (error) {
      console.log(error);
      dispatch(setAccessToken(''));
    }
  };
}

export default reducer;
