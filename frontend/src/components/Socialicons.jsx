import { Link } from "react-router-dom"
import {RiDribbbleFill, RiInstagramFill, RiLinkedinFill, RiTwitterFill, RiYoutubeFill} from 'react-icons/ri'
const Socialicons = () => {
  return (
    <>
    <h1 className=" flexCenter text-2xl text-secondary"> Contact Us</h1>
    <div className="flex gap-6">

<Link >
    <RiYoutubeFill className="text-red-700 text-2xl hover:-translate-y-1 transition-all duration-500" />
</Link>
<Link>
    <RiInstagramFill className="text-pink-700 text-2xl hover:-translate-y-1 transition-all duration-500" />
</Link>
<Link>
    <RiTwitterFill className="text-sky-700 text-2xl hover:-translate-y-1 transition-all duration-500" />
</Link>
<Link>
    <RiLinkedinFill className="text-blue-700 text-2xl hover:-translate-y-1 transition-all duration-500" />
</Link>
<Link>
    <RiDribbbleFill className="text-violet-700 text-2xl hover:-translate-y-1 transition-all duration-500" />
</Link>
</div>
    </>
    
  )
}

export default Socialicons
