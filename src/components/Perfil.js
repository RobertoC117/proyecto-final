import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Alert, AlertTitle } from '@material-ui/lab';
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment';
import { Business, AccountBox, Twitter, Language, LocationOn} from "@material-ui/icons";
import { editarDatos, cambiarPassword, cambiarImagen, createNewMsg } from '../redux/userDuck'
import CryptoJS from 'crypto-js';

export default function Perfil() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const datosUsuario = useSelector(store => store.user.userdata)
  const msg = useSelector(store => store.user.msg)
  const loading = useSelector(store => store.user.loading)
  
  const [values, setValues] = React.useState({
    editable: false,
    editadatos:false,
    editapassword:false
  });

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
      let mensaje={
        type:"error",
        title:"ERROR",
        body:""
      }
      if(!password.oldpass.trim() || !password.newpass.trim() || !password.newpass2.trim())
      {
        mensaje.body = "Rellene todos los campos"
        dispatch(createNewMsg(mensaje));
        return
      }
      else if(password.oldpass !== CryptoJS.Rabbit.decrypt(datosUsuario.password, datosUsuario.uid).toString(CryptoJS.enc.Utf8))
      {
        mensaje.body = "La contraseña es incorrecta"
        dispatch(createNewMsg(mensaje));
        return
      }
      else if(password.newpass !== password.newpass2)
      {
        mensaje.body = "Las contraseñas no coinciden"
        dispatch(createNewMsg(mensaje));
        return
      }
      else if(password.newpass.length < 8 || password.newpass.length > 16)
      {
        mensaje.body = "La contraseña debe contener entre 8 y 16 caracteres";
        dispatch(createNewMsg(mensaje))
        return
      }
      
      dispatch(cambiarPassword(password.newpass))
       
    }
    resetBoolState();
  }

  const cargarImagen = (img) =>{
    const dataImg = img.target.files[0]
    let mensaje={
      type:"",
      title:"",
      body:""
    }

    if(dataImg === undefined)
    {
      mensaje.type="warning"
      mensaje.title="ADVERTENCIA"
      mensaje.body="No se seleccionó ningun archivo"
      dispatch(createNewMsg(mensaje))
    }
    else if(dataImg.size > 2200000)
    {
      mensaje.type="error"
      mensaje.title="ERROR"
      mensaje.body="El archivo no debe pesar mas de 2.2 MB"
      dispatch(createNewMsg(mensaje))
    }
    else if(dataImg.type === 'image/png' || dataImg.type === 'image/jpg' || dataImg.type === 'image/jpeg')
    {
      dispatch(cambiarImagen(dataImg))
      console.log(dataImg)
    }
    else
    {
      mensaje.type="error"
      mensaje.title="ERROR"
      mensaje.body="Solo se aceptan archivos con extension .jpg, .jpeg y .png"
      console.log(dataImg.type)
      dispatch(createNewMsg(mensaje))
    }

  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickEnable = () => {
    setValues({ ...values, editable: !values.editable });
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        
        <br />
        <Typography component="h5" variant="h5">
          Perfil {values.editable}
        </Typography>
        <br />

        <Card variant="outlined">
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Avatar
                alt="Roberto"
                src={datosUsuario.imgURL}
                className={classes.large}
              />
              <br />

              <Grid container direction="row" justify="center" alignItems="center" className={classes.marginbutton} >              
                <input disabled={loading} accept="image/jpeg, image/jpg, image/png, " onChange={(e)=>cargarImagen(e)} className={classes.imageinput} id="contained-button-file" type="file"/>
                <label htmlFor="contained-button-file">
                  <Button disabled={loading} size="small" variant="contained" color="primary" component="span" >
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
        
              <Collapse in={msg ? true : false}>
                  {msg && (
                  <Alert severity={msg.type} variant="filled">
                    <AlertTitle>{msg.title}</AlertTitle>
                    {msg.body}
                  </Alert>)}
              </Collapse>
              <br/>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <TextField 
                        label="Contraseña Actual" 
                        className={clsx(classes.margininput, classes.textField)} 
                        variant="filled" 
                        onChange={changePassword('oldpass')}
                /><br/>
                <TextField 
                        label="Nueva Contraseña" 
                        className={clsx(classes.margininput, classes.textField)} 
                        variant="filled" 
                        onChange={changePassword('newpass')}
                /><br/>
                <TextField 
                        label="Confirmación Nueva Contraseña" 
                        className={clsx(classes.margininput, classes.textField)} 
                        variant="filled" 
                        onChange={changePassword('newpass2')}
                />
              </Collapse>

              <Collapse in={expanded2} timeout="auto" unmountOnExit>
                <Grid container spacing={3} direction="row">
                  <Grid container item xs={6} direction="column">              
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
                      label="Ubicacion"
                      disabled={!values.editadatos}
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
                      disabled={!values.editadatos}
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
                  </Grid>
                  <Grid container item xs={6} direction="column">
                    <TextField
                      label="Nombre"
                      disabled={!values.editadatos}
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
                      disabled={!values.editadatos}
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
                    <TextField 
                      label="Sitio web"
                      disabled={!values.editadatos}
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
                </Grid>
              </Collapse>

            </Grid>
          </CardContent>

          <CardActions>
          {
            values.editable && (
              <Grid container direction="row" justify="center" alignItems="center" className={classes.marginbutton} >
              <Button disabled={loading} variant="contained" color="primary" onClick={() => guardarCambios()} >
                Guardar
              </Button>
              <Button disabled={loading} variant="contained" color="secondary" onClick={()=> cancelar()}>
                Cancelar
              </Button>
            </Grid>
            )
          }
          </CardActions>
        </Card>
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
