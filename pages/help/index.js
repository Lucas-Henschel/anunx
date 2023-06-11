import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

import TemplateDefault from "../../src/templates/Default";
import HelpImage from "../../public/images/help.jpg";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 20,
      backgroundColor: "red",
    },
  },

  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },

  question: {
    marginBottom: theme.spacing(1),
  },
}));

const Help = () => {
  const classes = useStyles();

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Grid
          container
          className={classes.container}
          alignItems="center"
          alignContent="center"
        >
          <Grid item xs={4}>
            <Image src={HelpImage} width={250} height={170} alt="Help Image" />
          </Grid>

          <Grid item xs={6}>
            <Box className={classes.box}>
              <Typography component="h4" variant="h4">
                Como podemos te ajudar? :)
              </Typography>
              <Typography component="h6" variant="h6" className={classes.title}>
                Perguntas frequentes
              </Typography>

              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Exclusão de contas
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Reativação de conta
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Golpe do WhatsApp
              </Typography>
              <Typography
                className={classes.question}
                component="h5"
                variant="body2"
              >
                Tudo sobre pagamento via boleto bancário
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Help;
