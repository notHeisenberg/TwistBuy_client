
import { Outlet, useLocation } from "react-router-dom"

const Root = () => {
    const location = useLocation()
    if (location.pathname !== '/') {
        document.title = `Twist Buy - ${location.pathname.replace('/', '')}`
    } else {
        document.title = `Twist Buy`
    }

    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default Root;