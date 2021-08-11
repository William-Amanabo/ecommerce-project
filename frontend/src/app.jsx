import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Default from './components/Default'
import Details from './components/Details'
import Cart from './components/Cart'
import Productlist from './components/Productlist';
import Modal from './components/Modal'



import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Profile from './components/Profile.jsx';
import AddToStore from './components/AddToStore';
import AddToStoreImage from './components/AddToStoreImage';
import TestUpload from './components/TestUpload';


class App extends Component{
    render(){
        return <React.Fragment>
            <Navbar/>
            <Switch>
                <Route exact path = '/' component={Productlist}></Route>
                <Route path = '/details' component={Details}></Route>
                <Route path = '/cart' component={Cart}></Route>
                <Route path = '/login' component = {Login}></Route>
                <Route path = '/signup' component={SignUp}></Route>
                <Route path = '/profile' component = {Profile}></Route>
                <Route path ='/addtostore' component={AddToStore}></Route>
                <Route path ='/addtostore_image' component={AddToStoreImage}></Route>
                <Route path ='/testUpload' component={TestUpload}></Route>
                <Route component={Default}></Route>
                <Route></Route>
            </Switch>
            <Modal/>
        </React.Fragment>;
        
    }
}

export default App;