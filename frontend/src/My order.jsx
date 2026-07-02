import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // ✅ Backend URL from .env
  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${backendURL}/api/orders/my`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 my-2">
            <h5>Total: ₹{order.totalAmount}</h5>
            <p>Status: {order.status}</p>

            <hr />

            {order.items.map((item, i) => (
              <div key={i}>
                {item.name} - ₹{item.price}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;