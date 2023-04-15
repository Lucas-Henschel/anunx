import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/client';
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

  button: {
    color: 'white',
    textDecoration: 'none',
  },

  userName: {
    marginLeft: '8px',
  },

  divider: {
    margin: '8px 0',
  },

  buttonMenu: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none',
  },

  headButton: {
    marginRight: '10px',
  },

  resetLink: {
    textDecoration: 'none',
    color: '#FFF',
    flexGrow: 1,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false); 
  const [ session ] = useSession();

  const openUserMenu = Boolean(anchorUserMenu);

  return (
    <>
      <AppBar position="static" elevation={3}>
        <Container maxWidth="md">
          <Toolbar>
            <Link className={classes.resetLink} href={'/'} passHref>
              <Typography variant="h6">
                Anunx
              </Typography>
            </Link>
            <Link href={ session ? '/user/publish' : '/auth/signin' } passHref className={classes.button}>
              <Button color="inherit" variant="outlined" className={classes.headButton}>
                Anunciar e Vender
              </Button>
            </Link>

            {
              session
                ? (
                  <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                    {
                      session.user.image
                      ? <Avatar src={session.user.image} />
                      : <AccountCircle />
                    }
                    <Typography variant="subtitle2" color="secondary" className={classes.userName}> 
                      { session.user.name }
                    </Typography>
                  </IconButton>    
                ) : null
            }
          
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
              <MenuItem onClick={() => signOut({
                callbackUrl: '/',
              })}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
