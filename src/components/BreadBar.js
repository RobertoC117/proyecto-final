import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useSelector } from 'react-redux'

export default function Breadcrumb() {
  const classes = useStyles();
  const breadcrumbs = useSelector(store => store.user.breadcrumbs)
  return (
    breadcrumbs !== [] ?
    <Grid container justify="center" alignItems="center"  className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" className={classes.bread}>
        {/* <Link color="inherit" href="#"> Link </Link> */}
        {
            breadcrumbs.map(item => <Link color="inherit" href={item.path}> {item.name} </Link>)
        }
      </Breadcrumbs>
    </Grid> :
    <Grid>

    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: '#9E9E9E',
    padding: theme.spacing(1),
  },
  bread: {
    color: '#FFF',
    backgroundColor: '#9E9E9E',
  },
}));
