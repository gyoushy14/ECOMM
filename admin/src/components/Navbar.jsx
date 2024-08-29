import profile from "../assets/Mahmoud Mohamed El-Gyuoshi.jpg"
import logo from "../assets/logo.png"
const Navbar = () => {
    return (
        <div className=" max-padd-container flexBetween">
            <img src={logo} height={155} width={155} alt="" />
            <img src={profile}  width={46} alt="" className="rounded-full scale-125" />
        </div>
    )
}

export default Navbar;
