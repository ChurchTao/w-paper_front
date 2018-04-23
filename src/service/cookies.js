import Cookies from 'js-cookie';

const TokenKey = 'user-location-Token';
const briefToken = 'location-briefToken';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  var cookie;
  cookie = Cookies.set(TokenKey, token);
  return cookie;
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setBriefToken(token) {
  return Cookies.set(briefToken, token)
}

export function getBriefToken() {
  return Cookies.get(briefToken)
}
