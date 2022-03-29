import { BehaviorSubject } from 'rxjs';
import { Buffer } from 'buffer';

import config from 'config';

import { fetchWrapper } from '@/_helpers';
const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;

const userKey = 'user-account-test-ecommerce';
let userDetails = JSON.parse(localStorage.getItem(userKey)) || [];

export const accountService = {
    register,
    verifyEmail,
    login,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}

function login(email, password) {
    return fetchWrapper.post(`${baseUrl}/login`, { email, password })
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            delete user.jwtToken
            localStorage.setItem(userKey, JSON.stringify(user) || null);
            return user;
        });
}


// helper functions

let refreshTokenTimeout;

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then(user => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function startRefreshTokenTimer() {
    const jwtToken = JSON.parse(userSubject.value.jwtToken)

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}


