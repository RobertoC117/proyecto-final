import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

export default function PreguntasFrecuentes() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid item xs={9}>

        <Card className={classes.post}>
          <CardContent>

            <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.tittle} >
              <Typography variant="h4" > Preguntas Frecuentes </Typography>                            
              <Typography variant="subtitle2" component="p">
                Resuelve tus dudas y consultas
              </Typography>
            </Grid>

            <Divider/>
            <br/>
            <Grid>
              <Typography variant="body1" className={classes.Qfont} > ¿Cómo comienzo a publicar post? </Typography>
              <Typography variant="body2" > Solo necesitas iniciar sesión en tu cuenta y llenar el formulario de crear post </Typography>
              <br/>
              <Typography variant="body1" className={classes.Qfont} > ¿Cómo cambio mi contraseña? </Typography>
              <Typography variant="body2" > Puedes cabiar tu contraseña en tu perfil </Typography>
              <br/>
              <Typography variant="body1" className={classes.Qfont} > ¿Es necesario saber usar la plataforma para ser miembro? </Typography>
              <Typography variant="body2" > No, solo necesitas crear tu cuenta e iniciar sesión </Typography>
              <br/>
              <Typography variant="body1" className={classes.Qfont} > ¿Es necesario saber usar la plataforma para ser miembro? </Typography>
              <Typography variant="body2" > No, solo necesitas crear tu cuenta e iniciar sesión </Typography>
              <br/>
              <Typography variant="body1" className={classes.Qfont} > Tengo más dudas ¿Qué puedo hacer? </Typography>
              <Typography variant="body2" > Contáctanos con tus dudas llenando el formulario, por llamada o e-mail  </Typography>
            </Grid>

          </CardContent>          
        </Card>

      </Grid>
    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: '#f5f5f5'
  },
  post: {
    flex: 5,
    width: 800,
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  tittle: {
    padding: theme.spacing(1),
  },
  content: {
    flex: 1,
    padding: theme.spacing(1),
  },
  card: {
    flex: 1,
    margin: theme.spacing(1),
    minWidth: 250,
  },
  Qfont: {
    fontWeight: 'Bold' 
  }
}));
