import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { withRouter, useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { MisPosts } from '../redux/postDuck'

import Tarjeta from "./TarjetaRepo";
import Loading from "./Loading";
import NotFound from './NotFound'

export default function Repositorio() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const mis_posts = useSelector(store => store.posts.mis_posts)

  React.useEffect(()=>{
      dispatch(AddBreadcrum("Repositorio", path))
      dispatch(MisPosts())
  },[])

  return (
    mis_posts ?
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root}>
      <Typography component="h5" variant="h5">
        Repositorio
      </Typography>
      <br/>
      {mis_posts.length > 0 ?
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={3} padding={2}>
        {
            mis_posts.map(item => <Tarjeta id={item.id_post} titulo={item.titulo} texto={item.texto} fecha={item.fecha} />)
        }
        {/* <Tarjeta />
        <Tarjeta />
        <Tarjeta /> 
        <Tarjeta />*/}
      </Grid>:
      <>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <NotFound title="Vaya!..." texto="Aun no tienes post publicados"/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
      </>}
    </Grid>:
    <Loading/>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(2),
  },
}));
