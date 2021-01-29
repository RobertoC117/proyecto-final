import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// icons
import HomeIcon from '@material-ui/icons/HomeOutlined';
import PhoneIcon from "@material-ui/icons/PhoneOutlined";
import EmailIcon from "@material-ui/icons/AlternateEmail";

export default function Contacto() {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid item xs={9}>

        <Card className={classes.post}>
          <CardContent>

            <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.tittle} >
              <Typography variant="h4" > Contáctanos </Typography>                            
              <Typography variant="subtitle2" component="p">
                Ponte en constacto con nosostros para aclarar tus dudas
              </Typography>
            </Grid>

            <Divider />
            <br/>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.content}>              
              <Card className={classes.card}>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <EmailIcon color="primary" className={classes.icons} />
                    <Typography variant="h6" > e-mail </Typography>
                    <Typography variant="subtitle1"> Envíanos un email a: </Typography>
                    <Typography variant="subtitle1"> email_o_algo@email.com </Typography>
                  </Grid>
                </CardContent>  
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <PhoneIcon color="primary" className={classes.icons} />
                    <Typography variant="h6" > Datos de contacto </Typography>
                    <Typography variant="subtitle1"> Teléfono: </Typography>
                    <Typography variant="subtitle1"> 1234567890 </Typography>
                  </Grid>
                </CardContent>  
              </Card>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <HomeIcon color="primary" className={classes.icons} />
                    <Typography variant="h6" > Estamos ubicados </Typography>
                    <Typography variant="subtitle1"> 43000 Huejutla, Hgo </Typography>
                    <Typography variant="subtitle1"> Carr. Huejutla-Chalahuiyapa </Typography>
                  </Grid>
                </CardContent>  
              </Card>
            </Grid>
            <br/>

            <Divider />
            {/* <Grid container direction="column" justify="center" alignItems="center" className={classes.content}>
              <Typography variant="subtitle2" > o envía tus comentarios llenando el formulario </Typography>
              <TextField size="small" label="Nombre" variant="filled" className={classes.txtfield} />
              <TextField size="small" label="Correo" variant="filled" className={classes.txtfield} />
              <TextField size="small" label="Comentarios" variant="filled" multiline rows={4} className={classes.txtfield} />
              <Button variant="contained" color="primary"> Enviar </Button>
            </Grid> */}

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
  txtfield: {
    margin: theme.spacing(1),
    width: 400,
  },
  icons: {
    fontSize: 50
  },
}));
