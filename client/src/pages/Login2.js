import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import blueToilets from "../images/blue_toilets.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// This signup form is intentionally minimalist to reduce effort required to
// customize it to your app's needs. See the excellent best practices guide for
// sign informs on web.dev https://web.dev/sign-in-form-best-practices/

// TODO: customize styles or import styles with favorite css approach
const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em",
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
  paperContainer: {
    backgroundImage: `url(${blueToilets})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
};

const initialFormState = {
  email: "",
  password: "",
};

export default function Login2() {
  const { isLoggedIn, login, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const location = useLocation();

  useEffect(() => {
    if (error) {
      // TODO: replace window alert with custom alert
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    login(formState);
  };

  if (isLoggedIn) {
    // navigate to page user was redirected from or the user page.
    const from = location.state?.from?.pathname || "/userPage";
    return <Navigate to={from} replace />
  }

  console.log(formState.email)

  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Card
          // style={{ maxWidth: 650, padding: "20px 5px", borderRadius: "16px", backgroundColor: 'transparent', }}
          style={{ maxWidth: 650, padding: "20px 5px", borderRadius: "16px", opacity: .9 }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Email
                  </Typography>
                  <TextField
                    // label="Email"
                    placeholder="Enter email"
                    fullWidth
                    required
                    type="email"
                    disabled={loading}
                    value={formState.email.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Password
                  </Typography>
                  <TextField
                    // label="Password"
                    placeholder="Enter password"
                    fullWidth
                    required
                    type="password"
                    disabled={loading}
                    value={formState.password.value}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {/* Submit */}
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
