import React from 'react'
import Nuevo from './NewPost'
import Post from './tarjeta2'
import {Grid} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'
import { useLocation } from 'react-router-dom'

const Main = () => {

    const dispatch = useDispatch();
    const path = useLocation().pathname;
    const migajas = useSelector(store => store.user.breadcrumbs)
    
    React.useEffect(()=>{
        dispatch(AddBreadcrum("Main", path))
    },[])
    
    
    return (
        <div>
            <Nuevo/>
            <br/>
            <br/>
            <br/>
            <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
                <Post nombre="Alondra" fecha="01/Diciembre/2020"/><br/>
                <Post nombre="Juan" fecha="30/Noviembre/2020"/><br/>
                <Post nombre="Jose" fecha="30/Noviembre/2020"/><br/>
                <Post nombre="Roberto" fecha="29/Noviembre/2020"/><br/>
            </Grid>
        </div>
    )
}

export default Main
