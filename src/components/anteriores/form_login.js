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
import { logearKogit } from '../redux/userDuck'
import { withRouter } from 'react-router-dom'

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

  React.useEffect(()=>{
    if(active)
      props.history.push('/main')
  },[active, props.history])  

  const logear = () =>{
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
        <br/> <br/>
        <Typography component="h5" variant="h5">
          Iniciar Sesión
        </Typography>
        <br/>
        <TextField
          label="Email"
          id="filled-start-adornment"
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
        <br/>
        <Button disabled={loading} variant="contained" color="primary" onClick={() => logear()} disableElevation> Aceptar </Button>
        <br/>
        <Typography className={classes.root}>        
          <Link href="/" variant="body2"> {'¿No tienes una cuenta? Crea Una'} </Link>
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