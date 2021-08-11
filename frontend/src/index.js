import React from "react";

import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import { ProductProvider, ProductConsumer } from "./context";
import "./app.css";
import App from "./app.jsx";
ReactDOM.render(
  <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>,

  document.getElementById("root")
);
