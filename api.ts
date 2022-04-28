// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

import EncryptedStorage from 'react-native-encrypted-storage';

import { itemToSendType, imageToSendType } from './types';

const api = axios.create({
  baseURL: BASE_URL as string,
});

export const setToken = async () => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export async function postLogin({ id, password }) {
  const url = `${BASE_URL}/api/user/authentication`;
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

export async function getMyInfo(accessToken) {
  const url = `${BASE_URL}/api/user`;
  const data = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => (res.json()))
    .catch((err) => {
      console.log(err);
      return { jwt: 'err' };
    });
  return data;
}

export async function postSignup(userInfo) {
  const url = `${BASE_URL}/api/user`;
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

export async function getRandomItems({ accessToken, number }) {
  console.log('getRandomItems');
  const response = await axios.get(
    `${BASE_URL}/api/items?size=${number}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const { data } = response;

  return data;
}

export const dealApi = {
  requestDeal: ({ requestId, resqustedId }) => api.post('/api/user/items/requests', {
    requestItem: {
      idx: requestId,
    },
    responseItem: {
      idx: resqustedId,
    },
  }, {
    headers: {
      // Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }),
  getRequestDeals: ({ requestId }) => api.get(`/api/user/items/${requestId}/requests`),
  getRequestedDeals: ({ resqustedId }) => api.get(`/api/user/items/${resqustedId}/responses`),
  acceptDealRequested: (dealIdx) => api.put(`/api/user/items/requests/${dealIdx}/accept`),
  declineDealRequested: (dealIdx) => api.put(`/api/user/items/requests/${dealIdx}/decline`),
  sendReport: ({ title, content }) => api.post('/api/items/1/reports', { title, content }),
};

export const itemApi = {
  getCategories: () :Promise<AxiosResponse<any>> => api.get('/api/items/categories'),
  getPaymentOptions: ():Promise<AxiosResponse<any>> => api.get('/api/items/payments/options'),
  saveItem: async (accessToken:string, item: itemToSendType, images:imageToSendType[]):
  Promise<any> => {
    const formData = new FormData();
    // const jsonItemBlob = new Blob([JSON.stringify({ ...item, type: 'application/json' })]);
    console.log(images);
    images.forEach((image) => {
      const filename = image.sourceURL.split('/').pop();
      formData.append('img', {
        uri: image.sourceURL,
        name: filename,
        type: 'image/png',
      });
    });

    formData.append('item', JSON.stringify(item));

    const data = await fetch(`${BASE_URL}/api/user/items`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken},`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then((res) => res.json()).catch((e) => { console.log(e); });
    console.log(data);
    return data;
  },
  getMyInvetory: ():Promise<AxiosResponse<any>> => api.get('/api/user/items?option=owner'),
  getMyItem: ():Promise<AxiosResponse<any>> => api.get('/api/user/items'),
  getItemInfo: (idx:number):Promise<AxiosResponse<any>> => api.get(`/api/items/${idx}`),
};
