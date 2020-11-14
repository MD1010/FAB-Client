import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React, { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import { getLoggedInUser } from "src/services/auth";
import SideBar from "../SideBar/SideBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      paddingBottom: 3,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      color: "error",
      paddingRight: 5,
      paddingTop: 2,

      flexGrow: 1,
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolBar: {
      background: "#100e17",
    },
  })
);

export default function NavBar() {
  const { loggedInUser } = useContext(AppContext);
  const classes = useStyles();
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar
          classes={{
            root: classes.toolBar,
          }}
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <SideBar />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {"Welcome Back " + loggedInUser}
            </Typography>
            <AccountCircle fontSize="large" />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
