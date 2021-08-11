import React, { Component } from 'react'
import styled from 'styled-components'
import { ButtonContainer } from './Button'
import { Link } from 'react-router-dom'
import {ProductConsumer} from '../context'

export default class SignUp extends Component {

    state ={
        errors:[]
    }

    render() {
        return (
          <ProductConsumer>
              {(value)=>{
                  console.log("this.state.errors ",this.state.errors)
                  const {SignUpProcess} = value;
                  return(
                    <React.Fragment>
                    <SignUpWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                    {this.state.errors.map(item=>(<ButtonContainer cart>{item.msg}</ButtonContainer>))}
                    <div className="card">
                        <img src="public/favicon.ico" alt="" className="align-content-lg-center"/>
                        <form action="#" >
                        <p><input id = 'name' type="text" placeholder='Name' className='from-control'/></p>
                        <p><input id = 'username' type="text" placeholder='Username' className='from-control'/></p>
                        <p><input id = 'email' type="text" placeholder='Email' className='from-control'/></p>
                        <p><input id = 'password' type="text" placeholder='Password' className='from-control'/></p>
                        <p><input id = 'password2' type="text" placeholder='confirm password' className='from-control'/></p>
                        {/* <p>Add a profile picture</p>
                        <p><input id = 'profilePic' type="file"  className='from-control'/></p> */}
                        <p><ButtonContainer type='button' onClick={async ()=>{var test = await SignUpProcess(
                                document.getElementById("name").value,
                                document.getElementById("email").value,
                                document.getElementById("username").value,
                                document.getElementById("password").value,
                                document.getElementById("password2").value,
                                /* document.getElementById("profilePic").value);
                                console.log(document.getElementById("profilePic").files */);
                                //test.then(console.log(this));
                                 this.setState({errors:test})
                                 //setTimeout(console.log(test),0);
                                 }} >Sign up </ButtonContainer></p>
                        </form>
                        
                        <p><Link to='/login'>login</Link></p>
                    </div>
                </SignUpWrapper>
                </React.Fragment>
                  )
                  
              }}
              
          </ProductConsumer>
            
        )
    }
}

const SignUpWrapper = styled.div`
.card {
    border-color: transparent;
    transition: all 1s linear;
  }
`
