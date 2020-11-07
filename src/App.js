import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import ProductDetails from "./Component/ProductDetails";
import PlaceOrder from "./Component/PlaceOrder";
import SignIn from "./Component/SignIn";
import Register from "./Component/Register";
import { auth } from "./firebase";
import { CartContext } from "./Context/CartContext";

function App() {
  const context = useContext(CartContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        context.dispatchState({ type: "setUser", user: authUser });
      } else {
        context.dispatchState({ type: "setUser", user: null });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product-details/:id" component={ProductDetails} />
          <Route exact path="/place-order" component={PlaceOrder} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
