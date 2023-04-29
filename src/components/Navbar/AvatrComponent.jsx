import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import NavLinkComponent from "./NavLinkComponents";
import { authActions } from "../../store/auth";

const avatar = [
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
  {
    label: "profile",
    url: ROUTES.PROFILE,
  },
];


const AvatarM = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box>
      {isLoggedIn ? (
        <Avatar
          size="large"
          onClick={handleOpenNavMenu}
          color="inherit"
          alt="Travis Howard"
          src="http://www.2all.co.il/web/Sites/tutyfrutyyy/65882_(6).jpg"
        ></Avatar>
      ) : (
        ""
      )}
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
      >
        <Box>
          {isLoggedIn
            ? avatar.map((page) =>
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
            : ""}
          {avatar.map((page) => (
            <MenuItem key={"miniLinks" + page.url} onClick={handleCloseNavMenu}>
              <NavLink to={page.url}></NavLink>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </Box>
  );
};
export default AvatarM;
