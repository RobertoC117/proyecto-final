import { Button } from '@material-ui/core';
import React from 'react'
import {useDispatch} from 'react-redux'
import {EnviarEmailEjemplo} from '../redux/userDuck'

const PruebaEmail = () => {
    
    const dispatch = useDispatch();
    const enviar = () =>{
        dispatch(EnviarEmailEjemplo())
    }

    return (
        <div>
            <h1>PRUEBA DEL EMAIL</h1>
            <Button onClick={()=>enviar()}>Manda el email pana</Button>
        </div>
    )
}

export default PruebaEmail
