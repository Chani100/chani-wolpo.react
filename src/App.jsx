import { Container } from "@mui/material";
import "./App.css";


import MuiNavbar from "./Navbar/MuiNavbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Router from "./routes/Router";

function App() {
  return (
    <Container>
      <header>
        <MuiNavbar />
      </header>
      <main>
        <Router/>
      </main>
      <footer></footer>
    </Container>
  );
}

export default App;
