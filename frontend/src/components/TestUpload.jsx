import React, { Component } from "react";
import styled from "styled-components";
import { ProductConsumer } from "../context";

export default class TestUpload extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          var { fetchUpload } = value;
          return (
            <React.Fragment>
              <TestWrapper>
                <div className="custom-file mb-3">
                  <input type="file" name="file" id="file" />
                </div>
                <p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    value="UPLOAD"
                    onClick={()=>{fetchUpload(document.getElementById("file"));return false}}
                  >
                    Submit
                  </button>
                </p>
              </TestWrapper>
            </React.Fragment>
          );
        }}
      </ProductConsumer>
    );
  }
}

const TestWrapper = styled.div`
  .card {
    border-color: transparent;
    transition: all 1s linear;
  }
`;
