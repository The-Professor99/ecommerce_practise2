import { Role } from './role';
import { Buffer } from 'buffer';

// array in local storage for registered users
const usersKey = 'users-test-ecommerce';
// as this is a fake back end, the users registered will be stored in 
// localStorage as opposed to actual storage in host servers for 
// real back end systems and outside this user application.
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
// the above acts as database of users.

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 5000);

            function handleRoute() {
                let { method } = opts;
                switch (true) {
                    case url.endsWith('/accounts/register') && method === 'POST':
                        return register();
                    case url.endsWith('/accounts/verify-email') && method === 'POST':
                        return verifyEmail();
                    case url.endsWith('/accounts/login') && method === 'POST':
                        return login();
                    case url.endsWith('/accounts/refresh-token') && method === 'POST':
                        return refreshToken();
                    case url.endsWith('/accounts/revoke-token') && method === 'POST':
                        return revokeToken();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            function register() {
                const user = body();
    
                if (users.find(x => x.email === user.email)) {
                    // display email already registered "email" in alert
                    console.log("user already registered")
                    setTimeout(() => {
                        console.log(`
                            <h4>Email Already Registered</h4>
                            <p>Your email ${user.email} is already registered.</p>
                            <p>If you don't know your password please visit the <a href="${location.origin}/account/forgot-password">forgot password</a> page.</p>
                        `);
                    }, 1000);

                    // always return ok() response to prevent email enumeration
                    return error('User Already Registered');
                }
    
                // assign user id and a few other properties then save
                user.id = newUserId();
                if (user.id === 1) {
                    // first registered user is an admin
                    // This is because we are using a fake backend system.
                    // For a real backend system, a registration page may be made 
                    // for admin registration.
                    user.role = Role.Admin;
                } else {
                    user.role = Role.User;
                }
                user.dateCreated = new Date().toISOString();
                user.verificationToken = new Date().getTime().toString();
                user.isVerified = false;
                user.refreshTokens = [];
                delete user.confirmPassword;
                users.push(user);
                // users details being saved to local storage
                // would be saved to real database in real system.
                localStorage.setItem(usersKey, JSON.stringify(users));

                // display verification email in alert
                setTimeout(() => {
                    const verifyUrl = `${location.origin}/account/verify-email?token=${user.verificationToken}`;
                    console.log(`
                        <h4>Verification Email</h4>
                        <p>Thanks for registering!</p>
                        <p>Please click the below link to verify your email address:</p>
                        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
                        <div><strong>NOTE:</strong> The fake backend displayed this "email" so you can test without an api. A real backend would send a real email.</div>
                    `);
                }, 1000);

                return ok();
            }


            function verifyEmail() {
                const { token } = body();
                const user = users.find(x => !!x.verificationToken && x.verificationToken === token);
                
                if (!user) return error('Verification failed');
                
                // set is verified flag to true if token is valid
                user.isVerified = true;
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function login() {
                const { email, password } = body();
                const user = users.find(x => x.email === email && x.password === password && x.isVerified);

                if (!user) return error('Email or password is incorrect');

                // add refresh token to user
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    email: user.email,
                    title: user.title,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    jwtToken: generateJwtToken(user)
                });
            }


            function refreshToken() {
                const refreshToken = getRefreshToken();
                
                if (!refreshToken) return unauthorized();

                console.log(users, refreshToken)
                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                
                if (!user) return unauthorized();

                // replace old refresh token with a new one and save
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                user.refreshTokens.push(generateRefreshToken());
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    email: user.email,
                    title: user.title,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    jwtToken: generateJwtToken(user)
                })
            }

            function revokeToken() {
                console.log("checking revoke token 1 ")
                if (!isAuthenticated()) return unauthorized();
                
                console.log("checking revoke 2")
                const refreshToken = getRefreshToken();
                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                
                // revoke token and save
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

    
            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function newUserId() {
                return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            }

            function generateRefreshToken() {
                const token = new Date().getTime().toString();

                // add token cookie that expires in 7 days
                const expires = new Date(Date.now() + 7*24*60*60*1000).toUTCString();
                document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

                return token;
            }


            function generateJwtToken(user) {
                // create token that expires in 15 minutes
                const tokenPayload = { 
                    exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000),
                    id: user.id
                }
                // let buf = Buffer(tokenPayload.toString())
                let tokenJsonStr = JSON.stringify(tokenPayload);
                let tokenJsonB64 = Buffer.from(tokenJsonStr).toString("base64");
                console.log("checking jwt: ", tokenJsonB64)
                return `fake-jwt-token.${tokenJsonB64}`;
            }

            function getRefreshToken() {
                // get refresh token from cookie
                return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
            }

            function isAuthenticated() {
                return !!currentUser();
            }

            function currentUser() {
                // check if jwt token is in auth header
                const authHeader = opts.headers['Authorization'] || '';
                if (!authHeader.startsWith('Bearer fake-jwt-token')) return;


                // check if token is expired
                const jwtToken = JSON.parse(Buffer.from(authHeader.split('.')[1], 'base64'));
                const tokenExpired = Date.now() > (jwtToken.exp * 1000);
                if (tokenExpired) return;
                const user = users.find(x => x.id === jwtToken.id);
                return user;
            }
        });
    }
}