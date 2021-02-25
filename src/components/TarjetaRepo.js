import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
//icon
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CloseIcon from "@material-ui/icons/Close";
import { withRouter } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { EliminarPost } from '../redux/userDuck'


const Tarjeta = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [Dialogopen, setDialogOpen] = React.useState(false);
  const fecha = new Date(props.fecha)
  
  const redireccion = () =>{
      props.history.push("/post/" + props.id)
  }
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  
  const borrar = (id) =>{
    dispatch(EliminarPost(id))
    handleDialogClose()
  } 

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item xs={4}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction="row" justify="space-between" alignItems="flex-start" >
            <Grid direction="column" justify="flex-start" alignItems="flex-start" style={{ flex: 1 }}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {fecha.toString()}
              </Typography>
              <Typography variant="h5" component="h2">
                {props.titulo}
              </Typography>
            </Grid>
            
            {/* ESTE BOTON ES PARA ELIMINAR EL POST*/}
            <Grid justify="flex-start" alignItems="flex-end" >
              <IconButton size="small">
                <CloseIcon fontSize="small" onClick={handleDialogOpen} />
              </IconButton>
            </Grid> 
          </Grid>
          <Typography variant="body2" component="p">
            {props.texto}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. */}
          </Typography>
        </CardContent>
        <CardActions justify="space-between" >
          <Button size="small" onClick={() => redireccion()} >Ver Más</Button>
          <FormControlLabel
            style={{ marginLeft: 'auto' }}
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                size="small"
              />
            }
          />
        </CardActions>
      </Card>

      <Dialog open={Dialogopen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> ¿Seguro que quieres eliminar esta publicacion? </DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary"> Cancelar </Button>
            <Button onClick={()=>borrar(props.id)} color="primary"> Aceptar </Button>
          </DialogActions>
        </Dialog>

    </Grid>
  );
}

export default withRouter(Tarjeta)

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 425,
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
