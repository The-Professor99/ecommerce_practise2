import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Men, Women, About, Contact, NotFound, Collections, Item } from '@/pages';
import { Login, Register, Account, ForgotPassword, VerifyEmail, ResetPassword  } from '@/account';
import { Profile, UserDetails, UserOrders, UserAddress, Settings } from '@/profile';

import { configureFakeBackend, useStateValue } from '@/_helpers';
import { accountService } from './_services';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

configureFakeBackend();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<Collections />} />
          <Route path='men' element={<Men />} />
          <Route path='women' element={<Women />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='test' element={<Settings />} />
          <Route path='items/:itemId' element={<Item />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<Account />} >
            <Route path='/account/login' element={<Login />} />
            <Route path='/account/register' element={<Register />} />
            <Route path='/account/forgot-password' element={<ForgotPassword />} />
            <Route path='/account/verify-email' element={<VerifyEmail />} />
            <Route path='/account/reset-password' element={<ResetPassword />} />
          </Route>
          <Route path='/profile/' element={<Profile />} >
            
            {/* <Route path="/profile/" element={<Navigate replace to="/profile/orders" />} /> */}
            {/* <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> */}
            <Route index element={<UserDetails />} />
            <Route path='orders' element={<UserOrders />} />
            <Route path='shipping-info' element={<UserAddress />} />
            <Route path='settings' element={<Settings />} />
          </Route>
          {/* <Route path="/profile" element={<Navigate replace to="/profile/" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
