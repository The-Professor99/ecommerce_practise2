import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';


import { useStateValue, Role  } from '@/_helpers';
import { accountService } from '@/_services';

import { Cart } from './Cart';

import './Navbar.css'
import menuIcon from '../images/icon-menu.svg';
import menuIconLight from '../images/icon-menu-light.svg';
import closeIcon from '../images/icon-close.svg';
import closeIconLight from '../images/icon-close-light.svg';
import logo from '../images/logo.svg';
import logoLight from '../images/logo-light.svg';
import cartIcon from '../images/icon-cart-dark.svg';
import cartIconLight from '../images/icon-cart.svg';
import avatar from '../images/image-avatar.png';

function NavLinks() {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="nav-link" to="/">Collections</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/men">Men</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/women">Women</NavLink>
            </li>  
            <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
            </li> 
            <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>    
        </ul>
    )
}


function Navbar(props) {
  const [{cart, user}, dispatch] = useStateValue();

  const navigate = useNavigate();

//   const userDetail = accountService.userValue;
//   console.log(userDetail, user, "1");

  function handleAuthentication() {
    accountService.logout();
    navigate('/account/login');
  }

  useEffect(() => {
    const subscription = accountService.user.subscribe(userDetail => {
        {
        dispatch({
            type: 'SET_USER',
            user: userDetail
        });
        }});
    return subscription.unsubscribe;
  }, []);

  return (
    <header className='Navbar'>
        <div 
        className="collapse navbar-collapse rounded phone" 
        id="collapsibleNavbar">
            <button 
            className="navbar-toggler navbar-toggler-left collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon-svg">
                    <img src={props.darkTheme ? menuIconLight : menuIcon} alt="Show Menu" />
                </span>
                <span className="close">
                    <img src={props.darkTheme ? closeIconLight : closeIcon} alt="Close Menu" />
                </span>
            </button>
            <NavLinks />
            <div className='theme-toggle-container me-2 mt-4'>
                <button 
                className='btn btn-primary' onClick={() => {props.switchTheme()}}>
                {!props.darkTheme ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                )}
                </button>
            </div>
        </div> 
        <div className="container main-container1">
            <nav className="navbar navbar-expand-lg navbar-light mt-3">
                <button 
                className="navbar-toggler navbar-toggler-left collapsed laptop-button" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon-svg">
                        <img src={props.darkTheme ? menuIconLight : menuIcon} alt="show menu" />
                    </span>
                </button>
                <Link 
                className="navbar-brand" 
                to="/">
                    <img src={props.darkTheme ? logoLight : logo} alt="Logo" />
                </Link>
                <div 
                className="collapse navbar-collapse rounded text-center laptop" 
                id="collapsibleNavbar">
                    <NavLinks />
                </div> 
                <ul className="navbar-nav ml-auto">
                    <div className='theme-toggle-container laptop me-2'>
                        <button 
                        className='btn btn-primary'
                        onClick={() => {props.switchTheme()}} >
                        {!props.darkTheme ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        )}
                        </button>
                    </div>
                    <div className='dropdown'>
                        <button
                        className="dropdown" 
                        type='button'
                        id='dropdownCartButton'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                            <li className="nav-item">
                                <img 
                                src={props.darkTheme ? cartIconLight : cartIcon} 
                                className="pointer" 
                                alt="Cart" />
                                <span 
                                className="cart-orders txt-white pointer" 
                                id="numOrders">
                                    {cart?.length}
                                </span>
                            </li>
                        </button>
                        <div 
                        className='dropdown-menu dropdowns dropdown2'
                        aria-labelledby='dropdownCartButton'
                        onClick={(event) => event.stopPropagation()}>
                            <Cart />
                        </div>
                    </div>
                    <div className='dropdown' >
                        <button 
                        className="dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                            <li className="nav-item">
                                <img 
                                src={avatar} 
                                alt="User Avatar" 
                                className="account-avatar  pointer" />
                            </li>
                        </button>
                        { !user ? (
                        <div 
                        className="dropdown-menu dropdowns dropdown1" 
                        aria-labelledby="dropdownMenuButton">
                            <Link 
                            className="dropdown-item" 
                            to='account/login'>
                                Login
                            </Link>
                            <Link 
                            className="dropdown-item" 
                            to='account/register'>
                                Create An Account
                            </Link>
                        </div>
                        ) : (
                        <div 
                        className="dropdown-menu dropdowns dropdown1" 
                        aria-labelledby="dropdownMenuButton">
                            <Link className='dropdown-item' to='/profile/'>
                                Visit Profile
                            </Link>
                            {user.role === Role.Admin &&
                            <Link to="/admin" className="dropdown-item">Admin</Link>
                            }
                            <li
                            className="dropdown-item" 
                            onClick={handleAuthentication}>
                                Logout
                            </li>
                        </div>
                        )}                  
                    </div>
                </ul>

            </nav>
            <div className="dropdown-divider"></div>
        </div>
    </header>
  )
}

export { Navbar }