import { ListItemIcon, ListItemText } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { v4 as uuidv4 } from "uuid";
import { IlistItem } from "./Ilist.interfaces";
import { listItems } from "./listItems";

export default function SideBar() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
    })
  );
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const { setLoggedInUser } = useContext(AppContext);
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsNavOpen(open);
  };

  const listMenu = () => (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {listItems.map((listItem: IlistItem, index) => (
          <div key={uuidv4()}>
            {listItem.itemName === "Settings" && (
              <Divider key={listItem.itemName} />
            )}
            <ListItem
              onClick={() => {
                switch (listItem.itemName) {
                  case "My Accounts": {
                    history.push("/accounts");
                    break;
                  }
                  case "Log Out": {
                    setLoggedInUser(null);
                    localStorage.clear();
                    history.push("/");
                    break;
                  }
                }
              }}
              button
            >
              <ListItemIcon>
                <listItem.itemIcon />
              </ListItemIcon>
              <ListItemText primary={listItem.itemName} />
            </ListItem>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      <MenuIcon
        color="secondary"
        fontSize={"large"}
        onClick={toggleDrawer(true)}
      />

      <Drawer anchor="left" open={isNavOpen} onClose={toggleDrawer(false)}>
        {listMenu()}
      </Drawer>
    </>
  );
}
