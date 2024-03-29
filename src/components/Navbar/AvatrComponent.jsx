import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import NavLinkComponent from "./NavLinkComponents";
import { authActions } from "../../store/auth";
import axios from "axios";

const avatarArr = [
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
  const [avatar, setAvatar] = React.useState();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );

  React.useEffect(() => {
    axios
      .get("/users/userInfo")
      .then((userInfo) => {
        setAvatar({
          url: userInfo.data.imageUrl,
        });
      })
      .catch((err) => {});
  }, [isLoggedIn]);
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
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={"account-menu"}
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          {avatar && <Avatar alt={avatar.alt} src={avatar.url} />}
        </IconButton>
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
            ? avatarArr.map((page) =>
                page.url === ROUTES.LOGOUT ? (
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                  />
                ) : (
                  <NavLinkComponent
                    onClick={handleCloseNavMenu}
                     key={page.url}
                    {...page}
                  />
                )
              )
            : ""}
        
        </Box>
      </Menu>
    </Box>
  );
};
export default AvatarM;
