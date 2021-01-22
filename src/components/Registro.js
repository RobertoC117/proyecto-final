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
import { Collapse } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux'
import { registrar, createNewMsg } from '../redux/userDuck'
import { withRouter } from 'react-router-dom'

const InputAdornments = (props) => {
  
  const dispatch = useDispatch();
  const loading = useSelector(store => store.user.loading)
  const active = useSelector(store => store.user.active)
  const msg = useSelector(store => store.user.msg)

  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",    
    email: "",
    showPassword: false,
  });

  React.useEffect(()=>{
    if(active)
      props.history.push('/main')
  },[active, props.history])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registrarse = () =>{
      let mensaje = {
        type:"error",
        title:"ERROR",
        body:""
      }
      if(!values.username.trim() || !values.password.trim() || !values.email.trim())
      {
        mensaje.body = "Rellene todos los campos"
        dispatch(createNewMsg(mensaje))
        return
      }
      else if(values.password.length < 8 || values.password.length > 16)
      {
        mensaje.body = "La contraseña debe contener entre 8 y 16 caracteres";
        dispatch(createNewMsg(mensaje))
        return
      }
      dispatch(registrar(values))
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        
        <br/>
        <Typography component="h5" variant="h5"> 
          Registrarse
        </Typography>
        <br/>

        {/* <Alert severity="info">
        <strong>Info.</strong> - This is an info alert
        </Alert> */}
        <Collapse in={msg ? true : false}>
            {msg && (
            <Alert severity={msg.type} variant="filled">
              <AlertTitle>{msg.title}</AlertTitle>
              {msg.body}
            </Alert>)}
        </Collapse>
        <br/>

        <Card variant="outlined">
          <CardContent>
            <Grid direction="column" alignItems="center">
              <TextField 
                      label="Usuario" 
                      className={clsx(classes.margin, classes.textField)} 
                      variant="filled"
                      onChange={handleChange("username")} 
              />
              <br/>
              <TextField 
                      label="Email" 
                      className={clsx(classes.margin, classes.textField)} 
                      variant="filled"
                      onChange={handleChange("email")} 
              />
              <br/>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled" >
                <InputLabel htmlFor="filled-adornment-password"> Contraseña </InputLabel>
                <FilledInput
                  id="filled-adornment-password"
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
              <Button onClick={() => registrarse()} disabled={loading} variant="contained"  color="primary" disableElevation> Aceptar </Button>
              <Typography>        
                <Link href="/login" variant="body2" className={classes.link}> {'¿Ya tienes una cuenta? Inicia Sesión'} </Link>
              </Typography>
              <br/>
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

export default withRouter(InputAdornments);

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