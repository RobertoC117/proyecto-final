import { db, auth, firebase, storage} from '../config/firebase'
import CryptoJS from 'crypto-js';

const dataInicial = {
    loading: false,
    active: false,
    msg:null,
    breadcrumbs: []
}

const USER_EXITO = 'USER_EXITO';
const USER_MSG = 'USER_MSG';
const BREADCRUMBS = 'BREADCRUMBS'
const RESET = 'RESET';
const LOGOUT = 'LOGOUT';
const LOGIN = 'LOGIN'

export default function userReducer(state = dataInicial, action){

    switch (action.type) {
        case LOGIN:
            return {...state, loading:true}
        case USER_EXITO:
            return {...state, loading:false, active: true, msg:null, userdata: action.payload}
        case LOGOUT:
            return {...dataInicial}
        case USER_MSG:
            return {...state, msg:action.payload, loading: false}
        case BREADCRUMBS:
            return {...state, breadcrumbs: action.payload}
        case RESET:
            return{...state, resetOk: true}
        default:
            return state;
    }

}

export const logearGoogle = () => async(dispatch)=>{

    dispatch({
        type: LOGIN
    })
    try {

        
        
    } catch (error) {
        console.log(error)
    }

} 

export const logearKogit = (datos) => async(dispatch)=>{

    dispatch({
        type: LOGIN
    })
    try { 

        const response = await auth.signInWithEmailAndPassword(datos.email, datos.password)
        // console.log(response.user.email)
        const data = await db.collection('usuarios').doc(response.user.email).get()
        // console.log(data.data())
        localStorage.setItem('userData', JSON.stringify(data.data()))
        dispatch({
            type: USER_EXITO,
            payload: data.data()
        })
        
    } catch (error) {
        console.log(error)
        if(error.code === "auth/user-not-found")
        {
            dispatch({
                type:USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",                    
                    body:"Este usuario no existe"
                }
            })
        }
        else if(error.code === "auth/wrong-password")
        {
            dispatch({
                type:USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",                    
                    body:"Contraseña incorrecta"
                }
            })
        }
        else if(error.code === "auth/invalid-email")
        {
            dispatch({
                type:USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",                    
                    body:"Ingrese una direccion de email valida"
                }
            })
        }
        //auth/user-not-found
        //auth/wrong-password
        //auth/invalid-email
    }

}

export const registrar = (values) => async(dispatch)=>{

    dispatch({
        type: LOGIN
    })
    try {
        const email = values.email;
        const password = values.password;
        const username = values.username;
        const nombre = values.nombre
        const res = await db.collection("usuarios").where("username", "==", username).get()
        console.log(res.docs.length)
        if(res.docs.length > 0){
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",
                    body:"Este nombre de usuario ya esta en uso"
                }
            })
            return
        }
        const response = await auth.createUserWithEmailAndPassword(email, password)
        //console.log(response.user)
        const encriptada = CryptoJS.Rabbit.encrypt(password, response.user.uid).toString()
        const data = {
            username,
            email: response.user.email,
            password: encriptada,
            uid: response.user.uid,
            posts:[],
            nombre,
            twitter:null,
            ubicacion:null,
            company:null,
            website:null
        }
        await db.collection('usuarios').doc(response.user.email).set(data)

        localStorage.setItem('userData', JSON.stringify(data))

        dispatch({
            type: USER_EXITO,
            payload: data
        })
        
    } catch (error) {

        console.log(error)

        if(error.code === 'auth/invalid-email')
        {
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",
                    body:"Ingrese una direccion de email valida"
                }
            })
        }
        else if( error.code === 'auth/email-already-in-use')
        {
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",
                    body:"Esta direccion email ya esta en uso"
                }
            })
        }
    }

} 

export const editarDatos = (values) => async(dispatch, getState)=>{
    dispatch({
        type: LOGIN
    })
    try {
        const {userdata} = getState().user
        const newUser = {...userdata,...values}
        // console.log(newUser)
        // console.log(values)
        await db.collection('usuarios').doc(userdata.email).update(values)
        localStorage.setItem('userData', JSON.stringify(newUser))
        dispatch({
            type: USER_EXITO,
            payload:newUser
        })
        dispatch({
            type: USER_MSG,
            payload:{
                type:"success",
                title:"EXCELENTE",
                body:"Se guardaron los datos exitosamente"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const cambiarPassword = (newpassword) => async(dispatch, getState)=>{
    try {
        const {userdata} = getState().user
        await auth.currentUser.updatePassword(newpassword);
        const encriptada = CryptoJS.Rabbit.encrypt(newpassword, userdata.uid).toString()
        const newData = {...userdata, password: encriptada}
        await db.collection('usuarios').doc(userdata.email).update({password: encriptada})
        localStorage.setItem('userData', JSON.stringify(newData))
        dispatch({
            type: USER_EXITO,
            payload: newData
        })
        dispatch({
            type: USER_MSG,
            payload:{
                type:"success",
                title:"EXCELENTE",
                body:"Se guardaron los datos exitosamente"
            }
        })
    } catch (error) {
        if(error.code === "auth/requires-recent-login")
        {
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"warning",
                    title:"ADVERTENCIA",
                    body:"Esta operacion es sensible y requiere un inicio de sesion reciente. Inicie sesion nuevamente antes de intentar esta accion"
                }
            })
        }
        else if(error.code === "auth/network-request-failed")
        {
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",
                    body:"Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible)."
                }
            })
        }
        else{
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:error.code,
                    body:error.message
                }
            })
        }
        console.log(error)
        //auth/requires-recent-login
        //"This operation is sensitive and requires recent authentication. Log in again before retrying this request."
        
        //auth/network-request-failed
        //"A network error (such as timeout, interrupted connection or unreachable host) has occurred."
    }
}

export const cambiarImagen = (img) => async(dispatch, getState)=>{
    dispatch({
        type:LOGIN
    })
    try {
        const {userdata} = getState().user
        const imgRef = await storage.ref().child(userdata.email).child("foto_perfil")
        await imgRef.put(img)
        const imgURL = await imgRef.getDownloadURL()
        await db.collection('usuarios').doc(userdata.email).update({imgURL: imgURL})
        const newData = {...userdata, imgURL: imgURL}
        localStorage.setItem('userData', JSON.stringify(newData))
        dispatch({
            type: USER_EXITO,
            payload: newData
        })
        dispatch({
            type: USER_MSG,
            payload:{
                type:"success",
                title:"EXCELENTE",
                body:"Se cambio la imagen exitosamente"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const cerrarSesion = () => async(dispatch) =>{

    try {

        auth.signOut()
        dispatch({
            type: LOGOUT
        })
        localStorage.removeItem('userData')
        localStorage.removeItem('breadcrumbs')
        localStorage.removeItem('filtros')
        
    } catch (error) {
        dispatch({
            type: USER_MSG
        })
    }
}

export const createNewMsg = (msg) => async(dispatch) =>{
    try {
        dispatch({
            type: USER_MSG,
            payload:msg
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteMsg = (time = 0) => async(dispatch) =>{
    try {
        setTimeout(()=>{
            dispatch({
                type: USER_MSG,
                payload:null
            })
        }, time)
    } catch (error) {
        console.log(error)
    }
}

export const EnviarEmailEjemplo = () => async(dispatch) =>{
    try {
        const actionCodeSettings = {
            url: "http://localhost:3000/prueba/code=91203727310701&key=afbkjfbabdkajbkja",
            handleCodeInApp: true
        }
        const email = "rycesoh.080314@gmail.com"
        await auth.sendSignInLinkToEmail(email, actionCodeSettings)
        localStorage.setItem('email_prueba', email)
        console.log("TODO OK")
    } catch (error) {
        console.log(error)
    }
}

export const VerificarEmailEjemplo = (url) => async(dispatch) =>{
    try {
        if(auth.isSignInWithEmailLink(url)){
            let email = localStorage.getItem('email_prueba')
            if(!email)
            {
                //MENSAJE DE ERROR y return
                console.log("NO EXISTE EL OBJETO EMAIL EN EL LOCAL STORAGE")
            }else{
                //REGISTRO Y DISPATCH DE EXITO
                console.log("TODO SALIO BIEN MI PANA")
                //auth.
                localStorage.removeItem('email_prueba')
            }
        }else{
            console.log("Esta no es un URL valida")
        }
    } catch (error) {
        console.log(error)
    }
}

export const EnviarResetPassword = (email) => async(dispatch)=>{
    try {
        await auth.sendPasswordResetEmail(email)
        console.log("RESETEO ENVIADO")
    } catch (error) {
        console.log(error)
    }finally{
        dispatch({
            type: USER_MSG,
            payload:{
                type:"warning",
                title:"ATENCION",
                body:"Se enviara un enlace de recuperacion si existe una cuenta asociada a este email"
            }
        })
    }
}

export const ResetPassword = (codigo, new_pass) => async(dispatch) =>{
    try {
        //codigo = "asdaqfqFFafDS"
        //new_pass = "$Roberto031100"
        //codigo = "ZOQ6pAx-0VDUWmlhNTeNFBCqLju7bZ3fbzZPYzbYRTUAAAF3dSzsPg"
        await auth.confirmPasswordReset(codigo, new_pass)
        console.log("HECHO")
        dispatch({
            type: RESET
        })
        dispatch({
            type: USER_MSG,
            payload:{
                type:"success",
                title:"HECHO",
                body:"Tu contraseña fue restablecida, ve al login para inicar sesion"
            }
        })
    } catch (error) {
        console.log(error)
        if(error.code === "auth/invalid-action-code")
        {
            dispatch({
                type: USER_MSG,
                payload:{
                    type:"error",
                    title:"ERROR",
                    body:"El codigo fue manipulado, expiró o ya ha sido utilizado"
                }
            })
        }
        //VALIDA LOS ERRORES CON MENSAJES
    }
}

export const AddBreadcrum = (name, path) => (dispatch, getState) =>{
    try {
        let {breadcrumbs} = getState().user
        let bread = breadcrumbs.slice();
        let exist = bread.findIndex(item => item.path === path)
        if(exist != -1){

            //console.log(exist)
            let migaja;
            if(exist !== 0){
                migaja = bread.splice(exist, 1);
                bread.push(migaja[0]);
            }else{
                migaja = bread.shift();
                bread.push(migaja);
            }

        }else{

            if(bread.length === 7)
                bread.shift();
            
            bread.push({name, path})

        }

        //bread.push({name, path});

        console.log(bread)

        localStorage.setItem('breadcrumbs', JSON.stringify(bread))

        dispatch({
            type: BREADCRUMBS,
            payload: bread
        })
    } catch (error) {
        console.log(error)
    }
}

export const crearNuevoPost = (ObjPost) => async(dispatch, getState) =>{
    dispatch({
        type: LOGIN,
    })
    try {
        // ObjPost = {
        //     titulo: "prueba",
        //     texto: "prueba",
        //     lenguaje: "prueba",
        //     tags: ["prueba1", "prueba2"]
        // }
        const {email, uid, nombre} = getState().user.userdata
        const id_post = uid.slice(0,4) + new Date().getTime();
        const id_autor = uid;
        let autor = nombre.split(' ').map(item => item.toUpperCase()) 
        ObjPost ={...ObjPost, autor, id_post, fecha: new Date().getTime(), id_autor}

        await db.collection("publicaciones").doc(id_post.toString()).set(ObjPost)
        let datosUsuario = JSON.parse(localStorage.getItem('userData'))
        datosUsuario.posts.push(id_post)
        
        await db.collection("usuarios").doc(email).update({posts: datosUsuario.posts})
        localStorage.setItem('userData', JSON.stringify(datosUsuario))
        dispatch({
            type: USER_EXITO,
            payload: datosUsuario
        })
    } catch (error) {
        console.log(error)
    }
}

export const mantenerUserState = () => (dispatch) =>{
    try {
        if(localStorage.getItem('userData'))
        {
            dispatch({
                type: USER_EXITO,
                payload: JSON.parse(localStorage.getItem('userData'))
            })
        }
        if(localStorage.getItem('breadcrumbs'))
        {
            dispatch({
                type: BREADCRUMBS,
                payload: JSON.parse(localStorage.getItem('breadcrumbs'))
            })
        }
    } catch (error) {
        console.log(error)
    }
}