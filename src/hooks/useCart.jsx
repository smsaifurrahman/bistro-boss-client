import { useQuery } from "@tanstack/react-query";
import useAxiosSecure, { axiosSecure } from "./useAxiosSecure";
import UseAuth from "./UseAuth";



const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = UseAuth()
   const {data: cart=[], refetch } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async ()=> {
        const res = await axiosSecure.get(`/carts?email=${user.email}`);
        return res.data;
    }
   })
   return [cart,refetch]
};

export default useCart;