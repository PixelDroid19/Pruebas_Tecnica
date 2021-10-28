import React, { useState } from "react";
//Material UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Cached, Star, Facebook, Google } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Email, Password } from "@mui/icons-material";
//Redux
import { useDispatch } from "react-redux";
//Actions
import {
  loginEmailPassword,
  LoginGoogle,
  LoginFacebook,
  RegistroEmailPassword,
} from "../../Redux/Actions/actionLogin";
//Hook
import { useForm } from "../../hooks/useForm";
//Formik y Yup
import { useFormik } from "formik";
import * as Yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Design by Damien "}
      <Link color="inherit" href="https://www.linkedin.com/">
        Linkedin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [Login, setLogin] = useState("false");
  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(!Login);
  };

  const dispatch = useDispatch();

  const [values, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handlerLogin = async (e) => {
    e.preventDefault();
    dispatch(loginEmailPassword(email, password));
  };

  const handleGoogle = () => {
    dispatch(LoginGoogle());
  };
  const handleFacebook = () => {
    dispatch(LoginFacebook());
  };
  //Register
  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      pass1: "",
      pass2: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required(),
      email: Yup.string().email().required(),
      pass1: Yup.string().required(),
      pass2: Yup.string().required(),
    }),
    onSubmit: (formData) => {
      var axios = require("axios");
      var config = {
        data: {
          username: formData.nombre,
          secret: formData.pass1,
          email: formData.email,
        },
      };
      axios(config)
        .then(function () {})
        .catch(function (error) {
          console.log(error);
        });

      dispatch(
        RegistroEmailPassword(formData.email, formData.pass1, formData.nombre)
      );
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {
            //Login Custom
            Login ? (
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <Cached />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Iniciar sesión
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handlerLogin}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleInputChange}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Password />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recuérdame"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Iniciar sesión
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Se te olvidó tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link onClick={(e) => handleLogin(e)} variant="body2">
                        {"¿No tienes una cuenta? Regístrate"}
                      </Link>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      style={{ margin: "0px" }}
                    >
                      <Grid item>
                        <Button
                          variant="outlined"
                          onClick={handleFacebook}
                          startIcon={<Facebook />}
                        >
                          Facebook
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleGoogle}
                          startIcon={<Google />}
                        >
                          Google
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            ) : (
              //Register Custom
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <Star />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Registrarse
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={formik.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    name="nombre"
                    type="text"
                    onChange={formik.handleChange}
                    helperText={formik.errors.nombre}
                    autoComplete="nombre"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    helperText={formik.errors.email}
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pass1"
                    label="Contraseña"
                    onChange={formik.handleChange}
                    helperText={formik.errors.pass1}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Password />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="pass2"
                    label="Confirmar Contraseña"
                    onChange={formik.handleChange}
                    helperText={formik.errors.pass1}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Password />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarse
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        ¿Se te olvidó tu contraseña?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link onClick={(e) => handleLogin(e)} variant="body2">
                        {"¿Tienes una cuenta? Inicia Sesión"}
                      </Link>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      style={{ margin: "0px" }}
                    >
                      <Grid item>
                        <Button variant="outlined" startIcon={<Facebook />}>
                          Facebook
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Google />}
                        >
                          Google
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            )
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const theme = createTheme();

export default function SignInSide() {
  return <Login />;
}
