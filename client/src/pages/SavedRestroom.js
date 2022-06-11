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
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { ME } from "../util/queries";

const styles = {
  paperContainer: {
    backgroundImage: `url(${rolls})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // height: 1300,
  },
};

export default function SavedRestroom() {
  const { loading, data, error } = useQuery(ME);

  const userData = data?.me || {};

  console.log(userData);
  console.log(userData.savedRestrooms);

  // const savedRRs = [
  //   {
  //     id: 1,
  //     restroomName: "Restroom1",
  //     restroomId: "1",
  //   },
  //   {
  //     id: 2,
  //     restroomName: "Restroom2",
  //     restroomId: "2",
  //   },
  //   {
  //     id: 3,
  //     restroomName: "Restroom3",
  //     restroomId: "3",
  //   },
  // ];

  const navigate = useNavigate();
  const goToRestrooms = (id) => {
    navigate(`/singleRestroom/${id}`);
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
          // style={{ maxWidth: 650, padding: "20px 5px", borderRadius: "16px", backgroundColor: 'transparent', }}
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
              Your Saved Restrooms:
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
                </ListItem>
              </List>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Paper>
  );
}
