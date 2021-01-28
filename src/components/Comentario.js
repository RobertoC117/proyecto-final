import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

export default function Comentario() {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-around" alignItems="center" className={classes.root} >
      <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.tittle} >
        <Avatar src="#" />
        <Grid direction="column" justify="flex-start" alignItems="center" className={classes.tittle}>
          <Typography color="textSecondary" variant="subtitle2" > Usuario </Typography>
          <Typography variant="subtitle2" > Comentario </Typography>
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
