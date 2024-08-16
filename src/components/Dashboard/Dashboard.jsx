
import { useContext, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const active = "bg-blue-400 text-yellow-300 font-xl border border-blue-400";
    const inactive = "text-blue-400 hover:bg-blue-400 hover:text-yellow-300";

    const { user, logout } = useContext(AuthContext);

    const dashboardItems = <>
        {user &&
            <ul className="menu bg-inherit min-h-full w-80 h-screen p-4">
                <li>
                    <NavLink to={`/dashboard/profile`} className={({ isActive }) => isActive ? active : inactive}>
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/dashboard/add-product`} className={({ isActive }) => isActive ? active : inactive}>
                        Add Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/dashboard/cart`} className={({ isActive }) => isActive ? active : inactive}>
                        My Cart
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/`} className="text-green-500 font-bold hover:bg-green-400 hover:text-yellow-300">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/`} onClick={() => logout()} className="text-red-400 font-bold hover:bg-red-400 hover:text-yellow-300">
                        Logout
                    </NavLink>
                </li>
            </ul>
        }
    </>

    return (
        <div className="relative drawer flex h-screen ">
            {/* Hamburger menu for small devices */}
            <div className={`md:hidden p-2 bg-blue-gray-700 ${!isOpen && 'bg-inherit'}`}>
                <button htmlFor="my-drawer-3" className="btn btn-square btn-ghost top-0" onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16"></path>
                    </svg>
                </button>
            </div>
            {/* Adjusted className to ensure drawer content is visible on large screens */}
            <div className={`drawer-content bg-slate-600 flex flex-col  ${isOpen ? 'block z-10' : 'hidden'} md:block lg:block`}>
                {dashboardItems}
            </div>
            <div className="p-4 flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
