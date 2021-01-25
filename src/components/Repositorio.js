import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tarjeta from "./tarjeta";
import Typography from "@material-ui/core/Typography";
import { withRouter } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation } from 'react-router-dom'

const Repositorio = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const migajas = useSelector(store => store.user.breadcrumbs)
  
  React.useEffect(()=>{
      dispatch(AddBreadcrum("Repositorio", path))
  },[])

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Typography component="h5" variant="h5">
        Repositorio
      </Typography>
      <br/>
      <br/>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={3}
        padding={2}
      >
        <Tarjeta />
        <Tarjeta />
        <Tarjeta />
      </Grid>
    </Grid>
  );
}

export default withRouter(Repositorio)

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",//add for me
    height: "59%",//add for me
    minWidth: 275,
    padding: theme.spacing(2),
  },
}));
