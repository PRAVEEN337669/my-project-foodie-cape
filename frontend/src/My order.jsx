import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://foodie-cape.onrender.com/api/orders/my", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setOrders(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
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