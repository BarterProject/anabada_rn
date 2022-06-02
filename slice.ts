import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import EncryptedStorage from 'react-native-encrypted-storage';
import {
  dealApi, userApi,
  getRandomItems, postLogin, postSignup, setToken,
} from './api';
import { itemType, noticeType } from './types';

type ChatRoomsProps = ChatRoomProps[]

type ChatRoomProps={
  name:string,
  messages:Array<MessageProps>
}

type MessageProps={
  idx:number,
  content:string,
  createdAt:string,
  sender:{
    email:string
  }
}

export type initialStateProps ={
    signInField:{
      id:string,
      password:string,
      phoneToken:string,
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
      accessToken:string,
      activated: boolean,
      address: string,
      auth: string,
      bankAccount: string,
      bankKind: string,
      createdAt: Date,
      email: string,
      idx: number | null,
      oauth: string,
      password: string,
      phone: string,
    }
    chatRooms:ChatRoomProps[],
    chosenItemId:number,
    randomItems:itemType[],
    notice:noticeType[],
    noticeAlarm:boolean
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
      phoneToken: '',
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
      accessToken: null,
      activated: null,
      address: null,
      auth: null,
      bankAccount: null,
      bankKind: null,
      createdAt: null,
      email: null,
      idx: null,
      oauth: null,
      password: null,
      phone: null,
    },
    chatRooms:[],
    chosenItemId: 0,
    randomItems: [],
    notice: [],
    noticeAlarm: false,
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
      signInField: {
        ...state.signInField,
        password: '',
      },
      userState: {
        ...state.userState,
        accessToken,
      },
    }),
    deleteAccessToken: (state) => ({
      ...state,
      userState: {
        ...state.userState,
        accessToken: null,
      },
      chosenItemId: 0,
      randomItems: [],
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
    setNotice: (state, { payload: notice }) => ({
      ...state,
      notice,
    }),
    addNotice: (state, { payload: addingNotice }) => ({
      ...state,
      notice: [...state.notice, addingNotice],
    }),
    setNoticeAlarm: (state, { payload }) => ({
      ...state,
      noticeAlarm: payload,
    }),
    setUserInfo: (state, { payload }) => ({
      ...state,
      userState: { accessToken: state.userState.accessToken, ...payload },
    }),
    setPhoneToken: (state, { payload }) => ({
      ...state,
      signInField: {
        ...state.signInField,
        phoneToken: payload.phoneToken,
      },
    }),
    resetRandomItems:(state)=>({
      ...state,
      randomItems:[]
    }),
    setChatRooms:(state,{ payload:{roomId,messages} })=>({
      ...state,
      chatRooms: {
        ...state.chatRooms,
        [roomId]:messages
        
      }
    })
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
  setNotice,
  addNotice,
  setNoticeAlarm,
  setUserInfo,
  setPhoneToken,
  resetRandomItems
} = actions;

export function requestSignUp({
  id, password, phoneNumber, addressinfo, accountNumber, bankName
}) {
  return async (dispatch, getState) => {
    console.log('requestSignUp 진입');
    // const {
    //   signUpField: {
    //     id, password, phoneNumber, addressinfo, accountNumber, bankName,
    //   },
    // } = getState();
    // console.log("test222",id, password, phoneNumber, addressinfo, accountNumber, bankName);

    const { zonecode, address, addressDetail } = addressinfo;

    const userInfo = {
      email: id,
      password,
      phone: phoneNumber,
      address: `${zonecode}/${address}/${addressDetail}`,
      bankAccount: accountNumber,
      bankKind: bankName,
    };
    console.log('userInfo 내용');
    console.log(userInfo)

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
      await EncryptedStorage.setItem('accessToken', jwt);
      await setToken();
      if (message === "Bad credentials") {
        dispatch(setAccessToken('err'));
      } else {
        dispatch(setAccessToken(jwt));
      }
      const { data: userInfo } = await userApi.getUserInfo();
      dispatch(setUserInfo(userInfo));
    } catch (error) {
      console.log(error);
      dispatch(setAccessToken(''));
    }
  };
}

export function requestRandomItems(number :number) {
  return async (dispatch, getState) => {

    try {
      const data:itemType[] = await getRandomItems({ number });
      dispatch(addRandomItems(data));
    } catch (e) {
      console.log({ ...e });
    }
  };
}

// export function reserRandomItems(){

// }
export function requestDeal() {
  return async (dispatch, getState) => {
    const {
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
      });

      // const data:itemType[] = await getRandomItems({ accessToken, number });
      // dispatch(addRandomItems(data));
    } catch (e) {
      console.log('requestDeal 에러시작');
      console.log(...e);
      console.log('requestDeal 에러끝');
    }
    return null;
  };
}


// export function acceptDeal({ dealIdx, itemIdx }:{dealIdx:number, itemIdx:number}) {
//   return async (dispatch, getState) => {
//     try {
//       dealApi.acceptDealRequested(dealIdx);
//       dispatch(setItemToDeal(itemIdx));
//     } catch (e) {
//       console.error(e);
//     }
//   };
// }

// export function declineDeal({ dealIdx }:{dealIdx:number}) {
//   return async (dispatch, getState) => {
//     try {
//       dealApi.declineDealRequested(dealIdx);
//       // dispatch(setItemToDeal(itemIdx));
//     } catch (e) {
//       console.error(e);
//     }
//   };
// }

// export function getUserInfo() {
//   return async (dispatch:any) => {
//     try {
//       const { data } = await userApi.getUserInfo();
//       dispatch(setUserInfo(data));
//     } catch (e) {
//       console.log(e);
//     }
//   };
// }

export default reducer;
