// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

import {
  itemType, imageType,
} from './types';

const api = axios.create({
  baseURL: BASE_URL as string,

});

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
  saveItem: (accessToken:string, item: itemType, images:imageType[]):
  Promise<AxiosResponse<any>> => {
    const formData = new FormData();
    // const jsonItemBlob = new Blob([JSON.stringify({ ...item, type: 'application/json' })]);
    console.log(item);

    images.forEach((image) => {
      console.log(image);
      const ext = image.sourceURL.split('.').pop();
      const filename = image.sourceURL.split('/').pop();
      // const imageContents = {
      //   uri: image.sourceURL,
      //   name: filename,
      // };

      console.log(ext, filename);
      formData.append('img', new Blob([image.sourceURL], { type: 'image/png' }));
    });
    formData.append('item', JSON.stringify({ ...item, type: 'application/json' }));

    return api.post('/api/user/items', formData, {
      headers: {
        Authorization: `Bearer ${accessToken},`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=--------287032381131322',
      },
    });
  },
};
