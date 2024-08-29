import { useState } from "react"
import Categories from "../components/Categories"
import Hero from "../components/Hero"
import Productdisplay from "../components/Productdisplay"
import GetApp from "../components/GetApp"
import Footer from "../components/Footer"


const Home = () => {
  const [Category, setCategory] = useState("All")
  return (
    <div>
      <Hero />
      <Categories Category={Category} setCategory={setCategory} />
      <Productdisplay Category={Category} />
      <GetApp />
      <Footer />
    </div>
  )
}

export default Home
