import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import { AppBar, Container, IconButton, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const fav = ()=>{
   navigate(ROUTES.FAVCARDS)
  }
  const myCards = () =>{
    navigate(ROUTES.MYCARDS)
  }
  const about = () =>{
    navigate(ROUTES.ABOUT)
  }
  return (
    <footer>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Typography variant="h6" align="center" fontWeight={1000}>
            © Chani Wolpo
          </Typography>

          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="About"
              icon={<InfoTwoToneIcon />}
              onClick={about}
              color="primary"
            />
            {isLoggedIn && (payload.biz || payload.isAdmin) ? (
              <BottomNavigationAction
                label="My Cards"
                onClick={myCards}
                icon={<CoPresentTwoToneIcon />}
              />
            ) : (
              " "
            )}

            {isLoggedIn ? (
              <BottomNavigationAction
                label="Fav Cards"
                onClick={fav}
                icon={<FavoriteTwoToneIcon />}
                color="primary"
              />
            ) : (
              " "
            )}
          </BottomNavigation>
        </Container>
      </AppBar>
    </footer>
  );
};
export default Footer;
