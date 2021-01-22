import React from 'react'
import Nuevo from './NewPost'
import Post from './tarjeta2'
import {Grid} from '@material-ui/core';

const Main = () => {
    return (
        <div>
            <Nuevo/>
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
