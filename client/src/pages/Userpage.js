import { useAuth } from "../util/auth";
import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NearbyRestroomList from "../components/nearbyRestroomsList";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
};

export default function Userpage() {
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
        <h1>Welcome {isLoggedIn ? user.username : "Guest"}!</h1>
        <Stack spacing={13} direction="row" sx={{ my: 5, mx: 3 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ textTransform: "capitalize" }}
            href="/savedRestroom"
          >
            <FavoriteIcon sx={{ mx: 1 }} />
            View Saved Restroom
          </Button>
          <Button
            variant="contained"
            size="large"
            sx={{ textTransform: "capitalize" }}
            href="/addRestroom"
          >
            <AddCircleIcon sx={{ mx: 1 }} />
            Add Restrooms
          </Button>
        </Stack>
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
              Click on a restroom to view amenities and read reviews
            </Typography>
            <NearbyRestroomList/>
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
