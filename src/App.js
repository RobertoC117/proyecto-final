import Footer from './components/Footer'
import Header from './components/Header.js'
import Repositorio from './components/Repositorio2'
import Perfil from './components/Perfil'
import Login from './components/Login'
import Registro from './components/Registro'
import Post from './components/Post.js'
import Aviso from './components/Vizualizador'
import Inicio from './components/Home'
import Ajustes from './components/Ajustes'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {auth} from './config/firebase'
import React from 'react'
import BreadBar from './components/BreadBar'
import NotFound from './components/NotFound'
import Busqueda from './components/Busqueda'
import Preguntas from './components/PreguntasFrec'
import Contacto from './components/Contacto'
import Main from './components/Main.js'
import PruebaEmail from './components/PruebaEmail'
import Recuperacion from './components/Recuperacion.js'
import ChangePass from './components/ChangePass.js'
import RecibirParametrosPrueba from './components/RecibirParametrosPrueba'
import Ayuda from './components/Ayuda'
import Navegacion from './components/Navegacion'
import Loading from './components/Loading'
import { Grid } from '@material-ui/core'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(()=>{
    const fetchUser = () =>{
      auth.onAuthStateChanged(user =>{
        //console.log(user)
        if(user)
          setFirebaseUser(user)
        else
          setFirebaseUser(null)
      })
    }
    fetchUser()
  }, [])

  const RutaProtegida = ({component, path, ...rest}) =>{
    if(localStorage.getItem('userData'))
    {
      const user =  JSON.parse(localStorage.getItem('userData'))
      if(user.uid === firebaseUser.uid)
      {
        return(
          <Route component={component} path={path} {...rest}/> 
        )
      }else{
        return <Redirect to="/login" {...rest}/>
      }
    }else{
      return <Redirect to="/login" {...rest}/>
    }
  }

  return firebaseUser !== false ? (
    <Router>
      <Grid style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} >
        <Header/>
        <BreadBar/>
        <Switch>
          <Route path='/' exact>
            <Inicio/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/registro'>
            <Registro/>
          </Route>
          <RutaProtegida component={Main} path="/main" exact/>
          <RutaProtegida component={Perfil} path="/perfil" exact/>
          <RutaProtegida component={Repositorio} path="/repositorio" exact/>
          <RutaProtegida component={Ajustes} path="/ajustes" exact/>
          <RutaProtegida component={Post} path="/post/:id_post" exact/>
          <RutaProtegida component={Busqueda} path="/busqueda/:word" exact/>
          <RutaProtegida path="/busqueda/*" exact>
              <NotFound title={"Error 400 "} texto={"La peticion no se completo por que hacen falta parametros"}/>
          </RutaProtegida>
          <RutaProtegida path="/post/*" exact>
              <NotFound title={"Error 400 "} texto={"La peticion no se completo por que hacen falta parametros"}/>
          </RutaProtegida>
          <Route path='/aviso'>
            <Aviso/>
          </Route>
          {//#region BORRAR
          }
          <Route path='/prueba_email'>
            <PruebaEmail/>
          </Route>
          <Route path='/prueba/'>
            <RecibirParametrosPrueba/>
          </Route>
          <Route path='/prueba/code=:code&key=:key'>
            <RecibirParametrosPrueba/>
          </Route>
          {
            //#endregion
          }
          <Route path='/forgot'>
            <Recuperacion/>
          </Route>
          <Route path='/resetpassword/'>
            <ChangePass/>
          </Route>
          <Route path='/contacto'>
            <Contacto/>
          </Route>
          <Route path='/preguntas_frecuentes'>
            <Preguntas/>
          </Route>
          <Route path='/ayuda'>
            <Ayuda/>
          </Route>
          <Route path='/navegacion'>
            <Navegacion/>
          </Route>
          {/* PARA LA RUTA QUE NO EXISTE */}
          <Route path='*'>
            <NotFound title={"Error 404 "} texto={"La página no se encontró "}/>
          </Route>
        </Switch>
        <Footer/>
        </Grid>
    </Router>
  ):(<Loading/>);
}

export default App;
