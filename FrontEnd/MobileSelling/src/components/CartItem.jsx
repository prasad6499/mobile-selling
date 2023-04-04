import React, {useState, useEffect} from 'react'

import { Box, Avatar, Card, CardHeader, CardContent, Typography, Button, CardActions } from '@mui/material'
import { red } from '@mui/material/colors';

import { useNavigate } from "react-router-dom";


import axios from 'axios'

const BASE_URL = "http://localhost:8000/api/v1";

const CartItem = ({item}) => {

  const token = localStorage.getItem("token");

  const navigate = useNavigate()


  const removeFromCart = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: BASE_URL + "/cart/remove-item/"+item.itemId,
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("Response status", response.data);
        navigate("/cart")
        
      }
    } catch (err) {
     
      console.log(err);
    }
  };


  return (
    <div>
      <Card style={{border: "1px solid"}} sx={{ width: 700 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.product.name.substring(0,1)}
          </Avatar>
        }
       
        title={<Box display="flex"><Typography>{item.product.name}</Typography>
          <Typography sx={{marginLeft: "auto"}}>{item.quantity}</Typography>
        </Box>}
        // subheader={product.category}
      />
     
      <CardContent>
          <Box display="flex" >
          <Typography variant="h7" color="text.secondary">
         Price :
        </Typography>
        <Typography variant="h7" sx={{marginLeft: "auto"}}>
            {item.quantity*item.product.price}
        </Typography>
          </Box>
       
      
      </CardContent>
      <CardActions disableSpacing>
      <Button sx={{marginLeft: "auto"}} onClick={removeFromCart} color="success" variant="contained">Remove</Button>
       
      </CardActions>
     
    </Card>

    </div>
  )
}

export default CartItem