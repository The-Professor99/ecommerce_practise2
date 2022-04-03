import { BehaviorSubject } from "rxjs";
import { Buffer } from "buffer";

import config from "config";

import { fetchWrapper, useStateValue } from "@/_helpers";

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;

const userKey = "user-account-test-ecommerce";

export const accountService = {
  register,
  verifyEmail,
  login,
  refreshToken,
  logout,
  delete: _delete,
  forgotPassword,
  validateResetToken,
  resetPassword,
  createPaymentIntent,
  updateOrders,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function register(params) {
  return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
  return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function login(email, password) {
  return fetchWrapper
    .post(`${baseUrl}/login`, { email, password })
    .then((user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      localStorage.setItem(userKey, JSON.stringify(user) || null);
      return user;
    });
}

function logout() {
  // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
  fetchWrapper.post(`${baseUrl}/revoke-token`, {});
  stopRefreshTokenTimer();
  localStorage.removeItem(userKey);
  userSubject.next(null);
  return;
}

function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}

function forgotPassword(email) {
  return fetchWrapper.post(`${baseUrl}/forgot-password`, { email });
}

function validateResetToken(token) {
  return fetchWrapper.post(`${baseUrl}/validate-reset-token`, { token });
}

function resetPassword({ token, password, confirmPassword }) {
  return fetchWrapper.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
}

function createPaymentIntent(params) {
  return fetchWrapper.post(`${baseUrl}/create-payment-intent`, params);
}

function updateOrders({ cart, user }) {
  return fetchWrapper
    .post(`${baseUrl}/update-orders`, { cart, user })
    .then((user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      localStorage.setItem(userKey, JSON.stringify(user) || null);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

// helper functions

let refreshTokenTimeout;

function refreshToken() {
  return fetchWrapper
    .post(`${baseUrl}/refresh-token`, {})
    .then((user) => {
      // publish user to subscribers and start timer to refresh token
      userSubject.next(user);
      startRefreshTokenTimer();
      localStorage.setItem(userKey, JSON.stringify(user) || null);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
}

function startRefreshTokenTimer() {
  const jwtToken = JSON.parse(
    Buffer.from(userSubject.value.jwtToken.split(".")[1], "base64")
  );

  // set a timeout to refresh the token a minute before it expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
  clearTimeout(refreshTokenTimeout);
}
