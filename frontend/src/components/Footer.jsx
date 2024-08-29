import Socialicons from "./Socialicons"

const Footer = () => {
    return (
        <footer className="max-padd-container bg-tertiary py-8 rounded-t-2xl">
            <div className="flexCenter flex-col gap-y-4">
                <h4 className="text-white">Follow us On Social Media</h4>
                <Socialicons />
                <hr className="h-[1px] w-2/3 my-3" />
                <p className="text-white">Copyright &Copy; GH14 Ecommerce Store | All rights reserved.</p>
            </div>
        </footer>
    )
}
export default Footer;