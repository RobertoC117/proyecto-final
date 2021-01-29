import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
// icnos
import ErrorIcon from '@material-ui/icons/Error';

export default function Errorpage(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center"  className={classes.root}>
        <ErrorIcon className={classes.icon} />
      <Typography variant="h3"> {props.title} </Typography>
      <Typography variant="h5"> {props.texto} </Typography>
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

