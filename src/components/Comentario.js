import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

export default function Comentario(props) {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-around" alignItems="center" className={classes.root} >
      <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.tittle} >
        <Avatar src="#" />
        <Grid direction="column" justify="flex-start" alignItems="center" className={classes.tittle}>
          <Typography color="textSecondary" variant="subtitle2" > {props.nombre} </Typography>
          <Typography color="textSecondary" variant="subtitle2" > {new Date(props.fecha).toString()} </Typography>
          <Typography variant="subtitle2" > {props.texto} </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  tittle: {
    padding: theme.spacing(1),
  },
  tittle2: {
    padding: theme.spacing(2),
  },
}));
