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

  // ✅ Backend URL from .env
  const backendURL = import.meta.env.VITE_API_URL;

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert(
        `Order Placed Successfully!\n\nThank you for choosing Foodie Cape.\nTotal Amount: ₹${total}`
      );
    }
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
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "15px",
                margin: "15px 0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                backgroundColor: "#fff"
              }}
            >

              <div style={{ display: "flex", alignItems: "center" }}>

                <img
                  src={
                    item.image
                      ? item.image.startsWith("http")
                        ? item.image
                        : `${backendURL}/uploads/${item.image}`
                      : "https://via.placeholder.com/90"
                  }
                  alt={item.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginRight: "20px"
                  }}
                />

                <div>
                  <h5 style={{ margin: 0 }}>{item.name}</h5>
                  <p style={{ margin: 0 }}>₹{item.price}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  onClick={() => decreaseQty(item._id)}
                  style={{
                    background: "#f0f0f0",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                  }}
                >
                  −
                </button>

                <span style={{ margin: "0 10px", fontWeight: "bold" }}>
                  {item.quantity}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  style={{
                    background: "#f0f0f0",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1.2rem"
                  }}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  background: "#ff4757",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
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