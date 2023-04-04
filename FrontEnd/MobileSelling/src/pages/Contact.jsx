import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Card.css";
import Header from "../components/Header";
import Prasad from "../images/Prasad.jpg"

class Contact extends Component {
  render() {
    return (
      <>
      <Header/>
        <div class="bg-image" style={{marginTop:60}}>
          <Container>
            <Row>
           
             <div>
                
                     <h1><center> Contact Us</center></h1>
                     <br />
                     <br />
                
                </div>
                <div
        className="row"
        style={{  marginTop: 50}}
      >
        <div className="col"style={{marginLeft: 200,marginRight: 200 }}>
          
          <img
            src={Prasad}
            className="card-img-top"
            style={{
              marginLeft: 200,
              height: 250,
              width: 200,
              boxShadow: "0px 4px 18px 3px rgba(0,0,0,0.38)",
              display: "block",
              borderRadius: 5,
            }}
            alt="..."
          />
          <div style={{ marginLeft: -100, marginTop: 10 }}>
            {" "}
            <h5 style={{ textAlign: "center" }}>Prasad Vijay Pawar</h5>
          </div>
          <div
            style={{
              marginLeft: 170,
              marginTop: 10,
              marginBottom: 20,
              color: "blue",
            }}
          >
            {" "}
            <h7 style={{ textAlign: "center" }}>prasadvijaypawar6499@gmail.com</h7>
          </div>
        </div>
</div>
              
 
            </Row>
            
          </Container>
        </div>
      </>
    );
  }
}

export default Contact;
