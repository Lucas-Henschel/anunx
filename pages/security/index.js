import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TemplateDefault from "../../src/templates/Default";
import Image from "next/image";
import SecurityImage from "../../public/images/security.png";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),

    width: "80%",
  },

  title: {
    marginBottom: theme.spacing(3),
  },

  stretch: {
    width: 50,
    height: 200,
    resizeMode: "stretch",
  },
}));

const Product = () => {
  const classes = useStyles();

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={6}>
            <Box className={classes.box}>
              <Typography component="h4" variant="h4" className={classes.title}>
                Para nós, segurança é muito importante
              </Typography>
              <Typography component="body1" variant="body1">
                Garantir a sua segurança e promover uma navegação tranquila em
                nossa plataforma é essencial para todos nós.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Image
              src={SecurityImage}
              width={480}
              height={270}
              alt="Login com Google"
            />
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Product;
