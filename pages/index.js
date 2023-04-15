import Link from "next/link";
import slugify from "slugify";

import { Container, Typography, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import TemplateDefault from "../src/templates/Default";
import Card from "../src/components/Card";
import dbConnect from "@/src/utils/dbConnect";
import ProductsModel from "../src/models/products";
import { formatCurrency } from "@/src/utils/currency";
import Search from "@/src/components/Search";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    marginTop: 50,
  },

  productLink: {
    textDecoration: "none !important",
  },

  message: {
    marginTop: '30px',
  }
}));

const Home = ({ products }) => {
  const classes = useStyles();

  return (
    <TemplateDefault>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="textPrimary"
        >
          O que deseja encontrar?
        </Typography>
        <Search />
      </Container>

      <Container maxWidth="md" className={classes.cardGrid}>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="textPrimary"
        >
          Destaques
        </Typography>
        <br />
        <Grid container spacing={4}>
          {products.map((product) => {
            const category = slugify(product.category).toLocaleLowerCase();
            const title = slugify(product.title).toLocaleLowerCase();

            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <Link
                  href={`/${category}/${title}/${product._id}`}
                  legacyBehavior
                >
                  <a className={classes.productLink}>
                    <Card
                      image={`/uploads/${product.files[0].name}`}
                      title={product.title}
                      subtitle={formatCurrency(product.price)}
                    />
                  </a>
                </Link>
              </Grid>
            );
          })}
        </Grid>
        {
          products.length === 0 && (
            <Typography
              component="div"
              variant="body1"
              align="center"
              color="textPrimary"
              className={classes.message}
              gutterBottom
            >
              Nenhum anúncio publicado
            </Typography>
          )
        }
      </Container>
    </TemplateDefault>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const products = await ProductsModel.aggregate([
    {
      $sample: { size: 6 },
    },
  ]);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
