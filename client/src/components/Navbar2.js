import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BMLogo from "./logo";
// import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";

export default function Navbar2() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BMLogo sx={{ display: { xs: "none", md: "flex" }, ml: 1 }} />
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            {isLoggedIn ? (
              <>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/userpage"
                >
                  User Home
                </Button>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/"
                >
                  Home
                </Button>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/signup"
                >
                  Signup
                </Button>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/login"
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
