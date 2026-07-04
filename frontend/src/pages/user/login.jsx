import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "https://my-project-foodie-cape.onrender.com/api/auth/login",
        user
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);

      const userEmail = user.email.toLowerCase();
      const userRole = res.data.role ? res.data.role.toLowerCase() : "";

      if (userEmail === "admin@gmail.com" || userRole === "admin") {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/add-product");
      } else {
        localStorage.setItem("isAdmin", "false");
        navigate("/user/productList");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        {error && (
          <div style={{ color: "#ff4d4d", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register">
          Don't have an account?{" "}
          <span
            style={{ color: "#00d2ff", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;