import { Link, Outlet } from "react-router-dom";

function Account() {
    return (
        <>
        <p>Account Page</p>
        <Outlet />
        </>
    )
}

export { Account };