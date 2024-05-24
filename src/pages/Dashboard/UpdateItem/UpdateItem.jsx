import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userAxiosPublic from "../../../hooks/userAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {
    const {name,category, recipe, price, _id} = useLoaderData();
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
        const menuRes = await axiosSecure.patch(`/menu/${_id}`,menuItem);
        if(menuRes.data.modifiedCount>0){
         
          
           Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is Updated`,
              showConfirmButton: false,
              timer: 1500
            });
        }
        console.log(menuRes.data);
  
       }
        
     };

    return (
        <div>
            <SectionTitle heading={'Update Item'} subHeading={"Update your food item"}></SectionTitle>
            
            <div className="border-2 p-4 rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)}>
               <label className="form-control w-full my-2 ">
                  <div className="label">
                     <span className="label-text font-bold"> Recipe Name* </span>
                  </div>
                  <input
                  defaultValue={name}
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
                     defaultValue={category}
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
                        defaultValue={price}
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
                  <textarea defaultValue={recipe} {...register('recipe', { required: true })}
                     className="textarea textarea-bordered h-24"
                     placeholder="Bio"
                  ></textarea>
               </label>
               <div className="form-control w-full my-2" >
                  <input {...register('image' , { required: true })} type="file" className="file-input w-full max-w-xs" />
               </div>

               <button className="btn"> update menu Item </button>
            </form>
         </div>
        </div>
    );
};

export default UpdateItem;