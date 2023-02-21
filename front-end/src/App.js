import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Register,
  Login,
  Verify,
  AboutPage,
  Dashboard,
  ProtectedRoute,
  ForgotPassword,
  ResetPassword,
  ProductPage,
  ProductManagement,
  ReviewManagement,
  ProductDetail,
  HomePage,
  CartPage,
  CheckoutPage,
  VerifyEmail,
} from "./pages";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useGlobalContext } from "./context/context";
import ShoppingCart from "./components/cart/ShoppingCart";
import OrderManagement from "./pages/admin/OrderManagement";
import UserManagement from "./pages/admin/UserManagement";

function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/user" exact>
          <Dashboard />
        </Route>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        <ProtectedRoute path="/dashboard" exact>
          <HomePage />
        </ProtectedRoute>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/user/verify-email" exact>
          <Verify />
        </Route>
        <Route path="/user/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="/products" exact>
          <ProductPage />
        </Route>
        <Route path="/user/verify-email/:token/:email" exact>
          <VerifyEmail />
        </Route>
        <ProtectedRoute path="/products-management" exact>
          <ProductManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/reviews-management" exact>
          <ReviewManagement />
        </ProtectedRoute>
        <ProtectedRoute path="/orders-management" exact>
          <OrderManagement />
        </ProtectedRoute>
        <Route path='/users-management' exact>
          <UserManagement />
        </Route>
        <Route path="/product/:id" exact>
          <ProductDetail />
        </Route>
        <ProtectedRoute exact path="/cart">
          <ShoppingCart />
        </ProtectedRoute>
        <ProtectedRoute path="/checkout" exact>
          <CheckoutPage />
        </ProtectedRoute>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
