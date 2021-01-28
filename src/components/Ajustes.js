import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation } from 'react-router-dom'

export default function InputAdornments() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  React.useEffect(()=>{
      dispatch(AddBreadcrum("Ajustes", path))
  },[])
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        
        <br/>
        <Typography component="h5" variant="h5"> 
          Ajustes
        </Typography>
        <br/>

        <Card variant="outlined">
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Grid container direction="row" alignItems="center">
                <Typography variant="body1" className={classes.margin}>  
                  Tema
                </Typography>
                <Button variant="contained" color="primary" className={classes.margin} disableElevation> Cambiar </Button>
              </Grid>

              <Grid container direction="row" alignItems="center">
                <Typography variant="body1" className={classes.margin}>  
                  Correo en el perfil
                </Typography>
                <Button variant="contained" color="primary" className={classes.margin} disableElevation> Visible </Button>
                <Button variant="contained" color="primary" className={classes.margin} disableElevation> Invisible </Button>
              </Grid>

              <Grid container direction="row" alignItems="center">
                <TextField label="Correo de respaldo" className={clsx(classes.margin, classes.textField)} variant="filled" />              
                <Button variant="contained" color="primary" className={classes.margin} disableElevation> Guardar </Button>
              </Grid>
              
              <br />
              <Button variant="contained" disableElevation> Cerrar Sesión </Button>
              
            </Grid>
          </CardContent>
        </Card>
      <br/>
      <br/>
      <br/>
      <br/>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "30ch",
    },
  }));