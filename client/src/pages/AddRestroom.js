import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
};

const initialFormState = {
  // coordinates: "",
  // location: "",
  // keyCode: "",
  // changingStation: "",
  // aDA: "",
};

export default function AddRestroom() {
  
  // need auth
  // const { isLoggedIn, login, loading, error } = useAuth();
  // const { loading, error } = useAuth();
  // const [formState, setFormState] = useState(initialFormState);

  // useEffect(() => {
  //   if (error) {
  //     // TODO: replace window alert with custom alert
  //     alert(error);
  //   }
  // }, [error]);

  // const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setFormState((prevState) => ({ ...prevState, [name]: value }));
  // };

  // const handleSubmit = async (evt) => {
  //   evt.preventDefault();
  //   // login(formState);
  // };


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
              Add A Restroom
            </Typography>
            {/* <form onSubmit={handleSubmit}> */}
            <form >
              <Grid container spacing={2}>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Coordinates
                  </Typography>
                  <TextField
                    // label="Coordinates"
                    placeholder="Insert coordinates"
                    fullWidth
                    required
                    name="coordinates"
                    // disabled={loading}
                    // value={formState.coordinates.value}
                    // onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Location
                  </Typography>
                  <TextField
                    // label="Location"
                    placeholder="Enter store, gas station, etc."
                    fullWidth
                    required
                    name="location"
                    // disabled={loading}
                    // value={formState.location.value}
                    // onChange={handleInputChange}
                  />
                </Grid>
                <Grid xs={12} item>
                <FormControlLabel
                  value="Key / code required"
                  control={<Checkbox />}
                  label="Key / code required"
                  labelPlacement="start"
                  
                  // onChange={handleChange}
                  // checked={checked}
                />
                </Grid>
                <Grid xs={12} item>
                <FormControlLabel
                  value="Changing station"
                  control={<Checkbox />}
                  label="Changing station"
                  labelPlacement="start"
                  
                  // onChange={handleChange}
                  // checked={checked}
                />
                </Grid>
                <Grid xs={12} item>
                <FormControlLabel
                  value="ADA"
                  control={<Checkbox />}
                  label="ADA"
                  labelPlacement="start"
                  
                  // onChange={handleChange}
                  // checked={checked}
                />
                </Grid>
                <Grid xs={12} item>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    type="submit"
                    // disabled={loading}
                  >
                    Submit
                    {/* {loading ? "Loading..." : "Submit"} */}
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
