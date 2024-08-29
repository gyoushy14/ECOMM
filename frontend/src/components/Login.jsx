import { useContext, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { ShopContext } from "../contex/ShopContext";
import axios from "axios"

const Login = ({ setshowLogin }) => {
    const { url, settoken } = useContext(ShopContext);
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
    })
    const onchangHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setdata(data => ({ ...data, [name]: value }))
    }
    const [state, setstate] = useState("Login")

    useEffect(() => {
        console.log(data);

    }, [data]);
    const onlogin = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (state === "Login") {
            newurl += "/api/user/login";
        } else {
            newurl += "/api/user/register";
        }
        const response = await axios.post(newurl, data);
        if (response.data.success) {
            settoken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setshowLogin(false);

        } else {
            alert(response.data.message);
        }
    }
    return (
        <div className=" absolute h-full w-full bg-black/40 z-50 flexCenter">
            <form onSubmit={onlogin} action="" className="bg-white w-[366px] p-7 rounded-lg shadow-md">
                <div className=" flex justify-between items-baseline">
                    <h4 className="bold-28"> {state}</h4>
                    <FaXmark onClick={() => setshowLogin(false)} className="medium-20 text-slate-900/70 cursor-pointer" />
                </div>
                <div className="flex flex-col gap-3 my-6">
                    {state === "Sign up" && <input type="text" className=" border border-slate-900/20 p-2 pl-4 rounded-md outline-none" required placeholder="Name" name="name" value={data.name} onChange={onchangHandler} />
                    }
                    <input value={data.email} onChange={onchangHandler} type="email" className=" border border-slate-900/20 p-2 pl-4 rounded-md outline-none" required placeholder="Email" name="email" />
                    <input value={data.password} onChange={onchangHandler} type="password" className=" border border-slate-900/20 p-2 pl-4 rounded-md outline-none" required placeholder="Password" name="password" />

                </div>
                <button type="submit" className=" btn-secondary rounded-md w-full">{state === "Sign up" ? "Create account" : "Login"}</button>
                <div className="flex items-baseline gap-3 mt-6 mb-4">
                    <input type="checkbox" required />
                    <p className=" relative bottom-1">By continuing you agree to our <span>Terms of Services</span> and <span>Privacy Policy</span></p>
                </div>
                {state === "Sign up" ?
                    <p>Already Have An Account? <span onClick={() => setstate("Login")} className=" cursor-pointer text-secondary">Login</span></p> :
                    <p>Don`t Have An Account? <span onClick={() => setstate("Sign up")} className=" cursor-pointer text-secondary">Sign Up</span></p>
                }
            </form>
        </div>
    )
}

export default Login
