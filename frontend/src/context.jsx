import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import axios from "axios";
//import { redirectTo } from "@reach/router";
//import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductContext = React.createContext();
//provider
//consumer


class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal:0, 
    cartTax:0,
    cartTotal:0,
    errors:{}
  };

  componentDidMount() {
    //this.setProducts();
    this.setProducts2();
  }
  /* This copying array instead of refrence */
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    console.log("testing tempProduct ", tempProducts );
    this.setState(
      () => {
        return { products: tempProducts } //TODO remove none curly brace
        //console.log("testing the state after setting it ", this.state);
      },
     //this.addToCart() //TODO
    );
      /* this.setState({products: tempProducts},this.addToCart()); */

  };// TODO dont have a checkCart function

  async setProducts2(){
    let tempProducts = [];
    let storeProducts2 = []
    var products = await axios.post("http://localhost:3000/api/listproducts").then((res)=>{
      return res;
    })
    console.log("THIS IS PRODUCTSLIST "+ JSON.stringify(products.data) );

    products.data.forEach(item => {
      const singleItem = { ...item,inCart:0,total:0,count:0 };
      tempProducts = [...tempProducts, singleItem];
    });

    console.log("THIS IS TEMPPRODUCTS "+ JSON.stringify(tempProducts) );

    this.setState(
      () => {
        return { products: tempProducts } 
      }

    );

  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetails = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = id => {
    console.log("testing the state in callback func", this.state);
    let tempProduct = [ ...this.state.products ];
    console.log(tempProduct)
    const index = tempProduct.indexOf(this.getItem(id));
    const product = tempProduct[index];
    console.log(product)
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProduct, cart: [...this.state.cart,product],detailProduct: { ...product } };//TODO added detailProduct: { ...product }
      },
      this.addTotals //TODO added this function
/*       () => {
        console.log(this.state);
      } */
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment =(id) =>{
    let tempCart =[...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count + 1;
    product.total = product.count * product.price;

    this.setState(()=>{
      return{
        cart:[...tempCart]
      }
    },()=>{
      this.addTotals()
    })
  }
  decrement =(id) =>{
    let tempCart =[...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count = product.count - 1;

    if(product.count === 0){ this.removeItem(id);}
     else { 
      product.total = product.count * product.price;
      this.setState(()=>{
        return{
          cart:[...tempCart]
        }
      },()=>{
        this.addTotals()
      })
      }
  }
  removeItem =(id) =>{
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart]

    tempCart = tempCart.filter(item =>item.id !== id);

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart =false;
    removedProduct.count = 0;
    removedProduct.total =false;

    this.setState(()=>{
      return{
        cart:[...tempCart],
        products:[...tempProducts]
      }
    },()=>{
      this.addTotals();
    })
    

  }
  //TODO need better way to add and remove from cart this method is one user centric... everything should be in the database ie in cart and all
  clearCart =(id) =>{
    this.setState(()=>{
      return {cart:[]}
    },()=>{
      this.setProducts();
      this.addTotals();
    })
  }

  //TODO comeback if add cart us having problems
/*   getTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    return {
      subTotal,
      tax,
      total
    };
  }; */

  addTotals =() =>{
    let subTotal = 0;
    // TODO if not work, come back and change to (item =>{subTotal += item.total})
    this.state.cart.map(item =>subTotal += item.total)
    const tempTax = subTotal *0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(()=>{
      return {
        cartSubTotal:subTotal,
        cartTax:tax,
        cartTotal:total
      }
    })
  }

  LoginProcess(username,password){
    console.log("it works");
    console.log(username,password);

    axios.post("http://localhost:3000/api/login", { 
      username: username,
      password: password
    }).then((res)=>{
      console.log("testing for req.user ", res);
      //redirectTo('http://localhost:3000')
      if(res.data === 'You were authenticated & logged in!\n'){
        console.log('message match')
        /* React redirect */
        //return <Redirect  to = '/profile'/>
        
      }
    })
    // Plan:- after user is gotten assign it to user state of context so user is available everywhere
    //this.context.router.history.push('/profile')
  }
  SignUpProcess(name,email,username,password,password2,profilePic){
    /* var self = this.set;

    console.log(1, "it works");
    console.log(2, ...arguments);
    console.log(3, this);
  
    axios.post("http://localhost:3001/api/signup", { 
      name:name,
      email:email,
      username: username,
      password: password,
      password2: password2
    }).then(res => {
      console.log("res.data ",res.data);
      console.log("res.request ",res.request);
      console.log("The whole response ",res);
      function test (){self.setState(()=>{return {errors:res.data.errors}})};
      console.log(self);
      self.setState( {errors:res.data.errors});
    }) */


/*     async function axiosAsync () {
      try{
        const  res = await axios.post("http://localhost:3001/api/signup", { 
          name:name,
          email:email,
          username: username,
          password: password,
          password2:password2
        }).then((res)=>{console.log(res);return res.data.errors})

        console.log(res);
        //this.setState(()=>{return {error:res}})
        return res;
      } catch (error){
        console.error(error);
      }
    }
    //var test = axiosAsync().then(()=>{self.setState(()=>{return {error:test}})});
    //console.log("testing new solution ",test); */


   var test = axios.post("http://localhost:3000/api/signup", { 
      name:name,
      email:email,
      username: username,
      password: password,
      password2: password2/* ,
      profilePic:profilePic */
    }).then(res => {
      console.log("res.data.errors ",res.data.errors);
      console.log("res.request ",res.request);
      console.log("The whole response ",res);
      //function test (){self.setState(()=>{return {errors:res.data.errors}})};
      //console.log(self);
      //self.setState( {errors:res.data.errors});
      return res.data.errors || []
    })

    return test;

  }
  TestProcess(){
    axios.post("http://localhost:3000/api/test", { 
      title:"this is a test title",
      message:"this is a test message"
    }).then((res)=>{
      console.log(res);
    })
  }
  getProfile(){
    var profile = axios.post("http://localhost:3000/api/profile").then((res)=>{
      console.log('res from profile')
      console.log(res);
      return res;
    })

    return profile; 
  }

   fetchUpload(element) {
    console.log(element);
    var files = element.files;
    console.log(files);
    const formData = new FormData();
    formData.append('testFile',files[0])
    fetch("http://localhost:3000/api/testUpload",{
        method: 'POST',
        body: formData,
    }).then((res)=>{console.log(res)}).catch(console.log)
    
    
    

}

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          openModal:this.openModal,
          closeModal:this.closeModal,
          increment:this.increment,
          decrement:this.decrement,
          removeItem:this.removeItem,
          clearCart:this.clearCart,
          LoginProcess:this.LoginProcess,
          SignUpProcess:this.SignUpProcess,
          TestProcess:this.TestProcess,
          getProfile:this.getProfile,
          fetchUpload:this.fetchUpload
          //state:this.state
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductProvider };
