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
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <BMLogo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

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
