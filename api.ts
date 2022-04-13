// eslint-disable-next-line import/no-unresolved
import { BASE_URL } from '@env';
import axios, { AxiosResponse } from 'axios';

import { itemType, imageType } from './types';
// const {
//   accessToken,
// } = useSelector(
//   (state:initialStateProps) => ({
//     accessToken: state.userState.accessToken,
//   }),
// );
const api = axios.create({
  baseURL: BASE_URL as string,
  // headers: { Authorization: `Bearer ${accessToken}` },
});

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
      console.log({});
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

// `${BASE_URL}/api/user/authentication`

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
