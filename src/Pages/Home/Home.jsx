import { StickyNavbar } from "../Shared/StickyNavbar/StickyNavbar";
import Footer from '../Shared/Footer/Footer';
import ContentArea from "../../components/ContentArea/ContentArea";


const Home = () => {
    return (
        <>
            <StickyNavbar></StickyNavbar>
            <ContentArea></ContentArea>
            <Footer></Footer>
        </>

    );
};

export default Home;