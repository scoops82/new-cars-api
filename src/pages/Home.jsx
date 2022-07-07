import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CarsContext } from "../contexts/car.context";
import { DriversContext } from "../contexts/driver.context";

function Home() {
  const { fetchCars, carsLoading, cars, deleteCar } = useContext(CarsContext);
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const { fetchDrivers, drivers, deleteDriver } = useContext(DriversContext);
  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  if (carsLoading) return <CircularProgress />;

  return (
    <>
      <Box>
        <h2>Cars</h2>
        <List>
          {cars.map(({ name, bhp, avatar_url, _id }, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar alt="" src={avatar_url} />
              </ListItemAvatar>
              <ListItemText primary={name} secondary={`BHP: ${bhp}`} />
              <IconButton
                aria-label="update-car"
                to={`/update-car/${_id}`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteCar(_id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <h2>Drivers</h2>
        <List>
          {drivers.map(({ _id, email, age, lastname, firstname }, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={`${firstname} ${lastname}`}
                secondary={`(age: ${age}) ${email}`}
              />

              <IconButton
                aria-label="update-driver"
                to={`/update-driver/${_id}`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => deleteDriver(_id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Home;
