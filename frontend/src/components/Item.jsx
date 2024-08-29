
import { FaMinus, FaUpRightAndDownLeftFromCenter } from "react-icons/fa6"
import { useContext } from "react"
import { FaPlus } from "react-icons/fa";
import { ShopContext } from "../contex/ShopContext";
export default function Item({ product }) {
    const { cartItems, addToCart, removeFromCart, url } = useContext(ShopContext);
    return (
        <div className="relative shadow-sm">
            <div className="relative group">
                <img src={url + "/images/" + product.image} className="rounded-tl-2xl rounded-tr-2xl" alt="" />
            </div>
            <div className=" absolute right-3  flexCenter gap-x-2">

                {
                    !cartItems[product._id] ?
                        (<FaPlus onClick={() => addToCart(product._id)} className=" bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer " />) :
                        (<div className="bg-white flexCenter gap-2">
                            <FaMinus onClick={() => removeFromCart(product._id)} className="bg-white h-8 w-8 p-2 mr-1 rounded-full shadow-inner cursor-pointer transform " />
                            <p>{cartItems[product._id]}</p>
                            <FaPlus onClick={() => addToCart(product._id)} className="bg-secondary h-6 w-6 p-1 rounded-full shadow-inner cursor-pointer transform " />
                        </div>)
                }
            </div>
            <div className="p-3 mt-7">
                <div className="flexBetween">
                    <h5 className="text-xl font-bold text-gray-90">{product.category}</h5>
                    <div className="text-secondary bold-18">${product.price}</div>
                </div>
                <h4 className="medium-18 mb-1 line-clamb-1">{product.name}</h4>
                <p className="line-clamb-2">{product.description}</p>
            </div>
        </div>
    )
}
