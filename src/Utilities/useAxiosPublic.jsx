import axios from "axios";

const axiosPublic = axios.create({
    baseURL:

        "https://twist-buy-server.vercel.app"
})

export default axiosPublic;