import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemContext";
import axios from "axios";
import "./profile.css";
import logo from "../../assets/foodie cape logo.png";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-switch-wrapper">
      <label className="theme-switch">
        <input type="checkbox" onChange={toggleTheme} checked={darkMode} />
        <div className="slider round">
          <span className="icon">{darkMode ? "🌙" : "☀️"}</span>
        </div>
      </label>
    </div>
  );
};

function Profile() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);

  const backendURL = "https://foodie-cape.onrender.com";

  const [user, setUser] = useState({
    name: "Praveen",
    email: "praveen744600@gmail.com",
    phone: "+91 8870593766",
    address: "South Poigai Nallur, Nagapattinam",
    profilePic: logo
  });

  // OPTIONAL: fetch real user profile (if backend exists)
  useEffect(() => {
    // axios.get(`${backendURL}/api/auth/profile`, {
    //   headers: { Authorization: localStorage.getItem("token") }
    // }).then(res => setUser(res.data));
  }, []);

  const handleUpdate = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePic: imageUrl });
    }
  };

  return (
    <div className={`profile-wrapper ${darkMode ? "dark" : ""}`}>

      {/* NAVBAR */}
      <nav className="custom-navbar">

        <div className="nav-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="Foodie Cape" className="brand-logo" />
          <span className="brand-name">
              <span>Foodie Cape</span>
          </span>
        </div>

        <div className="nav-right">
          <ThemeToggle />
          <button
            className="back-btn-modern"
            onClick={() => navigate("/user/productList")}
          >
            Back to Menu
          </button>
        </div>

      </nav>

      {/* PROFILE BODY */}
      <div className="profile-container">
        <div className="profile-grid">

          {/* LEFT */}
          <div className="profile-card-left">

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />

            <div
              className="profile-pic-wrapper"
              onClick={() => fileInputRef.current.click()}
            >
              <img src={user.profilePic} alt="Profile" className="profile-avatar" />
              <div className="camera-overlay">
                <span>📸</span>
              </div>
            </div>

            <h2>{user.name}</h2>
            <p>Full Stack Developer</p>

            {/* INFO */}
            {isEditing ? (
              <div>
                <input
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                <textarea
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                />

                <button onClick={handleUpdate}>Save</button>
              </div>
            ) : (
              <div>
                <p>📧 {user.email}</p>
                <p>📞 {user.phone}</p>
                <p>📍 {user.address}</p>

                <button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            )}

          </div>

          {/* RIGHT - ORDERS */}
          <div className="profile-card-right">

            <h3>My Orders</h3>

            <div>
              {[1, 2].map((id) => (
                <div key={id} className="order-card">
                  <h4>Order #{id}</h4>
                  <p>Food Order</p>
                  <span>₹220</span>
                  <span style={{ color: "green" }}>Delivered</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;