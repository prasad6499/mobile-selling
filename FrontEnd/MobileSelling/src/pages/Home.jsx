import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Carousel} from 'react-bootstrap';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  return (
    <div  className="App" > 
        <Header/>
        <div className="caro">
     <Carousel>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/iphone.jpg`)}
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/M10Motorola.jpg`)}
     
      alt="Second slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/M2Sam.jpg`)}
      
      alt="Third slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/M3One+.jpg`)}
      
      alt="Fourth slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/M6Sonyy.jpg`)}
      
      alt="Fifth slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 sliderimage"
      src={require(`../images/M8HTC.jpg`)}
      
      alt="Sixth slide"
    />

  </Carousel.Item>
 
</Carousel>
<ProductList/>
</div>
<br/>
</div>    

  );
};

export default Home;
