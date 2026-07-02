import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const backendURL = "https://foodie-cape.onrender.com";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backendURL}/api/auth/register`, user);

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.error ||
          err.response?.data ||
          "Registration Failed ❌"
      );
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Register 🍔
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;