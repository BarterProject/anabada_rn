// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

import EncryptedStorage from 'react-native-encrypted-storage';

import { itemToSendType, imageToSendType } from './types';

// accessToken

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

export async function getTESTItems() {
  const response = await (await axios.get('http://10.0.2.2:3000/items'));
  const { data } = response;
  console.log('getTESTItems : ', data);

  return data;
}

export async function getMyItems(accessToken) {
  const response = await (await axios.get(
    `${BASE_URL}/api/user/items?option=owner`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  ));
  const { data } = response;
  console.log(data);
  // return data;
}

export async function sendReport({ accessToken, title, content }) {
  const response = await (await axios.get(
    `${BASE_URL}/api/items/1/reports`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: {
        title, content,
      },
    },

  ));
  const { data } = response;
  console.log(data);
  // return data;
}

export const dealApi = {
  requestDeal: ({ requestId, resqustedId, accessToken }) => api.post('/api/user/items/requests', {
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      requestItem: {
        idx: requestId,
      },
      responseItem: {
        idx: resqustedId,
      },
    }),
  }),
  getRequestDeals: ({ requestId, accessToken }) => api.get(`/api/user/items/${requestId}/requests`, { headers: { Authorization: `Bearer ${accessToken}` } }),
  getRequestedDeals: ({ resqustedId, accessToken }) => api.get(`/api/user/items/${resqustedId}/requests`, { headers: { Authorization: `Bearer ${accessToken}` } }),
  acceptDealRequested: ({ requesedtId, accessToken }) => api.put(`/api/user/items/requests/${requesedtId}/accept`, { headers: { Authorization: `Bearer ${accessToken}` } }),
  declineDealRequested: ({ requesedtId, accessToken }) => api.put(`/api/user/items/requests/${requesedtId}/decline`, { headers: { Authorization: `Bearer ${accessToken}` } }),
};

export const itemApi = {
  getCategories: (accessToken:string) :Promise<AxiosResponse<any>> => api.get('/api/items/categories', { headers: { Authorization: `Bearer ${accessToken}` } }),
  getPaymentOptions: (accessToken:string):Promise<AxiosResponse<any>> => api.get('/api/items/payments/options', { headers: { Authorization: `Bearer ${accessToken}` } }),
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
    // return api.post('/api/user/items', formData, {
    //   ,
    // });
  },
  getMyItem: async ():Promise<AxiosResponse<any>> => api.get('/api/user/items?option=owner'),
  geyItemInfo: (accessToken:string, idx:number):Promise<AxiosResponse<any>> => api.get(`/api/items/${idx}`, { headers: { Authorization: `Bearer ${accessToken}` } }),
};

export const socketApi = {
  connectSocket: async ():Promise<AxiosResponse<any>> => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    return api.get(`/socket?jwt=${accessToken}`);
  },
};
