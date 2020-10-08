import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';

import { IlistItem } from './Interfaces/Ilist.interfaces';
import { listItems } from './consts/listItems';
import { ListItemIcon, ListItemText } from '@material-ui/core';

export default function SideBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

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
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize={'large'} />
        </Button>
        <Drawer anchor='left' open={isNavOpen} onClose={toggleDrawer(false)}>
          {listMenu()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
