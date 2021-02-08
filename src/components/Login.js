import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux'
import { logearKogit, createNewMsg } from '../redux/userDuck'
import { withRouter } from 'react-router-dom'
import { Collapse } from "@material-ui/core";

const InputAdornments = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email:"",
    password: "",
    showPassword: false,
  });

  const dispatch = useDispatch()
  const loading = useSelector(store => store.user.loading)
  const active = useSelector(store => store.user.active)
  const msg = useSelector(store => store.user.msg)

  React.useEffect(()=>{
    if(active)
      props.history.push('/main')
  },[active, props.history])  

  const logear = () =>{
    let mensaje = {
      type:"",
      title:"",
      body:""
    }
    if(!values.password.trim() || !values.email.trim())
    {
      mensaje.type = "error"
      mensaje.title = "ERROR"
      mensaje.body = "Rellene todos los campos"
      dispatch(createNewMsg(mensaje))
      return
    }
    dispatch(logearKogit(values))
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        
        <br/>
        <Typography component="h5" variant="h5">
          Iniciar Sesión
        </Typography>
        <br/>

        <Collapse in={msg ? true : false}>
            {msg && (
            <Alert severity={msg.type} variant="filled">
              <AlertTitle>{msg.title}</AlertTitle>
              {msg.body}
            </Alert>)}
        </Collapse>
        {/* {
          msg && (
            <Alert severity={msg.type} variant="filled">
              <AlertTitle>{msg.title}</AlertTitle>
              {msg.body}
            </Alert>
              )
        } */}
        
        <br/>

        <Card variant="outlined">
          <CardContent>
            <Grid direction="column" alignItems="center">
              <TextField 
                      label="Email" 
                      className={clsx(classes.margin, classes.textField)} 
                      variant="filled" 
                      onChange={handleChange("email")}
              />
              <br />
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled" >
                <InputLabel htmlFor="filled-adornment-password"> Contraseña </InputLabel>
                <FilledInput              
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </CardContent>

          <CardActions>
            <Grid container direction="column" justify="center" alignItems="center">
              <Button variant="contained" disabled={loading} color="primary" onClick={() => logear()} disableElevation> Aceptar </Button>
              <br/>
              <Typography>        
                <Link href="/registro" variant="body2" className={classes.link}> {'¿No tienes una cuenta? Crea Una'} </Link>
              </Typography>
              <br/>
              <Typography>        
                <Link href="/forgot" variant="body2" className={classes.link}> {'Olvide mi contraseña'} </Link>
              </Typography>
            </Grid>
          </CardActions>

        </Card>
        <br/>
        <br/>
        <br/>
      </Grid>
      
    </div>
  );
}

export default withRouter(InputAdornments)

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
    link: {
      color: '#A4A4A4',
    },
  }));