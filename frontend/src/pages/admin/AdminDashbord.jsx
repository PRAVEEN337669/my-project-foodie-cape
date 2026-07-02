import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-4">

      <h2>Admin Dashboard 👨‍🍳</h2>

      <p style={{ color: "gray" }}>
        Manage your Foodie Cape application
      </p>

      <div className="mt-4">

        <Link to="/admin/products" className="btn btn-primary m-2">
          🛠 Manage Products
        </Link>

        <Link to="/admin/add-product" className="btn btn-success m-2">
          ➕ Add Product
        </Link>

        <Link to="/admin/orders" className="btn btn-warning m-2">
          📦 View Orders
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;