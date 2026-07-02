import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/login";
import Register from "./pages/user/Register";
import Cart from "./pages/user/Cart";
import Home from "./pages/user/Home";
import AdminDashboard from "./pages/admin/AdminDashbord";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import AdminOrders from "./AdminOrder";
import ProductList from "./pages/user/ProductList";
import Orders from "./pages/user/order";
import { CartProvider } from "./context/CartContext";
import Profile from  "./pages/user/profile";
import { ThemeProvider } from "./context/ThemContext";
 
function App() {
  return (
    <CartProvider>
       <ThemeProvider>
         <BrowserRouter>
        <Routes>
          {/* Main Landing Page - This will load first */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />          

          {/* User Feature Routes */}
          <Route path="/user/productList" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Section Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productList" element={<ManageProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
           
        </Routes>
      </BrowserRouter>   
      
      </ThemeProvider>
       </CartProvider>
       
  );
}

export default App; 