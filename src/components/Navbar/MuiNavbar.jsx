import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import MenuItem from "@mui/material/MenuItem";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import SearchPartial from "./SearchPartial";
import { authActions } from "../../store/auth";
import { Container, Switch } from "@mui/material";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponents";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Avatar from "@mui/material/Avatar";
const pages = [
  {
    label: (
      <img
        width={40}
        src="https://img.lovepik.com/freepng/16/55/70/63E58PICUk2jiVD7v7D02_PIC2018.png_wh860.png"
      />
    ),
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

const authedPages = [
  {
    label: (
      <Avatar 
        alt="Travis Howard"
        src="http://www.2all.co.il/web/Sites/tutyfrutyyy/65882_(6).jpg"
      />
    ),
    url: ROUTES.LOGOUT,
  },
  { label: "Fav Cards", url: ROUTES.FAVCARDS },
];
const isBiz = [
  {
    label: "Me cards",
    url: ROUTES.MYCARDS,
  },
];
const isAdmin = [
  {
    label: "Sandbox",
    url: ROUTES.SANDBOX,
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
/*   console.log(payload); */

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
 
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}

            {isLoggedIn && (payload.biz )
              ? isBiz.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isLoggedIn && payload.isAdmin
              ? isAdmin.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
          </Box>
          <SearchPartial />
          <Box sx={{ my: 2, p: 1 }}>
            <IconButton onClick={changeTheme}>
              {isDarkTheme ? <WbSunnyIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          <Typography
            sx={{
              my: 2,

              display: { xs: " none", md: "block" },
              p: 1,
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLink to={page.url}>
                    {({ isActive }) => (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: `${isActive ? "#9c27b0" : "#76ff03"}`,
                        }}
                      >
                        {page.label}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
