import { db, auth, firebase } from '../config/firebase'

const dataInicial = {
    loading: false,
    mis_posts:[],
    again:false,
    config_busqueda:{
        type:"temas",
        lenguaje:"todos",
        fecha:"todos",
        descendente:true,
        bandera:null
    }
}

const LOADING = 'LOADING'
const POST_EXITO = 'POST_EXITO';
const SET_FILTROS = 'SET_FILTROS';
const BUSCAR_AGAIN = 'BUSCAR_AGAIN';

export default function postReducer(state = dataInicial, action){
    switch (action.type) {
        case LOADING:
            return {...state, loading:true};
        case POST_EXITO:
            return {...state, resultados: action.payload, loading:false};
        case SET_FILTROS:
            return {...state, loading:false, config_busqueda:action.payload}
        case BUSCAR_AGAIN:
            return {...state, again: action.payload}
        default:
            return state;
    }
}

export const EstablecerFiltros = (filtros) => async(dispatch, getState) =>{
    dispatch({
        type: LOADING
    })
    try {
          const { config_busqueda } = getState().posts
          dispatch({
              type:SET_FILTROS,
              payload:{...config_busqueda,...filtros}
          })
          localStorage.setItem('filtros', JSON.stringify({...config_busqueda,...filtros}))   
    } catch (error) {
        console.log(error)
    }
}

export const Buscar = (texto) => async(dispatch, getState) =>{
    try {
        const { type, lenguaje, fecha, descendente } = getState().posts.config_busqueda

        let fecha_busqueda = new Date()
        if(fecha === "semana_pasada"){
            fecha_busqueda.setDate(fecha_busqueda.getDate() - 7)
        }else if(fecha === "mes_pasado"){
            fecha_busqueda.setMonth(fecha_busqueda.getMonth() - 1)
        }

        switch (type) {
            case "autor":
                //const {lenguaje, fecha, descendente} = getState().posts.config_busqueda
                let autor = texto
                let array_autor = autor.split(' ').map(item => item.toUpperCase())
                console.log(array_autor)

                if(lenguaje === "todos" && fecha === "todos")
                {
                    //busqueda filtrada solo por autor
                    Autor(array_autor)(dispatch, getState)
                }
                else if(lenguaje === "todos")
                {
                    //busqueda filtrada por autor y fecha
                    Autor_Fecha(array_autor, fecha_busqueda)(dispatch, getState)
                }
                else if(fecha === "todos")
                {
                    //busqueda filtrada por autor y lenguajes
                    Autor_Lenguaje(array_autor, lenguaje)(dispatch, getState)
                }
                else
                {
                    //busqueda por autor, lenguaje y fecha
                    Autor_Lenguaje_Fecha(array_autor, lenguaje, fecha_busqueda)(dispatch, getState)
                }
                break;
            case "temas":
                let temas = texto
                let array_temas = temas.split(' ').map(item => item.toUpperCase())
                if(lenguaje === "todos" && fecha === "todos")
                {
                    //busqueda filtrada solo por temas
                    Temas(array_temas)(dispatch, getState)
                }
                else if(lenguaje === "todos")
                {
                    //busqueda filtrada por temas y fecha
                    Temas_Fecha(array_temas, fecha_busqueda)(dispatch, getState)
                }
                else if(fecha === "todos")
                {
                    //busqueda filtrada por temas y lenguaje
                    Temas_Lenguaje(array_temas, lenguaje)(dispatch, getState)
                }
                else
                {
                    //Busqueda por tema, lenguaje y fecha
                    Temas_Lenguaje_Fecha(array_temas, lenguaje, fecha_busqueda)(dispatch, getState)
                }
                break;
            //#region BASURA
            // case "leng_date":
            //     if(lenguaje === "todos" && fecha === "todos")
            //     {
            //         //sin filtros practicamente
            //     }
            //     else if(lenguaje === "todos")
            //     {
            //         //filtrado por fecha
            //         Fecha(fecha_busqueda)(dispatch, getState)
            //     }
            //     else if(fecha === "todos")
            //     {
            //         //filtrado por lenguaje
            //         Lenguaje(lenguaje)(dispatch, getState)
            //     }
            //     else{
            //         //filtrado por lenguaje y fecha
            //         Lenguaje_Fecha(lenguaje, fecha_busqueda)(dispatch, getState)
            //     }
            
            //     break;
            // case "leng":

            //     if(lenguaje !== "todos")
            //     {
            //         //se filtra por lenguaje
            //         Lenguaje(lenguaje)(dispatch, getState)
            //     }
            //     else
            //     {
            //         //sin filtro
            //     }
            
            //    break;
            // case "date":
            //     if(fecha !== "todos")
            //     {
            //         //se filtra por fecha
            //         Fecha(fecha_busqueda)(dispatch, getState)
            //     }
            //     else
            //     {
            //         //sin filtro
            //     }
            //     break;
            //#endregion
            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }
}

export const getResultados = (tag) => async(dispatch, getState) =>{
    try {
        let fecha = new Date(1613155845000)
        const respuesta = await db.collection("publicaciones").limit(1).get()
        const response = await db.collection("publicaciones").orderBy("fecha").startAfter(respuesta.docs[respuesta.docs.length - 1]).get()
        const count = response.size
        const arreglo_data = response.docs.map(item => item.data()) 
        console.log(count, arreglo_data)
        //const response = await db.collection("publicaciones").where('fecha2',"==",fecha).get()
        //const response = await db.collection("publicaciones").where('Titulo','array-contains-any',['python']).get()
        // const data = response.docs
        // console.log(data[0].data())
    } catch (error) {
        console.log(error)
    }
}

//#region BUSQUEDAS POR AUTOR
export const Autor = (autor) => async (dispatch, getState) =>{
    dispatch({
        type: LOADING
    })
    try {
        const response = await db.collection("publicaciones").where("autor", "array-contains-any", autor).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
            console.log(i)
        }
        console.log(data)
        //localStorage.setItem("resultados", JSON.stringify(data))
        dispatch({
            type: POST_EXITO,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const Autor_Fecha = (autor, fecha) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("fecha",">=",fecha).where("autor", "array-contains-any", autor).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Autor_Lenguaje = (autor, lenguaje) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).where("autor", "array-contains-any", autor).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Autor_Lenguaje_Fecha = (autor, lenguaje, fecha) => async(dispatch, getState) =>{
    try {
        //let array_autor = autor.split('').map(item => item.toUpperCase())
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).where("fecha",">=",fecha).where("autor", "array-contains-any", autor).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

//#endregion

//#region  BUSQUEDAS POR TEMAS

export const Temas = (temas) => async(dispatch, getState) =>{
    try {
        //let array_autor = autor.split('').map(item => item.toUpperCase())
        const response = await db.collection("publicaciones").where("tags", "array-contains-any", temas).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Temas_Fecha = (temas, fecha) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("fecha",">=",fecha).where("tags", "array-contains-any", temas).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Temas_Lenguaje = (temas, lenguaje) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).where("tags", "array-contains-any", temas).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Temas_Lenguaje_Fecha = (temas, lenguaje, fecha) => async(dispatch, getState) =>{
    try {
        console.log("TEMA, LENGUAJE Y FECHA")
        //let array_autor = autor.split('').map(item => item.toUpperCase())
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).where("fecha",">=",fecha).where("tags", "array-contains-any", temas).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

//#endregion

//#region BUSQUEDAS POR LENGUAJE Y FECHA
export const Lenguaje_Fecha = (lenguaje, fecha) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).where("fecha",">=",fecha).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Lenguaje = (lenguaje) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("lenguaje","==", lenguaje).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 

export const Fecha = (fecha) => async(dispatch, getState) =>{
    try {
        const response = await db.collection("publicaciones").where("fecha",">=",fecha).get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
        
    } catch (error) {
        console.log(error)
    }
} 
//#endregion

export const SinFiltro = () => async (dispatch, getState) => {
    try {
        const response = await db.collection("publicaciones").get()
        let data = [];
        for(let i = 0; i < response.docs.length; i++) {
            data.push(response.docs[i].data())
        }
        dispatch({
            type: POST_EXITO,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const nuevamente = () => async (dispatch, getState) =>{
    try{
        const {again} = getState().posts
        dispatch({
            type:BUSCAR_AGAIN,
            payload: !again
        })
    }catch(error){
        console.log(error)
    }
}


export const busquedaAutor_Lenguaje = (autor, lenguaje) => async (dispatch, getState) => {

    try {
        const response = await db.collection("publicaciones").where("lenguaje","==","python").where("autor", "array-contains-any", ["ROBERTO","HERNANDEZ"]).orderBy('fecha',"desc").get()
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


export const mantenerPostState = () => (dispatch) =>{
    try {
        if(localStorage.getItem('filtros')){
            dispatch({
                type: SET_FILTROS,
                payload: JSON.parse(localStorage.getItem('filtros'))
            })
        }

        if(localStorage.getItem('resultados')){
            dispatch({
                type: POST_EXITO,
                payload: JSON.parse(localStorage.getItem('resultados'))
            })
        }
    } catch (error) {
        console.log(error)
    }
}