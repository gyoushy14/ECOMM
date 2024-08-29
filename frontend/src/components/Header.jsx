import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { ShopContext } from "../contex/ShopContext";
import { FiPackage } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";

const Header = ({ setshowLogin }) => {
    const [MenuOpened, setMenuOpened] = useState(false);
    const toggle = () => setMenuOpened(!MenuOpened);
    const { getTotalCartAmount, token, settoken } = useContext(ShopContext);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        settoken("");
        navigate("/")
    }

    return (
        <header className=" fixed right-0 left-0 mx-auto z-10 rounded-lg">
            <div className=" max-padd-container bg-white rounded-lg ">
                <div className=" flexBetween py-4 max-xs:px-2 ">
                    <div className=" flexCenter gap-x-20">
                        {/* LOGO */}
                        <Link to="/" className="bold-24">
                            <img src={Logo} alt="Logo" height={77} width={77} />
                        </Link>

                        {/* NAVBAR DESKTOP */}
                        <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"} />

                        {/* NAVBAR MOBILE */}
                        <Navbar containerStyles={`${MenuOpened ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12  bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 " : "flex items-start flex-col gap-y-12 fixed top-20 -right-[100%] p-12  bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 "}`} />
                    </div>

                    {/* BUTTONS */}
                    <div className="flexCenter gap-x-6 ">
                        {
                            !MenuOpened ? <MdMenu className="md:hidden cursor-pointer hover:text-secondary text-2xl " onClick={toggle} /> : <MdClose className="md:hidden cursor-pointer hover:text-secondary text-2xl " onClick={toggle} />
                        }
                        <div className=" flexBetween gap-x-2 sm:gap-x-5">
                            <Link to="/cart" className="flex">
                                <FaShoppingBasket className=" text-3xl" />
                                <span className={getTotalCartAmount() > 0 ? "relative flexCenter w-2 h-2 rounded-full bg-secondary text-white medium-14 -top-1" : "w-2 rounded-full bg-transparent"}></span>
                            </Link>
                            {/* LOGIN */}
                            {!token ? <button className="btn-outline rounded-full" onClick={() => setshowLogin(true)}>Login</button> :
                                <div className=" group relative">
                                    <FaCircleUser className="text-2xl" />
                                    <ul className="bg-white shadow-sm p-3 w-24 ring-1 ring-slate-900/15  group-hover:flex flex-col hidden cursor-pointer absolute rounded right-0">
                                        <li onClick={() => navigate("/myorders")} className=" flex gap-2">
                                            <FiPackage className=" text-xl" />
                                            <p>Orders</p>
                                        </li>
                                        <hr className="my-2" />
                                        <li onClick={logout} className=" flex gap-2">
                                            <TbLogout className=" text-xl" />
                                            <p>LogOut</p>
                                        </li>

                                    </ul>
                                </div>}
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
