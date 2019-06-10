export const authHeader = () => {
  // return authorization header with jwt token
  let auth = JSON.parse(localStorage.getItem('auth'));

  if (auth) {
    return { Authorization: 'Bearer ' + auth.token };
  } else {
    return { Authorization: 'unauthorize me' };
  }
};
