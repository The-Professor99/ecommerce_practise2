import { Role } from './role';

// array in local storage for registered users
const usersKey = 'react-signup-verification-boilerplate-users';
// as this is a fake back end, the users registered will be stored in 
// localStorage as opposed to actual storage in host servers for 
// real back end systems and outside this user application.
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

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
                delete user.password;
                users.push(user);
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

    
            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function body() {
                return opts.body && JSON.parse(opts.body);    
            }

            function newUserId() {
                return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            }
        });
    }
}