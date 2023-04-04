import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TitleLogo from "../images/CompanyLog.png";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Menu,
  MenuItem,
} from "@mui/material";

export default function Header() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [logOutAnchorEl, setLogOutAnchorEl] = useState(null);

  const openLogout = Boolean(logOutAnchorEl);

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#000" }}>
        <Toolbar>
          <IconButton
            onClick={() => navigate("/")}
            disableRipple
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Box
              component="img"
              sx={{
                width: 30,
                height: 30,
              }}
              alt="Online Canteen"
              src={TitleLogo}
            />
          </IconButton>

          <Box display="flex" sx={{ marginLeft: "auto" }}>
            <Button
              onClick={() => navigate("/")}
              color="inherit"
            >
              Home
            </Button>
            {/* <Button
              onClick={() => window.location.replace("/#menu")}
              sx={{ marginLeft: 3 }}
              color="inherit"
            >
              All Cars
            </Button> */}
            <Button
              onClick={() => navigate("/about")}
              sx={{ marginLeft: 3 }}
              color="inherit"
            >
              About Us
            </Button>
            <Button
              onClick={() =>navigate("/contact")}
              color="inherit"
              sx={{ marginLeft: 3 }}
            >
              Contact Us
            </Button>
          </Box>

          <Box sx={{ marginTop: -5, marginLeft: 5 }}>
            {loggedInUser ? (
              <Box
                display="block"
                onClick={(event) => setLogOutAnchorEl(event.currentTarget)}
                sx={{
                  background: "red",
                  paddingRight: 1,
                  paddingLeft: 1,
                  borderRadius: 2,
                  marginLeft: 3,
                }}
              >
                {" "}
                <Typography
                  variant="h6"
                  sx={{ color: "ThreeDFace", marginTop: 5 }}
                >
                  {" "}
                  {loggedInUser}
                </Typography>
              </Box>
            ) : (
              <Button
                onClick={() => navigate("/login-register")}
                sx={{ color: "white", marginTop: 5 }}
              >
                Login
              </Button>
            )}
          </Box>
          {loggedInUser && (
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{ marginTop: 0, marginLeft: 5 }}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Contact Us</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Phone Number : +91 7770025901
            <br />
            Phone Number : +91 6756437891
          </DialogContentText>
          <br />
          <br />
          <DialogContentText id="alert-dialog-description">
            Email : helpdesk@carsselling.com
            <br />
            Email : carsselling@gmail.com
          </DialogContentText>
          <br />
          <br />
          <DialogContentText id="alert-dialog-description">
            Address: CDAC Acts Patna,Bihar
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="basic-menu"
        anchorEl={logOutAnchorEl}
        open={openLogout}
        onClose={() => setLogOutAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setLogOutAnchorEl(null);
            navigate("/my-orders");
          }}
        >
          My Orders
        </MenuItem>
        {role === "OWNER" && (
          <MenuItem
            onClick={() => {
              setLogOutAnchorEl(null);
              navigate("/owner/add-product");
            }}
          >
            Add Cars Items
          </MenuItem>
        )}
        {role === "OWNER" && (
          <MenuItem
            onClick={() => {
              setLogOutAnchorEl(null);
              navigate("/owner/all-orders");
            }}
          >
            All Orders
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            localStorage.clear();
            setLogOutAnchorEl(null);
            navigate("/");
          }}
        >
          Log Out
        </MenuItem>
      </Menu>
    </Box>
  );
}
