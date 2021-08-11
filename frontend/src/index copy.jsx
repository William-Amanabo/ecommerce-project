import React from "react";

//import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
// eslint-disable-next-line
import { ProductProvider, ProductConsumer } from "./context";
import "./app.css";
import App from "./app.jsx";

import { renderToString } from "react-dom/server"

import express from "express"
import cors from "cors"


const app = express()
app.use(cors())


app.get('/',(req,res)=>{
  res.send(renderToString( 
     <ProductProvider>
    <Router>
      <App />
    </Router>
  </ProductProvider>))
})

