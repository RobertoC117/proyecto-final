import React from 'react'
import Nuevo from './NewPost'
import Post from './tarjeta2'
import NotFound from './NotFound'
import {Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation, useParams } from 'react-router-dom'
import { busquedaAutor_Lenguaje, Buscar} from '../redux/postDuck'

const Busqueda = () => {
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
        (<div>
            {resultados.length > 0 ? <>
            <br/>
            <center><h2>Resultados de Busqueda</h2></center>
            <br/>
            <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
                {
                    resultados.map(item => <><Post nombre={item.autor[0] + " " + item.autor[1]} fecha={item.fecha} texto={item.texto} titulo={item.titulo}/><br/></>)
                }
                {/* <Post nombre="Alondra" fecha="01/Diciembre/2020"/><br/>
                <Post nombre="Juan" fecha="30/Noviembre/2020"/><br/>
                <Post nombre="Jose" fecha="30/Noviembre/2020"/><br/>
                <Post nombre="Roberto" fecha="29/Noviembre/2020"/><br/> */}
            </Grid>
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
        </div>):
        (<div>
            <h1>CARGANDO DATOS.....</h1>
        </div>)
    )
}

export default Busqueda
