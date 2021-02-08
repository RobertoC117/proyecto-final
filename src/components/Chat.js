import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// icons
import SendIcon from '@material-ui/icons/Send';

export default function Chat() {
  const classes = useStyles();
  const [listmsg, setListmsg] = React.useState([ ]);
  const [msg, setMsg] = React.useState('');

  const handleChange = (event) => {
    setMsg(event.target.value);
  };

  const handleAdd = () => {
    const newListmsg = listmsg.concat({ id: Math.random(), msg  });
    setListmsg(newListmsg);
    setMsg('');
  };

  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root} >
        <Card className={classes.card}>
          <Grid container direction="column" justify="flex-start" alignItems="center" >
            <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.title} >
              <Typography variant="h6" > Mensajes </Typography>
            </Grid>

            <List className={classes.list}>
              <Grid container direction="column" justify="flex-end" alignItems="flex-end" wrap="nowrap" className={classes.message}>
                {listmsg.map((item) => (
                  <Paper item xs className={classes.singlemessage}> {`${item.msg}`} </Paper>                  
                ))}                
              </Grid>
            </List>

            <Grid container direction="row" justify="center" alignItems="center" className={classes.content}>
              <TextField label="Escribe tu mensaje" size="small" style={{ flex: 1 }} value={msg} onChange={handleChange} />
              <IconButton color="primary" aria-label="send" component="span" onClick={handleAdd}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>         
        </Card>

    </Grid>
  );
}

const useStyles =  makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    flex: 1 ,
    padding: theme.spacing(1),
    backgroundColor: 'rgb(17,108,201)',
    color: '#fff',
  },
  card: {
    width: 400,
    height: 400,
  },
  content: {
    flex: 1,
    padding: theme.spacing(1),
  },
  list: {
    width: '100%',
    overflowY: 'auto',
    maxHeight: 270,
  },
  message: {
    height: 270,
    padding: theme.spacing(1),
    overflowY: 'auto',
  },
  singlemessage: {
    color: '#fff',
    textAlign: 'right',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    backgroundColor: 'rgb(17,108,201)',
  },
}));