import React from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
);

export default function NavBar() {
  const classes = useStyles();
  const [profileMenuEl, setProfileMenuEl] = React.useState<null | HTMLElement>(
    null
  );
  const [hamburgerEl, setHamburgerEl] = React.useState<null | HTMLElement>(
    null
  );
  const [
    mobileMoreprofileMenuEl,
    setMobileMoreprofileMenuEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(profileMenuEl);
  const isMobileMenuOpen = Boolean(mobileMoreprofileMenuEl);
  const isHamburgerOpen = Boolean(hamburgerEl);

  const handleHamburgerMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setHamburgerEl(event.currentTarget);
  };
  const handleHamburgerMenuClose = () => {
    setHamburgerEl(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreprofileMenuEl(null);
  };

  const handleMenuClose = () => {
    setProfileMenuEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreprofileMenuEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={profileMenuEl}
      //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      //   id={menuId}
      //   keepMounted
      //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );
  const renderHamburgerMenu = (
    <Menu
      anchorEl={hamburgerEl}
      //   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      //   transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isHamburgerOpen}
      onClose={handleHamburgerMenuClose}
    >
      <MenuItem onClick={handleHamburgerMenuClose}>My Accounts</MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}>Coins Earned</MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}>Stats</MenuItem>
      <MenuItem onClick={handleHamburgerMenuClose}>History</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreprofileMenuEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleHamburgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.title} variant='h6' noWrap>
              {localStorage.getItem('userName')}
            </Typography>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderHamburgerMenu}
    </div>
  );
}
