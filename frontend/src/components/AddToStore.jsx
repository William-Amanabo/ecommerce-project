import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import Title from './Title'
import {Link} from 'react-router-dom'

var hide = {
    visibility: "hidden"
}
export default class AddToStore extends Component {
    
    render() {
        return (
            <React.Fragment>
                 <div className='py-5'>
                     <div className="container">
                         <Title  name='our' title='Products'/>
                         <div className="row">
                         <form action="http://localhost:3001/api/store" method="post" /* encType='multipart/form-data' */ >
                             <div>Title</div>
                             <div><input type="text" name ='title' id="title"/></div>
                            <div>Price:</div>
                             <div><input type="text" name ='price' id="price"/></div>
                             <div>Company</div>
                             <div><input type="text" name ='company' id="company"/></div>
                             <div>Info</div>
                             <div><textarea type="text" name ='info' id="info"/></div>
                             <div>AMOUNT IN STOCK</div>
                             <div><input type="text" name = 'amount' id= 'amount'/></div>
                             {/* <div style={hide}>Incart</div>
                             <div><input type="text" name ='incart' id="incart" value="false" style={hide}/></div>
                             <div style={hide}>Count</div>
                             <div style={hide}><input type="text" name ='count' id="count" value="0" style={hide}/></div>
                             <div style={hide}>Total</div>
                             <div><input type="text" name ='total' id="total" value="0" style={hide}/></div> */}
                             <input type="submit" className ='btn btn-primary' value="ADD TO STORE"></input>
                             <Link to='/addtostore_image'>ADD AN IMAGE</Link>
                        </form>                             
                         </div>
                     </div>
                 </div>
            </React.Fragment>
        )
    }
}
