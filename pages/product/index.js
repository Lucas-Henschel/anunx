import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import TemplateDefault from "../../src/templates/Default";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },

  productName: {
    margin: '15px 0',
  },

  price: {
    fontWeight: 'bold',
    marginBottom: 15,  
  },

  card: {
    height: '100%',
  },

  cardMedia: {
    paddingTop: '56%', 
  }
}));

const Product = () => {
  const classes = useStyles();

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Box className={classes.box}>
              <Carousel
                autoPlay={false}
                animation="slide"
                navButtonsAlwaysVisible
                indicators={false} 
                navButtonsProps={{
                  style: {
                    color: 'white'
                  }
                }}
              >
                <Card className={classes.card}>
                  <CardMedia 
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random?a=1"
                    title="Image title"
                  />
                </Card>
                <Card className={classes.card}>
                  <CardMedia 
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random?a=2"
                    title="Image title"
                  />
                </Card>
              </Carousel>
            </Box>

            <Box className={classes.box} textAlign="left">
              <Typography component="span" variant="caption">
                Publicado 16 de junho de 2021
              </Typography>

              <Typography
                component="h4"
                variant="h4"
                className={classes.productName}
              >
                Jaguar XE 2.0 D R-Sport Aut.
              </Typography>

              <Typography component="h4" variant="h4" className={classes.price}>
                R$ 50.000,00
              </Typography>
              <Chip label="Categoria" />
            </Box>

            <Box className={classes.box} textAlign="left">
              <Typography component="h6" variant="h6">
                Descrição
              </Typography>
              <Typography component="p" variant="body2">
                Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} className={classes.box}>
              <CardHeader
                avatar={
                  <Avatar>L</Avatar>
                }
                title="Lucas Gabriel"
                subheader="lucas@gmail.com"
              />
              <CardMedia  
                image="https://source.unsplash.com/random"
                title="Lucas Gabriel"
              />
            </Card>

            <Box className={classes.box}>
              <Typography component="h6" variant="h6">
                Localização
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export default Product;
