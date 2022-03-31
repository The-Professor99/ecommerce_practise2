import React from 'react';
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { SideBar, Alert } from '@/_components';
import { useStateValue } from '@/_helpers';

function Profile() {
    const [{ user}] = useStateValue();
    const location = useLocation();

    return (
        user ? (
        <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col p-4">
                    <Alert />
                    <Outlet />
                </div>
            </div>
        </div>
        </>
        ) : (
            <Navigate to="/account/login" replace state={{ from: location }} />
        )
    )
}

export { Profile };