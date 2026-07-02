import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import logo from "../../assets/foodie cape logo.png"; // Your logo path

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Navbar Section */}
      <nav className="home-nav">
        <div className="logo-section">
          <img src={logo} alt="Foodie Cape Logo" className="home-logo" />
          <span className="brand-name">Foodie <span>Cape</span></span>
        </div>
        <div className="nav-btns">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="signup-btn" onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="badge-text">🍃 Best Food in Your Town</span>
          <h1>Premium Quality <br /> Food for Your <span>Healthy Life</span></h1>
          <p>
            Experience the best flavors from Foodie Cape. We deliver fresh, 
            delicious, and high-quality meals right to your doorstep.
          </p>
          
          <div className="hero-action-btns">
            <button className="order-now-btn" onClick={() => navigate("/register")}>
              Get Started Now ➔
            </button>
            <button className="see-menu-btn" onClick={() => navigate("/user/productList")}>
              View Menu
            </button>
          </div>

          <div className="stats-box">
            <div className="stat">
              <h3>5k+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Food Items</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          {/* You can use a high-quality food image here */}
          <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/026/781/289/small_2x/various-of-ice-cream-flavor-whit-fresh-blueberry-strawberry-kiwi-lemon-vanilla-setup-on-rustic-background-photo.jpg " 
            alt="Delicious Healthy Food" 
          />
        </div>
      </header>
    </div>
  );
}

export default Home;