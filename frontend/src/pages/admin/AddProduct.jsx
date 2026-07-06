import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../admin/food.css";

function AddProduct() {
  const navigate = useNavigate();

  // Backend URL
  const backendURL =
    import.meta.env.VITE_API_URL ||
    "https://my-project-foodie-cape.onrender.com";

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.name === "price"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/food/add`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message || "✅ Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      navigate("/user/productList");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "❌ Failed to Add Product"
      );
    } finally {
      setLoading(false);
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
              name="name"
              value={product.name}
              placeholder="Enter product name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              placeholder="Enter price"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              placeholder="Enter product description"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              placeholder="Paste image URL here"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Product"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddProduct;
