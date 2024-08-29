import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"


const Hero = () => {
    return (
        <div className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[744px] w-full rounded-md" id="home">
            <div className="relative top-24 xs:top-72">

                <h4 className=" uppercase medium-18 tracking-wider ">Fashion Essentials  </h4>
                <h2 className="h1 capitalize max-w-[40rem]">Upgrade Your Fashion <span className="text-secondary">With Wvery Click.</span> Shop Today! </h2>
                <p className="my-5 max-w-[33rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi porro ex aliquid molestias architecto aliquam, deserunt minus nulla necessitatibus, numquam illo unde quia cumque culpa repellendus voluptatum eveniet modi saepe.

                </p>

                <div className="flex items-center gap-x-10" >
                    {/* BUTTONS  */}
                    <div className="gap-x-10">
                        <Link to={''} className="me-3 inline-flex items-center justify-center gap-4 p-3 bg-white rounded-xl">
                            <div className=" regular-14 leading-tight pl-4">
                                <h5 className=" uppercase font-bold">New Arrivals  </h5>
                                <p className=" regular-14 mt-1">10% Off</p>
                            </div>
                            <div className="bg-gray-10 h-10 w-10 p-1 rounded-full flexCenter ">
                                <FaArrowRight />
                            </div>
                        </Link>
                        <Link to={''} className=" inline-flex items-center justify-center gap-4 p-3 bg-tertiary rounded-xl ">
                            <div className=" regular-14 leading-tight pl-4">
                                <h5 className="text-white uppercase font-bold">Hot Deals   </h5>
                                <p className="text-white regular-14 mt-1">50% Off</p>
                            </div>
                            <div className="bg-white h-10 w-10 p-1 rounded-full flexCenter ">
                                <FaArrowRight />
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero
