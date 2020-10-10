import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={1}
      >
        <Grid container item xs={8} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}
