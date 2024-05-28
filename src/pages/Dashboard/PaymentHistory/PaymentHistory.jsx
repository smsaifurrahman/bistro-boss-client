/** @format */

import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure, { axiosSecure } from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
   const { user } = UseAuth();
   const axiosSecure = useAxiosSecure();
   console.log(user.email);
   const { data: payments=[] } = useQuery({
      queryKey: ["payments", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/payments/${user?.email}`);
         return res.data;
      },
   });
   return (
      <div>
         <h2 className="text-3xl"> Total Payments: {payments.length} </h2>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Price</th>
                     <th>  Transaction Id </th>
                     <th>status</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {
                    payments.map((payment,index) => <tr key={payment._id} >
                        <th> {index +1} </th>
                        <td> ${payment.price} </td>
                        <td> {payment.transactionId} </td>
                        <td> {payment.status} </td>
                     </tr>)
                  }
                
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default PaymentHistory;
