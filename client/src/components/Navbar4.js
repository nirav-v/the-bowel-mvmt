import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import BMLogo from "./logo";
// import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function Navbar4() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          {/* <Grid container spacing={1} alignItems="center" direction="row" justifyContent="flex-end"> */}
          <Grid
            container
            spacing={1}
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Stack
              spacing={{ xs: 2, sm: 3, md: 5 }}
              direction={{ xs: "column", sm: "row" }}
            >
              {/* <Grid item xs={12} md={4}> */}
              <BMLogo />
              {/* </Grid> */}
              {/* <Grid item xs={12} md={8}> */}
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
                    href="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{ my: 2, color: "black", display: "block" }}
                    size="large"
                    href="/signup"
                  >
                    Signup
                  </Button>
                </>
              )}
              {/* </Grid> */}
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
