import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/ProtectedRoute/Route";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoutes from "./components/ProtectedRoute/AdminRoutes";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProdusts from "./pages/Admin/CreateProducts";
import Users from "./pages/Admin/Users";
import UserProfile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-cetegory" element={<CreateCategory />} />
          <Route path="admin/create-products" element={<CreateProdusts />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<AllProducts />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
