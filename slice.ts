import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  dealApi, getRandomItems, postLogin, postSignup,
} from './api';
import { itemType } from './types';

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
    chosenItemId:number,
    randomItems:itemType[]
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
    chosenItemId: 0,
    randomItems: [],
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
    addRandomItems: (state, { payload: randomItems }) => ({
      ...state,
      randomItems: [...state.randomItems, ...randomItems],
    }),
    removeARandomItem: (state) => ({
      ...state,
      randomItems: [...state.randomItems.slice(1)],
    }),
    setItemToDeal: (state, { payload: itemId }) => ({
      ...state,
      chosenItemId: itemId,
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
  addRandomItems,
  removeARandomItem,
  setItemToDeal,
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
        dispatch(setAccessToken('err'));
      } else {
        dispatch(setAccessToken(jwt));
      }
    } catch (error) {
      console.log(error);
      dispatch(setAccessToken(''));
    }
  };
}

export function requestRandomItems(number :number) {
  return async (dispatch, getState) => {
    const { userState: { accessToken } } = getState();

    try {
      const data:itemType[] = await getRandomItems({ accessToken, number });
      dispatch(addRandomItems(data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function requestDeal() {
  return async (dispatch, getState) => {
    const {
      userState: { accessToken },
      chosenItemId,
      randomItems,
    } = getState();
    try {
      console.log('requestDeal: chosenItemId', chosenItemId);
      console.log('requestDeal: randomItems[0].idx', randomItems[0].idx);

      if (chosenItemId === 0) {
        return alert('교환요청을 실패했습니다. \n교환할 자신의 아이템을 선택해주세요');
      }
      await dealApi.requestDeal({
        requestId: chosenItemId,
        resqustedId: randomItems[0].idx,
        accessToken,
      });

      // const data:itemType[] = await getRandomItems({ accessToken, number });
      // dispatch(addRandomItems(data));
    } catch (e) {
      console.log('requestDeal 에러시작');
      console.log(...e);
      console.log('requestDeal 에러끝');
    }
    return alert('요청 완료');
  };
}

export default reducer;
