import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Men, Women, About, Contact, NotFound, Collections, Item } from '@/pages';
import { Login, Register, Account } from '@/account';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<Collections />} />
        <Route path='men' element={<Men />} />
        <Route path='women' element={<Women />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='test' element={<Item />} />
        <Route path='items/:itemId' element={<Item />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<Account />} >
          <Route path='/account/login' element={<Login />} />
          <Route path='/account/register' element={<Register />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
