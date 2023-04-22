import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AppBar, Container, IconButton, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import Favicon from "../FavIconComponent";
import { useSelector } from "react-redux";
import Mycards from "../MyCardsComponent";
import { Fragment } from "react";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  return (
    <footer>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Typography variant="h6" align="center" fontWeight={1000}>
            © Chani Wolpo
          </Typography>

          <BottomNavigation
            color="primary"
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {/*  <BottomNavigationAction
              label="About"
              icon={<InfoTwoToneIcon />}
              href={ROUTES.ABOUT}
            /> */}
            {isLoggedIn && (payload.biz || payload.isAdmin) ? (
              <BottomNavigationAction
                label="My Cards"
                href={ROUTES.MYCARDS}
                icon={<CoPresentTwoToneIcon />}
                color="primary"
              />
            ) : (
              " "
            )}
            <BottomNavigationAction
              label="About"
              icon={<InfoTwoToneIcon />}
              href={ROUTES.ABOUT}
            />
            {isLoggedIn ? (
              <BottomNavigationAction
                label="Fav Cards"
                href={ROUTES.FAVCARDS}
                color="primary"
                icon={<FavoriteTwoToneIcon />}
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
