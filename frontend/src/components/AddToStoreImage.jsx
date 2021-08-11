import React, { Component } from 'react'
import styled from 'styled-components'

export default class AddToStoreImage extends Component {

    state=this.props.sendState;

    render() {
        return (
            <LoginWrapper className='col-9 mx-auto col-md-6 col-lg-3 my-3'>
                        <div className="card">
                             <div>ADD AN IMAGE</div>
                             <form action="http://localhost:3001/api/store_image" method="post" encType='multipart/form-data'>
                                <div className="custom-file mb-3">
                                <input type="file" name="file" id="file"/>
                                </div>
                                <input type="submit" className ='btn btn-primary' value="UPLOAD"/>
                            </form>
                        </div>
            </LoginWrapper>
        )
    }
}

const LoginWrapper = styled.div`
.card {
    border-color: transparent;
    transition: all 1s linear;
  }
`
