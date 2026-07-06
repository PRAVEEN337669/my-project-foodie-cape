import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../admin/food.css";

function AddProduct() {
  const navigate = useNavigate();

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
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log("Sending:", product);

      const response = await axios.post(
        `${backendURL}/api/food/add`,
        product,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      alert("✅ Product Added Successfully");

      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
      });

      navigate("/user/productList");

    } catch (err) {
      console.error("AXIOS ERROR:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);

        alert(
          err.response.data.message ||
          err.response.data.error ||
          JSON.stringify(err.response.data)
        );
      } else if (err.request) {
        alert("Backend server is not responding.");
      } else {
        alert(err.message);
      }
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
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Paste image URL"
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
