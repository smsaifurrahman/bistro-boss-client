/** @format */

import { useForm } from "react-hook-form";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import userAxiosPublic from "../../../../hooks/userAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
   const axiosPublic = userAxiosPublic();
   const axiosSecure = useAxiosSecure();
   const { register, handleSubmit, reset } = useForm();
   const onSubmit = async (data) => {
      const imageFile = {image: data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile, {
         headers: {
            'content-Type': 'multipart/form-data'
         }
      });
     if(res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
         name: data.name,
         category: data.category,
         price: parseFloat(data.price),
         recipe: data.recipe,
         image: res.data.data.display_url

      }
      // 
      const menuRes = await axiosSecure.post('/menu',menuItem);
      if(menuRes.data.insertedId){
         reset();
        
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is added`,
            showConfirmButton: false,
            timer: 1500
          });
      }
      console.log(menuRes.data);

     }
      
   };
   return (
      <div>
         <SectionTitle
            heading={"Add an Item"}
            subHeading={"What's New"}
         ></SectionTitle>
         <div className="border-2 p-4 rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
               <label className="form-control w-full my-2 ">
                  <div className="label">
                     <span className="label-text font-bold"> Recipe Name* </span>
                  </div>
                  <input
                     {...register("name", { required: true })}
                     type="text"
                     placeholder="Recipe Name"
                     className="input input-bordered w-full "
                  />
               </label>
               <div className="flex gap-6">
                  {/* Category */}
                  <label className="form-control w-full my-2 ">
                     <div className="label">
                        <span className="label-text font-bold"> Category* </span>
                     </div>
                     <select
                     defaultValue="default"
                        {...register("category",{ required: true })}
                        className="select select-bordered w-full "
                     >
                        <option disabled value={'default'}>
                           Select a Category
                        </option>
                        <option value="salad">Salad</option>
                        <option value="pizza">Pizza</option>
                        <option value="soup">Soup</option>
                        <option value="desert">Desert</option>
                        <option value="drinks">Drinks</option>
                     </select>
                  </label>

                  {/* Price */}

                  <label className="form-control w-full my-2 ">
                     <div className="label">
                        <span className="label-text font-bold"> Price* </span>
                     </div>
                     <input
                        {...register("price", { required: true })}
                        type="number"
                        placeholder="Price"
                        className="input input-bordered w-full "
                     />
                  </label>
               </div>
               {/* recipe details */}
               <label className="form-control">
                  <div className="label">
                     <span className="label-text font-bold">
                        Recipe Details
                     </span>
                  </div>
                  <textarea {...register('recipe', { required: true })}
                     className="textarea textarea-bordered h-24"
                     placeholder="Bio"
                  ></textarea>
               </label>
               <div className="form-control w-full my-2" >
                  <input {...register('image' , { required: true })} type="file" className="file-input w-full max-w-xs" />
               </div>

               <button className="btn"> Add Item <FaUtensils className="ml-4"></FaUtensils> </button>
            </form>
         </div>
      </div>
   );
};

export default AddItems;
