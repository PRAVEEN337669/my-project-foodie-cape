import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // fetch all orders
  useEffect(() => {
    axios.get("https://foodie-cape.onrender.com/api/orders/all", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => setOrders(res.data));
  }, []);

  // update status
  const updateStatus = async (id, status) => {
    await axios.put(
      `https://foodie-cape.onrender.com/api/orders/update/${id}`,
      { status },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    );

    alert("Status Updated");

    window.location.reload();
  };

  return (
    <div className="container mt-4">
      <h2>Admin Orders Panel 👨‍💻</h2>

      {orders.map(order => (
        <div key={order._id} className="card p-3 my-3">

          <h5>User: {order.user?.email}</h5>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: {order.status}</p>

          <button
            className="btn btn-success mx-1"
            onClick={() => updateStatus(order._id, "Delivered")}
          >
            Delivered
          </button>

          <button
            className="btn btn-warning mx-1"
            onClick={() => updateStatus(order._id, "Pending")}
          >
            Pending
          </button>

        </div>
      ))}
    </div>
  );
}

export default AdminOrders;