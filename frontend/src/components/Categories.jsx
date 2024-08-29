import { categories } from "../assets/data"


const Categories = ({ Category, setCategory }) => {
    return (
        <div className="flexCenter max-padd-container py-16 xl:py-20 " id="shop">
            <div className="flex items-start gap-6 flex-wrap">
                {categories.map((item) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.name ? "All" : item.name)}
                        id={item.name} key={item.name}
                        className={`py-10 px-32 rounded-3xl text-center cursor-pointer ${Category === item.name ? "bg-secondary" : " bg-primary"}`}>

                        <img src={item.image} alt="Category Image" height={44} width={44} />
                        <h4 className="mt-6 medium-18">{item.name}</h4>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Categories
