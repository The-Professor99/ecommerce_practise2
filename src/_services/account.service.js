import { BehaviorSubject } from 'rxjs';

import config from 'config';

import { fetchWrapper } from '@/_helpers';
const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/accounts`;

export const accountService = {
    register,
    verifyEmail,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
};

function register(params) {
    return fetchWrapper.post(`${baseUrl}/register`, params);
}

function verifyEmail(token) {
    return fetchWrapper.post(`${baseUrl}/verify-email`, { token });
}
