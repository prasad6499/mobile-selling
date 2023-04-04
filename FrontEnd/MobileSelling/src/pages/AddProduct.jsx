import React, {useState, useEffect} from 'react'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { InputLabel, FormControl, Select, MenuItem } from "@mui/material";

import Header from '../components/Header';


const BASE_URL = "http://localhost:8000/api/v1";

const theme = createTheme();


const AddProduct = () => {

    const navigate = useNavigate();

    const role = localStorage.getItem("role")
  
    const token = localStorage.getItem("token")

    useEffect(()=>{
        if(role!=="OWNER"){
            navigate("/")
        }
    }, [])
  
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [category, setcategory] = useState();
   
   
    const [image, setImage] = useState(null);
    const [name, setName] = useState(false);
    const [price, setPrice] = useState(false);
    const [formInValid, setFormInValid] = useState(false)


    const addProduct = async (event) => {
        console.log("Form InvalidValid", formInValid)
        const formData = new FormData(); 
        formData.append("category", category);  
        formData.append("price", price);
        formData.append("name", name);
        formData.append("image", image);
        try {
          const response = await axios({
            method: "post",
            url: BASE_URL + "/products/add",
            data: formData,
            headers: { "content-type": "multipart/form-data",
          "Authorization": "Bearer "+localStorage.getItem("token") },
          });
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
      };



  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container style={{ marginTop: 140 }} component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <Alert severity="error">Error occured, while adding Cars item</Alert>
          )}
          {success && (
            <Alert severity="success">Cars Item added successfully</Alert>
          )}
          <Typography component="h1" variant="h5">
            Add a Cars 
          </Typography>
          <Box sx={{ mt: 3 }}>
         <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="carname"
                  label="Car Name"
                  name="carName"
                  onChange={(e) => {setName(e.target.value)
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="carPrice"
                  label="Car Price"
                  name="carPrice"
                  type="number"
                  sx={{ minWidth: "100%" }}
                  onChange={(e) => {setPrice(e.target.value)
                  }}
                />
              </Grid>
          
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ minWidth: "100%" }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Car category
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
                    <MenuItem value={"Regular"}>Regular</MenuItem>
                    <MenuItem value={"EV"}>EV</MenuItem>
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
            <Button
              onClick={addProduct}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Cars 
            </Button>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}

export default AddProduct