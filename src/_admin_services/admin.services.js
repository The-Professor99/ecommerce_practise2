import { BehaviorSubject } from 'rxjs';
import { Buffer } from 'buffer';

import config from 'config';

import { fetchWrapper, useStateValue } from '@/_helpers';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.apiUrl}/admin`;

const userKey = 'user-account-test-ecommerce';

export const adminService = {
    getUsers,
}

// function login(email, password) {
//     return fetchWrapper.post(`${baseUrl}/login`, { email, password })
//         .then(user => {
//             // publish user to subscribers and start timer to refresh token
//             userSubject.next(user);
//             startRefreshTokenTimer();
//             localStorage.setItem(userKey, JSON.stringify(user) || null);
//             return user;
//         });
// }

function getUsers() {
    return fetchWrapper.get(baseUrl);
}


