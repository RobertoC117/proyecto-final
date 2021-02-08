import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
// icons
import MessageIcon from '@material-ui/icons/Message';
import CloseIcon from '@material-ui/icons/Close';

import Chat from './Chat';

export default function Ayuda() {
  const classes = useStyles();
  
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Grid container direction="row" justify="space-around" alignItems="center" className={classes.root} >
      <Grid >

        <Card className={classes.post}>
          <CardContent>

            <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.content} >
              <Typography variant="h4" > Ayuda </Typography>                            
              <Typography variant="subtitle2" component="p">
                Envíanos un mensaje
              </Typography>
            </Grid>
            <Divider />

            <br/>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.content}>              
              <Grid direction="column" justify="flex-start" alignItems="center" className={classes.content}>
                <Typography variant="subtitle1"> Inicia un chat con nosotros mandándo un mensaje </Typography>
                <Typography variant="subtitle1"> de texto, y te ayudaremos a resolver tus dudas. </Typography>
                <Typography variant="subtitle1"> Recuerda que nunca te solicitaremos información </Typography>
                <Typography variant="subtitle1"> personal ni de tu cuenta. </Typography>
              </Grid>
              <Grid direction="row" justify="center" alignItems="center" className={classes.button}>
                <Button
                  color="primary"
                  size="large"
                  startIcon={<MessageIcon />}
                  onClick={handleChange}
                >
                  Enviar Mensaje
                </Button>
              </Grid>
            </Grid>

            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <Chat />
        </Paper>
      </Slide>
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <Paper className={classes.idk}>
          <IconButton aria-label="send" component="span" onClick={handleChange}>
            <CloseIcon />
          </IconButton>
        </Paper> 
      </Slide>

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
    backgroundColor: '#f5f5f5',
  },
  post: {
    flex: 1 ,
    margin: theme.spacing(3),
  },
  content: {
    flex: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  card: {
    flex: 1,
    margin: theme.spacing(1),
    minWidth: 250,
  },
  button: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  paper: {
    zIndex: 1,
    width: 400,
    position: 'relative',
    left: 120,
  },
  idk: {
    zIndex: 1,
    position: 'relative',
    left: 470, 
    bottom: 400,
    height: 0,
    backgroundColor: 'rgb(17,108,201)',
  },
}));
