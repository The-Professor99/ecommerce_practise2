import config from 'config';

import { accountService } from '@/_services';

export const fetchWrapper = {
    get, 
    post,
    put,
    delete: _delete
}

async function get(url) {
    const requestOptions = {
        method: 'GET',
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}


async function post(url, body) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(url) 
        },
        credentials: 'include',
        body: JSON.stringify(body)
    };

    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}



async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// prefixed with underscore because delete is a reserved word
async function _delete(url) {
    const requestOptions= {
        method: 'DELETE',
        headers: authHeader(url)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}
// helper functions
function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = accountService.userValue;
    console.log("checking authHeader : ", user)
    const isLoggedIn = user && user.jwtToken;
    const isApiUrl = url.startsWith(config.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.jwtToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}