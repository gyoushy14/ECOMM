import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md";
import { useState } from "react"
import { Link } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
    const [IsActive, setIsActive] = useState("home")
    return (
        <nav className={`${containerStyles}`}>
            <Link to="/">
                <a href={'#home'} onClick={() => setIsActive("home")} className={IsActive === "home" ? "active-link" : ""}>
                    <div className=" flexCenter gap-x-1 text-xl">
                        <MdHomeFilled />Home
                    </div>
                </a>
            </Link>
         
            <a href={'#shop'} onClick={() => setIsActive("shop")} className={IsActive === "shop" ? "active-link" : ""}>
                <div className=" flexCenter gap-x-1 text-xl">
                    <MdCategory />Shop
                </div>
            </a>

            <a href={'#app'} onClick={() => setIsActive("app")} className={IsActive === "app" ? "active-link" : ""}>
                <div className=" flexCenter gap-x-1 text-xl">
                    <MdShop2 />App
                </div>
            </a>
        
        </nav>
    )
}

export default Navbar
