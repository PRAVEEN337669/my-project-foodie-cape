import { useState } from "react";
import axios from "axios";

function Admin() {
  // ✅ Backend URL from .env
  const backendURL = import.meta.env.VITE_API_URL;

  const [food, setFood] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${backendURL}/api/food/add`,
        food,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Food Added ✅");

    } catch (err) {
      alert("Error adding food ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Food</h2>

      <input
        className="form-control my-2"
        placeholder="Name"
        onChange={e => setFood({ ...food, name: e.target.value })}
      />

      <input
        className="form-control my-2"
        placeholder="Price"
        onChange={e => setFood({ ...food, price: e.target.value })}
      />

      <input
        className="form-control my-2"
        placeholder="Description"
        onChange={e => setFood({ ...food, description: e.target.value })}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Add Food
      </button>
    </div>
  );
}

export default Admin;