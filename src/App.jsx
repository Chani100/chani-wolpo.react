import { useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
} from "@mui/material";

/* toast */
/* import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; */

import "./App.css";
import MuiNavbar from "../src/Navbar/MuiNavbar";
import Router from "./routes/Router";

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
  const [isDarkTheme, setIsDarkTheme] = useState(false); 
   const onThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  }; 
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      {/*  <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      <Container>
        <header>
         
          <MuiNavbar />  {<Switch checked={isDarkTheme} onChange={onThemeChange} />  }
        </header>
        <main>
          <Router />
        </main>
        <footer></footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
