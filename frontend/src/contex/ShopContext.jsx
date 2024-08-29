import axios from "axios";
import { createContext, useEffect, useState } from "react"
// import { all_products } from "../assets/data";
export const ShopContext = createContext(null);

const ShopContextprovider = (props) => {
    const url = "http://localhost:3000";
    const [cartItems, setCartItems] = useState({});
    const [all_products, setAll_products_state] = useState([])
    const [token, settoken] = useState("");

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }


        }
        return totalAmount;
    };

    const fetchProductlist = async () => {
        const response = await axios.get(url + "/api/product/list");
        setAll_products_state(response.data.data);
    };

    const loadCart = async (token) => {
        const res = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(res.data.cartData);
    }



    useEffect(() => {
        async function loadData() {
            await fetchProductlist();
            if (localStorage.getItem("token")) {
                settoken(localStorage.getItem("token"))
                await loadCart(localStorage.getItem("token"))
            };
        }
        loadData();
    }, []);

    const ContentValue = { all_products, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, url, token, settoken }

    return (
        <ShopContext.Provider value={ContentValue}>
            {props.children}
        </ShopContext.Provider>
    )
};
export default ShopContextprovider; 