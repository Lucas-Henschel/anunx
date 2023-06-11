import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useSession } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },

  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  color: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },

  formatLink: {
    textDecoration: "none",
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [session] = useSession();

  return (
    <Container maxWidth="md" component="footer" className={classes.container}>
      <Grid container spacing={3} className={classes.footer}>
        <Grid item>
          <Box>
            <Link href="/help" passHref className={classes.formatLink}>
              <Typography
                className={classes.color}
                color="textSecondary"
                variant="subtitle1"
              >
                Ajuda e Contato
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Link href="/security" passHref className={classes.formatLink}>
              <Typography
                className={classes.color}
                color="textSecondary"
                variant="subtitle1"
              >
                Dicas de segurança
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Link
              href={session ? "/user/publish" : "/auth/signup"}
              passHref
              className={classes.formatLink}
            >
              <Typography
                className={classes.color}
                color="textSecondary"
                variant="subtitle1"
              >
                Anunciar e Vender
              </Typography>
            </Link>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Link href="/professional" passHref className={classes.formatLink}>
              <Typography
                className={classes.color}
                color="textSecondary"
                variant="subtitle1"
              >
                Plano Profissional
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
