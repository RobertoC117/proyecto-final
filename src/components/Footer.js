import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// iconos
import FacebookIcon from '@material-ui/icons/Facebook';
import ShareIcon from '@material-ui/icons/Share';
import {Link} from 'react-router-dom'

export default function IconBreadcrumbs() {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center" xs={12} className={classes.footer}>
      <Grid container direction="column" justify="center" alignItems="center" xs={3} className={classes.card} > 
        <Typography variant="subtitle1">
          Nosotros
        </Typography>
        <Typography variant="subtitle2">
            <Link to="/aviso">Aviso de privacidad</Link><br/>
            <Link >Contacto</Link><br/>
            <Link >Normas y Reglas</Link><br/>
            <Link >Preguntas Frecuentes</Link><br/>
        </Typography>
      </Grid>

      <Divider orientation="vertical" flexItem />
      
      <Grid container direction="column" justify="center" alignItems="center" xs={3} className={classes.card} >
        <Typography variant="subtitle2">
          Universidad Tecnológica de la Huasteca Hidalguense
        </Typography>
        <Typography variant="subtitle2">
          Roberto Carlos Sanchez Hernandez <br/>
          Sofia Morales Zaleta <br/>
          Gustavo Angel Hernandez De la Cruz <br/>          
          Nuribeth Hernandez Hernandez <br/>
          Dania Vianey Cruz Romero <br/>
        </Typography>
      </Grid>
      
      <Divider orientation="vertical" flexItem />
      
      <Grid container direction="column" justify="center" alignItems="center" xs={3} className={classes.card} >
        <Typography variant="subtitle1">
          Contáctanos
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <FacebookIcon fontSize="large"/> 
          <Typography variant="subtitle2">
            Facebook
          </Typography>
        </Grid>
        {/* <Grid container direction="row" justify="center" alignItems="center">
          <ShareIcon fontSize="large"/>
          <Typography variant="subtitle2">
            Compartir
          </Typography>
        </Grid> */}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  footer: {
    backgroundColor: "#106CC8",
    color:"#FFFF",
    display: "flex",
    flexWrap: "wrap", 
  },
  card: {
    margin: theme.spacing(2),
  }
}));
