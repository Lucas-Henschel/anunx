import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    justifyContent: "space-between",
  },

  container: {
    padding: theme.spacing(6, 0, 6),
  },
}));

const Default = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <Header />
      <Box className={classes.container}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Default;
