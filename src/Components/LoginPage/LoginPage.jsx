import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../../Utils/CopyRight";
import { useAuth } from "../../Contexts/AuthContext";

import loginBackground from "../../Assets/login_background.jpg";
import "./LoginPage.css";

const theme = createTheme();

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/", { replace: true });
    }
  }, [auth.user, navigate]);

  const [emptyEmailField, setEmptyEmailField] = useState(false);
  const [emptyPasswordField, setEmptyPasswordField] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email) {
      setEmptyEmailField(true);
    } else if (!password) {
      setEmptyPasswordField(true);
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/admin/login`, {
          email,
          password,
        })
        .then((res) => {
          setShowLoginAlert(false);
          auth.signin(res.data.token);
        })
        .catch((err) => {
          setShowLoginAlert(true);
          throw err;
        });
    }
  };

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
            backgroundImage: `url('${loginBackground}')`,
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={emptyEmailField}
                helperText={emptyEmailField ? "required *" : ""}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={() => setEmptyEmailField(false)}
              />
              <TextField
                error={emptyPasswordField}
                helperText={emptyPasswordField ? "required *" : ""}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={() => setEmptyPasswordField(false)}
              />
              {showLoginAlert ? (
                <Alert variant="filled" severity="error">
                  Email ou mot de passe non valide!
                </Alert>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default LoginPage;
