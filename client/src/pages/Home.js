import { useAuth } from "../util/auth";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import blueToilets from "../images/blue_toilets.jpeg";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";

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
  divStyle: {
    overflowY: "scroll",
    border: "1px solid red",
    width: "500px",
    // float: "left",
    height: "500px",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    color: "white",
    fontSize: "30px",
  },
};

export default function Home() {
  const { isLoggedIn, user } = useAuth();
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
        <div style={{ textAlignVertical: "center", textAlign: "center" }}>
          {/* TODO: display logged in user's username */}
          <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
          <Card
            style={{
              maxWidth: 650,
              padding: "20px 5px",
              borderRadius: "16px",
              opacity: 0.9,
            }}
          >
            <CardContent>
              {/* <Typography> */}
                <h3>
                  <a href="./restroomsNearYou">Browse restrooms</a> near you and
                  sign up to help us add to our database!
                </h3>
                <p>
                  User must share location OR change location settings in
                  browser
                </p>
              {/* </Typography> */}
            </CardContent>
          </Card>

          {/* <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
          <hr />

          <h3>
            <a href="./restroomsNearYou">Browse restrooms</a> near you and sign
            up to help us add to our database!
          </h3>
          <p>must share location OR change location settings in browser</p> */}
        </div>
      </Grid>
    </Paper>
  );
}
