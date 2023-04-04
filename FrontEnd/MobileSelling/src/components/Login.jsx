import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/api/v1";

const theme = createTheme();

export default function Login({ handleHaveAccount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/auth/login",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("loggedInUser", response.data.userName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", response.data.role);
        console.log("Response Data", response.data);
        navigate("/");
      }
      // console.log("Response Data", response.data);
    } catch (err) {
      setError(true);
      setErrorMessage("Login Failed");
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOpenIcon />
          </Avatar>
          {error && <Alert severity="error">{errorMessage}</Alert>}
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid container direction="row" sx={{marginTop: 3, marginLeft: 5}}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => setShowPassword(!showPassword)}
                        value={showPassword}
                        color="primary"
                      />
                    }
                    label="Show Password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button onClick={()=>navigate("/reset-password")} variant="" sx={{color: "blue"}}>Forgot Password</Button>
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => handleHaveAccount(false)}>
                  <Link href="#" variant="body2">
                    Don't have an account? Register
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider></div>
  );
}



<button onClick={()=> localStorage.clear()}>Log Out</button>