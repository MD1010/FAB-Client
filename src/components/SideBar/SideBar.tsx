import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { IlistItem } from './Interfaces/Ilist.interfaces';
import { listItems } from './consts/listItems';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

export default function SideBar() {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
    })
  );
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsNavOpen(open);
  };

  const listMenu = () => (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(false)}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {/**/}
      {/*  */}
      <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        {listItems.map((listItem: IlistItem) => (
          <>
            {listItem.itemName === 'Settings' && <Divider />}
            <ListItem
              onClick={() =>
                console.log('switch to ' + listItem.itemName + ' page')
              }
              button
              key={listItem.itemName}
            >
              <ListItemIcon>
                <listItem.itemIcon />
              </ListItemIcon>
              <ListItemText primary={listItem.itemName} />
            </ListItem>
          </>
        ))}
      </div>
    </>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon color='secondary' fontSize={'large'} />
        </Button>

        <Drawer anchor='left' open={isNavOpen} onClose={toggleDrawer(false)}>
          {listMenu()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
