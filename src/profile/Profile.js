import React from 'react';
import { Outlet } from "react-router-dom";
import { SideBar } from '@/_components';

function Profile() {
    return (
        <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col p-4">
                    <Outlet />
                </div>
            </div>
        </div>
        </>
    )
}

export { Profile };