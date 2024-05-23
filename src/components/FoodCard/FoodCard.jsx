/** @format */

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
   const { name, image, price, recipe, _id } = item;
   const { user } = UseAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const axiosSecure = useAxiosSecure();
   const [,refetch] = useCart();


   const handleAddToCart = async () => {
      if (user && user.email) {
         const cartItem = {
            menuId: _id,
            email: user.email,
            name,
            image,
            price,
         };
         try {
            const { data } = await axiosSecure.post(
               "/carts",
               cartItem
            );
          
            if (data.insertedId) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title:`${name} added to Your Cart`,
                  showConfirmButton: false,
                  timer: 1500,
               });
               //refetch the cart to update the cart items count
               refetch();
            }
         } catch (error) {
            console.log(error);
         }
      } else {
         Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Login",
         }).then((result) => {
            if (result.isConfirmed) {
               //send the user to the login page
               navigate("/login", { state: { from: location } });
            }
         });
      }
   };
   return (
      <div className="card w-96 bg-base-100 shadow-xl">
         <figure>
            <img src={image} alt="Shoes" />
         </figure>
         <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
            ${price}
         </p>
         <div className="card-body flex flex-col items-center">
            <h2 className="card-title">{name}</h2>
            <p>{recipe}</p>
            <div className="card-actions justify-end">
               <button
                  onClick={ handleAddToCart}
                  className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
               >
                  Add to Cart
               </button>
            </div>
         </div>
      </div>
   );
};

export default FoodCard;
