import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponents";
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

const favcard = [{ label: "Fav Cards", url: ROUTES.FAVCARDS }];
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

const Hamburger = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        flex: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
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
          <NavLinkComponent key={page.url} {...page} />
        ))}
        {isLoggedIn
          ? favcard.map((page) => <NavLinkComponent key={page.url} {...page} />)
          : notAuthPages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}

        {isLoggedIn && payload.biz
          ? isBiz.map((page) => <NavLinkComponent key={page.url} {...page} />)
          : ""}
        {isLoggedIn && payload.isAdmin
          ? isAdmin.map((page) => <NavLinkComponent key={page.url} {...page} />)
          : ""}
        {pages.map((page) => (
          <MenuItem key={"miniLinks" + page.url} onClick={handleCloseNavMenu}>
            <NavLink to={page.url}></NavLink>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
export default Hamburger;
