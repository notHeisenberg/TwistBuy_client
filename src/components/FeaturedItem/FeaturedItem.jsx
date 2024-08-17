import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axiosPublic from '../../Utilities/useAxiosPublic';

const FeaturedItem = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // Fetch a fixed set of featured products
                const response = await axiosPublic.get('/featured');
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="featured-item-container mt-5">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                spaceBetween={30}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="mySwiper container mx-auto"
            >
                {products.map(item => (
                    <SwiperSlide
                        key={item._id}
                        className='hover:shadow-xl hover:shadow-blue-300 relative'
                    >
                        <div className="featured-item bg-white shadow-md rounded-lg overflow-hidden w-full h-96 mx-auto relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                <p className="text-gray-200">{item.description}</p>
                                <p className="text-green-400 font-bold">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedItem;
