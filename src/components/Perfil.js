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
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation } from 'react-router-dom'

export default function Perfil() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const datosUsuario = useSelector(store => store.user.userdata)
  const msg = useSelector(store => store.user.msg)
  const loading = useSelector(store => store.user.loading)
  const path = useLocation().pathname;
  const ExpRegPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  const ExpRegNombre = /^(?=.{3,45}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/
  const ExpRegTwitter = /@([A-Za-z0-9_]{1,15})/;
  const ExpRegCompany = /^(?=.{1,25}$)[A-ZÁÉÍÓÚa-zñáéíóú0-9]+(?: [A-ZÁÉÍÓÚa-zñáéíóú0-9]+)?$/
  const ExpRegWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ ;
  const ExpRegUbicacion = /^(?=.{2,45}$)[A-ZÁÉÍÓÚa-zñáéíóú,.]+(?: [A-ZÁÉÍÓÚa-zñáéíóú,.]+)+(?: [A-ZÁÉÍÓÚa-zñáéíóú,.]+)?$/;
  const mensajeTwitter = "Los nombres de usuarios de twitter comienzan con el caracter @";
  const mensajeCompany = "El nombre de la compañia solo puede contener caracteres A-Z, a-z y 0-9"
  const mensajeWeb = "Esta no es una URL valida"
  const mensajeUbicacion = "El nombre de la ubicacion no puede contener numeros o caracteres especiales"

  React.useEffect(()=>{
      dispatch(AddBreadcrum("Perfil", path))
      console.log("1")
  },[])
  
  const [values, setValues] = React.useState({
    editable: false,
    editadatos:false,
    editapassword:false
  });

  const [datos, setDatos] = React.useState({
    nombre: datosUsuario.nombre || "",
    twitter: datosUsuario.twitter || "",
    ubicacion: datosUsuario.ubicacion || "",
    website: datosUsuario.website || "",
    company: datosUsuario.company || "",
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
      nombre: datosUsuario.nombre || "",
      twitter: datosUsuario.twitter || "",
      ubicacion: datosUsuario.ubicacion || "",
      website: datosUsuario.website || "",
      company: datosUsuario.company || "",
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

  const validarNombre = (nombre) =>{
      let mensaje={
        type:"error",
        title:"ERROR",
        body: ""
      }
      if(!nombre.trim()){
        mensaje.body = "El valor del nombre no puede ser un campo vacio"
        dispatch(createNewMsg(mensaje))
        return false;
      }
      else if(!ExpRegNombre.test(nombre))
      {
        mensaje.body = 'Recuerde que los nombre propios solo pueden contener letras y comienzan siempre con mayuscula \n se necesita al menos 3 caracteres por palabra si es un nombre compuesto'
        dispatch(createNewMsg(mensaje))
        return false;
      }
      return true;
  }

  const validarCampo = (valor, ExpReg, mensajeError) =>{
      if(valor === null || !valor.trim())
        return true;
      if(!ExpReg.test(valor))
      {
        let mensaje={
          type:"error",
          title:"ERROR",
          body: mensajeError
        }
        dispatch(createNewMsg(mensaje))
        return false;
      }
      return true;
  }

  const guardarCambios = () =>{
    if(values.editadatos)
    {
      if(!validarNombre(datos.nombre))
        return
      else if(!validarCampo(datos.twitter, ExpRegTwitter, mensajeTwitter))
        return
      else if(!validarCampo(datos.ubicacion, ExpRegUbicacion, mensajeUbicacion))
        return
      else if(!validarCampo(datos.company, ExpRegCompany, mensajeCompany))
        return
      else if(!validarCampo(datos.website, ExpRegWeb, mensajeWeb))
        return

      for (let key in datos) {
        if (datos[key] === null || !datos[key].trim())
          datos[key] = null;
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
      else if(ExpRegPassword.test(password.newpass))
      {
        mensaje.body = "La contraseña debe contener al menos un caracter A-Z, a-z, 0-9, algun caracter especial($@!%*?&) y tener una longitud de 8-15 caracteres";
        dispatch(createNewMsg(mensaje))
        return
      }
      
      dispatch(cambiarPassword(password.newpass))
       
    }
    resetBoolState();
    //setValues(values)
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
        {
          console.log(datos)
        }
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
                      value={datos.ubicacion} 
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
                      value={datos.twitter} 
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
                      value={datos.nombre} 
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
                      value={datos.company} 
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
                      value={datos.website} 
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
