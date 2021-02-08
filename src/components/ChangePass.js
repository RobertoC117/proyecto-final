import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse, FilledInput, InputLabel, FormControl } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux'
import { createNewMsg, ResetPassword } from '../redux/userDuck'
import { useLocation, withRouter } from 'react-router-dom'


const ChangePass = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const msg = useSelector(store => store.user.msg)
  const Ok = useSelector(store => store.user.resetOk)
  const active = useSelector(store => store.user.active)
  const ExpRegPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

  React.useEffect(()=>{
      if(active){
        props.history.push('/')
      }
  },[active])

  const [values, setValues] = React.useState({
      pass1:"",
      pass2:""
  });

  const useQuery = () =>{
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()

  let oobCode = query.get("oobCode")

  console.log("CODIGO" , oobCode)

  const changeValues = (prop) => (event) =>{
    setValues({...values, [prop]:event.target.value})
  }

  const enviar = () =>{
    let mensaje = {
        type:"error",
        title:"ERROR",
        body:""
    }
    if(!values.pass1.trim() || !values.pass2.trim())
    {
        mensaje.body = "Rellene todos los campos"
        dispatch(createNewMsg(mensaje))
        return
    }
    else if(!ExpRegPass.test(values.pass1))
    {
        mensaje.body = "La contraseña debe contener al menos un caracter A-Z, a-z, 0-9, algun caracter especial($@!%*?&) y tener una longitud de 8 a 15 caracteres";
        dispatch(createNewMsg(mensaje))
        return
    }
    else if(values.pass1 !== values.pass2)
    {
        mensaje.body = "Las contraseñas no coinciden"
        dispatch(createNewMsg(mensaje))
        return
    }

    console.log("HECHO")
    dispatch(ResetPassword(oobCode, values.pass1))
    //AQUI ENVIAS LA CONTRASEÑA
  }

  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        <Card className={classes.card}>
          <CardContent>
            {oobCode ?<Grid container direction="column" justify="center" alignItems="center">
              <br/>
              <Typography component="h5" variant="h5">
                Ingrese la nueva contraseña
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
              {!Ok ? <>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled" >
                <InputLabel htmlFor="filled-adornment-password"> Ingrese la nueva contraseña</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={"password"}
                  value={values.pass1}
                  onChange={changeValues("pass1")}
                />
              </FormControl>
              <br/>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled" >
                <InputLabel htmlFor="filled-adornment-password"> Repita la contraseña </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={"password"}
                  value={values.pass2}
                  onChange={changeValues("pass2")}
                />
              </FormControl>
              <br/>
              <Button variant="contained" onClick={enviar} color="primary" disableElevation> Aceptar </Button>
              </> :                    
              <Link href="/login" variant="h3"> {'Inicia Sesión'} </Link>}
            </Grid>
            :<Collapse in={true}>
                <Alert severity={"error"} variant="filled">
                    <AlertTitle>ERROR</AlertTitle>
                    No se encuentra el codigo de recuperacion
                </Alert>
            </Collapse>}
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
      marginTop: theme.spacing(8),
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

export default withRouter(ChangePass)