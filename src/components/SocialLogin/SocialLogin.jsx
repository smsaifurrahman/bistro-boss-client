/** @format */

import { FaGoogle } from "react-icons/fa";
import UseAuth from "../../hooks/UseAuth";
import { useNavigate } from "react-router-dom";
import userAxiosPublic from "../../hooks/userAxiosPublic";

const SocialLogin = () => {
    const axiosPublic = userAxiosPublic();
    const navigate = useNavigate();
   const { googleSignIn } = UseAuth();
   const handleGoogleSignIn = () => {
    console.log('in here');
    googleSignIn()
    .then(result => {
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
            console.log(res.data);
            navigate('/');
        })

    })
    .catch(error => {
        console.log(error);
    })
    
   }
   return (
      <div className="px-8 pb-2 text-center">
         <div className="divider"></div>
         <div>
            <button onClick={handleGoogleSignIn} className="btn w-full bg-transparent text-green-600 font-bold">
               <FaGoogle className="mr-4"></FaGoogle>
               Google
            </button>
         </div>
      </div>
   );
};

export default SocialLogin;
