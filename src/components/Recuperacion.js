import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux'
import { createNewMsg, EnviarResetPassword } from '../redux/userDuck'
import { withRouter } from 'react-router-dom'

const Recuperacion = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const msg = useSelector(store => store.user.msg)
  const active = useSelector(store => store.user.active)

  const ExpRegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  const [email, setEmail] = React.useState("");

  React.useEffect(()=>{
      if(active){
        props.history.push('/')
      }
  },[active])

  const enviar = () =>{
    if(!ExpRegEmail.test(email))
    {
      //INGRESE UN EMAIL VALIDO
      let mensaje = {
        type:"error",
        title:"ERROR",
        body:"Ingrese un email valido"
      }
      dispatch(createNewMsg(mensaje))
      console.log("NOOOO")
      return
    }
    console.log("SIII")
    dispatch(EnviarResetPassword(email))
    setEmail("")
  }
  
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >

        <Card className={classes.card}>
          <CardContent>
            <Grid container direction="column" justify="center" alignItems="center">
              <br/>
              <Typography component="h5" variant="h5">
                Recuperación de contraseña
              </Typography>
              <br/>
              <Collapse in={msg ? true : false}>
                  {msg && (
                  <Alert severity={msg.type} variant="filled">
                    <AlertTitle>{msg.title}</AlertTitle>
                    {msg.body}
                  </Alert>)}
              </Collapse>
              <br/>
              <TextField label="Correo" value={email} className={clsx(classes.margin, classes.textField)} onChange={(e)=>setEmail(e.target.value)} variant="filled" />
              <br/>
              <Button variant="contained" onClick={enviar} color="primary" disableElevation> Enviar </Button>                     
              {/* <Link href="/" variant="body2"> {'Inicia Sesión'} </Link> */}
            </Grid>
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      height: "59%",
      backgroundColor: '#f5f5f5'
    },
    card: {
      flex: 5,
      margin: theme.spacing(3),
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(9),
      padding: theme.spacing(1),      
      Height: 30,
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

  export default withRouter(Recuperacion)