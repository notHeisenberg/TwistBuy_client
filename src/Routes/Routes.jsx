import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import PrivateRoute from "./PrivateRoute";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/Error/ErrorPage";
import Dashboard from "../components/Dashboard/Dashboard";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "sign-up",
                element: <SignUp></SignUp>
            },
            {
                path: "dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    // normal user routes
                    {
                        path: 'profile',
                        element: <></>
                    },
                    {
                        path: 'add-product',
                        element: <></>
                    },
                    {
                        path: 'cart',
                        element: <></>
                    },
                ]
            },
        ]



    },
]);

export default router;