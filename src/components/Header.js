import React from "react";
import clsx from 'clsx';
//dependedncias
import { fade, makeStyles,useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
//Filtros
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
//iconos
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InicioIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import AboutIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import Guardados from '@material-ui/icons/Bookmarks';
import Repositorio from '@material-ui/icons/Inbox';
import Mispost from '@material-ui/icons/LibraryBooks';
import FilterIcon from '@material-ui/icons/FilterList'
import Logo from './img/Logo.png'

//Bookmarks, Inbox, LibraryBooks

/**MIS IMPORTACIONES */
import { withRouter, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesion } from '../redux/userDuck'
import { EstablecerFiltros, nuevamente } from '../redux/postDuck'

const drawerWidth = 240;

// HEADER
const PrimarySearchAppBar = (props)=> {

  const dispatch = useDispatch();
  const active = useSelector(store => store.user.active)
  const filtros = useSelector(store => store.posts.config_busqueda)
  let location = useLocation()
  const [texto, setTexto] = React.useState("")
  const [values, setValues] = React.useState({
      type: filtros.type || "temas",
      //texto: "",
      lenguaje: filtros.lenguaje || "todos",
      fecha: filtros.fecha || "todos",
      descendente: filtros.descendente || true
  })

  const [temp, setTemp]  = React.useState({})

  const handleChangeTemp = (prop) => (event) => {
    setTemp({ ...temp, [prop]: event.target.value });
  };

  const handleChangeCheckTemp = (event) => {
    setTemp({ ...temp, [event.target.name]: event.target.checked });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheck = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const logout = () =>{
    dispatch(cerrarSesion())
    props.history.push('/')
  }

  const buscar = () =>{
    //direccion("busqueda="+texto+"&tipo=:tipo&lenguaje=:leng&tiempo=:time&desc=:desc)
    dispatch(nuevamente())
    direccion("/busqueda/" + texto)
  }

  const setFiltros = () =>{
    dispatch(EstablecerFiltros(values))
    handleDialogClose()
  }

  const restaurarFiltros = () =>{
    dispatch(EstablecerFiltros({
      type: "temas",
      lenguaje: "todos",
      fecha: "todos",
      descendente: true
    }))
    handleDialogClose()
  }

  const direccion = (adress) =>{
    props.history.push(adress)
  }

  // React.useEffect(()=>{
  //   console.log(location.pathname)
  // }, [location])

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [Dialogopen, setDialogOpen] = React.useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { 
        direccion('/perfil')
        handleMenuClose()
       }}>
         Mi Perfil
      </MenuItem>
      <MenuItem onClick={()=> {
        logout()
        handleMenuClose()
      }}>Cerrar Sesion</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Iniciar Sesión</p>
        <p>Registrarse</p>
      </MenuItem>
    </Menu>
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setValues({...values, type: filtros.type, lenguaje: filtros.lenguaje, fecha: filtros.fecha, descendente:filtros.descendente})
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          {
            active&&(
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            )
          }
          <div className={classes.image}>
           <img className={classes.img} alt="Logotipo" src={Logo} onClick={() =>{active ? (direccion('/main')):(direccion('/'))}}/>
          </div>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Inicio
          </Typography> */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar por palabras clave"
              onChange={(e) => setTexto(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput, }}
              inputProps={{ 'aria-label': 'search' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton type="submit" className={classes.filterIcon} onClick={handleDialogOpen}>
                    <FilterIcon />
                  </IconButton>
                </InputAdornment>
                }
              />
            <Button style={{color:'white'}} onClick={() =>{buscar()}} >Buscar</Button>
            {console.log(texto)}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!active &&(
              <>
              {location.pathname != '/login' &&(
                <IconButton edge="end">
                  <Button style={{ color: '#FFFFFF'}} onClick={() =>{direccion('/login')}}>Iniciar Sesión</Button>
                </IconButton>
              )}
              {location.pathname != '/registro' &&(
                <IconButton edge="end">
                  <Button style={{ color: '#FFFFFF'}} onClick={() =>{direccion('/registro')}}>Registrarse</Button>            
                </IconButton>
              )}
              </>
            )}
            
            {active &&(
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                )
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        active&&(<Drawer
                  className={classes.drawer}
                  variant="persistent"
                  anchor="left"
                  open={open}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {/* {['Inicio', 'Categorías'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InicioIcon /> : <CategoryIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))} */}
                    <ListItem button onClick={() => direccion("/main")}>
                      <ListItemIcon>{<InicioIcon />}</ListItemIcon>
                      <ListItemText primary={"Inicio"} />
                    </ListItem>
                    {/* <ListItem button >
                      <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                      <ListItemText primary={"Categorias"} />
                    </ListItem> */}
                    <ListItem button onClick={() => direccion("/repositorio")}>
                      <ListItemIcon>{<Repositorio />}</ListItemIcon>
                      <ListItemText primary={"Mi repositorio"} />
                    </ListItem>
                    <ListItem button onClick={() => direccion("/main")}>
                      <ListItemIcon>{<Guardados />}</ListItemIcon>
                      <ListItemText primary={"Elementos guardados"} />
                    </ListItem>
                  </List>
                  <Divider />
                  <List>
                    {/* {['Acerca de', 'Opciones'].map((text, index) => (
                      <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ?  <AboutIcon /> : <SettingsIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))} */}
                    <ListItem button onClick={() => direccion("/ajustes")}>
                        <ListItemIcon>{<SettingsIcon/>}</ListItemIcon>
                        <ListItemText primary={"Configuraciones"} />
                    </ListItem>
                  </List>
                </Drawer>)
      }
      {renderMobileMenu}
      {renderMenu}
      <Dialog open={Dialogopen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        {/* {values.texto} */}
        <DialogTitle id="form-dialog-title">Busqueda Avanzada</DialogTitle>
        <DialogContent>          
          <Grid container direction="row" justify="center" alignItems="center">
            <FormControl component="fieldset">
              {/* {values.type} */}
              <RadioGroup value={values.type} onChange={handleChange("type")}>
                <FormControlLabel value="autor" control={<Radio />} label="Autor" />
                <FormControlLabel value="temas" control={<Radio />} label="Temas" />
                {/* <FormControlLabel value="leng_date" control={<Radio />} label="Lenguaje y Fecha" /> */}
                {/* <FormControlLabel value="leng" control={<Radio />} label="Solo Lenguaje" />
                <FormControlLabel value="date" control={<Radio />} label="Solo fecha" /> */}
              </RadioGroup>
            </FormControl>
            <Divider orientation="vertical" flexItem />
            <Grid direction="column" justify="center" alignItems="center" style={{ margin: theme.spacing(1) }} >
              <FormControl className={classes.formControl}>
                {/* {values.lenguaje} */}
                <InputLabel> Lenguaje </InputLabel>
                <Select value={values.lenguaje} onChange={handleChange("lenguaje")}>
                  <MenuItem value="todos" > Todos </MenuItem>
                  <MenuItem value="javascript" > JavaScript </MenuItem>
                  <MenuItem value="java" > Java </MenuItem>
                  <MenuItem value="php" > PHP </MenuItem>
                  <MenuItem value="python" > Python </MenuItem>
                  <MenuItem value="c#" > C# </MenuItem>
                  {/* <MenuItem value="ruby" > Ruby </MenuItem> */}
                </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
                {/* {values.fecha} */}
                <InputLabel> Fecha </InputLabel>
                <Select value={values.fecha} onChange={handleChange("fecha")}>
                  <MenuItem value="todos" > Todos </MenuItem>
                  <MenuItem value="semana_pasada" > Semana Pasada </MenuItem>
                  <MenuItem value="mes_pasado" > Mes Pasado </MenuItem>
                </Select>
              </FormControl>
              <br />
              {/* {values.descendente} */}
              {/* CHECK BOX */}
              {/* <FormControlLabel className={classes.checkbox} control={<Checkbox name="descendente" checked={values.descendente} onChange={handleChangeCheck} />} label="Descendente" /> */}
            </Grid>
          </Grid>
        </DialogContent>
        {/* {
          console.log(values)
        } */}
        <DialogActions>
          <Button onClick={restaurarFiltros} color="primary"> Restaurar Filtros </Button>
          <Button onClick={handleDialogClose} color="primary"> Cancelar </Button>
          <Button onClick={setFiltros} color="primary"> Aceptar </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    backgroundColor: '#106CC8',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    color: '#fff',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  image: {
    width: 128,
    height: 64,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checkbox: {
    margin: theme.spacing(2),
  },
}));

export default withRouter(PrimarySearchAppBar)