import Footer from './components/Footer'
import Header from './components/Header'
import Repositorio from './components/Repositorio'
import Perfil from './components/Perfil'
import Login from './components/Login'
import Registro from './components/Registro'
import Nuevo from './components/NewPost'
import Post from './components/Post'
import Aviso from './components/Vizualizador'
import Inicio from './components/Home'
import Ajustes from './components/Ajustes'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {auth} from './config/firebase'
import Main from './components/Main'
import React from 'react'
import BreadBar from './components/BreadBar'
import NotFound from './components/NotFound'
import { Grid } from '@material-ui/core'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(()=>{
    const fetchUser = () =>{
      auth.onAuthStateChanged(user =>{
        console.log(user)
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
        {/* <Breadbar/> */}
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
          <RutaProtegida component={Post} path="/post" exact/>
          <Route path='/aviso'>
            <Aviso/>
          </Route>
          {/* PARA LA RUTA QUE NO EXISTE */}
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
        <Footer/>
        </Grid>
    </Router>
  ):(<div>Cargando...</div>);
}

export default App;
