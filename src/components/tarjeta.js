import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { withRouter } from 'react-router-dom'


const Tarjeta = (props) => {
  const classes = useStyles();
  
  const redireccion = () =>{
      props.history.push("/post/este_id_no_existe")
  }

  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item xs>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Fecha
          </Typography>
          <Typography variant="h5" component="h2">
            Título
          </Typography>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus.
          </Typography>
        </CardContent>
        <CardActions justify="space-between" onClick={()=>redireccion()}>
          <Button size="small">Ver Más</Button>
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
    </Grid>
  );
}

export default withRouter(Tarjeta)

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
