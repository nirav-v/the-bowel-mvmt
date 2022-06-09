// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// // import { NavLink } from "react-router-dom";
// import { useAuth } from "../util/auth";

// export default function ButtonAppBar() {
//   const { isLoggedIn, logout } = useAuth();
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
//             Bowel Mvmt
//           </Typography>
//           <Button color="inherit" size="large" href="/signup">
//           {/* <NavLink to="/signup"> */}
//             Signup
//           {/* </NavLink> */}
//           </Button>
//           <Button color="inherit" size="large" href="/login">
//           {/* <NavLink to="/login"> */}
//             Login
//           {/* </NavLink> */}
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }

// ----- for tab style ----------
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Signup" href="/signup" />
        <Tab label="Login" href="/login" />
      </Tabs>
    </Box>
  );
}
