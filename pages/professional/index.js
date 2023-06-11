import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TemplateDefault from "../../src/templates/Default";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),

    width: "100%",
  },

  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },

  question: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },

  subtitle: {
    marginBottom: theme.spacing(1),
  },
}));

const Professional = () => {
  const classes = useStyles();

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Grid container className={classes.container}>
          <Grid item>
            <Box className={classes.box}>
              <Typography component="h4" variant="h4">
                Você não tem um plano ativo
              </Typography>
              <Typography component="h6" variant="h6" className={classes.title}>
                Quer inserir 5 ou mais anúncios?
              </Typography>

              <Typography
                className={classes.subtitle}
                component="h5"
                variant="body2"
              >
                Conheça as vantagens de ter um plano de anúncios:
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Publique mais anúncios além do limite gratuito
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Economize até 68%
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Renovação gratuita (dentro do limite do plano)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Professional;
