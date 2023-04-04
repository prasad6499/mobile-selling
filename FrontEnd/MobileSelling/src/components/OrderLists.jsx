import React, {useState, useEffect} from 'react'

import Header from '../components/Header'
import OrderItem from "../components/OrderItem"

import {Grid, Box, Button, Typography, Card} from "@mui/material"


import axios from "axios"
import { useNavigate } from 'react-router-dom'

const BASE_URL = "http://localhost:8000/api/v1";



const OrderList = ({orderdata}) => {

    const navigate = useNavigate()

    const [orderItems, setOrderItems] = useState(orderdata.orderItems);

    const [order, setOrder] = useState(orderdata);

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    console.log("Order Itemss", orderdata)

  

  useEffect(() => {
    if(role!=="OWNER"){
      navigate("/")
  }
    
  }, []);


//   const cancelOrder = async ()=> {

//     try {
//         const response = await axios({
//           method: "delete",
//           url: BASE_URL + "/orders/cancel-order",
//           headers: {
//             "content-type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//         });
  
//         if (response.data) {
//           console.log("Response status", response.data.orderItems);
         
//           setOrderItems(response.data.orderItems);

//           navigate("/")
//         }
  
//         // setTimeout(() => setSuccess(false), 5000);
//       } catch (err) {
//         // setError(true);
//         // setTimeout(() => setError(false), 5000);
//         console.log(err);
//       }
//     };
  
  
    const updateStatus = async ()=> {

      try {
          const response = await axios({
            method: "put",
            url: BASE_URL + "/orders/change-status/"+orderdata.orderId,
            headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
    
          if (response.data) {
            // console.log("Response status", response.data.orderItems);
           
            // setOrderItems(response.data.orderItems);
            
  
            navigate("/owner/all-orders")
          }
    
          // setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
          // setError(true);
          // setTimeout(() => setError(false), 5000);
          console.log(err);
        }
      };
    
    

//   const loadOrderItems = async () => {
//     try {
//       const response = await axios({
//         method: "get",
//         url: BASE_URL + "/orders/my-order",
//         headers: {
//           "content-type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });

//       if (response.data) {
//         console.log("Response status", response.data.orderItems);
//        setOrder(response.data)
//         setOrderItems(response.data.orderItems);
//         console.log("orderItems", order);
//       }

//       // setTimeout(() => setSuccess(false), 5000);
//     } catch (err) {
//       // setError(true);
//       // setTimeout(() => setError(false), 5000);
//       console.log(err);
//     }
//   };

  
  return (
    <React.Fragment>
        <Header/>

        {orderItems && orderItems.length!==0 &&
        <Card sx={{marginTop:5, margin:10, border: "1px solid", width: 700}}>

        
       
        <Grid container spacing={2}>
            {orderItems && orderItems.map(item => <Grid item>
                    <OrderItem item={item}/>
                </Grid>)}

        </Grid> 
        <Box sx={{paddingLeft: 5, paddingRight: 5, marginTop: 4}} display="flex">
          <Typography variant="h8">Total Price: </Typography>
          <Typography sx={{marginLeft: "auto"}} variant="h8">{order.totalPrice}</Typography>

        </Box>
        <Box sx={{paddingLeft: 5, paddingRight: 5}} display="flex">
          <Typography variant="h8">Order Status: </Typography>
          <Typography sx={{marginLeft: "auto"}} variant="h8">{order.orderStatus}</Typography>

        </Box>

        <Box sx={{paddingLeft: 5, paddingRight: 5}} display="flex">
        <Typography variant="h8">Payment Status: </Typography>
          <Typography sx={{marginLeft: "auto"}} variant="h8">{order.paymentStatus}</Typography>

        </Box>

   <Button sx={{marginLeft: "auto", width:700, marginTop: 5}} onClick={updateStatus} color="primary" variant="contained">Update Status to Delivered</Button>

        </Card>}

    </React.Fragment>
  )
}

export default OrderList