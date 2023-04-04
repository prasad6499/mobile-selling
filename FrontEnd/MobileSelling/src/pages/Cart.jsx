import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import CartItem from "../components/CartItem";

import { Grid, Box, Button, Typography } from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const BASE_URL = "http://localhost:8000/api/v1";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState();
  const [cart, setCart] = useState();

  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const [cardNumberError, setCardNumberError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState(null);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    loadcartItems();
  }, []);

  const placeOrder = async () => {
    if (cardNumber.length !== 16) {
      setCardNumberError(true);
      setError(true);
    }

    if (name === null) {
      setNameError(true);
      setError(true);
    }

    if (expiry.length !== 5) {
      setExpiryError(true);
      setError(true);
    }

    if (cvv.length !== 3) {
      setCvvError(true);
      setError(true);
    }

    if (error) return;

    console.log("ErroeLLL", error);

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/orders/place-order",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("Response status", response.data.cartItems);

        setCartItems(response.data.cartItems);
        console.log("cartItems", cartItems);
        setOpen(false);
        navigate("/my-orders");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadcartItems = async () => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL + "/cart/",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("Response status", response.data.cartItems);

        setCart(response.data);
        setCartItems(response.data.cartItems);

        console.log("cart Data: ", response.data);
        console.log("cartItems", cartItems);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Header />

      {cartItems && cartItems.length !== 0 ? (
        <Box sx={{ marginTop: 15, margin: 10 }}>
          <Grid container spacing={2}>
            {cartItems &&
              cartItems.map((item) => (
                <Grid item>
                  <CartItem item={item} />
                </Grid>
              ))}
          </Grid>

          <Box display="flex" sx={{ marginTop: 3 }}>
            <Typography variant="h7">Total Price: </Typography>
            <Typography sx={{ marginLeft: "auto" }} variant="h7">
              {cart.totalPrice}{" "}
            </Typography>
          </Box>

          <Button
            sx={{ marginLeft: "auto", width: 700, marginTop: 5 }}
            onClick={() => setOpen(true)}
            color="primary"
            variant="contained"
          >
            Pay and Place Order
          </Button>
        </Box>
      ) : (
        <Box sx={{ marginTop: 15, marginLeft: 30 }}>
          <Typography variant="h4">Your cart is empty</Typography>
        </Box>
      )}

      <Dialog maxWidth="xs" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Box sx={{ height: 80, backgroundColor: "primary.main" }}>
            <Box sx={{ marginLeft: 20, marginTop: 0 }}>
              <Typography>Cars Payment </Typography>
              {cart && <Typography> ₹ {cart.totalPrice} </Typography>}
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                label="Card Number"
                name="cartNumber"
                error={cardNumberError}
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  setCardNumber(e.target.value);
                  setCardNumberError(false);
                }}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Expiry"
                name="expiry"
                error={expiryError}
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  setExpiry(e.target.value);
                  setExpiryError(false);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="Card Holder's Name"
                name="cardHoldersName"
                error={nameError}
                variant="outlined"
                required
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                label="CVV"
                name="cvv"
                variant="outlined"
                error={cvvError}
                required
                fullWidth
                type="number"
                onChange={(e) => {
                  setCvv(e.target.value);
                  setCvvError(false);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            sx={{ marginTop: 5 }}
            onClick={placeOrder}
            color="primary"
            variant="contained"
          >
            Pay ₹{cart ? cart.totalPrice : "00"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Cart;
