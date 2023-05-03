import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
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
        <Avatar
          size="large"
          onClick={handleOpenNavMenu}
          color="inherit"
          src={avatar.url}
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
            ? avatarArr.map((page) =>
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
          {avatarArr.map((page) => (
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
