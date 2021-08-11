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
                  const {LoginProcess,TestProcess} = value;

                  return(
                    <LoginWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                    <div className="card">
                        <img src="../../public/favicon.ico" alt="" className="align-content-lg-center"/>
                        <form action="#" >
                        <p><input id = 'username' type="username" placeholder='Username' className='from-control'/></p>
                        <p><input id = 'password' type="password" placeholder='Password' className='from-control'/></p>
                        <p><ButtonContainer type='button' onClick={()=>{LoginProcess(document.getElementById("username").value,document.getElementById("password").value); return false;}} >LOGIN IN</ButtonContainer></p>
                        <p><ButtonContainer type='button' onClick={()=>{TestProcess()}} >Test</ButtonContainer></p>
                        </form>
                        
                        <p><Link to='/signup'>sign up</Link></p>
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
