import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import Link from "@mui/icons-material/Link";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";

import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
} from "@mui/material";
import { darkThemeActions } from "../store/darkTheme";

const pages = [
  {
    img: " logo192.png",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
  
  { label: "RegisterPage",
    url: ROUTES.REGISTER,
  },
  {
    label: "LoginPage",
    url: ROUTES.LOGIN,
  },
];

const MuiNavbar = () => {
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

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <img src="./logo192.png" alt="logo" className="logo" />

          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLink key={page.url} to={page.url}>
                {({ isActive }) => (
                  <Typography
                    sx={{
                      my: 2,
                      display: "block",
                      p: 2,
                    }}
                    color={isActive ? "#9c27b0" : "#76ff03"}
                  >
                    {page.label}
                  </Typography>
                )}
              </NavLink>
            ))}
          </Box>
          <Box sx={{ my: 2, p: 1 }}>
            <Switch checked={isDarkTheme} onChange={changeTheme} />
          </Box>
          {/* hamburger with menu */}
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
                    {/* if the current page and the link is the same then it will change the color of the link */}
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
