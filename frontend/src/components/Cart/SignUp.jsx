import React, { Component } from 'react'
import styled from 'styled-components'
import { ButtonContainer } from './Button'
import { Link } from 'react-router-dom'
import {ProductConsumer} from '../context'

export default class Login extends Component {
    render() {
        return (
          <ProductConsumer>
              {(value)=>{
                  const {SignUpProcess} = value;

                  return(
                    <LoginWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                    <div className="card">
                        <img src="../../public/favicon.ico" alt="" className="align-content-lg-center"/>
                        <form action="#" >
                        <p><input id = 'name' type="text" placeholder='Name' className='from-control'/></p>
                        <p><input id = 'email' type="email" placeholder='Email' className='from-control'/></p>
                        <p><input id = 'username' type="text" placeholder='Username' className='from-control'/></p>
                        <p><input id = 'password' type="text" placeholder='Password' className='from-control'/></p>
                        <p><input id = 'password2' type="text" placeholder='Confirm Password' className='from-control'/></p>
                        <p><ButtonContainer type='submit' onClick={()=>{
                            SignUpProcess(document.getElementById("name").value,
                            document.getElementById("email").value,
                            document.getElementById("username").value,
                            document.getElementById("password").value,
                            document.getElementById("password2").value
                            ); return false;}} >SignUp</ButtonContainer></p>
                        </form>
                        
                        <p><Link path='/login'>Already have an account? Login here</Link></p>
                    </div>
                </LoginWrapper>
                  )
                  
              }}
              
          </ProductConsumer>
            
        )
    }
}

const LoginWrapper = styled.div`
.card {
    border-color: transparent;
    transition: all 1s linear;
  }
`
