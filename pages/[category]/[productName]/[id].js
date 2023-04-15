import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

import TemplateDefault from "../../../src/templates/Default";
import dbConnect from "@/src/utils/dbConnect";
import ProductsModel from "@/src/models/products";
import { formatCurrency } from "@/src/utils/currency";
import { dateFormart } from "@/src/utils/dateFormat";

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),

    width: "100%",
    maxWidth: 500,
  },

  productName: {
    margin: "15px 0",
  },

  price: {
    fontWeight: "bold",
    marginBottom: 15,
  },

  card: {
    height: "100%",
  },

  cardMedia: {
    paddingTop: "56%",
  },

  align: {
    textAlign: "center",
  },

  root: {
    width: "100%",
    maxWidth: 500,
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();
  const created = dateFormart(product.created);

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
                    color: "white",
                  },
                }}
              >
                {product.files.map((file) => (
                  <Card key={file.name} className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`/uploads/${file.name}`}
                      title={product.title}
                    />
                  </Card>
                ))}
              </Carousel>
            </Box>

            <Box className={classes.box} textAlign="left">
              <Typography component="span" variant="caption">
                Publicado {created.day} de {created.stringMonth} de{" "}
                {created.year}
              </Typography>

              <Typography
                component="h4"
                variant="h4"
                className={classes.productName}
              >
                {product.title}
              </Typography>

              <Typography component="h4" variant="h4" className={classes.price}>
                {formatCurrency(product.price)}
              </Typography>
              <Chip label={product.category} />
            </Box>

            <Box className={classes.box}>
              <Typography component="h6" variant="h6">
                Descrição
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Card elevation={0} className={classes.box}>
              <CardHeader
                avatar={
                  <Avatar src={product.user.image}>
                    {product.user.name[0] || product.user.image}
                  </Avatar>
                }
                title={product.user.name}
                subheader={product.user.email}
              />
              <CardMedia image={product.user.image} title={product.user.name} />
            </Card>

            <Box
              className={`${classes.box} ${classes.align}`}
              textAlign="center"
            >
              <Typography component="h6" variant="h6">
                Localização
              </Typography>
              <Typography component="h6" variant="h6">
                Cidade
              </Typography>
              <Typography component="p" variant="body2">
                {product.city}
              </Typography>
              <Typography component="h6" variant="h6">
                Estado
              </Typography>
              <Typography component="p" variant="body2">
                {product.state}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps({ query }) {
  const { id } = query;
  await dbConnect();

  const product = await ProductsModel.findOne({ _id: id });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default Product;
