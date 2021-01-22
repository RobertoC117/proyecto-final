import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Alert } from '@material-ui/lab';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Chip from '@material-ui/core/Chip';
import Button from "@material-ui/core/Button";
import {Collapse} from '@material-ui/core';

export default function NuevoPost() {
  const classes = useStyles();
  const [form, setForm] = React.useState(false)

  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center" variant="outlined" >
        
        <br />
        {/* <Typography component="h5" variant="h5">
          Nuevo Post
        </Typography> */}
        <br />
        
        <Button size="large" variant="contained" color="primary" component="span" onClick={()=> setForm(true)}>
          Crear nuevo Post
        </Button>
        <br/>
        <Collapse in={form}>
          <Card variant="outlined">
            <CardContent>
              <Grid container direction="column" alignItems="center">
                <Alert severity="info">
                  <strong>Info.</strong> - This is an info alert
                </Alert>
                <br/>
                
                <TextField label="Título" className={clsx(classes.margininput, classes.textField)} variant="filled" />
                <TextField label="Descripción" multiline rows={3} className={clsx(classes.margininput, classes.textFieldMultiline)} variant="filled" />
                <input accept="text/*" className={classes.imageinput} id="contained-button-file" type="file" />
                  <label htmlFor="contained-button-file">
                    <Button size="small" variant="contained" color="primary" component="span">
                      Subir Archivos
                    </Button>
                  </label>
                
              </Grid>
            </CardContent>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid direction="row" justify="space-evenly" alignItems="center" className={classes.tags}>
                <Chip label="tag#1" />
                <Chip label="tag#2" />
                <Chip label="tag#3" />
              </Grid>
              <Grid direction="row" justify="center" alignItems="center">
                <CardActions>
                  <Button variant="contained" color="primary" >
                    Publicar
                  </Button>
                  <Button variant="contained" color="secondary" onClick={()=> setForm(false)}>
                    Cancelar
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </Collapse>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  imageinput: {
    display: 'none',
  },
  marginbutton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  margininput: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "30ch",
  },
  textFieldMultiline: {
    width: "40ch",
  },
  tags: {
    marginLeft: 10,
  }
}));
