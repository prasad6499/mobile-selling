import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Grid, Box } from "@mui/material";
import axios from 'axios'

const productList = ["", "", "", "", "", "", ""];

const BASE_URL = "http://localhost:8000/api/v1";

const ProductList = () => {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL + "/products/all",
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.data) {
        console.log("Response status", response.data);
        console.log("Crime", products);
        setProducts(response.data);
      }

      // setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      // setError(true);
      // setTimeout(() => setError(false), 5000);
      console.log(err);
    }
  };

  return (
    <Box sx={{ margin: 10, marginTop: 15 }}>
      <Grid container spacing={12} orientation="horizontal">
        {products && products.map((item) => (
          <Grid item>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
