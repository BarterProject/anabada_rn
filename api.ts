import { BASE_URL } from '@env';

import axios from 'axios';
import { testItem, Item } from './types';

export async function postLogin({ id, password }) {
  // const url = 'http://146.56.36.179:8080/api/user/authentication';
  console.log(BASE_URL);
  const url = `${BASE_URL}/api/user/authentication`;
  console.log('postLogin진입');
  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: id, password }),
  }).then((res) => (res.json()))
    .catch((err) => {
      console.log(err.response);
      return { jwt: 'err' };
    });
  return data;
}

//   export async function postSignup({ email, username, password }) {
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
  // const { jwt } = data;
  // console.log(`postSignup 아웃풋 : ${jwt}`);

  return data;
}

export async function getRandomItems({ accessToken, number }) {
  console.log('getRandomItems');
  const response = await axios.get(
    `${BASE_URL}/api/items?size=${number}`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  const { data } = response;
  // console.log('getRandomItems', data);
  return data;
}

export async function getTESTItems() {
  // const response = await axios.get('http://10.0.2.2:3000/item');
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
