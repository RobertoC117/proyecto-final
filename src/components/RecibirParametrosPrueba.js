import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { VerificarEmailEjemplo, ResetPassword } from '../redux/userDuck'

const RecibirParametrosPrueba = () => {
    const url = window.location.href
    const obj = useParams();
    const dispatch = useDispatch()
    const codigo = obj.oobCode
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery();

    React.useEffect(()=>{
        //dispatch(VerificarEmailEjemplo(url))
        dispatch(ResetPassword(query.get("oobCode")))
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
