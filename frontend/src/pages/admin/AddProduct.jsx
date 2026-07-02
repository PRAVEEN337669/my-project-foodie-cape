import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../admin/food.css";

function AddProduct() {
  const navigate = useNavigate();

  const backendURL = "https://foodie-cape.onrender.com";

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${backendURL}/api/food/add`,
        product
      );

      alert("Product Added Successfully ✅");
      navigate("/user/productList");

    } catch (err) {
      console.error(err);
      alert("Failed to Add Product ❌");
    }
  };

  return (
    <div className="add-product-page">
      <div className="form-container">

        <h2 className="form-title">Add New Product</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter price"
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Paste image URL here"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;