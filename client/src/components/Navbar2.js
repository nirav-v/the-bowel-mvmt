import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {/* Bowel Mvmt */}
          </Typography>

          <Button
            sx={{ my: 2, color: "black", display: "block" }}
            size="large"
            href="/signup"
          >
            {/* <NavLink to="/signup"> */}
            Signup
            {/* </NavLink> */}
          </Button>
          <Button
            sx={{ my: 2, color: "black", display: "block" }}
            size="large"
            href="/login"
          >
            {/* <NavLink to="/login"> */}
            Login
            {/* </NavLink> */}
          </Button>
          <BMLogo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        </Toolbar>
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
