import { useState } from "react";
import axios from "axios";

import {
  Typography,
  Container,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "next-auth/client";

import dbConnect from "../../src/utils/dbConnect";
import TemplateDefault from "../../src/templates/Default";
import Card from "../../src/components/Card";
import { formatCurrency } from "../../src/utils/currency";
import useToasty from "../../src/contexts/Toasty";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  buttonAdd: {
    margin: "30px auto 50px auto",
    display: "block",
  },

  button: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Home = ({ products }) => {
  const classes = useStyles();
  const { setToasty } = useToasty();
  const [productId, setProductId] = useState();
  const [removedProducts, setRemovedProducts] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleCloseModal = () => setOpenConfirmModal(false);

  const handleClickRemove = (productId) => {
    setProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleConfirmRemove = () => {
    axios
      .delete("/api/products/delete", {
        data: {
          id: productId,
        },
      })
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleSuccess = () => {
    setOpenConfirmModal(false);
    setRemovedProducts([...removedProducts, productId]);

    setToasty({
      open: true,
      severity: "success",
      text: "Anúncio removido com sucesso!",
    });
  };

  const handleError = () => {
    setOpenConfirmModal(false);
    setToasty({
      open: true,
      severity: "error",
      text: "Ops, ocorreu um erro!",
    });
  };

  return (
    <>
      <TemplateDefault>
        <Dialog open={openConfirmModal} onClose={handleCloseModal}>
          <DialogTitle>Deseja realmente remover este anúncio?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ao confirmar a operação, não poderá voltar atrás.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmRemove} color="primary" autoFocus>
              Remover
            </Button>
          </DialogActions>
        </Dialog>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center">
            Meus Anúncios
          </Typography>
          <Link href={'/user/publish'} passHref className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonAdd}
            >
              Publicar um novo anúncio
            </Button>
          </Link>
        </Container>
        <Container maxWidth="md">
          {products.length === 0 && (
            <Typography
              component="div"
              variant="body1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Nenhum anúncio publicado
            </Typography>
          )}
          <Grid container spacing={4}>
            {
              products.map((product) => {
                if (removedProducts.includes(product._id)) return null;

                return (
                  <Grid key={product._id} item xs={12} sm={6} md={4}>
                    <Card
                      image={`/uploads/${product.files[0].name}`}
                      title={product.title}
                      subtitle={formatCurrency(product.price)}
                      actions={
                        <>
                          <Button size="small" color="primary">
                            Editar
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleClickRemove(product._id)}
                          >
                            Remover
                          </Button>
                        </>
                      }
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </Container>
      </TemplateDefault>
    </>
  );
};

Home.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const db = await dbConnect();
  const collection = db.collection('products');

  const products = await collection.find({ "user.id": session.userId }).toArray();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Home;
