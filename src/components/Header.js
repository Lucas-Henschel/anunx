import React, { useState } from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },

  button: {
    color: 'white',
    textDecoration: 'none',
  },

  userName: {
    marginLeft: '6px',
  },

  divider: {
    margin: '8px 0',
  },

  buttonMenu: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false); 

  const openUserMenu = Boolean(anchorUserMenu);

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Anunx
            </Typography>
            <Link href="/user/publish" passHref className={classes.button}>
              <Button color="inherit" variant="outlined">
                Anunciar e Vender
              </Button>
            </Link>
            <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
              {
                true === false
                ? <Avatar src=""/>
                : <AccountCircle />
              }
              <Typography variant="subtitle2" color="secondary" className={classes.userName}> 
                Lucas Gabriel
              </Typography>
            </IconButton>

            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Link href="/user/dashboard" passHref className={classes.buttonMenu}>
                <MenuItem>Meus anúncios</MenuItem>
              </Link>
              <Link href="/user/publish" passHref className={classes.buttonMenu}>
                <MenuItem>Publicar novo anúncio</MenuItem>
              </Link>
              <Divider className={classes.divider} />
              <MenuItem>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
