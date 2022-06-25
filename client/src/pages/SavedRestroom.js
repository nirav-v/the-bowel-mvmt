import rolls from "../images/toilet_paper_rolls.jpeg";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ME } from "../util/queries";
import { REMOVE_SAVED_RESTROOM } from "../util/mutations";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default function SavedRestroom() {
  const { loading, data, error } = useQuery(ME);
  const [removeSavedRestroom] = useMutation(REMOVE_SAVED_RESTROOM);

  const userData = data?.me || {};
  const handleDeleteSavedRestroom = async (restroomId) => {
    try {
      const updatedSavedRestrooms = await removeSavedRestroom({
        variables: {
          restroomId: restroomId,
        },
      });
    } catch (error) {}
  };

  console.log(userData);
  console.log(userData.savedRestrooms);

  const navigate = useNavigate();
  const goToRestrooms = (id) => {
    navigate(`/singleRestroom/${id}`);
  };

  // ----- code to handle page refresh issue -----------
  // if (!userData.savedRestrooms) {
  //   return (
  //     <Paper style={styles.paperContainer} sx={{ height: "100%" }}>
  //     <CssBaseline />
  //     </Paper>
  //   )
  // }

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
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5">
              {userData?.savedRestrooms?.length > 0
                ? "Your Saved Restrooms:"
                : "No restroom has been saved yet!"}
            </Typography>
            {userData.savedRestrooms?.map((restroom) => (
              <List key={restroom._id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      goToRestrooms(restroom._id);
                    }}
                  >
                    <ListItemIcon>
                      <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary={restroom.areaDescription} />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      handleDeleteSavedRestroom(restroom._id);
                    }}
                  >
                    Delete
                  </ListItemButton>
                </ListItem>
              </List>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
