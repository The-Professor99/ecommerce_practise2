import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Men, Women, About, Contact, NotFound, Collections, Item } from '@/pages';
import { Login, Register, Account, ForgotPassword, VerifyEmail  } from '@/account';
import { Profile, UserDetails } from '@/profile';

import { configureFakeBackend, useStateValue } from '@/_helpers';
import { accountService } from './_services';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

configureFakeBackend();

// attempt silent token refresh before startup
accountService.refreshToken().finally(startApp);

function startApp() {
  // const [{ user } , dispatch] = useStateValue(); 
  // const userDetail = accountService.userValue;
  // console.log(userDetail, user, "1");
  // dispatch({
  //   type: 'SET_USER',
  //   user: userDetail
  // });
  // console.log(userDetail, user, "2");
  ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<Collections />} />
          <Route path='men' element={<Men />} />
          <Route path='women' element={<Women />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='test' element={<Register />} />
          <Route path='items/:itemId' element={<Item />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<Account />} >
            <Route path='/account/login' element={<Login />} />
            <Route path='/account/register' element={<Register />} />
            <Route path='/account/forgot-password' element={<ForgotPassword />} />
            <Route path='/account/verify-email' element={<VerifyEmail />} />
          </Route>
          <Route path='/profile' element={<Profile />} >
            <Route index element={<UserDetails />} />
          </Route>
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
