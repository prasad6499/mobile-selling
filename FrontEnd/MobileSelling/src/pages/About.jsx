import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Card.css";
import Header from "../components/Header";
class About extends Component {
  render() {
    return (
      <>
      <Header/>
        <div class="bg-image" style={{marginTop:60}}>
          <Container>
            <Row>
           
             <div>
             <br />
                 
                 <br /> <br />
                 
                 <br />
                     <h1><center> About Us</center></h1>
                     <br />
                      <h3><center> Company Name: Mobile World
About: Mobile World is a chain of retail stores that specialize in mobile devices such as smartphones, tablets, and accessories. The company was founded in Vietnam and has since expanded to other countries such as India, Myanmar, and Laos.
Mission Statement: "To bring the latest and best mobile devices to our customers at the most affordable prices."
Core Values: Customer satisfaction, integrity, innovation, teamwork.  </center></h3>
              
                  <br />
                 
                  <br />
                  <br />
                 
                 <br />
                 <br />
                 
                 <br />
                 <br />
                 
                 <br />
                </div>
              
 
            </Row>
            
          </Container>
        </div>
      </>
    );
  }
}

export default About;
