import { Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import { 
  Box,
  Container,  
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  CircularProgress, 
} from "@material-ui/core";

import TemplateDefaulf from "../../../src/templates/Default"; 
import { initialValues, validationSchema } from "./formValues";
import useToasty from '../../../src/contexts/Toasty';
import useStyles from "./style";

const Signup = () => {
  const classes = useStyles();
  const router = useRouter();
  const { setToasty } = useToasty();

  const handleFormSubmit = async (values) => {
    const response = await axios.post('/api/users', values);

    if (response.data.success) {
      setToasty({
        open: true,
        severity: 'success',
        text: 'Cadastro realizado com sucesso!'
      })

      router.push('/auth/signin');
    }
  }

  return (
    <TemplateDefaulf>
      <Container maxWidth="sm" component="main" className={classes.container}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary">
          Crie sua conta
        </Typography>

        <Typography component="h5" variant="h5" align="center" color="textPrimary">
          E anuncie para todo o Brasil
        </Typography>

        <Box className={classes.orSeparator}>
          <span>ou</span>
        </Box>

        <Link
          href={`/auth/signin`}
          legacyBehavior
          passHref
        >
          <a className={classes.formatedLink}>
            Entre em sua conta
          </a>
        </Link>
      </Container>

      <Container maxWidth="md">
        <Box className={classes.box}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          > 
            {
              ({
                touched,
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <FormControl fullWidth error={errors.name && touched.name} className={classes.formControl}>
                      <InputLabel className={classes.inputLabel}>
                        Nome
                      </InputLabel>
                      <Input 
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.name && touched.name ? errors.name : null }
                      </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={errors.email && touched.email} className={classes.formControl}>
                      <InputLabel>
                        E-mail
                      </InputLabel>
                      <Input 
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.email && touched.email ? errors.email : null }
                      </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={errors.password && touched.password} className={classes.formControl}>
                      <InputLabel>
                        Senha
                      </InputLabel>
                      <Input 
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.password && touched.password ? errors.password : null }
                      </FormHelperText>
                    </FormControl>

                    <FormControl fullWidth error={errors.passwordConf && touched.passwordConf} className={classes.formControl}>
                      <InputLabel>
                        Confirmação de senha
                      </InputLabel>
                      <Input 
                        name="passwordConf"
                        type="password"
                        value={values.passwordConf}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        { errors.passwordConf && touched.passwordConf ? errors.passwordConf : null }
                      </FormHelperText>
                    </FormControl>

                    {
                      isSubmitting
                        ? (
                          <CircularProgress className={classes.loading} />
                        ) : (
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}                                           
                          >
                            Cadastrar
                          </Button>
                        )
                    }
                  </form>
                )
              }
            }
          </Formik>
        </Box>
      </Container>
    </TemplateDefaulf>
  )
}

export default Signup;