import { Outlet, Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

import { Navbar, Footer, SideBar } from '@/_components';
import { reducer, StateProvider, initialState, useStateValue } from '@/_helpers';

function Profile() {
    const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [darkTheme, setTheme] = useLocalStorage('darkTheme', defaultDark ? true : false);
     
  
    const switchTheme = () => {
      setTheme(!darkTheme)
    };
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView() 

    useEffect(() => {
        executeScroll();
      });

    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <div className="Profile" data-theme={darkTheme} ref={myRef} >
                <Navbar 
                darkTheme={darkTheme}
                switchTheme={() => switchTheme(darkTheme)} />
                <main>
                    <SideBar />
                    <Outlet />
                </main>
                <button onClick={executeScroll} className='mt-2 btn btn-primary scrollbtn center'> Back to top </button> 
                <Footer />
            </div>
        </StateProvider>
    )
}

export { Profile };