import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import BMLogo from "./logo";
import { useAuth } from "../util/auth";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "./Navbar.css";
// import { ClassNames } from "@emotion/react";

export default function Navbar4() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          <Grid
            container
            spacing={0}
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <div style={{ padding: "18px 20px 0px 20px" }}>
              <BMLogo />
            </div>
            <Stack direction={{ xs: "column", sm: "row" }}>
              {isLoggedIn ? (
                <>
                  <Button
                    sx={{
                      py: 2,
                      mx: 2,
                      my: 0,
                      color: "black",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    size="large"
                    href="/userpage"
                  >
                    User Home
                  </Button>
                  <Button
                    sx={{
                      py: 2,
                      mx: 2,
                      my: 0,
                      color: "black",
                      display: "block",
                      fontWeight: "bold",
                    }}
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
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    size="large"
                    href="/"
                  >
                    Home
                  </Button>
                  <Button
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    size="large"
                    href="/login"
                  >
                    Login
                  </Button>
                  <Button
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    size="large"
                    href="/signup"
                  >
                    Signup
                  </Button>
                </>
              )}
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
