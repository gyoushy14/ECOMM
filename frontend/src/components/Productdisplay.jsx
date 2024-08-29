import { useContext } from "react";
import { ShopContext } from "../contex/ShopContext";
import Item from "./Item";
const Productdisplay = ({ Category }) => {
    const { all_products } = useContext(ShopContext);
    return (
        <div id="Productdisplay" className="max-padd-container pt-8 pb-16 xl:pb-28 ">
            <h2 className="bold-32">Our Great Products</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-12 ">
                {all_products.map((product) => {
                    if ((Category === "All" || Category === product.category)) {
                        return (
                            <div key={product._id}>
                                <Item product={product} />
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};
export default Productdisplay;
