/** @format */

import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

//Todo: add publishable key

const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_PK);
const Payment = () => {
   return (
      <div>
         <SectionTitle
            heading={"Payment"}
            subHeading={"Please Pay to eat"}
         ></SectionTitle>
         <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm></CheckoutForm>
            </Elements>
         </div>
      </div>
   );
};

export default Payment;
