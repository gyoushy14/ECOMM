import { useContext } from "react";
import { ShopContext } from "../contex/ShopContext";
import { TbTrash } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate =useNavigate();
  const { cartItems, removeFromCart, all_products ,getTotalCartAmount , url } = useContext(ShopContext);
  return (
    <div className=" max-padd-container">
      <div className="py-10">
        <table className="w-full">
          <thead>
            <br /><br /><br />
            <tr className=" border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left">Products</th>
              <th className="p-1 text-left">Title</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Quantity</th>
              <th className="p-1 text-left">Total</th>
              <th className="p-1 text-left">Remove</th>
            </tr>
          </thead>
          <tbody >
            {all_products.map((product) => {
              if (cartItems[product._id] > 0) {
                return (
                  <tr key={product._id} className=" border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left">
                    <td className="p-1">
                      <img src={url + "/images/"+product.image} width={38} height={38} className=" rounded-lg ring-1 ring-slate-900/5 m-1" alt="" />
                    </td>
                    <td className="p-1"><p className=" line-clamp-3">{product.name}</p></td>
                    <td className="p-1">${product.price}</td>
                    <td className="p-1">{cartItems[product._id]}</td>
                    <td className="p-1">${product.price * cartItems[product._id]}</td>
                    <td className="p-1"><div className=" bold-22"><TbTrash className=" cursor-pointer" onClick={() => removeFromCart(product._id)} /></div></td>
                  </tr>
                )

              }
              return null;
            })}
          </tbody>
        </table>


        {/* CART DETAILS */}

        <div className=" flex flex-col xl:flex-row gap-20 mt-20">
          <div className="flex flex-1 flex-col gap-2">
            <h4 className=" bold-22">Summary</h4>
            <div>
              <p className="flexBetween py-3">
                <h4 className="medium-16">SubTotal:</h4>
                <h4 className="text-gray-30 font-semibold">${getTotalCartAmount()}</h4>

              </p>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-16">Shipping Fee:</h4>
                <h4 className="text-gray-30 font-semibold">${getTotalCartAmount()===0 ? 0 : 2}</h4>
              </div>
              <hr />
              <div className="flexBetween py-3">
                <h4 className="medium-18">Total:</h4>
                <h4 className=" font-bold">${getTotalCartAmount()===0 ? 0 :getTotalCartAmount()+ 2}</h4>
              </div>
              <button onClick={()=> navigate("/order")} className=" btn-secondary w-full rounded-sm">Procced to checkout</button>
            </div>
          </div>
          <div className=" flex flex-1 flex-col gap-8">
            <h4 className="bold-20 capitalize">Your Coupon code enter here:</h4>

            <div className="flexBetween h-[2.8rem] bg-primary ring-1 ring-slate-900/10 w-full max-w-[488px] rounded">
              <input type="text" placeholder="Coupon code" className="pl-3 bg-transparent border-none outline-none" name="" id="" />
              <button className="btn-dark rounded relative !py-3 !px-10" type="submit">Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart;