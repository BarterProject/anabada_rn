import { BASE_URL } from '@env';

export async function postLogin({ email, password }) {
  const url = `${BASE_URL}/user/authentication`;

  const data = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.json()))
    .catch(() => ({ jwt: 'err' }));
    
  const {accessToken} = data

  return accessToken;
}

//   export async function postSignup({ email, username, password }) {
export async function postSignup(userInfo) {
  const url = `${BASE_URL}/api/member`;
  
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
  }).then((res) => (res.json())).catch(() => ({ jwt: 'err' }));

  const {accessToken} = data

  return accessToken;
}
