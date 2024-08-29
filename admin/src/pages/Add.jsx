import { FaPlus } from "react-icons/fa";
import area1 from "../assets/upload_area1.svg";
import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Add = ({url}) => {

  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Women",
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);
    const res = await axios.post(`${url}/api/product/add`, formData);
    if (res.data.success) {
      setdata({
        name: "",
        description: "",
        price: "",
        category: "Women",
      });
      setimage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="p-4 sm:p-10 w-full bg-primary/20">
      <form
        onSubmit={onsubmitHandler}
        className="flex flex-col gap-y-5 max-w-[555px]"
      >
        <h4 className="bold-22 pb-2 uppercase">Products Upload</h4>

        <div className="flex flex-col gap-y-2 max-w-24 h-24">
          <p>Upload Image</p>
          <label htmlFor="image" className="h-20">
            <img src={image ? URL.createObjectURL(image) : area1} alt="" />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            hidden
            required
            name=""
            id="image"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product name</p>
          <input
            onChange={onchangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here..."
            name="name"
            id=""
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Product Description</p>
          <textarea
            onChange={onchangeHandler}
            value={data.description}
            name="description"
            className="ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none"
            rows={"6"}
            placeholder="Write Content Here..."
            required
            id=""
          ></textarea>
        </div>

        <div className="flex items-center gap-x-6 text-gray-900/70 medium-15">
          <div className="flex flex-col gap-y-2">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onchangeHandler}
              value={data.category}
              className=" outline-none ring-1 ring-slate-900/10 pl-2"
              id=""
            >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-2">
            <p>Product Price</p>
            <input
              onChange={onchangeHandler}
              value={data.price}
              className=" ring-1 ring-slate-900/10 pl-2 w-24 outline-none"
              type="number"
              placeholder="$20"
              name="price"
              id=""
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-dark w-full flexCenter gap-x-2 !py-2 rounded"
        >
          <FaPlus />
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
