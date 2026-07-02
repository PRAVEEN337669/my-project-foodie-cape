import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    total
  } = useContext(CartContext);

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert(
        `Order Placed Successfully!\n\nThank you for choosing Foodie Cape.\nTotal Amount: ₹${total}`
      );
    }
  };

  const backendURL = "https://foodie-cape.onrender.com";

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    margin: "15px 0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    backgroundColor: "#fff"
  };

  const imgStyle = {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
    marginRight: "20px"
  };

  const qtyBtnStyle = {
    background: "#f0f0f0",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: "0 12px"
  };

  const removeBtnStyle = {
    background: "#ff4757",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  };

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", padding: "0 20px" }}>
      <h2>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} style={cardStyle}>
              
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    item.image && item.image.startsWith("http")
                      ? item.image
                      : `${backendURL}/uploads/${item.image || "default.jpg"}`
                  }
                  style={imgStyle}
                  alt={item.name}
                />

                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={() => decreaseQty(item._id)} style={qtyBtnStyle}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item)} style={qtyBtnStyle}>+</button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                style={removeBtnStyle}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{ marginTop: "30px" }}>
            <h3>Total: ₹{total}</h3>
          </div>

          <button
            onClick={handleCheckout}
            style={{
              background: "#27ae60",
              color: "#fff",
              padding: "15px",
              width: "100%",
              border: "none",
              marginTop: "20px",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;