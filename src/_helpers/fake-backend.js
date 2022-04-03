import { Role } from './role';
import { Buffer } from 'buffer';
import { alertService } from '../_services/alert.service';

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
            handleRoute();

            function handleRoute() {
                if (!opts) {
                    return realFetch(url)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                }
                let { method } = opts;
                switch (true) {
                    case url.endsWith('/accounts/register') && method === 'POST':
                        // wrap in timeout to simulate server api call
                        return setTimeout(register, 2500);
                    case url.endsWith('/accounts/verify-email') && method === 'POST':
                        return setTimeout(verifyEmail, 2500);
                    case url.endsWith('/accounts/login') && method === 'POST':
                        return setTimeout(login, 2500);
                    case url.endsWith('/accounts/refresh-token') && method === 'POST':
                        return setTimeout(refreshToken, 2500);
                    case url.endsWith('/accounts/revoke-token') && method === 'POST':
                        return setTimeout(revokeToken, 2500);
                    case url.endsWith('/accounts/forgot-password') && method === 'POST':
                        return setTimeout(forgotPassword, 2500);
                    case url.endsWith('/accounts/validate-reset-token') && method === 'POST':
                        return setTimeout(validateResetToken, 2500);
                    case url.endsWith('/accounts/reset-password') && method === 'POST':
                        return setTimeout(resetPassword, 2500);
                    case url.endsWith('/create-payment-intent') && method === 'POST':
                        return createPaymentIntent();
                    case url.endsWith('/update-orders') && method === 'POST':
                        return setTimeout(updateOrders, 3500);
                    case url.match(/\/accounts\/\d+$/) && method === 'DELETE':
                        return setTimeout(deleteUser, 2500);
                    case url.endsWith('/admin') && method === 'GET':
                        return getUsers();
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

                    return error(`
                    <h4>Email Already Registered</h4>
                    <p>Your email ${user.email} is already registered.</p>
                    <p>If you don't know your password please visit the <a href="${location.origin}/account/forgot-password">forgot password</a> page.</p>
                    `);
                }
    
                // assign user id and a few other properties then save
                user.id = newUserId();
                // let temporaryId = user.id + 1;
                // console.log(temporaryId)
                if (user.id === 2) {
                    // first registered user is an admin
                    // This is because we are using a fake backend system.
                    // For a real backend system, a registration page may be made 
                    // for admin registration.
                    // for now, the second person to register is given the admin 
                    // role. this decision was arrived based on consideration of 
                    // most normal users not registering more than one accounts
                    // except for devs who may go through the documentation and want
                    // to try it out.
                    user.role = Role.Admin;
                } else {
                    user.role = Role.User;
                }
                user.dateCreated = new Date().toISOString();
                user.verificationToken = new Date().getTime().toString();
                user.isVerified = false;
                user.refreshTokens = [];
                user.orders = [];
                delete user.confirmPassword;
                users.push(user);
                // users details being saved to local storage
                // would be saved to real database in real system.
                localStorage.setItem(usersKey, JSON.stringify(users));

                // display verification email in alert
                setTimeout(() => {
                    const verifyUrl = `${location.origin}/account/verify-email?token=${user.verificationToken}`;
                    alertService.info(`
                        <h4>Verification Email</h4>
                        <p>Thanks for registering!</p>
                        <p>Please click the below link to verify your email address:</p>
                        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
                        <div><strong>NOTE:</strong> This message is being displayed here as we are using a fake backend. A real backend would send an email.</div>
                    `, { autoClose: false });
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
                    orders: user.orders,
                    jwtToken: generateJwtToken(user)
                });
            }


            function refreshToken() {
                const refreshToken = getRefreshToken();
                
                if (!refreshToken) return unauthorized();

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
                    orders: user.orders,
                    jwtToken: generateJwtToken(user)
                })
            }

            function revokeToken() {
                if (!isAuthenticated()) return unauthorized();

                const refreshToken = getRefreshToken();
                const user = users.find(x => x.refreshTokens.includes(refreshToken));
                
                // revoke token and save
                user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();
    
                let user = users.find(x => x.id === idFromUrl());

                // users can delete own account and admins can delete any account
                if (user.id !== currentUser().id && !isAuthorized(Role.Admin)) {
                    return unauthorized();
                }

                // delete user then save
                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }

            function forgotPassword() {
                const { email } = body();
                const user = users.find(x => x.email === email);
                
                // always return ok() response to prevent email enumeration
                if (!user) return error("User Email Not Found");
                
                // create reset token that expires after 24 hours
                user.resetToken = new Date().getTime().toString();
                user.resetTokenExpires = new Date(Date.now() + 24*60*60*1000).toISOString();
                localStorage.setItem(usersKey, JSON.stringify(users));

                // display password reset email in alert
                setTimeout(() => {
                    const resetUrl = `${location.origin}/account/reset-password?token=${user.resetToken}`;
                    alertService.info(`
                        <h4>Reset Password Email</h4>
                        <p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                        <p><a href="${resetUrl}">${resetUrl}</a></p>
                        <div><strong>NOTE:</strong> This message is being displayed here as we are using a fake backend. A real backend would send an email.</div>
                    `, { autoClose: false });
                }, 1000);

                return ok();
            }

            function validateResetToken() {
                const { token } = body();
                const user = users.find(x =>
                    !!x.resetToken && x.resetToken === token &&
                    new Date() < new Date(x.resetTokenExpires)
                );
                
                if (!user) return error('Invalid token');
                
                return ok();
            }

            function resetPassword() {
                const { token, password } = body();
                const user = users.find(x =>
                    !!x.resetToken && x.resetToken === token &&
                    new Date() < new Date(x.resetTokenExpires)
                );
                
                if (!user) return error('Invalid token');
                
                // update password and remove reset token
                user.password = password;
                user.isVerified = true;
                delete user.resetToken;
                delete user.resetTokenExpires;
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }

            function createPaymentIntent() {
                // 'create payment intent' code using real backend would come here!
                // for now, there's no real backend so the functionality may not work
                // atleast to the best of my knowledge. hoping to learn nextjs to help 
                // out with this.
                return ok({
                    clientSecret: 'sk-fake-client-secret-returned'
                })
            }

            function updateOrders() {
                const ordersBody = body();

                let accountUser = ordersBody['user']
                let cart = ordersBody['cart']

                const user = users.find(x => x.email === accountUser.email);

                if (!user) return error('Your Email is not registered!');
                
                // update orders
                let i;
                for (i=0; i < cart.length; i++) {
                    cart[i]['dateCreated'] = new Date().toISOString();
                }
                user.orders = [...user.orders, ...cart];
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok({
                    id: user.id,
                    email: user.email,
                    title: user.title,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    orders: user.orders,
                    jwtToken: generateJwtToken(user)
                })
            }

            function getUsers() {
                if (!isAuthorized(Role.Admin)) return unauthorized();

                return ok(users);
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

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }

            function isAuthorized(role) {
                const user = currentUser();
                if (!user) return false;
                return user.role === role;
            }
        });
    }
}