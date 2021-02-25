import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Carousel from 'react-material-ui-carousel';
// img
import img1 from './img/main.png';
import img2 from './img/slider/elearning.jpg';
import img3 from './img/slider/elearning2.jpg';
import img4 from './img/slider/elearning3.jpg';
import img5 from './img/slider/elearning4.jpg';

export default function Carrusel() {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.root} >
      <Carousel animation="slide" swipe={true} autoPlay={true} interval={3300}>
        {/* <img src={img1} alt="imágen" className={classes.img} /> */}
        <img src={img2} alt="imágen" className={classes.img} />  
        <img src={img3} alt="imágen" className={classes.img} /> 
        <img src={img4} alt="imágen" className={classes.img} /> 
        <img src={img5} alt="imágen" className={classes.img} />        
      </Carousel>
    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  img: {
    minWidth: 1500,
    maxHeight: 400,//350
    objectFit: 'cover',
  }
}));
