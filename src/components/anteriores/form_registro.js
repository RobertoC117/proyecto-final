import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
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
import { registrar } from '../redux/userDuck'
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
  
  const [errores, setErrores] = React.useState(null)


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
      if(!values.username.trim() || !values.password.trim() || !values.email.trim())
      {
        setErrores("Rellene todos los campos");
        return
      }
      else if(values.password.length < 8)
      {
        setErrores("La contraseña debe contener de 8 a 16 caracteres");
        return
      }

      setErrores(null)
      console.log("Registrado papu")
      dispatch(registrar(values))
  }



  return (
    <div className={classes.root}>
      {
        errores&&(
          <h2>{errores}</h2>
        )
      }
      {
        msg&&(
          <h2>{msg}</h2>
        )
      }
        <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        <br/> <br/>
        <Typography component="h5" variant="h5"> Registrarse </Typography>
        <br/>
        <TextField
          label="Usuario"
          id="filled-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          onChange={handleChange("username")}
          variant="filled"
        />
        <br/>
        <TextField
          label="Email"
          id="filled-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          onChange={handleChange("email")}
          variant="filled"
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
        <br/>
        <Button onClick={() => registrarse()} disabled={loading} variant="contained" color="primary" disableElevation> Aceptar </Button>
        <br/>
        <Typography className={classes.root}>        
          <Link href="/" variant="body2"> {'¿Ya tienes una cuenta? Inicia Sesión'} </Link>
        </Typography>
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
      width: "25ch",
    },
  }));

  export default withRouter(InputAdornments)