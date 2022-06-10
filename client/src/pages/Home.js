import { useAuth } from "../util/auth";
import blueToilets from "../images/blue_toilets.jpeg";
import Paper from "@mui/material/Paper";

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

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
      <div style={{ textAlignVertical: "center", textAlign: "center" }}>
        {/* TODO: display logged in user's username */}
        <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
        <hr />
        <h3>
          <a href="./restroomsNearYou">Browse restrooms</a> near you and sign up
          to help us add to our database!
        </h3>
        <p>must share location OR change location settings in browser</p>
      </div>
    </Paper>
  );
}
