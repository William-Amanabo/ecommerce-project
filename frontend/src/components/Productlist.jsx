import React, { Component } from 'react'
//import Product from './Product'
import Title from './Title'
import {storeProducts} from '../data'
import {ProductConsumer} from '../context'

import Product2 from './Product2';

export default class Productlist extends Component {
    //TODO uncommented the state initialization
    state={
        products: storeProducts
    }
    render() {
        return (
             // <Product/>
             <React.Fragment>
                 <div className='py-5'>
                     <div className="container">
                         <Title  name='our' title='Products'/>
                         <div className="row">
                             <ProductConsumer>
                                 {(value)=> {
                                     return value.products.map(product =>{
                                         return <Product2 key={product.id} product = {product}/>
                                     })
                                 }}
                             </ProductConsumer>
                         </div>
                     </div>
                 </div>
             </React.Fragment>
        )
    }
}
