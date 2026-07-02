import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  // ✅ Backend URL from .env
  const backendURL = import.meta.env.VITE_API_URL;

  const getProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/food`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/food/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert("Deleted ✅");
      getProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete ❌");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((p) => (
          <div key={p._id} className="card p-3 my-2">

            <h5>{p.name}</h5>
            <p>₹{p.price}</p>

            <button
              className="btn btn-danger"
              onClick={() => deleteProduct(p._id)}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default ManageProducts;