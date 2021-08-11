import React, { Component } from 'react'
import { Link } from  'react-router-dom'
import logo from '../logo.svg' // need to get a logo from icon finder
import styled from 'styled-components';
import { ButtonContainer } from './Button'

export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
                {/* this for adding homage to the icon makers*/}
                <Link to='/'>
                    <img src={logo} alt='store' className="navbar-brand" />
                    </Link>
                    <ul className='navbar-nav align-items-center'>
                        <li className='nav-item ml-5'>
                            <Link to='/' className='nav-link'>
                                Products
                            </Link>
                        </li>
                    </ul>
                    <Link to='/cart' className='ml-auto' >
                        <ButtonContainer>
                            <span className='mr-2' >
                            <i className="fas fa-cart-plus"></i>
                            </span>
                            MyCart
                        </ButtonContainer>
                    </Link>
                    <Link to='/login' className='ml-auto' >
                        <ButtonContainer>
                            <span className='mr-2' >
                            <i className="fas fa-cart-plus"></i>
                            </span>
                            Login
                        </ButtonContainer>
                    </Link>
                    <Link to='/profile' className='ml-auto' >
                        <ButtonContainer>
                            <span className='mr-2' >
                            <i className="fas fa-cart-plus"></i>
                            </span>
                            Profile
                        </ButtonContainer>
                    </Link>
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link{
        color:var(--mainWhite) !important;
        font-size: 1.3rem; 
        text-transform: capitalize !important;
    }
`
//1rem = 16px