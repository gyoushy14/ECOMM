import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contex/ShopContext";
import axios from "axios";
const Order = () => {
  const { cartItems, all_products, getTotalCartAmount, url, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const OnchangeHandlerData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(d => ({ ...d, [name]: value }));
  }

  const placeORDER = async (e) => {
    e.preventDefault();
    let ordersItem = []; 
    all_products.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        ordersItem.push(itemInfo);
      };
    });
    // console.log(ordersItem);
    let orderdata = {
      address: data,
      items: ordersItem,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/orders/place", orderdata, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      alert("Error in order place")
    }

  };

  useEffect(()=>{
    if(!token){
        navigate("/cart")
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[])

  return (
    <div className=" max-padd-container py-28 xl:py-32">

      <form onSubmit={placeORDER} className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        <div className=" flex flex-col gap-3 text-[95%]">

          <h3 className=" bold-28 mb-3">Delivery Information</h3>

          <div className="flex gap-3">
            <input required type="text" onChange={OnchangeHandlerData} value={data.firstname} placeholder="First Name" name="firstname" className=" w-1/2 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
            <input required type="text" placeholder="Last Name" name="lastname" onChange={OnchangeHandlerData} value={data.lastname} className=" w-1/2 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
          </div>

          <input type="text" required onChange={OnchangeHandlerData} value={data.email} placeholder="Email Address" name="email" id="" className=" ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
          <input type="text" required onChange={OnchangeHandlerData} value={data.phone} placeholder="Phone Number" name="phone" id="" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
          <input type="text" required onChange={OnchangeHandlerData} value={data.street} placeholder="Street" name="street" id="" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />

          <div className=" flex  gap-3">
            <input type="text" required onChange={OnchangeHandlerData} value={data.city} placeholder="City" name="city" className="w-1/2 ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
            <input type="text" required onChange={OnchangeHandlerData} value={data.state} placeholder="State" name="state" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
          </div>

          <div className=" flex gap-3">
            <input type="text" required onChange={OnchangeHandlerData} value={data.zipcode} placeholder="ZIP Code" name="zipcode" id="" className="w-1/2  ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none" />
            <input type="text" required onChange={OnchangeHandlerData} value={data.country} placeholder="Country" name="country" id="" className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2" />
          </div>


        </div>

        {/* GET TOTAL */}
        <div className=" flex flex-col flex-1 ">
          <div className="flex flex-col gap-2">
            <h4 className=" bold-22">Summary</h4>
            <div>
              <div className="flexBetween py-3">
                <h4 className="medium-16">SubTotal:</h4>
                <h4 className="text-gray-30 font-semibold">${getTotalCartAmount()}</h4>

              </div>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-16">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold">${getTotalCartAmount() === 0 ? 0 : 2}</h4>
              </div>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-18">Total:</h4>
                <h4 className=" font-bold">${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</h4>
              </div>
              <button type="submit" className=" btn-secondary w-full rounded-sm">Procced to checkout</button>
            </div>
          </div>

        </div>

      </form>
    </div>
  )
}

export default Order
