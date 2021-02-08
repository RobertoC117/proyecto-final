import { Button } from '@material-ui/core';
import React from 'react'
import {useDispatch} from 'react-redux'
import {EnviarEmailEjemplo, EnviarResetPassword} from '../redux/userDuck'

const PruebaEmail = () => {
    
    const dispatch = useDispatch();
    const enviar = () =>{
        //dispatch(EnviarEmailEjemplo())
        dispatch(EnviarResetPassword("rycesoh.080314@gmail.com"))
    }

    return (
        <div>
            <h1>PRUEBA DEL EMAIL</h1>
            <Button onClick={()=>enviar()}>Manda el email pana</Button>
        </div>
    )
}

export default PruebaEmail
