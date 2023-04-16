import { useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
  AppBar,
} from "@mui/material";

import { ToastContainer } from "react-toastify";

import "./App.css";
import MuiNavbar from "../src/Navbar/MuiNavbar";
import MuiFooter from "./Navbar/MuiFooter";

import TableFooter from "@mui/material/TableFooter";

import Router from "./routes/Router";
import { useSelector } from "react-redux";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Container>
        <header>
          <MuiNavbar />{" "}
        </header>
        <main>
          <Router />
        </main>
        <footer>
          <MuiFooter></MuiFooter>
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
