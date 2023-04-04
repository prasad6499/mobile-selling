import React, { useState } from "react";
import axios from "axios";

import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8000/api/v1";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleResetPassword = async () => {
    console.log("Reset Passwoird");
    const data = {
      email: email,
      password: password,
    };

    console.log("data", data);
    if (!email) throw "Invalid Data";
    if (!password) throw "Invalid Data";
    try {
      const response = await axios({
        method: "put",
        url: BASE_URL + "/auth/reset-password",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Password reset successfull");
        console.log("Response Data", response.data);
        navigate("/login-register");
      } else {
        throw "Error Occured";
      }
      // console.log("Response Data", response.data);
    } catch (err) {
      alert("Password reset failed");
    }
  };

  return (
    <div style={{ paddingLeft: "30%", paddingTop: 150 }}>
      <Box noValidate sx={{ mt: 3, width: 400 }}>
        <Typography sx={{ marginBottom: 5 }}>Reset Password</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          onClick={() => handleResetPassword()}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
      </Box>
    </div>
  );
};

export default ForgetPassword;
