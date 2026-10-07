import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Explore from "./pages/Explore";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import MyProducts from "./pages/MyProducts";
import Sales from "./pages/Sales";
import MyPurchases from "./pages/MyPurchases";

import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public routes */}

        <Route
          path="/"
          element={<Explore />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/products/:id/edit"
          element={<EditProduct />}
        />


        {/* Protected routes */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/create-product"
            element={<CreateProduct />}
          />

          <Route
            path="/my-products"
            element={<MyProducts />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/my-purchases"
            element={<MyPurchases />}
          />

        </Route>


        {/* Unknown route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;