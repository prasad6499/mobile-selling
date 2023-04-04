import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/ModeEditRounded";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import {InputLabel, FormControl, Select, MenuItem, Grid, TextField, Box, Button, IconButton , Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from "@mui/material";

const BASE_URL = "http://localhost:8000/api/v1";

export default function ProductCard({ product }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");


  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [category, setcategory] = useState(product.category);
   
   
    const [image, setImage] = useState(product.imagePath);
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);

  const navigate = useNavigate()

  // const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    const data = {
      productId: product.productId,
      quantity: quantity,
    };

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/cart/add-item",
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("response data: ", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const deleteProduct = async ()=> {
    try {
      const response = await axios({
        method: "delete",
        url: BASE_URL + "/products/"+product.productId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (response.data) {
        console.log("response data: ", response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const editProduct = async ()=> {
    const formData = new FormData(); 
        formData.append("category", category);
        
        formData.append("price", price);
        formData.append("name", name);
        formData.append("image", image);
    
    
        try {
          const response = await axios({
            method: "put",
            url: BASE_URL + "/products/"+product.productId,
            data: formData,
            headers: { "content-type": "multipart/form-data",
          "Authorization": "Bearer "+localStorage.getItem("token") },
          });

          console.log("Response Edit: ", response)
          if (response.data) {
            setSuccess(true);
            
              navigate("/")
            
          }else{
            throw "Error occured while adding food item."
          }
          console.log("Response status", response.data);
    
        } catch (err) {
          setError(true);
          setTimeout(() => setError(false), 5000);
        }
      

    setOpen(false)

  }

  return (
    <Box>
    <Card style={{ border: "1px solid" }} sx={{ width: 340 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.name.substring(0, 1)}
          </Avatar>
        }
        action={
          role==="OWNER"&&<Box display="flex">
            <IconButton onClick={()=> setOpen(true)} aria-label="delete">
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteProduct} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        }
        title={product.name}
        subheader={product.category}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.imagePath}
        alt="Paella dish"
      />
      <CardContent>
        <Box display="flex">
          <Typography variant="h5" color="text.secondary">
            Price :
          </Typography>
          <Typography variant="h4" sx={{ marginLeft: "auto" }}>
            {product.price}
          </Typography>
        </Box>

        <TextField
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          id="quantity"
          placeholder="Choose Quantity"
          type="number"
          variant="outlined"
        />
      </CardContent>
      <CardActions disableSpacing>
        <Button
          onClick={addToCart}
          fullWidth
          color="success"
          variant="contained"
        >
          Add to Cart
        </Button>
      </CardActions>

    </Card>
    <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Edit Food Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
                <TextField
                 value={name}
                  required
                  fullWidth
                  id="foodname"
                  label="Food Name"
                  name="foodName"
                  onChange={(e) => {setName(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                 value={price}
                  required
                  fullWidth
                  id="foodPrice"
                  label="Food Price"
                  name="foodPrice"
                  type="number"
                  sx={{ minWidth: "100%" }}
                  onChange={(e) => {setPrice(e.target.value)
                  }}
                />
              </Grid>
          
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Food category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Food category"
                    onChange={(e) => { setcategory(e.target.value)
                     
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                    <MenuItem value={"Non-Vegetarian"}>Non-Vegetarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
             
              <Grid item xs={12}>
                <Typography>Attach Image</Typography>
                <TextField
                  fullWidth
                  name="image"
                  label=""
                  type="file"
                
                  onChange={(e) => {setImage(e.target.files[0])
                    
                  }}
                />
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={editProduct}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
