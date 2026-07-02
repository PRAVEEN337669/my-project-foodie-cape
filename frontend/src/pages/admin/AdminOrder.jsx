import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const backendURL = "https://foodie-cape.onrender.com";

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/orders/all`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${backendURL}/api/orders/update/${id}`,
        { status },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      getOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="container mt-4">

      <h2>All Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 my-2">

            <h5>User: {order.user?.email}</h5>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>

            <button
              className="btn btn-success me-2"
              onClick={() => updateStatus(order._id, "Delivered")}
            >
              Mark Delivered
            </button>

            <button
              className="btn btn-warning"
              onClick={() => updateStatus(order._id, "Pending")}
            >
              Pending
            </button>

          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;