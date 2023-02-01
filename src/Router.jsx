import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent";
import SuspenseLoadingComponent from "./components/SuspenseLoadingComponent/SuspenseLoadingComponent";

const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const Menu = lazy(() => import("./pages/Menu"));
const Cart = lazy(() => import("./pages/Cart"));
const Reservation = lazy(() => import("./pages/Reservation"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Missing = lazy(() => import("./pages/Missing"));

const Router = () => {
  return (
    <Suspense fallback={<SuspenseLoadingComponent />}>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          {/* Public routers */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="store" element={<Store />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="checkout" element={<Checkout />} />
          {/* Protected Routes */}
          <Route element={<ProtectedRouteComponent />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Missing */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
