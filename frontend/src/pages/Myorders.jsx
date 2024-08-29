import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../contex/ShopContext"
import axios from "axios";
import { FaBox } from "react-icons/fa";

const Myorders = () => {
  const { url, token } = useContext(ShopContext);
  const [data, setdata] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.post(url + "/api/orders/userOrders", {}, { headers: { token } })
    setdata(res.data.data)
    // console.log(res.data.data)

  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])
  return (
    <section className="max-padd-container pt-20">
      <div className="py-10">
        <h4 className="bold-24">My Orders</h4>
        <table className=" w-full mt-8">
          <thead>
            <tr className=" border-b border-r-slate-900/20 text-gray-30 regular-14 xs-regular-16 text-start py-12">
              <th className="p-1 text-center hidden sm:table-cell">Package</th>
              <th className="p-1 text-center hidden sm:table-cell">Title</th>
              <th className="p-1 text-center hidden sm:table-cell">Price</th>
              <th className="p-1 text-center hidden sm:table-cell">Quantity</th>
              <th className="p-1 text-center hidden sm:table-cell">Status</th>
              <th className="p-1 text-center hidden sm:table-cell">Track</th>

            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr key={i} className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left">
                <td className="p-1 text-left hidden sm:table-cell"><FaBox className=" text-2xl text-secondary" /></td>
                <td className=" p-1">
                  <p>
                    {
                      order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " X " + item.quantity;
                        } else {
                          return item.name + " X " + item.quantity+" , ";
                        }
                      })}</p></td>
                      <td className="p-1 text-center">${order.amount}</td>
                      <td className="p-1 text-center">Items : {order.items.length}</td>
                <td className="text-center ">
                  <p className="flexCenter gap-x-2 text-center">
                    <span className="hidden lg:flex">&#x25cf;</span>
                    <b className="text-center">{order.status}</b>
                  </p>
                </td>
                
                <td className="text-center p-1">
                  <button onClick={fetchOrders} className=" btn-light rounded-sm !py-2">
                    Track
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

      </div>
    </section>
  )
}

export default Myorders
