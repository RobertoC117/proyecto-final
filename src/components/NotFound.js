import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
// icnos
import ErrorIcon from '@material-ui/icons/Error';

export default function Errorpage() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center"  className={classes.root}>
        <ErrorIcon className={classes.icon} />
      <Typography variant="h3"> Error </Typography>
      <Typography variant="h5"> La página no se encontró </Typography>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "59%"
  },
  icon: {
    fontSize: 50,
    color: '#BDBDBD',
  }
}));

