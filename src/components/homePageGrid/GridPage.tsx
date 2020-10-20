import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NavBar from "../NavBar/NavBar";
import Logs from "../WebAppEvents/Logs";
import "./running-fabs.style.scss";
import "./grid-page.style.scss";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function NestedGrid() {
  const classes = useStyles();

  function TotalCoinsAndRunTime() {
    return (
      <>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div className="upp-grid-container">
              <h3>Total Coins Earned</h3>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div className="upp-grid-container">
              <h3>Total Run time</h3>
            </div>
          </Paper>
        </Grid>
      </>
    );
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid container item xs={8} spacing={3}>
          <TotalCoinsAndRunTime />
        </Grid>
        <Grid container item xs={8} spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Logs />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <div className="running-fabs-container">
                <h3>Running Fabs</h3>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
