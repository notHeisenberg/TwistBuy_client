import { StickyNavbar } from "../Shared/StickyNavbar/StickyNavbar";
import Footer from '../Shared/Footer/Footer';
import ContentArea from "../../components/ContentArea/ContentArea";
import FeaturedItem from "../../components/FeaturedItem/FeaturedItem";


const Home = () => {
    return (
        <>
            <StickyNavbar></StickyNavbar>
            {/* Todo FeaturedItem */}
            <FeaturedItem></FeaturedItem> 
            <ContentArea></ContentArea>
            <Footer></Footer>
        </>

    );
};

export default Home;