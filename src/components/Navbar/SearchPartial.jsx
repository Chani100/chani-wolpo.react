import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

const SearchPartial = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [searchState, setSearchState] = useState("");
  const [changed, setChanged] = useState(false);
const searchChange = (e) => {
  setSearchState(e.target.value);
};
const searchSubmit = (e) => {
      e.preventDefault(); 
    let url = location.pathname;
    if (searchState) {
      navigate(`${url}?filter=${searchState}`);
      setChanged(true);
    } else {
      if (changed) {
        navigate(-1);
        setChanged(false);
      }
    }
  };

  return (
 <form  onSubmit={searchSubmit} > 
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={searchChange}
          value={searchState}
        />
      </Search>
  </form>
  );
 }; 
export default SearchPartial;
/* import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      width: "0ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

const SearchPartial = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  
  const navigate = useNavigate();
  const searchFunc = (ev) => {
    const value = ev.target.value;
    setSearchInput(value);
 /*    searchSubmit(value);  */

/* setSearchState(ev.target.value); */
/*  }; */
/* const searchSubmit = (ev) => {
    ev.preventDefault();
    const pathname = location.pathname;
    console.log(location);
    navigate(`${pathname}?filter=${searchInput}`);
  };
  return (
    <form onSubmit={searchSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchInput}
          onChange={searchFunc}
        />
      </Search>
    </form>
  );
}; 



export default SearchPartial; */
