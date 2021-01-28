import { db, auth, firebase } from '../config/firebase'

const dataInicial = {
    loading: false,
    mis_posts:[],
}

const LOADING = 'LOADING'
const POST_EXITO = 'POST_EXITO';

export default function postReducer(state = dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading:true};
        case POST_EXITO:
            return {...state, posts: action.payload, loading:false};
        default:
            return state;
    }
}

export const getResultados = (tag) => async(dispatch, getState) =>{
    try {
        let fecha = new Date(1613155845000)
        const response = await db.collection("publicaciones").where('Tags','array-contains',tag).get()
        //const response = await db.collection("publicaciones").where('fecha2',"==",fecha).get()
        //const response = await db.collection("publicaciones").where('Titulo','array-contains-any',['python']).get()
        const data = response.docs
        console.log(data[0].data())
    } catch (error) {
        console.log(error)
    }
}

export const busquedaAutor_Lenguaje = (autor, lenguaje) => async (dispatch, getState) => {

    try {
        const response = await db.collection("publicaciones").where("lenguaje","==","python").where("autor", "array-contains-any", ["ROBERTO","CARLOS"]).get()
        const data = response.docs
        for(let i = 0; i<data.length; i++) {
            console.log(data[i].data())
        }
    } catch (error) {
        console.log(error)
    }

}

export const busquedaTags_Lenguaje = (tags, lenguaje) => async (dispatch, getState) => {

    try {
        const response = await db.collection("publicaciones").where("lenguaje","==","python").where("tags", "array-contains-any", ["INGENIERIA","TESIS"]).get()
        const data = response.docs
        for(let i = 0; i<data.length; i++) {
            console.log(data[i].data())
        }
    } catch (error) {
        console.log(error)
    }

}

export const busquedaLenguaje = (lenguaje) => async (dispatch, getState) => {

    try {
        const response = await db.collection("publicaciones").where("lenguaje","==","python").get()
        const data = response.docs
        for(let i = 0; i<data.length; i++) {
            console.log(data[i].data())
        }
    } catch (error) {
        console.log(error)
    }

}

export const busquedaLenguaje_UltimaSemana = (lenguaje) => async (dispatch, getState) => {

    try {
        let ultima_semana = new Date();
        ultima_semana.setDate(ultima_semana.getDate() - 7);
        const response = await db.collection("publicaciones").where("lenguaje","==","python").where('fecha','>=', ultima_semana).get()
        const data = response.docs
        for(let i = 0; i<data.length; i++) {
            console.log(data[i].data())
        }
    } catch (error) {
        console.log(error)
    }

}

export const busquedaLenguaje_UltimoMes = (lenguaje) => async (dispatch, getState) => {

    try {
        let hoy = new Date();
        let ultimo_mes = new Date();
        ultimo_mes.setMonth(hoy.getMonth() - 2);
        const response = await db.collection("publicaciones").where("lenguaje","==","python").where('fecha',">=",ultimo_mes).get()
        const data = response.docs
        for(let i = 0; i<data.length; i++) {
            console.log(data[i].data())
        }
    } catch (error) {
        console.log(error)
    }

}


export const mantenerPostState = () => (dispathc) =>{

}