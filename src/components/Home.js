import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import learning from './img/learning.jpg'
import conexion from './img/conexion.png'
import recursos from './img/recursos.jpg'
import interaccion from './img/interaccion.png'
import futuro from './img/futuro.jpg'
import aprendizajeFondo from './img/aprendizaje_fondo.png'

export default function InputAdornments() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.root}>
        
      <Grid container direction="column" justify="center" alignItems="center" xs={11}> 
        <Card className={classes.margin}>
          <Grid container direction="row"justify="center" alignItems="center">
            <Grid direction="column" xs={9}>
              <CardContent className={classes.content}>
                <Typography component="h3" variant="h3">
                  KOGit
                </Typography>
                <br/>
                <br/>
                <Typography variant="h5">
                El e-learning está cambiando. Veremos nuevos modelos y surgirán nuevas tecnologías y 
                nuevos diseños. Entonces dejemos atrás la e, o al menos démosle una definición nueva y más amplia.
                {<br/>}
                {<br/>}
                ― Elliot Masie
                {<br/>}
                {<br/>}
                KOgit es una plataforma donde el aprendizaje es de todos, puedes compartir codigo o explorar en los
                proyectos de alguien mas.
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={3}>
              <img className={classes.imgA} alt="Imagen" src={learning} />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="center" xs={11}>
        <Grid xs={4}>
          <Card className={classes.margin}>
            <CardContent>
              <Grid container direction="column" justify="center" alignItems="center" >
                <Typography variant="h4" component="h4" >
                Accesible
                </Typography>
                <br/> <img className={classes.imgB} alt="Imagen" src={conexion} /> <br/>
              </Grid>
              <Typography variant="body1" component="p">
              No importa el lugar, la zona ni el horario en el que te encuentres, 
              podrás estudiar en cualquier lugar con acceso a Internet.
              </Typography>
            </CardContent>          
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card className={classes.margin}>
            <CardContent>
              <Grid container direction="column" justify="center" alignItems="center" >
                <Typography variant="h4" component="h4" >
                  Recursos en línea
                </Typography>
                <br/> <img className={classes.imgB} alt="Imagen" src={recursos} /> <br/>
              </Grid>
              <Typography variant="body1" component="p">
              Permite el acceso a cualquier cantidad y variedad de material y recursos sin la necesidad 
              de tenerlos físicamente, además de disponer de ellos en cualquier momento que lo requieras.
              </Typography>
            </CardContent>          
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card className={classes.margin}>
            <CardContent>
              <Grid container direction="column" justify="center" alignItems="center" >
                <Typography variant="h4" component="h4" >
                  Modelo Interactivo
                </Typography>
                <br/> <img className={classes.imgB} alt="Imagen" src={interaccion} /> <br/>
              </Grid>
              <Typography variant="body1" component="p">
              Aquel que permite al alumno adoptar un papel o rol activo en relación a trabajos, interactuando
              así con el contenido, sus guias y la comunidad.
              </Typography>
            </CardContent>          
          </Card>
        </Grid>
      </Grid>

      <Grid container direction="column" justify="center" alignItems="center" xs={11}> 
        <Card className={classes.margin}>
          <Grid container direction="row"justify="center" alignItems="center">
            <Grid direction="column" xs={9}>
              <CardContent className={classes.content}>
                {/* <Typography component="h3" variant="h3">
                  KOGit
                </Typography> */}
                <Typography variant="h5">
                Enseñar en la era de internet significa que debemos enseñar las habilidades de mañana desde hoy.
                {<br/>}
                {<br/>}
                ― Jennifer Fleming
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={3}>
              <img className={classes.imgA} alt="Imagen" src={futuro} />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* <Grid container direction="column" justify="center" alignItems="center" xs={11}> 
        <Card className={classes.margin}>
          <Grid container direction="row"justify="center" alignItems="center">
            <Grid direction="column" xs={9}>
              <CardContent className={classes.content}>
                <Typography component="h3" variant="h3">
                  KOGit
                </Typography>
                <Typography variant="h5">
                El e-learning está cambiando. Veremos nuevos modelos y surgirán nuevas tecnologías y 
                nuevos diseños. Entonces dejemos atrás la e, o al menos démosle una definición nueva y más amplia.
                {<br/>}
                {<br/>}
                ― Elliot Masie
                </Typography>
              </CardContent>
            </Grid>
            <Grid xs={3}>
              <img className={classes.imgA} alt="Imagen" src={learning} />
            </Grid>
          </Grid>
        </Card>
      </Grid> */}

      <Grid container direction="row" justify="center" alignItems="center" xs={11}> 
        <Card className={classes.margin}>
          <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.backImg}>
            <Grid direction="column" xs={4} className={classes.smolcard} >
              <CardContent className={classes.content} >
                <Typography component="h5" variant="h5">
                  ¿Sabias que?...
                </Typography>
                <Typography variant="body1">
                Los estudiantes online tienen más control sobre su proceso de aprendizaje en línea, lo que lleva a una curva de aprendizaje 60% más corta que la de los estudiantes presenciales.
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>

    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(3),
  },
  backImg: {
    backgroundImage:`url(${aprendizajeFondo})`,
    backgroundColor: '#000',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  smolcard:{
    backgroundColor: '#fff',
    margin: theme.spacing(5),
  },
  imgA: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  imgB: {
    margin: 'auto',
    display: 'block',
    maxWidth: '70%',
    maxHeight: '70%',
  },
}));
