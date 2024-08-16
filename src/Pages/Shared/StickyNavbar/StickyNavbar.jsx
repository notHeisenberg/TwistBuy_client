import { useContext } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import FancyText from '@carefully-coded/react-text-gradient';
import { AuthContext } from "../../../components/Provider/AuthProvider";

export function StickyNavbar() {

    const { user, logout } = useContext(AuthContext);

    const Active = "font-serif btn border-2 border-orange-300 text-orange-400 bg-orange-50 hover:bg-orange-100 font-semibold rounded-xl p-2 text-xl text-light-blue-500";
    const notActive = "flex items-center hover:text-blue-500 transition-colors text-md";



    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
            <NavLink className={({ isActive }) => isActive ? Active : notActive} to={"/"} >
                <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z" fill="#90A4AE" />
                    </svg>
                    Home
                </Typography>
            </NavLink>
        </ul>
    );

    const userList = (
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-4 shadow">
            <li >
                <Link to={'/dashboard/profile'} className="flex justify-between">
                    Profile
                    <span className="badge badge-sm badge-info text-wrap">{user?.displayName}</span>
                </Link>
            </li>
            <li>
                <Link to={'/dashboard/cart'}>Cart</Link>
            </li>
            <li><Button onClick={() => logout()}>Logout</Button></li>
        </ul>
    );

    return (
        <div className="navbar bg-slate-200 p-2 border-b-indigo-200 border drop-shadow-md">
            <div className="navbar-start">
                <FancyText
                    gradient={{ from: '#4A00FF', to: '#10D7D5' }}
                    className="mr-4 cursor-pointer py-1.5 font-serif font-semibold text-3xl"
                    hovertype="lift"
                >
                    TwistBuy
                </FancyText>
            </div>
            <div className="navbar-center">
                {navList}
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        {userList}
                    </div>
                ) : (
                    <div className="flex gap-2 justify-between">
                        <Link to={'/login'}>
                            <Button variant="outlined" size="sm" className="btn btn-outline">
                                Login
                            </Button>
                        </Link>
                        <Link to={'/sign-up'}>
                            <Button variant="gradient" size="sm" className="btn btn-info">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>

    );
}
