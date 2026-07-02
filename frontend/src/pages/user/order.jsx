import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const backendURL = "https://foodie-cape.onrender.com";

  useEffect(() => {
    axios.get(`${backendURL}/api/orders/my`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card p-3 my-2">

            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>Status:</b> {order.status}</p>

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;