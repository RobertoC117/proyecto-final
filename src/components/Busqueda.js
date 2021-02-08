import React from 'react'
import Nuevo from './NewPost'
import Post from './TarjetaBusqueda'
import NotFound from './NotFound'
import {Grid, Card, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation, useParams } from 'react-router-dom'
import { busquedaAutor_Lenguaje, Buscar} from '../redux/postDuck'

const Busqueda = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const again = useSelector(store => store.posts.again)
    const resultados = useSelector(store => store.posts.resultados)
    const {word} = useParams();
    
    React.useEffect(()=>{
        dispatch(AddBreadcrum("Busqueda/"+word, path))
        dispatch(Buscar(word))
    },[word, again])
    
    
    return (
        resultados ? 
        (<Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
            <Grid item xs={9}>
                {resultados.length > 0 ? <>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container direction="column" justify="center" alignItems="center" className={classes.tittle}>
                            <Typography variant="h4" > Resultados de Busqueda </Typography>
                            <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
                            {
                                resultados.map(item => <><Post nombre={item.autor[0] + " " + item.autor[1]} fecha={item.fecha} texto={item.texto} titulo={item.titulo}/><br/></>)
                            }
                            {/* <Post nombre="Alondra" fecha="01/Diciembre/2020"/><br/>
                            <Post nombre="Juan" fecha="30/Noviembre/2020"/><br/>
                            <Post nombre="Jose" fecha="30/Noviembre/2020"/><br/>
                            <Post nombre="Roberto" fecha="29/Noviembre/2020"/><br/> */}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </>:
                <>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <NotFound title="Ups!" texto="Parece que no se encontraron resultados de la busqueda"/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </>
                }        
            </Grid>
        </Grid>):
        (<div>
            <h1>CARGANDO DATOS.....</h1>
        </div>)
    )
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
  

export default Busqueda
