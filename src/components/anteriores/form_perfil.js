import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux'
import img from "./img/halo.jpg";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Business, AccountBox, Twitter, Language, LocationOn} from "@material-ui/icons";
import { editarDatos, cambiarPassword } from '../redux/userDuck'

export default function Perfil() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    editable: false,
    editadatos:false,
    editapassword:false
  });
  
  const dispatch = useDispatch();
  const datosUsuario = useSelector(store => store.user.userdata)

  // const [nombre, setNombre] = React.useState(datosUsuario.nombre)
  // const [twitter, setTwitter] = React.useState(datosUsuario.twitter)
  // const [company, setCompany] = React.useState(datosUsuario.company)
  // const [ubicacion, setUbicacion] = React.useState(datosUsuario.ubicacion)
  // const [website, setWebsite] = React.useState(datosUsuario.website)

  const [datos, setDatos] = React.useState({
    nombre: datosUsuario.nombre,
    twitter: datosUsuario.twitter,
    ubicacion: datosUsuario.ubicacion,
    website: datosUsuario.website,
    company: datosUsuario.company,
  })

  const [password, setPassword] = React.useState({
    oldpass:"",
    newpass:"",
    newpass2:""
  })

  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(true);

  const changeState = (prop) => (event) =>{
    setDatos({...datos, [prop]: event.target.value})
  }

  const changePassword = (prop) => (event) =>{
    setPassword({...password, [prop]: event.target.value})
  }

  const resetBoolState = () =>{
    setValues({
      editable: false,
      editadatos:false,
      editapassword:false
    })
    setExpanded(false)
    setExpanded2(true)
  }

  const resetDataState = () =>{
    setDatos({
      nombre: datosUsuario.nombre,
      twitter: datosUsuario.twitter,
      ubicacion: datosUsuario.ubicacion,
      website: datosUsuario.website,
      company: datosUsuario.company,
    })
  }

  const cancelar = () =>{
    resetDataState()
    resetBoolState()
  }

  const ModoEditarDatos = () =>{
    setValues({
      editable: true,
      editadatos:true,
      editapassword:false
    })
    setExpanded(false);
    setExpanded2(true);
  }

  const ModoEditarPassword = () =>{
    setValues({
      editable: true,
      editadatos:false,
      editapassword:true
    })
    setExpanded(true);
    setExpanded2(false);
  }

  const guardarCambios = () =>{
    if(values.editadatos)
    {
      for (const key in datos) {
        if (datos[key] === '') {
          datos[key] = null;
        }
      }
      dispatch(editarDatos(datos))
    }
    else if(values.editapassword)
    {
      if(password.oldpass === datosUsuario.password && password.newpass === password.newpass2)
      {
        console.log('password cambiada')
        dispatch(cambiarPassword(password.newpass))
      }else{
        console.log("error")
      }
       
    }
    resetBoolState();
  }

  return (
    <div className={classes.root}>
      
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        <br /> <br />
        <Typography component="h5" variant="h5">
          Perfil
        </Typography>
        <br />
        <Avatar
          alt="Roberto"
          src={img}
          className={classes.large}
        />
        <br />
        <Grid container direction="row" justify="center" alignItems="center" className={classes.marginbutton} >
          <input accept="image/*" className={classes.imageinput} id="contained-button-file" type="file" />
          <label htmlFor="contained-button-file">
            <Button size="small" variant="contained" color="primary" component="span">
              Cambiar Foto
            </Button>
          </label>
          {
            !values.editadatos && (
              <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />} onClick={ModoEditarDatos} >
                Editar Datos
              </Button>
            )
          }
          {
            !values.editapassword && (
              <Button variant="contained" color="primary" size="small" startIcon={<EditIcon />} onClick={ModoEditarPassword} >
                Editar Contraseña
              </Button>
            )
          }
        </Grid>
        <br />
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
            <TextField 
                    label="Contraseña Actual" 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled"
                    onChange={changePassword('oldpass')}
            />
            <TextField 
                    label="Nueva Contraseña" 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled"
                    onChange={changePassword('newpass')} 
            />
            <TextField 
                    label="Confirmación Nueva Contraseña" 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled" 
                    onChange={changePassword('newpass2')}
            />
          </Grid>
        </Collapse>

        
        <Collapse in={expanded2} timeout="auto" unmountOnExit>
          <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
            <Grid container direction="row" justify="center" alignItems="center" variant="outlined" >
            
              <TextField 
                      label="Usuario" 
                      value={datosUsuario.username} 
                      disabled={true} 
                      className={clsx(classes.margininput, classes.textField)} 
                      variant="filled"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBox />
                          </InputAdornment>
                        ),
                      }}
              />
              <TextField 
                      label="Nombre"
                      value={datos.nombre === null ? "" : datos.nombre} 
                      className={clsx(classes.margininput, classes.textField)} 
                      variant="filled" 
                      onChange={changeState('nombre')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBox />
                          </InputAdornment>
                        ),
                      }}
              />
              <TextField 
                      label="Compañia"
                      value={datos.company === null ? "" : datos.company} 
                      className={clsx(classes.margininput, classes.textField)} 
                      variant="filled" 
                      onChange={changeState('company')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Business />
                          </InputAdornment>
                        ),
                      }}
              />
              </Grid>
            <Grid container direction="row" justify="center" alignItems="center" variant="outlined" >
            <TextField 
                    label="Ubicacion"
                    value={datos.ubicacion === null ? "" : datos.ubicacion} 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled" 
                    onChange={changeState('ubicacion')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOn />
                        </InputAdornment>
                      ),
                    }}
            />
            <TextField 
                    label="Twitter"
                    value={datos.twitter === null ? "" : datos.twitter} 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled" 
                    onChange={changeState('twitter')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Twitter />
                        </InputAdornment>
                      ),
                    }}
            />
            <TextField 
                    label="Sitio web"
                    value={datos.website === null ? "" : datos.website} 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled" 
                    onChange={changeState('website')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Language />
                        </InputAdornment>
                      ),
                    }}
            />
            </Grid>

            {/* <TextField 
                    label="Correo" 
                    value={datosUsuario.email} 
                    disabled={true} 
                    className={clsx(classes.margininput, classes.textField)} 
                    variant="filled" 
            /> */}
          </Grid>
        </Collapse>
        
        
        {
          values.editable && (
            <Grid container direction="row" justify="center" alignItems="center" className={classes.marginbutton} >
            <Button variant="contained" color="primary" onClick={() => guardarCambios()} >
              Guardar
            </Button>
            <Button variant="contained" color="secondary" onClick={()=> cancelar()}>
              Cancelar
            </Button>
          </Grid>
          )
        }
        

      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  imageinput: {
    display: 'none',
  },
  marginbutton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margininput: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "30ch",
  },
}));
