import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Cargando() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center"  className={classes.root}>
        <CircularProgress />
      <Typography variant="h5"> Cargando... </Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "59%"
  },
}));

