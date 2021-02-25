import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tarjeta from "./Tarjeta3";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse } from "@material-ui/core";
//BREADCRUMBS
import { useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
//ACCIONES
import {AddBreadcrum, crearNuevoPost, createNewMsg, deleteMsg} from '../redux/userDuck'
import { MasGustados } from '../redux/postDuck'

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const migajas = useSelector(store => store.user.breadcrumbs)
  const msg = useSelector(store => store.user.msg)
  const gustados = useSelector(store => store.posts.mas_gustado)

  const ExpRegTitulo = /^[\s\S]{10,60}$/
  const ExpRegDescripcion = /^[\s\S]{20,500}$/
  const ExpRegTags = /^[\s\S]{2,15}$/
  
  const [Dialogopen, setDialogOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    titulo: "",
    texto: "",
    lenguaje: "",
    tags:["","","",""]
  })

  // const publicar = () =>{
  //   dispatch(crearNuevoPost({}))
  //   handleDialogClose()
  // }
  
  React.useEffect(()=>{
      dispatch(AddBreadcrum("Main", path))
      dispatch(MasGustados())
  },[])

  const changeState = (prop) => (event) =>{
    setValues({...values, [prop]: event.target.value})
  }

  const changeArrayState = (position)=> (event) =>{
    let tags = values.tags;
    tags[position] = event.target.value
    setValues({...values, tags})
  }

  const validar = () =>{
    let mensaje = {
      type:"error",
      title:"ERROR",
      body:""
    }
    if(!values.titulo.trim() || !values.texto.trim())
    {
      //TODOS LOS CAMPOS DEBEN LLENARSE
      mensaje.body = "Rellene todos los campos"
      dispatch(createNewMsg(mensaje))
      return
    }
    else if(!ExpRegTitulo.test(values.titulo)){
      mensaje.body = "El titulo debe tener una longitud de 10-60 caracteres"
      dispatch(createNewMsg(mensaje))
      return
    }
    else if(!ExpRegDescripcion.test(values.texto)){
      mensaje.body = "La descripcion debe tener una longitud de 20-500 caracteres"
      dispatch(createNewMsg(mensaje))
      return
    }
    else if(!values.lenguaje.trim()){
      //SELECCIONA UN LENGUAJE
      mensaje.body = "Debe seleccionar un lenguaje"
      dispatch(createNewMsg(mensaje))
      return
    }
    for (let i = 0; i < values.tags.length; i++) {
      if(!ExpRegTags.test(values.tags[i])){
        //NO PUEDES INCLUIR TAGS VACIOS
        mensaje.body = "El uso de tags es obligatorio, con una longitud de 2-15 caracteres"
        dispatch(createNewMsg(mensaje))
        return
      }      
    }
    console.log("PUBLICADO")
    dispatch(crearNuevoPost(values))
    handleDialogClose()
    //dispatch(deleteMsg(4000))
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    console.log("ADIOS")
    dispatch(deleteMsg())
  };


  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid item xs={9}>
        {
          console.log(values)
        }
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.tittle} >
              <Typography variant="h4" > Mas Gustados </Typography>
                <Grid container justify="flex-end" alignItems="center" style={{ flex: 1 }}>
                  <Button size="small" variant="contained" color="primary" className={classes.button} onClick={handleDialogOpen} >
                    Nuevo
                  </Button>
                </Grid>
                {
                  gustados &&(
                      gustados.map(item => <Tarjeta id={item.id_post} autor={item.autor[0] + " " + item.autor[1]} fecha={item.fecha} texto={item.texto} titulo={item.titulo}/>)
                  )
                }
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Grid container direction="column" justify="center" alignItems="center" className={classes.tittle} >
              <Typography variant="h4" > Ultimos post </Typography>
                Aqui iran los post de las personas que sigas
                {/* {
                  gustados &&(
                      gustados.map(item => <Tarjeta id={item.id_post} autor={item.autor[0] + " " + item.autor[1]} fecha={item.fecha} texto={item.texto} titulo={item.titulo}/>)
                  )
                } */}
            </Grid>
          </CardContent>
        </Card>

        <Dialog open={Dialogopen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nuevo Post</DialogTitle>
          <DialogContent>          
            <Grid container direction="column" alignItems="center">     
              <Collapse in={msg ? true : false}>
                  {msg && (
                  <Alert severity={msg.type} variant="filled">
                    <AlertTitle>{msg.title}</AlertTitle>
                    {msg.body}
                  </Alert>)}
              </Collapse>   
              <TextField label="Título" className={classes.input} variant="filled" onChange={changeState("titulo")} />
              <TextField label="Descripción" multiline rows={4} className={classes.input} onChange={changeState("texto")} variant="filled" />
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>Lenguaje</InputLabel>
                <Select className={classes.input} value={values.lenguaje} onChange={changeState("lenguaje")}>
                  <MenuItem value={"javascript"}>JavaScript</MenuItem>
                  <MenuItem value={"php"}>PHP</MenuItem>
                  <MenuItem value={"c#"}>C#</MenuItem>
                </Select>
              </FormControl>
              <Grid direction="row" justify="flex-start" alignItems="center">
                <TextField label="tag1" onChange={changeArrayState(0)} className={classes.tag} variant="filled" />
                <TextField label="tag2" onChange={changeArrayState(1)} className={classes.tag} variant="filled" />
                <TextField label="tag3" onChange={changeArrayState(2)}className={classes.tag} variant="filled" />
                <TextField label="tag4" onChange={changeArrayState(3)} className={classes.tag} variant="filled" />
              </Grid>
              <input accept="*" type="file" style={{ display: 'none' }} />
              <label htmlFor="contained-button-file">
              {/* BOTON PARA SUBIR LOS ARCHIVOS
              <Button size="small" variant="contained" color="primary" className={classes.button}>
                Subir Archivos 
              </Button> */}
              </label>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary"> Cancelar </Button>
            <Button onClick={() => validar()} color="primary"> Publicar </Button>
          </DialogActions>
        </Dialog>

      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: '#f5f5f5'
  },
  title: {
    flex: 1
  },
  card: {
    flex: 5,
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  input: {
    width: theme.spacing(63),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  tag: {
    flex: 1,
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: theme.spacing(15),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
