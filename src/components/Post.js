import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// icons
import FavoriteOutlineIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from "@material-ui/icons/Favorite";
import Comentario from './Comentario';
//Breadcrumbs
import { withRouter, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { AddBreadcrum } from '../redux/userDuck'

export default function Post() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const migajas = useSelector(store => store.user.breadcrumbs)
  
  React.useEffect(()=>{
      dispatch(AddBreadcrum("Post", path))
  },[])

  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
      <Grid item xs={9}>
        <Card className={classes.post}>
          <CardContent>
            <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.tittle} >
              <Avatar src="#" className={classes.large} />
              <Grid direction="column" justify="flex-start" alignItems="center" className={classes.tittle2} >
                <Typography variant="h4" > Título </Typography>
                <Grid container direction="row" justify="flex-start" alignItems="center" >
                  <Typography color="textSecondary" variant="subtitle2" > Usuario </Typography>
                  <Typography color="textSecondary" variant="subtitle2" > • </Typography>
                  <Typography color="textSecondary" variant="subtitle2" > Fecha </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.body}>
              <Typography variant="body2" component="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus 
                dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
                rutrum quisque non tellus.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus 
                dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
                rutrum quisque non tellus.
              </Typography>
            </Grid>
          </CardContent>
          <CardActions >
            <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.actions}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FavoriteOutlineIcon />}
                    checkedIcon={<FavoriteIcon />}
                    size="small"
                  />
                }
                label="10"
              />
              <Typography color="textSecondary" variant="subtitle1" > Comentarios: </Typography>
              <Typography variant="subtitle1" > 2 </Typography>
            </Grid>
          </CardActions>
          <Divider />
          <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.comments}>            
            <Grid container direcion="row" className={classes.Addcomments}>
              <TextField size="small" label="Añade un Comentario" variant="filled" className={classes.txtfield} />
              <Button variant="contained" color="primary" disableElevation className={classes.button} > Publicar </Button>
            </Grid>
            <Comentario />
            <Comentario />
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: '#f5f5f5'
  },
  post: {
    flex: 5,
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  tittle: {
    padding: theme.spacing(1),
  },
  tittle2: {
    padding: theme.spacing(2),
  },
  body: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  actions: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  comments: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  Addcomments: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  txtfield: {
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
  }
}));
