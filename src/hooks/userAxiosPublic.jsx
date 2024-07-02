
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-kappa-orcin.vercel.app'
})


const userAxiosPublic = () => {
   return axiosPublic;
};

export default userAxiosPublic;