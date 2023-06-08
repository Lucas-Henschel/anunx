import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  }, 
  
  box: {
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
  }, 

  formControl: {
    marginBottom: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  loading: {
    display: 'block',
    margin: '10px auto',
  },

  orSeparator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    width: '100%',
    height: 1,
    margin: theme.spacing(4, 0, 2),

    '& span': {
      backgroundColor: 'rgb(242, 244, 245)',
      padding: '0 30px',
    }
  },

  formatedLink: {
    textDecoration: "none !important",
    color: '#000',
    cursor: 'pointer !important',
    fontWeight: 'bold',
  },
}))

export default useStyles;