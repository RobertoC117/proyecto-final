import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import img from './img/diagrama.jpg';

export default function Diagrama() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
      <img src={img} alt="diagrama.jpg" className={classes.img} />
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: '#f5f5f5',
  },
  img: {
    flex: 1,
    width: '80%',
    height: '50%',
    borderRadius: 20,
    margin: theme.spacing(2),
  }
}));

