import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { VerificarEmailEjemplo } from '../redux/userDuck'

const RecibirParametrosPrueba = () => {
    const url = window.location.href
    const obj = useParams();
    const dispatch = useDispatch()

    React.useEffect(()=>{
        dispatch(VerificarEmailEjemplo(url))
    },[])

    return (
        <div>
            {obj.code}<br/>
            {console.log(obj.code)}
            {obj.key}
            {console.log(obj.key)}
        </div>
    )
}

export default RecibirParametrosPrueba
