import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Products() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { addToCart } = useContext(CartContext);

  // fetch foods (LIVE BACKEND)
  useEffect(() => {
    axios.get("https://foodie-cape.onrender.com/api/food")
      .then(res => setFoods(res.data))
      .catch(err => console.log(err));
  }, []);

  // filter foods
  const filteredFoods = foods.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) &&
    (maxPrice === "" || f.price <= maxPrice)
  );

  return (
    <div className="container mt-4">

      <h2 className="mb-3">Food Products 🍔</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search food..."
        className="form-control mb-2"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 💰 Price Filter */}
      <input
        type="number"
        placeholder="Max Price"
        className="form-control mb-3"
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* 🧾 Products */}
      <div className="row">
        {filteredFoods.length === 0 ? (
          <p>No items found</p>
        ) : (
          filteredFoods.map(f => (
            <div key={f._id} className="col-md-4">

              <div className="card shadow-sm mb-4">

                {/* 🖼 Image */}
                <img
                  src={f.image || "https://via.placeholder.com/300"}
                  alt={f.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{f.name}</h5>
                  <p>{f.description}</p>
                  <h6>₹{f.price}</h6>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(f)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Products;