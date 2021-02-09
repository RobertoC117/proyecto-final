import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { withRouter } from 'react-router-dom'

const Tarjeta = (props) => {
  const classes = useStyles();
  let fecha = new Date(props.fecha).toString();
  return (
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            <Avatar src="#" className={classes.large} />
            <Grid direction="column" justify="center" alignItems="flex-start">
              <Typography variant="subtitle1">
                Nombre de Usuario - {props.autor}
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {fecha}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2">
            {props.titulo}
          </Typography>
          <Typography variant="body2" component="p">
            {props.texto}
          </Typography>
        </CardContent>
        <CardActions justify="space-between" s>
          <Button size="small" onClick={() => props.history.push("/post/" + props.id)} >Ver Más</Button>
          <FormControlLabel
            style={{ marginLeft: "auto" }}
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
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
    margin: 10
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
  large: {
    marginRight: 10,
  },
});

export default withRouter(Tarjeta)
