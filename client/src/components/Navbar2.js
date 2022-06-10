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
import Grid from "@mui/material/Grid";

const styles = {
  logoStyle: {
    justifyContent: "left",
  },
};

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

//         <Toolbar>
//           {/* <Grid container spacing={1} alignItems="center" direction="row" justifyContent="flex-end"> */}
//           <Grid
//             container
//             spacing={1}
//             alignItems="center"
//             direction="row"
//             justifyContent="space-between"
//           >
//             <Grid item sm={7} md={5}>
//               {/* <BMLogo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
//               <BMLogo />
//             </Grid>
//             <Grid item sm={5} md={5}></Grid>


            {isLoggedIn ? (
              <>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  size="large"
                  href="/userpage"
                >
                  Home
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

//           </Grid>
//         </Toolbar>

      </AppBar>
    </Box>
  );
}

// ----- for tab style ----------
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

// export default function CenteredTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
//       <Tabs value={value} onChange={handleChange} centered>
//         <Tab label="Signup" href="/signup" />
//         <Tab label="Login" href="/login" />
//       </Tabs>
//     </Box>
//   );
// }
