import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { ShopContext } from "../contex/ShopContext";
import axios from "axios";




const Verify = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const success  = searchParams.get("success")
  const orderId  = searchParams.get("orderId")
  const navigate = useNavigate()
  // console.log(success , orderId);

  const verifyPayment = async()=>{
    const res = await axios.post(url+"/api/orders/verify" , {success , orderId})
    if(res.data.success){
      navigate("/myorders")
    }else{
      navigate("/");
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[])

  const {url} = useContext(ShopContext);
  return (
    <section>
      <div className=" min-h-[60vh] grid">
          <div className="w-24 h-24 place-self-center border-4 border-t-secondary rounded-full animate-spin">

          </div>
      </div>
    </section>
  )
}

export default Verify
