import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const BACKEND_URL = "http://localhost:5000";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    adminCode: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validating Admin Secret Code
    if (user.role === "admin" && user.adminCode.toUpperCase() !== "FOODIE123") {
      return setError("Invalid Admin Secret Code!");
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Account</h2>
        
        {error && (
          <div
            className="error-msg"
            style={{ color: "#ff8a8a", textAlign: "center", marginBottom: "10px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

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
            <label>Register as</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="user">User / Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {user.role === "admin" && (
            <div className="input-group">
              <label>Admin Secret Code</label>
              <input
                type="text"
                name="adminCode"
                placeholder="Enter secret code"
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register"}
          </button>
        </form>

        <p
          className="login-link"
          style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <span
            style={{ color: "#4ed9f7", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;