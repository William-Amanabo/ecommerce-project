import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import styled from 'styled-components'
import {ButtonContainer} from './Button'
import { Link } from 'react-router-dom'

//import {ButtonContainer} from './Button'

export default class Profile extends Component {
    state = {
        user:[]
    }
    
    render() {
        return (
            <ProductConsumer>
            {
                (value)=>{
                    var {getProfile} = value;
                    var profilePic = "http://localhost:3001/api/profilePic/"+this.state.user.profilePic+"";
                    if(this.state.user.length === 0){getProfile().then((res)=>{this.setState({user:res.data})})}
                    //if(this.state.user.length > 0){ profilePic = "http://localhost:3001/api/profilePic:"+this.state.user.profilePic+"";}
                    console.log("this is profilePic"+profilePic);
                    return(
                        <LoginWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                        <div className="card">
                    <p>Your Name is : {this.state.user.name}</p>
                    <p>Your email is : {this.state.user.email}</p>
                    <p><img src={profilePic} alt=""/></p>
                    <form action="http://localhost:3001/api/profilePic" method="post" encType='multipart/form-data'>
                        <div className="custom-file mb-3">
                        <input type="file" name="file" id="file"/>
                        </div>
                        <input type="submit" className ='btn btn-primary' value="Upload Profile Picture"/>
                    </form>
                        </div>
                        <Link to='/addtostore' >
                            <ButtonContainer>
                                ADD ITEM TO STORE
                            </ButtonContainer>
                        </Link>

                    </LoginWrapper>
                      )
                }
            }
        
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