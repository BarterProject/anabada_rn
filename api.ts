// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

import EncryptedStorage from 'react-native-encrypted-storage';

import { itemToSendType, imageToSendType, trackingType } from './types';

const api = axios.create({
  baseURL: `${BASE_URL}/api/v2` as string,
});

export const setToken = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export async function postLogin({ id, password }) {
  const url = `${BASE_URL}/api/v2/user/authentication`;
  // console.log(url);
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: id, password }),
  }).then((res) => (res.json()))
    .catch((err) => {
      console.log(err);
      return { jwt: 'err' };
    });
  return data;
}

export const getMyInfo = (): Promise<AxiosResponse<any>> => api.get('/user');

export async function postSignup(userInfo) {
  const url = `${BASE_URL}/api/v2/user`;
  console.log('postSignup진입');

  const {
    email,
    password,
    phone,
    address,
    bankAccount,
    bankKind,
  } = userInfo;

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      phone,
      address,
      bankAccount,
      bankKind,
    }),
  }).then((res) => (res.json()))
    .catch((err) => {
      console.log(err.response);
      return { jwt: 'err' };
    });

  return data;
}

export async function getRandomItems({ number }) {
  console.log('getRandomItems');
  const { data } = await api.get(
    `/items?size=${number}`,
  );
  return data;
}

export const userApi = {
  getNotice: () => api.get('/notices'),
  getUserInfo: () => api.get('/user'),
};

export const dealApi = {
  requestDeal: ({ requestId, resqustedId }) => api.post('/user/items/requests', {
    requestItemIdx: requestId,
    responseItemIdx: resqustedId,
  }, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }),
  getRequestDeals: ({ requestId }) => api.get(`/user/items/${requestId}/requests?state=1`),
  getRequestedDeals: ({ resqustedId }) => api.get(`/user/items/${resqustedId}/responses?state=1`),
  acceptDealRequested: (dealIdx:number) => api.put(`/user/items/requests/${dealIdx}/accept`),
  declineDealRequested: (dealIdx:number) => api.put(`/user/items/requests/${dealIdx}/decline`),
  sendReport: ({ title, content, idx }) => api.post(`/items/${idx}/reports`, { title, content }),
  deleteRequest: (idx:number) :Promise<AxiosResponse<any>> => api.delete(`/user/items/requests/${idx}`),
  getDealHistory: (idx:number):Promise<AxiosResponse<any>> => api.get(`/user/items/${idx}/dealHistory`),
};

export const itemApi = {
  getCategories: (): Promise<AxiosResponse<any>> => api.get('/items/categories'),
  getPaymentOptions: (): Promise<AxiosResponse<any>> => api.get('/items/payments/options'),
  saveItem: async (
    accessToken: string,
    item: itemToSendType,
    images: imageToSendType[],
    osType:string,
  ):
    Promise<any> => {
    const formData = new FormData();
    // const jsonItemBlob = new Blob([JSON.stringify({ ...item, type: 'application/json' })]);
    images.forEach((image) => {
      console.log(image);
      let filename:string;
      let uri:string;
      if (osType === 'ios') {
        filename = image.sourceURL.split('/').pop();
        uri = image.sourceURL;
      } else {
        filename = image.path.split('/').pop();
        uri = image.path;
      }
      // = image.sourceURL.split('/').pop();
      formData.append('img', {
        uri,
        name: filename,
        type: 'image/png',
      });
    });

    formData.append('item', JSON.stringify(item));

    const data = await fetch(`${BASE_URL}/api/v2/user/items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken},`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((res) => res.json()).catch((e) => { console.log('save image error'); console.log(e); });
    console.log(data);
    return data;
  },
  getMyInvetory: (): Promise<AxiosResponse<any>> => api.get('/user/items?option=owner'),
  getMyItem: (): Promise<AxiosResponse<any>> => api.get('/user/items'),
  getItemInfo: (idx: number): Promise<AxiosResponse<any>> => api.get(`/items/${idx}`),
  refundItem: (idx:number) :Promise<AxiosResponse<any>> => api.post(`/user/items/${idx}/refund`),
};

export const deliveryApi = {
  saveDelivery: (idx:number, body:any) :Promise<AxiosResponse<any>> => api.post(`/user/items/${idx}/deliveries`, { ...body }),
  saveTracking: (idx:number, body:any):Promise<AxiosResponse<any>> => api.post(`/user/items/deliveries/${idx}`, { ...body }),
  getTrackingInfo: (idx:number) :Promise<AxiosResponse<trackingType>> => api.get(`/user/items/${idx}/deliveries/tracking`),
};

export const socketApi = {
  connectSocket: async (): Promise<AxiosResponse<any>> => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    return api.get(`/socket?jwt=${accessToken}`);
  },
};


export const boardApi = {
  getBoard: ():Promise<AxiosResponse<any>> => api.get('/boards'),
  getMyPosts: ():Promise<AxiosResponse<any>> => api.get('/boards/1/posts'),
  savePost: (title:string, content:string):Promise<AxiosResponse<any>> => api.post('/boards/1/posts', { title, content }),
};
export const FCMApi = {
  updateToken: (token:string) :Promise<AxiosResponse<any>> => api.put('/user/fcm/token',{
    token
  }),
  deleteToken:() :Promise<AxiosResponse<any>> => api.delete('/user/fcm/token',),
}

export const chatApi = {
  getRoomById:(id:string) :Promise<AxiosResponse<any>> => api.get(`/items/${id}/rooms`,),
  saveMessasge:({content,roomName}) :Promise<AxiosResponse<any>> => api.post(`/rooms/messages`,{
    content,
    roomName
  }),
  getMessages:(id:string) :Promise<AxiosResponse<any>> => api.get(`/rooms/${id}/messages?page=0`,),
}