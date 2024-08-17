import axios from "axios";

const axiosPublic = axios.create({
    baseURL:
        "http://localhost:3000"
        // "https://twist-buy-server.vercel.app"
})

export default axiosPublic;