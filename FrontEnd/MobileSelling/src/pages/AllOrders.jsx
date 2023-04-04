import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Grid, Box, Button } from "@mui/material";

import axios from "axios";
import Header from "../components/Header";
import OrderList from "../components/OrderLists";

const BASE_URL = "http://localhost:8000/api/v1";

const AllOrders = () => {
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  const [allorder, setAllOrder] = useState();

  useEffect(() => {
    if (role !== "OWNER") {
      navigate("/");
    }
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL + "/orders/all",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("Orders all", response.data);

        setAllOrder(response.data);
        console.log("All Orders", allorder);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <Box sx={{ marginTop: 10 }}>
      <Button sx={{marginLeft: 80, marginTop: 5}} onClick={()=> navigate("/owner/add-product")} color="primary" variant="contained">Add Food Item</Button>
        <Grid container spacing={2}>
          {allorder &&
            allorder.map((order) => (
              <Grid item >
                  <OrderList key={order.orderId} orderdata={order}/>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AllOrders;
