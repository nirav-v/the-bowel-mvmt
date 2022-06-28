import { useEffect, useState } from "react";
// import { useLocation, Navigate } from "react-router-dom";
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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useMutation } from "@apollo/client";
import { CREATE_RESTROOM } from "../util/mutations";
import { useCoords } from "../components/nearbyRestroomsList";
import { Switch } from "@mui/material";
import cat from "../images/cat.gif";
import Swal from "sweetalert2";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const initialFormState = {
  latitude: "",
  longitude: "",
  location: "",
};

export default function AddRestroom() {
  const { loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [checkedThree, setCheckedThree] = useState(false);
  const [currentCoordsChoice, setCurrentCoordsChoice] = useState(false);

  const userCoords = useCoords();

  const [
    createRestroom,
    { data, loading: loadingRestroom, error: errorRestroom },
  ] = useMutation(CREATE_RESTROOM);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
  };

  const handleChangeTwo = () => {
    setCheckedTwo(!checkedTwo);
  };

  const handleChangeThree = () => {
    setCheckedThree(!checkedThree);
  };

  const handleCurrentCoords = () => {
    setCurrentCoordsChoice(!currentCoordsChoice);
    // console.log(!currentCoordsChoice);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formState);

    try {
      if (currentCoordsChoice === true) {
        createRestroom({
          variables: {
            areaDescription: formState.location,
            changingStation: checkedTwo,
            keyRequired: checkedOne,
            adaAccessible: checkedThree,
            lat: userCoords.coords.lat,
            lon: userCoords.coords.lon,
          },
        });
      } else {
        createRestroom({
          variables: {
            areaDescription: formState.location,
            changingStation: checkedTwo,
            keyRequired: checkedOne,
            adaAccessible: checkedThree,
            // lat: parseFloat(formState.latitude), //using coords that the user manually enters instead
            // lon: parseFloat(formState.longitude),
            lat: Math.min(Math.max(parseFloat(formState.latitude), -90), 90),
            lon: Math.min(Math.max(parseFloat(formState.longitude), -180), 180),
          },
        });
      }
      // alert("New restroom has been added successfully!");
      Swal.fire({
        icon: "success",
        title: "New restroom has been added successfully!",
        backdrop: `
          rgba(0,0,123,0.4)
          url(${cat})
          left top
          no-repeat
          `,
      });
    } catch (err) {
      console.log(err);
      // alert("Error, please check your entries or try again later");
      Swal.fire({
        icon: "error",
        title: "Error, please check your entries or try again later",
        // text: error,
        backdrop: `
          rgba(0,0,123,0.4)
          `,
      });
    }

    setFormState({
      latitude: "",
      longitude: "",
      location: "",
    });

    setCheckedOne(false);
    setCheckedTwo(false);
    setCheckedThree(false);
  };

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
          style={{
            maxWidth: 650,
            padding: "20px 5px",
            borderRadius: "16px",
            opacity: 0.9,
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              Add A Restroom
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
                    <FormControlLabel
                      control={<Switch checked={currentCoordsChoice} />}
                      label="Use my Current Location"
                      labelPlacement="start"
                      onChange={handleCurrentCoords}
                    />
                  </Typography>
                  {!currentCoordsChoice ? (
                    <div>
                      OR Paste Coordinates Manualy Below
                      <TextField
                        label="Latitude ( leave blank if using current location )"
                        placeholder="Insert latitude"
                        fullWidth
                        required
                        name="latitude"
                        disabled={loading}
                        value={formState.latitude}
                        onChange={handleInputChange}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9.-]*",
                        }}
                        id="margin-normal"
                        margin="normal"
                      />
                      <TextField
                        label="Longitude ( leave blank if using current location )"
                        placeholder="Insert longitude"
                        fullWidth
                        required
                        name="longitude"
                        disabled={loading}
                        value={formState.longitude}
                        onChange={handleInputChange}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9.-]*",
                        }}
                      />
                    </div>
                  ) : null}
                </Grid>
                <Grid xs={12} item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="p"
                    color="textSecondary"
                  >
                    Give this restroom a name
                  </Typography>
                  <TextField
                    placeholder="Enter area description, like store, gas station, etc."
                    fullWidth
                    required
                    name="location"
                    disabled={loading}
                    value={formState.location}
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormControlLabel
                    control={<Checkbox checked={checkedOne} />}
                    label="Key / code required"
                    labelPlacement="start"
                    onChange={handleChangeOne}
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormControlLabel
                    control={<Checkbox checked={checkedTwo} />}
                    label="Changing station"
                    labelPlacement="start"
                    onChange={handleChangeTwo}
                  />
                </Grid>
                <Grid xs={12} item>
                  <FormControlLabel
                    control={<Checkbox checked={checkedThree} />}
                    label="ADA"
                    labelPlacement="start"
                    onChange={handleChangeThree}
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
